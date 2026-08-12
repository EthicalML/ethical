function textContent(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(textContent).join('');
}

// Newsletter issues are archive records with their own editorial treatment:
// each h2 section (and the leading intro block) is wrapped in a bare section
// without the numbered prose-page chrome. The reveal trigger sits on every
// block element rather than the section wrapper, so long sections appear
// paragraph by paragraph as they scroll in (owner call 2026-08-12).
function sectionizeBare(tree, surfaceClass) {
  const output = [];
  let section;
  const stamp = (node) => {
    if (node.type === 'element') node.properties = { ...node.properties, dataReveal: '' };
    return node;
  };
  const wrap = (node) => ({
    type: 'element',
    tagName: 'section',
    properties: { className: ['article-section', surfaceClass] },
    children: [stamp(node)],
  });

  for (const node of tree.children) {
    if (node.type === 'element' && node.tagName === 'h2') {
      section = wrap(node);
      output.push(section);
    } else if (section) {
      section.children.push(stamp(node));
    } else if (node.type === 'element') {
      section = wrap(node);
      output.push(section);
    } else {
      output.push(node);
    }
  }

  tree.children = output;
}

function wrapTables(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'table') {
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['article-table-scroll'], tabIndex: 0 },
        children: [child],
      };
    }
    wrapTables(child);
    return child;
  });
}

export default function rehypeSectionize() {
  return (tree, file) => {
    if (tree.type !== 'root') return;
    if (String(file?.path ?? '').includes('/content/newsletter/')) {
      sectionizeBare(tree, 'issue-section');
      return;
    }
    if (String(file?.path ?? '').includes('/content/blog/')) {
      sectionizeBare(tree, 'blog-section');
      wrapTables(tree);
      return;
    }
    const output = [];
    let section;
    let number = 0;

    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') {
        number += 1;
        const title = textContent(node).trim();
        node.properties = {
          ...node.properties,
          className: [...(node.properties?.className ?? []), 'prose-section-title'],
        };
        section = {
          type: 'element',
          tagName: 'section',
          properties: {
            className: ['prose-section'],
            dataReveal: '',
            dataSectionNumber: String(number).padStart(2, '0'),
          },
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: { className: ['eyebrow', 'prose-section-eyebrow'] },
              children: [
                {
                  type: 'text',
                  value: `${String(number).padStart(2, '0')} — ${title.toUpperCase()}`,
                },
              ],
            },
            node,
          ],
        };
        output.push(section);
      } else if (section) {
        section.children.push(node);
      } else {
        output.push(node);
      }
    }

    tree.children = output;
  };
}
