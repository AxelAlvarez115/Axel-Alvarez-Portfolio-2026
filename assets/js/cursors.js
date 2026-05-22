/* ---------- injection des curseurs pipe clignotants sur les titres ---------- */
(function() {
  document.querySelectorAll('.section-head h2.glitch').forEach(el => {
    if (el.querySelector(':scope > .cv-cursor')) return;
    const c = document.createElement('span');
    c.className = 'cv-cursor';
    c.setAttribute('aria-hidden', 'true');
    el.appendChild(c);
  });
})();

/* ---------- custom mouse cursor ---------- */
(function() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(dot, ring);

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let raf = 0;
  const LERP = 0.13;
  const CLICKABLE = 'a, button, [role="button"], input, select, textarea, label, [tabindex]';

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  function tick() {
    rx += (mx - rx) * LERP;
    ry += (my - ry) * LERP;
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    if (Math.abs(mx - rx) > 0.3 || Math.abs(my - ry) > 0.3) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  }

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(CLICKABLE)) document.body.classList.add('cursor-hover');
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(CLICKABLE)) document.body.classList.remove('cursor-hover');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '';
    ring.style.opacity = '';
  });
})();
