/* ---------- synchronisation du glitch sur le contact headline ---------- */
// Maintient data-text en phase avec le texte affiché après chaque switch i18n.
function syncContactGlitch() {
  const el = document.querySelector('.contact-headline.glitch');
  if (!el) return;
  el.querySelectorAll(':scope > .glitch-ghost').forEach(n => n.remove());
  el.setAttribute('data-text', el.textContent.trim());
}

syncContactGlitch();

(function() {
  // Ré-synchronise après chaque clic sur le toggle de langue
  const btn = document.getElementById('langToggle');
  if (btn) btn.addEventListener('click', () => setTimeout(syncContactGlitch, 50));
})();
