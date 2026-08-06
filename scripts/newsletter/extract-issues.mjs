#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const sourceDir = join(repoRoot, 'public/mle');
const outputDir = join(repoRoot, 'src/content/newsletter');
const tmpDir = join(repoRoot, 'tmp');
const checkDir = join(tmpDir, 'newsletter-check');
const triageDir = join(tmpDir, 'newsletter-triage');
const statsPath = join(tmpDir, 'newsletter-extract-stats.json');
const goldenIssues = new Set([376, 396]);
const rejectedAboutImage =
  'https://img.mailinblue.com/2145551/images/content_library/original/6586e8e031824bab81f3f9d5.png';

const voidTags = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

const namedEntities = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
};

function decodeEntities(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const hex = entity[1].toLowerCase() === 'x';
      const number = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(number) ? String.fromCodePoint(number) : match;
    }
    return namedEntities[entity.toLowerCase()] ?? match;
  });
}

function cleanText(value) {
  return decodeEntities(value)
    .replace(/[\u00ad\u200b\ufeff]/g, '')
    .replace(/\u00a0/g, ' ');
}

function normalizeInline(value) {
  return cleanText(value).replace(/\s+/g, ' ').trim();
}

function findTagEnd(html, start) {
  let quote = '';
  for (let index = start + 1; index < html.length; index += 1) {
    const character = html[index];
    if (quote) {
      if (character === quote) quote = '';
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === '>') {
      return index;
    }
  }
  return html.length - 1;
}

function parseAttributes(source) {
  const attributes = {};
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = attributePattern.exec(source))) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attributes[name] = cleanText(value);
  }
  return attributes;
}

function closeImplied(stack, tag) {
  const closeNearest = (tags) => {
    for (let index = stack.length - 1; index > 0; index -= 1) {
      if (tags.has(stack[index].tag)) {
        stack.length = index;
        return;
      }
      if (['table', 'div', 'section', 'body'].includes(stack[index].tag)) return;
    }
  };

  if (tag === 'p') closeNearest(new Set(['p']));
  if (tag === 'li') closeNearest(new Set(['li']));
  if (tag === 'tr') closeNearest(new Set(['tr']));
  if (tag === 'td' || tag === 'th') closeNearest(new Set(['td', 'th']));
}

function parseHtml(source) {
  const html = source
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const root = { type: 'root', children: [], parent: null };
  const stack = [root];
  let cursor = 0;

  const append = (node) => {
    const parent = stack.at(-1);
    node.parent = parent;
    parent.children.push(node);
  };

  while (cursor < html.length) {
    const opening = html.indexOf('<', cursor);
    if (opening === -1) {
      append({ type: 'text', value: html.slice(cursor), children: [] });
      break;
    }
    if (opening > cursor)
      append({ type: 'text', value: html.slice(cursor, opening), children: [] });

    if (html.startsWith('<!--', opening)) {
      const end = html.indexOf('-->', opening + 4);
      cursor = end === -1 ? html.length : end + 3;
      continue;
    }

    const end = findTagEnd(html, opening);
    const raw = html.slice(opening + 1, end).trim();
    cursor = end + 1;
    if (!raw || raw[0] === '!' || raw[0] === '?') continue;

    if (raw[0] === '/') {
      const tag = raw.slice(1).trim().split(/\s+/, 1)[0].toLowerCase();
      for (let index = stack.length - 1; index > 0; index -= 1) {
        if (stack[index].tag === tag) {
          stack.length = index;
          break;
        }
      }
      continue;
    }

    const selfClosing = raw.endsWith('/');
    const tagMatch = raw.match(/^([^\s/>]+)/);
    if (!tagMatch) continue;
    const tag = tagMatch[1].toLowerCase();
    closeImplied(stack, tag);
    const attributeSource = raw.slice(tagMatch[0].length, selfClosing ? -1 : undefined);
    const node = {
      type: 'element',
      tag,
      attrs: parseAttributes(attributeSource),
      children: [],
      parent: null,
    };
    append(node);
    if (!selfClosing && !voidTags.has(tag)) stack.push(node);
  }

  return root;
}

function walk(node, visit) {
  if (visit(node) === false) return;
  for (const child of node.children ?? []) walk(child, visit);
}

function elements(node, predicate) {
  const matches = [];
  walk(node, (candidate) => {
    if (candidate.type === 'element' && predicate(candidate)) matches.push(candidate);
  });
  return matches;
}

function hasClass(node, name) {
  return (node.attrs?.class ?? '').split(/\s+/).includes(name);
}

function firstElement(node, predicate) {
  let result;
  walk(node, (candidate) => {
    if (!result && candidate.type === 'element' && predicate(candidate)) {
      result = candidate;
      return false;
    }
    return result ? false : undefined;
  });
  return result;
}

function textContent(node, withBreaks = false) {
  if (node.type === 'text') return cleanText(node.value);
  if (node.type !== 'element' && node.type !== 'root') return '';
  if (['style', 'script'].includes(node.tag)) return '';
  if (node.tag === 'br') return withBreaks ? '\n' : ' ';
  const content = (node.children ?? []).map((child) => textContent(child, withBreaks)).join('');
  return withBreaks && ['div', 'p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tag)
    ? `${content}\n`
    : content;
}

function parseStyle(node) {
  const styles = {};
  for (const declaration of (node.attrs?.style ?? '').split(';')) {
    const separator = declaration.indexOf(':');
    if (separator === -1) continue;
    styles[declaration.slice(0, separator).trim().toLowerCase()] = declaration
      .slice(separator + 1)
      .trim();
  }
  return styles;
}

function maxFontSize(node) {
  let maximum = 0;
  walk(node, (candidate) => {
    if (candidate.type !== 'element') return;
    const value = parseStyle(candidate)['font-size'];
    const match = value?.match(/^(\d+(?:\.\d+)?)px$/);
    if (match) maximum = Math.max(maximum, Number(match[1]));
  });
  return maximum;
}

function textIsEntirelyLarge(node) {
  const whole = normalizeInline(textContent(node));
  if (!whole) return false;
  const largeParts = [];
  walk(node, (candidate) => {
    if (candidate.type !== 'element') return;
    const value = parseStyle(candidate)['font-size'];
    const match = value?.match(/^(\d+(?:\.\d+)?)px$/);
    if (match && Number(match[1]) >= 28) {
      largeParts.push(normalizeInline(textContent(candidate)));
      return false;
    }
  });
  return normalizeInline(largeParts.join(' ')) === whole;
}

function hasBackgroundCodeStyle(node) {
  return (
    elements(node, (candidate) => {
      if (!['span', 'code', 'pre'].includes(candidate.tag)) return false;
      const style = parseStyle(candidate);
      return Boolean(style['background-color'] && style['background-color'] !== 'transparent');
    }).length > 0
  );
}

function markdownDestination(href) {
  let destination = cleanText(href).trim();
  const openingParentheses = [...destination].filter((character) => character === '(').length;
  const closingParentheses = [...destination].filter((character) => character === ')').length;
  if (openingParentheses !== closingParentheses) {
    destination = destination.replaceAll('(', '%28').replaceAll(')', '%29');
    if (openingParentheses > closingParentheses) {
      destination += '%29'.repeat(openingParentheses - closingParentheses);
    }
  }
  return /[\s()]/.test(destination) ? `<${destination}>` : destination;
}

function escapeLinkText(value) {
  return value.replaceAll('[', '\\[').replaceAll(']', '\\]');
}

function renderInline(node) {
  if (node.type === 'text') return cleanText(node.value);
  if (node.type !== 'element' && node.type !== 'root') return '';
  if (['style', 'script'].includes(node.tag)) return '';
  if (node.tag === 'br') return ' ';
  if (node.tag === 'img') return renderImage(node);
  const content = (node.children ?? []).map(renderInline).join('');
  if (node.tag === 'a') {
    const leadingSpace = /^\s/.test(content) ? ' ' : '';
    const trailingSpace = /\s$/.test(content) ? ' ' : '';
    const label = normalizeInline(content);
    const href = node.attrs.href?.trim();
    if (!label || !href || /\{\{.*\}\}/.test(href) || /^https?:\/\/[^./\s]+\s+-\s+/i.test(href))
      return `${leadingSpace}${label}${trailingSpace}`;
    return `${leadingSpace}[${escapeLinkText(label)}](${markdownDestination(href)})${trailingSpace}`;
  }
  return content;
}

function consolidateAdjacentLinks(markdown) {
  let result = markdown;
  const adjacent = /\[([^\]]+)\]\((<[^>]+>|[^)]+)\)(\s*)\[([^\]]+)\]\(\2\)/g;
  while (adjacent.test(result)) {
    result = result.replace(adjacent, (_match, first, destination, spacing, second) => {
      const separator = spacing || (first.length === 1 && /^\p{Ll}/u.test(second) ? '' : ' ');
      return `[${first}${separator}${second}](${destination})`;
    });
  }
  return result;
}

function renderInlineClean(node) {
  return consolidateAdjacentLinks(normalizeInline(renderInline(node))).replace(
    /\s+([,.;:!?])/g,
    '$1',
  );
}

function renderHeadingInline(node) {
  const anchors = elements(node, (candidate) => candidate.tag === 'a' && candidate.attrs.href);
  const destinations = new Set(anchors.map((anchor) => cleanText(anchor.attrs.href).trim()));
  if (destinations.size !== 1) return renderInlineClean(node);

  const outsideAnchorText = [];
  walk(node, (candidate) => {
    if (candidate.type !== 'text' || !normalizeInline(candidate.value)) return;
    if (ancestor(candidate.parent, (parent) => parent.tag === 'a', node)) return;
    outsideAnchorText.push(candidate);
  });
  const outsideTextIsUnderlined = outsideAnchorText.every((textNode) =>
    ancestor(
      textNode.parent,
      (parent) => /underline/i.test(parseStyle(parent)['text-decoration'] ?? ''),
      node,
    ),
  );
  const rendered = renderInlineClean(node);
  const linkBreaksWord = /\]\((?:<[^>]+>|[^)]+)\)[\p{L}\p{N}]/u.test(rendered);
  if (
    anchors.length < 2 &&
    !linkBreaksWord &&
    (!outsideAnchorText.length || !outsideTextIsUnderlined)
  ) {
    return rendered;
  }

  const label = escapeLinkText(normalizeInline(textContent(node)));
  return `[${label}](${markdownDestination([...destinations][0])})`;
}

function isRejectedImage(node) {
  const source = node.attrs?.src?.trim() ?? '';
  if (!source || source === rejectedAboutImage) return true;
  if (/rnb_space\.gif(?:\?|$)/i.test(source)) return true;
  if (/\/images\/rnb\/original\//i.test(source)) return true;
  if (/creative-assets\.mailinblue\.com\/rnb-assets/i.test(source)) return true;
  if (/\/new_images\/rnb\/(?:logo|theme)/i.test(source)) return true;
  const width = Number.parseInt(node.attrs.width ?? '', 10);
  const height = Number.parseInt(node.attrs.height ?? '', 10);
  return (Number.isFinite(width) && width <= 1) || (Number.isFinite(height) && height <= 1);
}

function renderImage(node) {
  if (isRejectedImage(node)) return '';
  const source = cleanText(node.attrs.src).trim();
  const alt = escapeLinkText(normalizeInline(node.attrs.alt ?? ''));
  const image = `![${alt}](${markdownDestination(source)})`;
  const link = node.parent?.tag === 'a' ? node.parent.attrs.href?.trim() : '';
  return link ? `[${image}](${markdownDestination(link)})` : image;
}

function isIssueBanner(text, issue) {
  const normalized = normalizeInline(text);
  if (/THE ML ENGINEER\s+Issue\s*#\d+/i.test(normalized)) return true;
  if (/^Issue\s*#\d+(?:\s+THE ML ENGINEER)?\s*🤖$/i.test(normalized)) return true;
  return (
    new RegExp(`Issue\\s*#${issue}(?:\\s|🤖|$)`, 'i').test(normalized) && normalized.length < 80
  );
}

function isLegalFooter(text) {
  const normalized = normalizeInline(text);
  return (
    /This email was sent to/i.test(normalized) ||
    /You received this email because/i.test(normalized) ||
    /You are receiving this email because/i.test(normalized) ||
    /^©\s*\d{4}\b/i.test(normalized) ||
    /Unsubscribe here/i.test(normalized) ||
    /Update (?:your )?preferences/i.test(normalized)
  );
}

const semanticTags = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'pre']);
const inlineTags = new Set([
  'a',
  'b',
  'br',
  'code',
  'em',
  'i',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'u',
]);

function flowBlocks(container) {
  const blocks = [];

  const visit = (node) => {
    if (node.type !== 'element' && node.type !== 'root') return;
    if (node.tag === 'img') {
      blocks.push(node);
      return;
    }
    if (semanticTags.has(node.tag)) {
      blocks.push(node);
      return;
    }

    let inlineChildren = [];
    const flushInline = () => {
      if (!inlineChildren.length) return;
      const block = { ...node, children: inlineChildren };
      for (const child of inlineChildren) child.parent = block;
      if (normalizeInline(textContent(block))) blocks.push(block);
      inlineChildren = [];
    };

    for (const child of node.children ?? []) {
      if (child.type === 'text' || (child.type === 'element' && inlineTags.has(child.tag))) {
        inlineChildren.push(child);
      } else {
        flushInline();
        visit(child);
      }
    }
    flushInline();
  };

  visit(container);
  if (!blocks.length && normalizeInline(textContent(container))) blocks.push(container);
  return blocks;
}

function ancestor(node, predicate, boundary) {
  for (let current = node; current && current !== boundary; current = current.parent) {
    if (predicate(current)) return current;
  }
  return undefined;
}

function listItemContent(item) {
  const clone = {
    ...item,
    children: item.children.filter((child) => child.tag !== 'ul' && child.tag !== 'ol'),
  };
  let content = renderInlineClean(clone);
  if (content.startsWith('+ ')) content = `\\${content}`;
  return content;
}

function renderList(list, depth = 0) {
  const ordered = list.tag === 'ol';
  const items = list.children.filter((child) => child.type === 'element' && child.tag === 'li');
  const lines = [];
  items.forEach((item, index) => {
    const marker = ordered ? `${index + 1}.` : '-';
    const content = listItemContent(item);
    if (content) lines.push(`${'  '.repeat(depth)}${marker} ${content}`);
    for (const nested of item.children.filter(
      (child) => child.tag === 'ul' || child.tag === 'ol',
    )) {
      lines.push(renderList(nested, depth + 1));
    }
  });
  return lines.filter(Boolean).join('\n');
}

function codeText(node) {
  const render = (candidate) => {
    if (candidate.type === 'text') return cleanText(candidate.value);
    if (candidate.tag === 'br') return '\n';
    return (candidate.children ?? []).map(render).join('');
  };
  return render(node)
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .replace(/^\n+|\n+$/g, '');
}

function headingLevel(block, blocks, index) {
  if (/^h[1-6]$/.test(block.tag)) return 2;
  const text = normalizeInline(textContent(block));
  if (maxFontSize(block) >= 36 && text.length <= 180) return 2;
  if (
    maxFontSize(block) >= 28 &&
    text.length <= 180 &&
    !/^https?:/i.test(text) &&
    textIsEntirelyLarge(block)
  )
    return 2;
  const next = blocks.slice(index + 1).find((candidate) => normalizeInline(textContent(candidate)));
  if (
    text.length <= 120 &&
    /\bOpportunities$/.test(text) &&
    (next?.tag === 'ul' || next?.tag === 'ol')
  )
    return 3;
  if (
    text.length <= 120 &&
    (next?.tag === 'ul' || next?.tag === 'ol') &&
    elements(block, (candidate) => candidate.tag === 'strong' || candidate.tag === 'b').some(
      (candidate) => normalizeInline(textContent(candidate)) === text,
    )
  )
    return 3;
  if (text.length <= 120 && text.endsWith(':') && (next?.tag === 'ul' || next?.tag === 'ol'))
    return 3;
  return 0;
}

function renderContainer(container, issue) {
  const blocks = flowBlocks(container);
  const output = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.tag === 'img') {
      const image = renderImage(block);
      if (image) output.push(image);
      continue;
    }

    const text = normalizeInline(textContent(block));
    if (!text) continue;
    if (isIssueBanner(text, issue) || isLegalFooter(text)) continue;

    if (hasBackgroundCodeStyle(block) || block.tag === 'pre') {
      const codeBlocks = [block];
      while (
        blocks[index + 1] &&
        (hasBackgroundCodeStyle(blocks[index + 1]) || blocks[index + 1].tag === 'pre')
      ) {
        codeBlocks.push(blocks[(index += 1)]);
      }
      const previous = output.at(-1) ?? '';
      const language = /say you have your agent:$/.test(previous) ? 'python' : 'text';
      const code = codeBlocks.map(codeText).filter(Boolean).join('\n');
      if (code) output.push(`\`\`\`${language}\n${code}\n\`\`\``);
      continue;
    }

    if (block.tag === 'ul' || block.tag === 'ol') {
      const list = renderList(block);
      if (list) output.push(list);
      continue;
    }

    const level = headingLevel(block, blocks, index);
    const markdown = level ? renderHeadingInline(block) : renderInlineClean(block);
    if (!markdown) continue;
    output.push(level ? `${'#'.repeat(level)} ${markdown}` : markdown);
  }

  return output;
}

function modernEvents(root) {
  const events = [];
  walk(root, (node) => {
    if (node.type !== 'element') return;
    if (node.tag === 'td' && hasClass(node, 'nl2go-default-textstyle')) {
      events.push(node);
      return false;
    }
    if (node.tag === 'img') {
      events.push(node);
      return false;
    }
  });
  return events;
}

function convertIssue(issue, date) {
  const sourcePath = join(sourceDir, `${issue}.html`);
  const root = parseHtml(readFileSync(sourcePath, 'utf8'));
  const modernRoot =
    firstElement(root, (node) => node.tag === 'table' && hasClass(node, 'nl2go-body-table')) ??
    (firstElement(root, (node) => node.tag === 'td' && hasClass(node, 'nl2go-default-textstyle'))
      ? root
      : undefined);
  const oldRoot =
    firstElement(root, (node) => node.tag === 'table' && hasClass(node, 'main-template')) ??
    (firstElement(root, (node) => node.tag === 'table' && hasClass(node, 'rnb-container'))
      ? root
      : undefined);
  if (!modernRoot && !oldRoot) throw new Error('newsletter root table not found');

  const sections = [];
  if (modernRoot) {
    for (const event of modernEvents(modernRoot)) {
      if (event.tag === 'img') {
        const image = renderImage(event);
        if (image) sections.push(image);
        continue;
      }
      const text = normalizeInline(textContent(event));
      if (isLegalFooter(text)) break;
      if (isIssueBanner(text, issue)) continue;
      sections.push(...renderContainer(event, issue));
    }
  } else {
    const containers = elements(
      oldRoot,
      (node) => node.tag === 'table' && hasClass(node, 'rnb-container'),
    );
    for (const container of containers) {
      const text = normalizeInline(textContent(container));
      if (isLegalFooter(text)) break;
      if (isIssueBanner(text, issue)) continue;
      sections.push(...renderContainer(container, issue));
    }
  }

  const body = sections
    .filter(Boolean)
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return `---\nissue: ${issue}\ndate: ${date}\n---\n\n${body}\n`;
}

function buildDateMap(issues) {
  const log = execFileSync(
    'git',
    [
      'log',
      'legacy-jekyll',
      '--diff-filter=A',
      '--format=@@%ad',
      '--date=short',
      '--name-only',
      '--',
      'mle',
    ],
    { cwd: repoRoot, encoding: 'utf8' },
  );
  const dates = new Map();
  let currentDate = '';
  for (const line of log.split('\n')) {
    if (line.startsWith('@@')) {
      currentDate = line.slice(2);
      continue;
    }
    const match = line.match(/^mle\/(\d+)\.html$/);
    if (match && !dates.has(Number(match[1]))) dates.set(Number(match[1]), currentDate);
  }

  for (const issue of issues) {
    if (dates.has(issue)) continue;
    const fallback = execFileSync(
      'git',
      ['log', '--follow', '--format=%ad', '--date=short', '--', `public/mle/${issue}.html`],
      { cwd: repoRoot, encoding: 'utf8' },
    )
      .trim()
      .split('\n')
      .filter(Boolean)
      .at(-1);
    if (!fallback) throw new Error(`date not found for issue ${issue}`);
    dates.set(issue, fallback);
  }
  return dates;
}

function archiveIssues() {
  return readdirSync(sourceDir)
    .map((name) => name.match(/^(\d+)\.html$/))
    .filter(Boolean)
    .map((match) => Number(match[1]))
    .filter((issue) => issue >= 1 && issue <= 396)
    .sort((left, right) => left - right);
}

function markdownStats(markdown, date) {
  let inFence = false;
  let headings = 0;
  for (const line of markdown.split('\n')) {
    if (line.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && /^#{2,3}\s/.test(line)) headings += 1;
  }
  const links = [...markdown.matchAll(/(?<!!)\[[^\]]*\]\((?:<[^>]*>|[^\s)]+)\)/g)].length;
  const images = [...markdown.matchAll(/!\[[^\]]*\]\((?:<[^>]*>|[^\s)]+)\)/g)].length;
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  const plainText = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/[#*`_\\>-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const reasons = [];
  if (headings === 0) reasons.push('no headings');
  if (plainText.length < 500) reasons.push(`only ${plainText.length} text characters`);
  if (links === 0) reasons.push('zero links');
  return {
    headings,
    links,
    images,
    outputBytes: Buffer.byteLength(markdown),
    textCharacters: plainText.length,
    date,
    triage: reasons.length > 0,
    reason: reasons.join('; ') || null,
  };
}

function resetDirectory(path) {
  rmSync(path, { recursive: true, force: true });
  mkdirSync(path, { recursive: true });
}

function firstDifference(expected, actual) {
  const limit = Math.min(expected.length, actual.length);
  let offset = 0;
  while (offset < limit && expected[offset] === actual[offset]) offset += 1;
  const before = actual.slice(0, offset).split('\n').length;
  return {
    offset,
    line: before,
    expected: JSON.stringify(expected.slice(offset, offset + 160)),
    actual: JSON.stringify(actual.slice(offset, offset + 160)),
  };
}

// Enrichment fields (summary/tags) are authored after conversion — via
// scripts/newsletter/apply-frontmatter.mjs or by hand — and must survive
// regeneration: lift them from each existing output file and re-insert them
// into the freshly converted frontmatter verbatim.
function readEnrichment() {
  const enrichment = new Map();
  for (const file of readdirSync(outputDir)) {
    const name = /^(\d+)\.md$/.exec(file);
    if (!name) continue;
    const frontmatter = /^---\n([\s\S]*?)\n---\n/.exec(readFileSync(join(outputDir, file), 'utf8'));
    if (!frontmatter) continue;
    const lines = frontmatter[1].split('\n').filter((line) => /^(summary|tags):/.test(line));
    if (lines.length) enrichment.set(Number(name[1]), lines);
  }
  return enrichment;
}

function applyEnrichment(markdown, lines) {
  if (!lines?.length) return markdown;
  return markdown.replace(
    /^---\n(issue: [^\n]*\ndate: [^\n]*)\n---\n/,
    (_all, head) => `---\n${head}\n${lines.join('\n')}\n---\n`,
  );
}

function checkGolden(issues, dates) {
  const enrichment = readEnrichment();
  resetDirectory(checkDir);
  let passed = true;
  for (const issue of [...goldenIssues].sort((left, right) => left - right)) {
    if (!issues.includes(issue)) throw new Error(`golden source ${issue}.html not found`);
    const actual = applyEnrichment(convertIssue(issue, dates.get(issue)), enrichment.get(issue));
    const expected = readFileSync(join(outputDir, `${issue}.md`), 'utf8');
    writeFileSync(join(checkDir, `${issue}.md`), actual);
    if (actual !== expected) {
      passed = false;
      const difference = firstDifference(expected, actual);
      console.error(`Issue ${issue} differs at byte ${difference.offset}, line ${difference.line}`);
      console.error(`  expected ${difference.expected}`);
      console.error(`  actual   ${difference.actual}`);
    } else {
      const digest = createHash('sha256').update(actual).digest('hex');
      console.log(
        `Issue ${issue}: byte-identical (${Buffer.byteLength(actual)} bytes, sha256 ${digest})`,
      );
    }
  }
  return passed;
}

function cleanGeneratedTargets(issues) {
  mkdirSync(outputDir, { recursive: true });
  for (const issue of issues) {
    if (!goldenIssues.has(issue)) rmSync(join(outputDir, `${issue}.md`), { force: true });
  }
}

function batchConvert(issues, dates) {
  const enrichment = readEnrichment();
  cleanGeneratedTargets(issues);
  resetDirectory(triageDir);
  const issueStats = {};

  for (const issue of issues) {
    try {
      const markdown = convertIssue(issue, dates.get(issue));
      const stats = markdownStats(markdown, dates.get(issue));
      issueStats[issue] = stats;
      if (goldenIssues.has(issue)) continue;
      const destination = stats.triage
        ? join(triageDir, `${issue}.md`)
        : join(outputDir, `${issue}.md`);
      writeFileSync(destination, applyEnrichment(markdown, enrichment.get(issue)));
    } catch (error) {
      issueStats[issue] = {
        headings: 0,
        links: 0,
        images: 0,
        outputBytes: 0,
        textCharacters: 0,
        date: dates.get(issue) ?? null,
        triage: true,
        reason: `parse failure: ${error.message}`,
      };
    }
  }

  const triage = Object.entries(issueStats)
    .filter(([, stats]) => stats.triage)
    .map(([issue, stats]) => ({ issue: Number(issue), reason: stats.reason }));
  const summary = {
    sourceIssues: issues.length,
    convertedIssues: issues.length - triage.length,
    writtenIssues: issues.length - triage.length - goldenIssues.size,
    availableIssues: issues.length - triage.length,
    goldenIssuesSkipped: [...goldenIssues].sort((left, right) => left - right),
    triageIssues: triage.length,
    totalHeadings: Object.values(issueStats).reduce((sum, stats) => sum + stats.headings, 0),
    totalLinks: Object.values(issueStats).reduce((sum, stats) => sum + stats.links, 0),
    totalImages: Object.values(issueStats).reduce((sum, stats) => sum + stats.images, 0),
  };
  writeFileSync(statsPath, `${JSON.stringify({ summary, triage, issues: issueStats }, null, 2)}\n`);
  console.log(
    `Converted ${summary.convertedIssues}/${summary.sourceIssues} issues; wrote ${summary.writtenIssues} and preserved ${goldenIssues.size} golden fixtures; ${summary.triageIssues} sent to triage.`,
  );
  return triage.length === 0;
}

function main() {
  const unknown = process.argv.slice(2).filter((argument) => argument !== '--check');
  if (unknown.length) throw new Error(`unknown argument(s): ${unknown.join(', ')}`);
  const issues = archiveIssues();
  if (issues.length !== 396 || issues[0] !== 1 || issues.at(-1) !== 396) {
    throw new Error(`expected issues 1..396, found ${issues.length} files`);
  }
  mkdirSync(tmpDir, { recursive: true });
  const dates = buildDateMap(issues);
  const checkOnly = process.argv.includes('--check');
  if (!checkGolden(issues, dates)) process.exitCode = 1;
  else if (!checkOnly) batchConvert(issues, dates);
}

main();
