(function () {
  const btn = document.getElementById('bookCallBtn');
  if (!btn) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();

    const tel = btn.dataset.p1 + btn.dataset.p2 + btn.dataset.p3;
    const label = btn.querySelector('.book-label');
    const arrow = btn.querySelector('.arrow');
    const original = label.textContent;

    // Reveal the number briefly, then trigger the call
    label.textContent = tel;
    if (arrow) arrow.textContent = '↗';

    setTimeout(() => {
      window.location.href = 'tel:' + tel;
    }, 700);

    setTimeout(() => {
      label.textContent = original;
    }, 2200);
  });
})();
