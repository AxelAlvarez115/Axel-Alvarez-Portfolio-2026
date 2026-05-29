/* ---------- glitch automatique ---------- */
(function () {
  // Pas de glitch en boucle si l'utilisateur préfère un mouvement réduit.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const DURATION = 600;  // durée de l'animation (ms)
  const COOLDOWN  = 2000; // délai minimum entre deux triggers sur le même élément
  const TOLERANCE = 40;   // tolérance en px autour du haut de la section

  const lastFired = new Map();

  function triggerGlitch(el) {
    if (el.classList.contains('is-glitching')) return;
    const now = Date.now();
    if (now - (lastFired.get(el) || 0) < COOLDOWN) return;
    lastFired.set(el, now);
    el.classList.add('is-glitching');
    setTimeout(() => el.classList.remove('is-glitching'), DURATION);
  }

  // Hero : toutes les ~5 secondes
  const heroTitle = document.querySelector('.hero-name.glitch');
  if (heroTitle) {
    setTimeout(() => {
      triggerGlitch(heroTitle);
      setInterval(() => triggerGlitch(heroTitle), 5000);
    }, 1500);
  }

  // Titres de section : quand le haut de la section rejoint le haut de l'écran
  const header = document.querySelector('.site-header');
  const sections = Array.from(
    document.querySelectorAll('#about, #projects, #education, #contact')
  ).map(section => ({
    section,
    h2: section.querySelector('.section-head h2.glitch'),
  })).filter(s => s.h2);

  if (sections.length) {
    let ticking = false;

    function checkSections() {
      const headerH = header ? header.offsetHeight : 60;
      sections.forEach(({ section, h2 }) => {
        const top = section.getBoundingClientRect().top;
        if (top >= -TOLERANCE && top <= headerH + TOLERANCE) {
          triggerGlitch(h2);
        }
      });
    }

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { checkSections(); ticking = false; });
    }, { passive: true });
  }
})();
