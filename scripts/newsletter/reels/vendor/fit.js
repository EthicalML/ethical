if (!location.search.includes('render')) {
  const fit = () => {
    const html = document.documentElement;
    // Reel size comes from window.reel when the page has set it; legacy reels are 1080x1350.
    const W = window.reel?.width ?? window.REEL_W ?? 1080;
    const H = window.reel?.height ?? window.REEL_H ?? 1350;
    const s = Math.min(innerWidth / W, innerHeight / H);
    html.style.zoom = s;
    html.style.position = 'relative';
    html.style.marginLeft = `${Math.max(0, (innerWidth / s - W) / 2)}px`;
    html.style.marginTop = `${Math.max(0, (innerHeight / s - H) / 2)}px`;
  };
  fit();
  addEventListener('resize', fit);
  addEventListener('load', fit);
}
