/* ---------- mouse-tracked hero gradient ---------- */
(function() {
  const hero = document.getElementById('hero');
  const bg   = document.getElementById('heroBg');
  if (!hero || !bg) return;

  let targetX = 50, targetY = 40, curX = 50, curY = 40, raf = 0;

  function tick() {
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    bg.style.setProperty('--mx', curX + '%');
    bg.style.setProperty('--my', curY + '%');
    if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  }

  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    targetX = ((e.clientX - r.left) / r.width)  * 100;
    targetY = ((e.clientY - r.top)  / r.height) * 100;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  hero.addEventListener('mouseleave', () => {
    targetX = 50; targetY = 40;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  // Scroll-cue → next section
  const scrollCue = hero.querySelector('.scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const next = hero.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Dérive subtile quand la souris est inactive
  let t = 0;
  setInterval(() => {
    if (raf) return;
    t += 0.6;
    targetX = 50 + Math.sin(t * 0.05) * 18;
    targetY = 40 + Math.cos(t * 0.04) * 12;
    if (!raf) raf = requestAnimationFrame(tick);
  }, 80);
})();
