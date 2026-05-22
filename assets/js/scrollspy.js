/* ---------- scrollspy — lien de nav actif selon la section visible ---------- */
(function() {
  const links = [...document.querySelectorAll('#nav a[href^="#"]')];
  const map   = new Map();

  links.forEach(l => {
    const id  = l.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) map.set(sec, l);
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('is-active'));
        const link = map.get(e.target);
        if (link) link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  map.forEach((_, sec) => obs.observe(sec));
})();
