/* ---------- phrases tapées — dictionnaire bilingue ---------- */
window.__TYPED_PHRASES = {
  en: [
    "full-stack developer building fast, weird software.",
    "shipping web apps, devtools, and side projects.",
    "obsessed with low-latency UIs & clean APIs.",
    "available for new projects — jun 2026."
  ],
  fr: [
    "développeur full-stack qui construit des logiciels rapides et un peu bizarres.",
    "livre des apps web, des outils internes et des projets perso.",
    "obsédé par les UI à faible latence et les APIs propres.",
    "disponible pour de nouveaux projets — juin 2026."
  ]
};

/* ---------- effet de frappe ---------- */
(function() {
  const el = document.getElementById('typed');
  if (!el) return;

  const getPhrases = () =>
    window.__TYPED_PHRASES[(document.documentElement.lang || 'en').toLowerCase()]
    || window.__TYPED_PHRASES.en;

  let pi = 0, ci = 0, deleting = false;

  function step() {
    const phrases = getPhrases();
    const cur     = phrases[pi % phrases.length];

    if (!deleting) {
      ci++;
      el.textContent = cur.slice(0, ci);
      if (ci === cur.length) { deleting = true; setTimeout(step, 2400); return; }
    } else {
      ci--;
      el.textContent = cur.slice(0, ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }

    setTimeout(step, deleting ? 25 : 45 + Math.random() * 40);
  }

  setTimeout(step, 1200);

  window.__resetTyped = () => {
    pi = 0; ci = 0; deleting = false;
    el.textContent = '';
  };
})();
