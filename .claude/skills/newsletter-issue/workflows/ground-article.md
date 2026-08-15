# Ground one article

Executed by a subagent, one instance per URL. Input from the spawning prompt: the issue number `<N>` and one article URL. Output: the notes file `tmp/issue-<N>/<slug>.md`, where `<slug>` is the last meaningful path segment of the URL, and a return message of the tier reached plus a one-line gist.

Fetch tiers, in order:

1. `WebFetch` on the URL.
2. arXiv: the `/abs/` page; read the PDF with `Read` only if the abstract is insufficient.
3. PDFs: `Read` with a page range.
4. Blocked or JS-only pages: the `claude-in-chrome` skill against the owner's logged-in browser. This tier requires the Chrome extension to be connected. When it is not, the tier does not exist.
5. YouTube: the description and any transcript. Make no claims about unwatched video content.

Ground only from the page being linked. Reporting _about_ a release is not grounding for a paragraph that links the release itself. A summary may be used to locate a first-party mirror worth fetching, never as the source of specifics.

Start the notes file with a `Tier:` line naming which tier succeeded, then record what was released or found, the concrete numbers, the architecture or method, and the stated limitations. Notes, not prose.

When the source survives every tier unread, still write the file: `Tier: none`, plus what was attempted and how each tier failed. Return the failure — the orchestrator asks the owner for a replacement URL or the pasted page.
