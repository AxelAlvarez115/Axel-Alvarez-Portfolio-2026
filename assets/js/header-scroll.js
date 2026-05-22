/* ---------- rétrécissement du header au défilement ---------- */
(function() {
  const header    = document.querySelector('.site-header');
  if (!header) return;
  const THRESHOLD = 80;

  function update() {
    const y = window.scrollY || window.pageYOffset || 0;
    header.classList.toggle('is-shrunk', y > THRESHOLD);
  }

  let scheduled = false;
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; update(); });
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
