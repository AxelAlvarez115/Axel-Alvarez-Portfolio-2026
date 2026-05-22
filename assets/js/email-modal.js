/* ---------- modal de contact email
 *
 *  Intercepte les clics sur les liens email (anchors Cloudflare protégés ou
 *  marqués `data-open-email-modal`) et ouvre un formulaire modal.
 *  Soumission : ouvre le client mail de l'utilisateur via `mailto:` avec
 *  les champs préremplis (sujet + corps).
 * ---------- */
(function() {
  const modal = document.getElementById('emailModal');
  const form  = document.getElementById('emailForm');
  const panel = modal && modal.querySelector('.email-modal-panel');
  const statusEl = document.getElementById('emailFormStatus');
  if (!modal || !form || !panel) return;

  const RECIPIENT = 'axel.alvarez115a@gmail.com';
  let lastFocus = null;

  function getStatusText(key) {
    const lang = (document.documentElement.lang === 'fr') ? 'fr' : 'en';
    const map = {
      sending:  { en: '// opening your mail client…', fr: '// ouverture du client mail…' },
      required: { en: '// please fill in the required fields', fr: '// merci de remplir les champs requis' },
      invalid:  { en: '// invalid email address',              fr: '// adresse email invalide' }
    };
    return (map[key] && map[key][lang]) || (map[key] && map[key].en) || '';
  }

  function focusableInPanel() {
    return panel.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  function open() {
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('email-modal-open');
    setTimeout(() => {
      const first = form.querySelector('input, textarea');
      if (first) first.focus();
    }, 60);
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('email-modal-open');
    if (statusEl) { statusEl.textContent = ''; statusEl.className = 'form-status'; }
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  // Délégation : ouverture sur tout lien email protégé + bouton dédié
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest(
      'a[href*="email-protection"], [data-open-email-modal]'
    );
    if (trigger) {
      e.preventDefault();
      open();
      return;
    }
    if (e.target.closest('[data-modal-close]')) {
      e.preventDefault();
      close();
    }
  });

  // Échap ferme, Tab piège le focus dans le panel
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'Tab') {
      const items = focusableInPanel();
      if (!items.length) return;
      const first = items[0];
      const last  = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Validation visuelle au blur
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add('is-invalid');
      } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid') && input.value.trim()) {
        input.classList.remove('is-invalid');
      }
    });
  });

  // Soumission → mailto:
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data    = new FormData(form);
    const name    = (data.get('name')    || '').toString().trim();
    const email   = (data.get('email')   || '').toString().trim();
    const subject = (data.get('subject') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    let hasError = false;
    [['name', name], ['email', email], ['message', message]].forEach(([fld, val]) => {
      const el = form.querySelector(`[name="${fld}"]`);
      if (!val) { el.classList.add('is-invalid'); hasError = true; }
    });
    if (hasError) {
      statusEl.textContent = getStatusText('required');
      statusEl.className   = 'form-status is-error';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.querySelector('[name="email"]').classList.add('is-invalid');
      statusEl.textContent = getStatusText('invalid');
      statusEl.className   = 'form-status is-error';
      return;
    }

    const subj = subject || `Contact via portfolio — ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    const url  = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;

    statusEl.textContent = getStatusText('sending');
    statusEl.className   = 'form-status is-success';
    window.location.href = url;

    setTimeout(() => { close(); form.reset(); }, 1400);
  });
})();
