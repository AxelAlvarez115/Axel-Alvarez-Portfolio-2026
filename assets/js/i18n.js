/* ---------- internationalisation FR / EN ---------- */
(function() {
  const TR = {
    // nav
    'nav.hero':      { en: 'hero',      fr: 'accueil' },
    'nav.about':     { en: 'about',     fr: 'à propos' },
    'nav.projects':  { en: 'projects',  fr: 'projets' },
    'nav.education': { en: 'education', fr: 'formation' },
    'nav.contact':   { en: 'contact',   fr: 'contact' },
    'cta_hire':      { en: './hire_me.sh', fr: './embauchez_moi.sh' },
    // hero
    'hero.eyebrow':      { en: 'portfolio // full-stack engineer',   fr: 'portfolio // développeur full-stack' },
    'hero.available':    { en: 'AVAILABLE',         fr: 'DISPONIBLE' },
    'hero.location':     { en: 'SAINT-ÉTIENNE · FR', fr: 'SAINT-ÉTIENNE · FR' },
    'hero.cta_projects': { en: 'view_projects',     fr: 'voir_projets' },
    'hero.cta_contact':  { en: './contact',          fr: './contact' },
    'hero.foot_left':    { en: '↳ scroll to enter', fr: '↳ défiler pour entrer' },
    'hero.foot_right':   { en: 'based in saint-étienne // open for work', fr: 'basé à st-étienne // dispo pour missions' },
    // section heads
    'sh.about.h':       { en: 'about<span class="accent">_</span>me<span class="underscore">_</span>',      fr: 'à<span class="accent">_</span>propos<span class="underscore">_</span>' },
    'sh.about.meta':    { en: '~/bio.md',       fr: '~/bio.md' },
    'sh.projects.h':    { en: 'my<span class="accent">_</span>projects<span class="underscore">_</span>',   fr: 'mes<span class="accent">_</span>projets<span class="underscore">_</span>' },
    'sh.projects.meta': { en: '~/work/ • 04 shown', fr: '~/travaux/ • 04 affichés' },
    'sh.edu.h':         { en: 'education<span class="underscore">_</span>',     fr: 'formation<span class="underscore">_</span>' },
    'sh.edu.meta':      { en: '~/.history',    fr: '~/.parcours' },
    'sh.contact.h':     { en: 'contact<span class="accent">_</span>me<span class="underscore">_</span>',    fr: 'me<span class="accent">_</span>contacter<span class="underscore">_</span>' },
    'sh.contact.meta':  { en: '~/inbox',       fr: '~/boite_de_reception' },
    // about
    'about.lede': {
      en: "I'm a full-stack developer who likes the parts of the stack other people don't want to think about — schemas, build pipelines, edge cases at 3am.",
      fr: "Je suis développeur full-stack et j'aime les parties de la stack que les autres préfèrent ignorer — schémas, pipelines de build, edge cases à 3h du mat."
    },
    'about.p1': {
      en: 'I build <strong>web apps</strong>, <strong>internal tools</strong>, and the occasional <strong>weird side project</strong>. Most of my work lives somewhere between TypeScript and Postgres, with a healthy obsession for low-latency UI and clean API contracts.',
      fr: 'Je construis des <strong>apps web</strong>, des <strong>outils internes</strong>, et de temps en temps un <strong>side project bizarre</strong>. La plupart de mon travail vit quelque part entre TypeScript et Postgres, avec une saine obsession pour les UI à faible latence et les contrats d\'API propres.'
    },
    'about.p2': {
      en: "Before software I studied computer engineering. Before that, I was the kid who took apart the family DVD player. Some things don't change.",
      fr: "Avant le logiciel j'ai étudié la microtechnique. Avant ça, j'étais le gosse qui démontait le lecteur DVD familial. Certaines choses ne changent pas."
    },
    'about.p3': {
      en: 'Outside the terminal: lifting heavy things, brutalist architecture, and over-engineering my coffee setup.',
      fr: 'En dehors du terminal : soulever de la fonte, architecture brutaliste, et sur-ingénierie de mon setup café.'
    },
    // stack
    'stack.title':    { en: '// stack.config', fr: '// stack.config' },
    'stack.frontend': { en: 'frontend',         fr: 'frontend' },
    'stack.backend':  { en: 'backend',           fr: 'backend' },
    'stack.infra':    { en: 'tools',             fr: 'outils' },
    'stack.learning': { en: 'currently_learning', fr: 'apprentissage_en_cours' },
    // projects
    'proj.p1.badge': { en: 'live',      fr: 'en ligne' },
    'proj.p1.m2':    { en: 'team',      fr: 'équipe' },
    'proj.p1.m3':    { en: 'web app',   fr: 'app web' },
    'proj.p1.desc': {
      en: 'Dating app for seniors. Custom profiles with interests and affinities, messaging and contact requests, local events with registration, and a full admin dashboard.',
      fr: "Application de rencontres pour seniors. Profils personnalisés avec centres d'intérêt et affinités, messagerie et demandes de contact, événements locaux avec inscriptions, et un dashboard d'administration complet."
    },
    'proj.p2.m2':    { en: 'team of 3', fr: 'équipe de 3' },
    'proj.p2.m3':    { en: 'web app',   fr: 'app web' },
    'proj.p2.desc': {
      en: 'Tour-operator comparison platform by destination. PHP architecture with Repository pattern, PDO/MySQL, and role-based authentication. Star-rated reviews loaded via AJAX, admin panel to manage data.',
      fr: "Plateforme de comparaison de tour-opérateurs par destination. Architecture PHP avec pattern Repository, PDO/MySQL, et authentification par rôles. Reviews avec notation étoiles chargées en AJAX, panel admin pour gérer les données."
    },
    'proj.p3.m2':    { en: 'solo',        fr: 'solo' },
    'proj.p3.m3':    { en: 'side project', fr: 'side project' },
    'proj.p3.desc': {
      en: 'Turn-based combat game in pure PHP with OOP. Heroes persisted via PDO, custom autoloading, object hydration from SQL results. Sprint 2 introduces inheritance and polymorphism: hero classes (warrior/mage/archer) with special attacks and damage type interactions.',
      fr: "Jeu de combat tour par tour en PHP pur avec POO. Héros persistés en base via PDO, autoloading custom, hydratation des objets depuis les résultats SQL. Sprint 2 introduit héritage et polymorphisme : classes de héros (guerrier/mage/archer) avec attaques spéciales et interactions de dégâts entre types."
    },
    'proj.p4.m2':    { en: 'team of 3',  fr: 'équipe de 3' },
    'proj.p4.m3':    { en: 'web app',    fr: 'app web' },
    'proj.p4.desc': {
      en: 'Minimalist Instagram clone in vanilla PHP. Photo uploads, likes and comments via AJAX, profile system with avatar and bio. No framework — custom MVC architecture with PDO and PHP sessions.',
      fr: "Clone Instagram minimaliste en PHP vanilla. Upload de photos, likes et commentaires en AJAX, système de profils avec avatar et bio. Pas de framework — architecture MVC maison avec PDO et sessions PHP."
    },
    'proj.link.live_demo':  { en: 'live demo',   fr: 'démo live' },
    'proj.link.case_study': { en: 'case study',  fr: 'étude de cas' },
    'proj.link.tune_in':    { en: 'tune in',     fr: 'écouter' },
    'proj.link.writeup':    { en: 'writeup',     fr: 'article' },
    // education
    'edu.e1.date': { en: '2026', fr: '2026' },
    'edu.e1.h':    { en: 'Développeur Web et Web Mobile', fr: 'Développeur Web et Web Mobile' },
    'edu.e2.date': { en: '2020', fr: '2020' },
    'edu.e2.h':    { en: 'BTS CIM – Conception et Industrialisation en Microtechniques', fr: 'BTS CIM – Conception et Industrialisation en Microtechniques' },
    'edu.e3.date': { en: '2018', fr: '2018' },
    'edu.e3.h':    { en: 'Bac Pro Microtechniques', fr: 'Bac Pro Microtechniques' },
    // contact
    'contact.headline': {
      en: 'let\'s<span class="accent">_</span>build<span class="accent">_</span>something<span class="accent">_</span>loud.',
      fr: 'on<span class="accent">_</span>construit<span class="accent">_</span>quelque<span class="accent">_</span>chose<span class="accent">_</span>de<span class="accent">_</span>fort.'
    },
    'contact.sub': {
      en: 'Looking for collaborators, contracts, or just someone to argue about monorepos with? My inbox is open and I read everything within 48 hours.',
      fr: "Vous cherchez des collaborateurs, des contrats, ou juste quelqu'un avec qui débattre des monorepos ? Ma boîte est ouverte et je lis tout sous 48h."
    },
    'contact.book': { en: 'book a call',      fr: 'réserver un appel' },
    'contact.cv':   { en: 'download cv.pdf',  fr: 'télécharger cv.pdf' },
    'contact.meta.location_k': { en: '// location',    fr: '// localisation' },
    'contact.meta.location_v': { en: 'Saint-Étienne, FR <span class="accent">●</span>', fr: 'Saint-Étienne, FR <span class="accent">●</span>' },
    'contact.meta.tz_k':       { en: '// timezone',    fr: '// fuseau' },
    'contact.meta.avail_k':    { en: '// availability', fr: '// disponibilité' },
    'contact.meta.avail_v':    { en: '<span class="accent">●</span> open · jun 2026', fr: '<span class="accent">●</span> dispo · juin 2026' },
    'contact.meta.resp_k':     { en: '// response_time', fr: '// délai_réponse' },
    'contact.meta.resp_v':     { en: '~12h avg',         fr: '~12h en moyenne' },
    // footer
    'footer.left': { en: '© 2026 axel alvarez · built with caffeine &amp; vim', fr: '© 2026 axel alvarez · construit avec caféine &amp; vim' },
    'footer.fps':  { en: 'fps: 60',         fr: 'fps : 60' },
    'footer.mem':  { en: 'memory: nominal', fr: 'mémoire : nominale' },
    // email modal
    'email.eyebrow':   { en: 'compose_message', fr: 'composer_message' },
    'email.title': {
      en: 'send<span class="accent">_</span>a<span class="accent">_</span>message',
      fr: 'envoyer<span class="accent">_</span>un<span class="accent">_</span>message'
    },
    'email.sub': {
      en: 'Drop your idea, contract, or argument-about-monorepos here. Hits my inbox directly.',
      fr: 'Déposez votre idée, contrat, ou débat-sur-les-monorepos ici. Ça arrive directement dans ma boîte.'
    },
    'email.name_l':    { en: 'name',     fr: 'nom' },
    'email.email_l':   { en: 'email',    fr: 'email' },
    'email.subject_l': { en: 'subject',  fr: 'sujet' },
    'email.message_l': { en: 'message',  fr: 'message' },
    'email.send':      { en: 'send_message', fr: 'envoyer_message' },
    'email.cancel':    { en: 'cancel',   fr: 'annuler' },
    // projects carousel toggle
    'proj.see_all':  { en: 'show all projects',  fr: 'voir tous les projets' },
    'proj.see_less': { en: 'show as carousel',   fr: 'revenir au carrousel' }
  };

  function apply(lang) {
    lang = (lang === 'fr') ? 'fr' : 'en';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key   = el.dataset.i18n;
      const t     = TR[key];
      if (!t) return;

      const value = t[lang] != null ? t[lang] : t.en;
      const attr  = el.dataset.i18nAttr;
      const html  = el.dataset.i18nHtml === '1';

      if (attr) el.setAttribute(attr, html ? value.replace(/<[^>]*>/g, '') : value);

      const num    = el.querySelector(':scope > .num');
      const cursor = el.querySelector(':scope > .cv-cursor');

      if (html) {
        el.innerHTML = value;
      } else {
        el.textContent = '';
        if (num)    el.appendChild(num);
        el.appendChild(document.createTextNode(value));
        if (cursor) el.appendChild(cursor);
      }
    });

    // Mettre à jour les labels du toggle
    const cur = document.getElementById('langCurrent');
    const oth = document.getElementById('langOther');
    if (cur && oth) {
      cur.textContent = lang.toUpperCase();
      oth.textContent = (lang === 'fr') ? 'EN' : 'FR';
    }

    if (typeof window.__resetTyped === 'function') window.__resetTyped();
  }

  // Initialisation
  const saved   = localStorage.getItem('portfolioLang');
  const initial = saved || 'fr';
  apply(initial);

  // Câblage du toggle
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = (document.documentElement.lang === 'fr') ? 'en' : 'fr';
      localStorage.setItem('portfolioLang', next);
      apply(next);
    });
  }

  window.__setLang = apply;
})();
