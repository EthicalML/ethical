#!/usr/bin/env node

/**
 * Queue an issue's article posts to Buffer.
 *
 *   node scripts/newsletter/buffer-post.mjs --channels
 *   node scripts/newsletter/buffer-post.mjs --issue <N> --post <n> [--draft] [--dry-run]
 *
 * Reads `BUFFER_API_SECRET` from the environment. The owner keeps it in a shell-export
 * secrets file, so the usual invocation is `source ~/.all_secret_keys && node ...`.
 *
 * Routing is by channel, because the channels do not take the same post. LinkedIn gets the
 * full section from `post.txt`; X caps at 280 characters and Bluesky at 300, so both get the
 * short cut from `post-short.txt`. A post whose text will not fit its channel is refused here
 * rather than truncated, since a sentence cut mid-word is worse than a failed run.
 *
 * Media has to be somewhere Buffer can fetch it. Its API takes a URL, never an upload, and
 * fetches at publish time rather than at creation, which can be days later, so a local file
 * and a signed URL are both useless. The asset is pushed to an orphan branch of this
 * repository and served through jsDelivr: raw.githubusercontent.com answers
 * `application/octet-stream` with `nosniff`, which is not a video as far as a consumer is
 * concerned, while jsDelivr serves the same bytes as `video/mp4`. Nothing goes on master and
 * nothing is deployed to the site.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const endpoint = 'https://api.buffer.com';
const repo = 'EthicalML/ethical';
const assetBranch = 'newsletter-assets';

// Per-channel text limits. LinkedIn's 3000 is generous enough that a section never approaches
// it; the other two are the reason `post-short.txt` exists at all.
const limits = { linkedin: 3000, twitter: 280, bluesky: 300 };
const shortServices = new Set(['twitter', 'bluesky']);

const errorFragments = `
    ... on InvalidInputError { message }
    ... on UnauthorizedError { message }
    ... on NotFoundError { message }
    ... on LimitReachedError { message }
    ... on UnexpectedError { message }
    ... on RestProxyError { message }`;

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    if (!argv[index].startsWith('--')) continue;
    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) options[argv[index].slice(2)] = true;
    else {
      options[argv[index].slice(2)] = next;
      index += 1;
    }
  }
  return options;
}

async function graphql(query, variables) {
  const token = process.env.BUFFER_API_SECRET;
  if (!token) throw new Error('BUFFER_API_SECRET is not set');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (payload.errors) throw new Error(payload.errors.map((one) => one.message).join('; '));
  return payload.data;
}

async function organisation() {
  const data = await graphql('{ account { organizations { id name } } }', {});
  const first = data.account.organizations[0];
  if (!first) throw new Error('this account has no organizations');
  return first.id;
}

async function channels() {
  const data = await graphql(
    `
      query Channels($input: ChannelsInput!) {
        channels(input: $input) {
          id
          service
          displayName
          isDisconnected
          isLocked
        }
      }
    `,
    { input: { organizationId: await organisation() } },
  );
  return data.channels;
}

/**
 * Push one file to the asset branch and return the URL Buffer should fetch.
 *
 * `gh` rather than git: this runs from a worktree, and creating commits on an unrelated
 * branch through the local repository would mean touching a checkout that has nothing to do
 * with the branch being written.
 */
function publishAsset(file, destination) {
  const token = execFileSync('gh', ['auth', 'token', '--user', 'axsaucedo'], {
    encoding: 'utf8',
  }).trim();
  const env = { ...process.env, GH_TOKEN: token };
  const api = (args, options = {}) =>
    execFileSync('gh', ['api', ...args], { encoding: 'utf8', env, ...options });

  try {
    api([`repos/${repo}/branches/${assetBranch}`], { stdio: 'pipe' });
  } catch {
    const sha = JSON.parse(api([`repos/${repo}/git/refs/heads/master`])).object.sha;
    api([
      '-X',
      'POST',
      `repos/${repo}/git/refs`,
      '-f',
      `ref=refs/heads/${assetBranch}`,
      '-f',
      `sha=${sha}`,
    ]);
  }

  let sha = '';
  try {
    sha = JSON.parse(
      api([`repos/${repo}/contents/${destination}?ref=${assetBranch}`], { stdio: 'pipe' }),
    ).sha;
  } catch {
    // Not there yet, which is the normal case for a new issue.
  }

  const payload = path.join(root, 'tmp', 'buffer-upload.json');
  writeFileSync(
    payload,
    JSON.stringify({
      message: `chore(assets): ${destination}`,
      content: readFileSync(file).toString('base64'),
      branch: assetBranch,
      ...(sha ? { sha } : {}),
    }),
  );
  api(['-X', 'PUT', `repos/${repo}/contents/${destination}`, '--input', payload]);
  return `https://cdn.jsdelivr.net/gh/${repo}@${assetBranch}/${destination}`;
}

const videoExtensions = new Set(['.mp4', '.mov', '.webm']);

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.channels) {
    for (const channel of await channels()) {
      const state = channel.isDisconnected ? ' DISCONNECTED' : channel.isLocked ? ' LOCKED' : '';
      console.log(`${channel.id}  ${channel.service.padEnd(10)} ${channel.displayName}${state}`);
    }
    return;
  }

  const issue = Number.parseInt(options.issue, 10);
  const position = Number.parseInt(options.post, 10);
  if (!issue || !position) throw new Error('pass --issue <N> and --post <n>, or --channels');

  const postsDir = path.join(root, 'tmp', `issue-${issue}`, 'posts');
  const slugDir = readdirSync(postsDir).find((name) => name.startsWith(`${position}-`));
  if (!slugDir) throw new Error(`no post folder ${position}- in ${postsDir}`);
  const dir = path.join(postsDir, slugDir);

  // Best format first, not whatever readdir hands back: a folder holding both a walk and its
  // GIF fallback would otherwise post the fallback, purely because "gif" sorts before "mp4".
  const mediaOrder = [
    'image.mp4',
    'image.gif',
    'image.png',
    'image.jpg',
    'image.jpeg',
    'image.webp',
  ];
  const present = new Set(readdirSync(dir));
  const media = mediaOrder.find((name) => present.has(name));
  const wanted = options.channel ? String(options.channel).split(',') : ['linkedin'];
  const available = await channels();

  let assetUrl = '';
  if (media && !options['dry-run']) {
    assetUrl = publishAsset(
      path.join(dir, media),
      `issue-${issue}/${slugDir}${path.extname(media)}`,
    );
    console.log(`asset: ${assetUrl}`);
  }

  for (const service of wanted) {
    const channel = available.find((one) => one.service === service);
    if (!channel) {
      console.log(`${service}: no such channel on this account`);
      continue;
    }
    const file = shortServices.has(service) ? 'post-short.txt' : 'post.txt';
    const textPath = path.join(dir, file);
    if (!existsSync(textPath)) {
      console.log(`${service}: ${file} is missing; run fetch-images --apply first`);
      continue;
    }
    const text = readFileSync(textPath, 'utf8').trim();
    const limit = limits[service] ?? 3000;
    if (text.length > limit) {
      console.log(`${service}: REFUSED, ${text.length} chars over the ${limit} limit (${file})`);
      continue;
    }

    const assets =
      media && assetUrl
        ? [
            videoExtensions.has(path.extname(media))
              ? { video: { url: assetUrl } }
              : { image: { url: assetUrl } },
          ]
        : [];

    if (options['dry-run']) {
      console.log(
        `${service}: would post ${text.length} chars from ${file}${media ? ` with ${media}` : ''}`,
      );
      continue;
    }

    const data = await graphql(
      `mutation Create($input: CreatePostInput!) {
        createPost(input: $input) {
          __typename
          ... on PostActionSuccess { post { id status dueAt channelService } }${errorFragments}
        }
      }`,
      {
        input: {
          channelId: channel.id,
          text,
          schedulingType: 'automatic',
          mode: 'addToQueue',
          ...(options.draft ? { saveToDraft: true } : {}),
          ...(assets.length ? { assets } : {}),
        },
      },
    );
    const result = data.createPost;
    if (result.__typename !== 'PostActionSuccess') {
      console.log(`${service}: ${result.__typename} - ${result.message}`);
      continue;
    }
    console.log(`${service}: ${result.post.status} ${result.post.dueAt ?? ''} ${result.post.id}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
