/* ---------- projects carousel + expanded toggle ---------- */
(function() {
  const section = document.getElementById('projects');
  if (!section) return;

  const wrap    = section.querySelector('.projects-wrap');
  const track   = section.querySelector('.projects');
  const prev    = section.querySelector('.proj-prev');
  const next    = section.querySelector('.proj-next');
  const toggle  = section.querySelector('.proj-toggle');
  const dotsBox = section.querySelector('.proj-dots');
  if (!wrap || !track || !prev || !next || !toggle || !dotsBox) return;

  const cards = Array.from(track.querySelectorAll('.project'));
  if (!cards.length) return;

  // Build pagination dots
  const dots = cards.map((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.className = 'proj-dot';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `Go to project ${i + 1}`);
    d.dataset.index = String(i);
    d.addEventListener('click', () => scrollToIndex(i));
    dotsBox.appendChild(d);
    return d;
  });

  let activeIndex = 0;

  function getCenterIndex() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    cards.forEach((c, i) => {
      const mid = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(center - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }

  function scrollToIndex(i, smooth = true) {
    if (i < 0) i = 0;
    if (i >= cards.length) i = cards.length - 1;
    const card = cards[i];
    const target = card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2;
    track.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'auto' });
  }

  function updateActive() {
    if (section.classList.contains('is-expanded')) return;
    activeIndex = getCenterIndex();
    cards.forEach((c, i) => c.classList.toggle('is-active', i === activeIndex));
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === activeIndex);
      d.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
    });
    prev.classList.toggle('is-disabled', activeIndex <= 0);
    next.classList.toggle('is-disabled', activeIndex >= cards.length - 1);
  }

  prev.addEventListener('click', () => scrollToIndex(activeIndex - 1));
  next.addEventListener('click', () => scrollToIndex(activeIndex + 1));

  let scrollTimer = 0;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateActive, 60);
  });

  // Click on a non-active card → center it
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (section.classList.contains('is-expanded')) return;
      if (i === activeIndex) return;
      if (e.target.closest('a, button')) return;
      e.preventDefault();
      scrollToIndex(i);
    });
  });

  // Toggle expanded mode
  toggle.addEventListener('click', () => {
    const expanded = section.classList.toggle('is-expanded');
    const more = toggle.querySelector('.lbl-more');
    const less = toggle.querySelector('.lbl-less');
    if (more) more.hidden = expanded;
    if (less) less.hidden = !expanded;
    if (!expanded) {
      requestAnimationFrame(() => {
        scrollToIndex(activeIndex, false);
        updateActive();
      });
    }
  });

  // Init
  requestAnimationFrame(() => {
    scrollToIndex(0, false);
    updateActive();
  });

  window.addEventListener('resize', () => {
    if (section.classList.contains('is-expanded')) return;
    scrollToIndex(activeIndex, false);
  });
})();
