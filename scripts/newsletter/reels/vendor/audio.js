// Preview only: sound buttons. Once one starts, its audio file loops and becomes the animation
// clock, so picture and sound stay locked. Pages read it via window.reelTime(fallback).
// Shows one button per audio file found: audio-a.mp3, audio-b.mp3, audio-c.mp3 (variants) and audio.mp3.
window.reelTime = (fallback) => fallback;
if (!location.search.includes('render')) {
  addEventListener('DOMContentLoaded', async () => {
    const names = ['audio-a.mp3', 'audio-b.mp3', 'audio-c.mp3', 'audio.mp3'];
    const found = [];
    for (const n of names) {
      try {
        if ((await fetch(n, { method: 'HEAD', cache: 'no-store' })).ok) found.push(n);
      } catch {
        // A missing file just means no button for it.
      }
    }
    if (!found.length) return;
    let audio = null;
    const bar = document.createElement('div');
    bar.style.cssText =
      'position:fixed;z-index:99999;left:50%;bottom:48px;transform:translateX(-50%);display:flex;gap:16px';
    const style =
      'font:600 36px/1 Inter,system-ui,sans-serif;padding:24px 40px;border:0;border-radius:999px;background:rgba(0,0,0,.78);color:#fff;cursor:pointer;box-shadow:0 10px 40px rgba(0,0,0,.35)';
    for (const n of found) {
      const b = document.createElement('button');
      b.textContent = n === 'audio.mp3' ? 'Play with sound' : `Sound ${n[6].toUpperCase()}`;
      b.style.cssText = style;
      b.onclick = async () => {
        const t = audio ? audio.currentTime : 0;
        if (audio) audio.pause();
        audio = new Audio(n + '?v=' + Date.now());
        audio.loop = true;
        audio.currentTime = t;
        await audio.play();
        window.reelTime = () => audio.currentTime % (window.reel?.duration ?? 10);
        for (const x of bar.children) x.style.outline = x === b ? '4px solid #fff' : 'none';
      };
      bar.appendChild(b);
    }
    document.body.appendChild(bar);
    addEventListener('keydown', (e) => {
      if (e.key === 'm' && audio) audio.muted = !audio.muted;
      if (e.key === 'h') bar.hidden = !bar.hidden;
    });
  });
}
