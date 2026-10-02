# axel_alvarez — portfolio

Personal portfolio site for Axel Alvarez — full-stack web developer based in Saint-Étienne, looking for a web developer position (CDI/CDD) in the Lyon area.

## Stack

- **HTML/CSS/JS** — vanilla, no framework, no bundler
- **SCSS** — compiled via Dart Sass (`npx sass`)
- **Fonts** — JetBrains Mono, Chakra Petch, DM Sans (Google Fonts)

## Structure

```
index.html                → single-page entry point
assets/
  css/
    main.css              → compiled output (do not edit directly)
  scss/
    main.scss             → import manifest
    _variables.scss       → CSS custom properties & SCSS vars
    _animations.scss      → keyframes
    _base.scss            → reset, typography, global rules
    _header.scss          → fixed top nav
    _hero.scss            → hero section + buttons
    _about.scss           → about section
    _projects.scss        → project cards
    _education.scss       → education / timeline
    _contact.scss         → contact section
    _footer.scss          → footer
    _components.scss      → glitch, mobile nav, page rail, custom cursor
    _email-modal.scss     → contact form modal
    themes/
      _cv-skin.scss       → CV theme (default)
      _alien-skin.scss    → Alien terminal theme
      _modern-classic.scss → Modern classic theme
  js/
    hero-gradient.js      → mouse-tracked radial gradient + scroll-cue
    clock.js              → live clock in hero statusbar
    typed.js              → typewriter effect on hero role line
    cursors.js            → blinking pipe cursors on headings + custom mouse cursor
    i18n.js               → FR/EN language toggle
    header-scroll.js      → header shrink on scroll
    scroll-rail.js        → left-side scroll progress rail
    scrollspy.js          → active section highlighting
    mobile-burger.js      → mobile nav drawer
    contact-glitch.js     → glitch effect on contact section
    glitch-auto.js        → automatic timed glitch bursts on targeted elements
    email-modal.js        → contact form modal (mailto: submission)
    cv-modal.js           → CV preview modal (in-page PDF viewer)
    book-call.js          → "Book a call" CTA button behavior
    heli-toggle.js        → helicopter Easter egg toggle
    music-visualizer.js   → ambient audio player with canvas visualizer
    projects-carousel.js  → touch/drag carousel for project cards
```

## Sections

| # | ID | Description |
|---|-----|-------------|
| 01 | `#hero` | Name, role typewriter, CTAs, animated gradient bg |
| 02 | `#about` | Bio, tech stack chips |
| 03 | `#projects` | Project cards with links |
| 04 | `#education` | Education / formation timeline |
| 05 | `#contact` | Contact links + email modal |

## Development

**Compile SCSS once:**
```bash
npx --yes sass assets/scss/main.scss assets/css/main.css --no-source-map
```

**Watch mode (recompile on save):**
```bash
npx --yes sass --watch assets/scss/main.scss assets/css/main.css --no-source-map
```

Then open `index.html` directly in a browser — no dev server required.

## Theming

The accent color and visual effects are controlled via CSS custom properties defined in `_variables.scss` and overridden per-theme in `assets/scss/themes/`.

Default accent: `#ff0000`
