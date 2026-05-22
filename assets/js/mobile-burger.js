/* ---------- menu burger mobile ---------- */
(function() {
  const btn  = document.getElementById('navBurger');
  const menu = document.getElementById('mobileNav');
  if (!btn || !menu) return;

  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden',  open ? 'false' : 'true');
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('mobile-nav-open', open);
  }

  btn.addEventListener('click', () => {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 861 && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });
})();
