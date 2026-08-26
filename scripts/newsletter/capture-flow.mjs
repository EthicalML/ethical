// The beats for a newsletter article walk, handed to the site-capture engine.
//
// Deliberately site-agnostic. The skill's own guidance is to author beats from measured
// offsets, which is right when you are walking your own site and clicking through it; here
// the subject is a stranger's article every week and the only thing that is reliably true of
// all of them is that they are one column of text you scroll down. So: hold on the top so the
// title is readable, scroll into the body, hold, come back. No clicks, nothing to map.
//
// The scroll depth is measured rather than fixed, because a 900px blog post and a 12,000px
// paper page cannot share one number. Two viewports down is far enough to show the piece has
// substance and short enough to keep the loop under the size cap.

export default async function flow({ goto, mark, page, pause, scrollTo }) {
  // The engine loads the site root before handing over, because it is built to walk a site
  // from its landing page. Here the subject is one article deep inside somebody else's site,
  // so the first beat is to go there. `goto` resolves against --url, and an absolute URL
  // resolves to itself, so the full article URL is what gets passed.
  //
  // That root load is on film and has to come off. `mark('article')` fires the moment the
  // article is up, and the runner trims everything before it, which is why this mark exists
  // before any dwell rather than after one.
  await goto(process.env.CAPTURE_TARGET_URL);
  mark('article');

  await pause(1600);
  mark('top');

  const depth = await page.evaluate(() => {
    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight,
    );
    return Math.round(Math.min(height - window.innerHeight, window.innerHeight * 2));
  });

  if (depth > 200) {
    await scrollTo(depth);
    await pause(1500);
    mark('body');
    await scrollTo(0);
    await pause(700);
    mark('back');
  } else {
    // A page that does not scroll has nothing to walk, so just hold on it.
    await pause(2000);
  }
}
