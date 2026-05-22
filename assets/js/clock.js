/* ---------- horloge temps réel ---------- */
(function() {
  const el = document.getElementById('clock');
  if (!el) return;

  function tick() {
    const d   = new Date();
    const pad = n => String(n).padStart(2, '0');
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  tick();
  setInterval(tick, 1000);
})();
