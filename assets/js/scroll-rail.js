/* ---------- rail de progression de défilement ---------- */
(function() {
  const rail     = document.getElementById('pageRail');
  if (!rail) return;
  const pctEl    = document.getElementById('railPct');
  const ticks    = [...rail.querySelectorAll('.rail-tick')];
  const sections = ticks.map(t => document.getElementById(t.dataset.target)).filter(Boolean);

  function layoutTicks() {
    const railBox = rail.getBoundingClientRect();
    const trackH  = railBox.height - 28;
    if (trackH <= 0) return;

    const doc        = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;

    ticks.forEach((tick, i) => {
      const sec = sections[i];
      if (!sec) return;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, sec.offsetTop / scrollable)) : 0;
      tick.style.top = (ratio * trackH) + 'px';
    });
  }

  function onScroll() {
    const doc        = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const y          = window.scrollY || window.pageYOffset || 0;
    const p          = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;

    rail.style.setProperty('--progress', p.toFixed(4));
    if (pctEl) pctEl.textContent = Math.round(p * 100) + '%';

    // Section active : la dernière dont le top est avant le centre de l'écran
    const center = y + window.innerHeight * 0.4;
    let active   = 0;
    sections.forEach((sec, i) => { if (sec && sec.offsetTop <= center) active = i; });

    ticks.forEach((t, i) => {
      t.classList.toggle('is-active', i === active);
      t.classList.toggle('is-passed', i < active);
    });
  }

  let scheduled = false;
  function tick() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; onScroll(); });
  }

  layoutTicks();
  onScroll();
  window.addEventListener('scroll', tick,   { passive: true });
  window.addEventListener('resize', () => { layoutTicks(); onScroll(); });
  window.addEventListener('load',   () => { layoutTicks(); onScroll(); });
  setTimeout(() => { layoutTicks(); onScroll(); }, 800);
})();
