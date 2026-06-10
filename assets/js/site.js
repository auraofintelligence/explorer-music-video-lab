const sitePages = [
  { id: 'home', label: 'Home', href: 'index.html' },
  { id: 'workflow', label: 'Workflow', href: 'workflow.html' },
  { id: 'questions', label: 'Questions', href: 'questions.html' },
  { id: 'builders', label: 'Builders', href: 'builders/index.html' },
  { id: 'ecosystem', label: 'Ecosystem', href: 'ecosystem.html' },
  { id: 'boundaries', label: 'Boundaries', href: 'boundaries.html' },
  { id: 'sources', label: 'Sources', href: 'sources.html' },
];

const siteTrail = [
  { id: 'home', label: 'Home', href: 'index.html' },
  { id: 'workflow', label: 'Workflow', href: 'workflow.html' },
  { id: 'questions', label: 'Questions', href: 'questions.html' },
  { id: 'builders', label: 'Builder directory', href: 'builders/index.html' },
  { id: 'builder-song-seed', label: 'Song Seed', href: 'builders/song-seed.html' },
  { id: 'builder-visual-brief', label: 'Visual Brief', href: 'builders/visual-brief.html' },
  { id: 'builder-storyboard', label: 'Storyboard', href: 'builders/storyboard.html' },
  { id: 'builder-keyframe-shot', label: 'Keyframe Shot', href: 'builders/keyframe-shot.html' },
  { id: 'builder-clip-review', label: 'Clip Review', href: 'builders/clip-review.html' },
  { id: 'builder-release-plan', label: 'Release Plan', href: 'builders/release-plan.html' },
  { id: 'ecosystem', label: 'Ecosystem', href: 'ecosystem.html' },
  { id: 'boundaries', label: 'Boundaries', href: 'boundaries.html' },
  { id: 'sources', label: 'Sources', href: 'sources.html' },
];

const builderPages = siteTrail.filter((page) => page.id.startsWith('builder-'));

const pageHeroImages = {
  workflow: 'assets/img/hero-workflow.webp',
  questions: 'assets/img/hero-questions.webp',
  builders: 'assets/img/hero-builders.webp',
  'builder-song-seed': 'assets/img/hero-builder-song-seed.webp',
  'builder-visual-brief': 'assets/img/hero-builder-visual-brief.webp',
  'builder-storyboard': 'assets/img/hero-builder-storyboard.webp',
  'builder-keyframe-shot': 'assets/img/hero-builder-keyframe-shot.webp',
  'builder-clip-review': 'assets/img/hero-builder-clip-review.webp',
  'builder-release-plan': 'assets/img/hero-builder-release-plan.webp',
  ecosystem: 'assets/img/hero-ecosystem.webp',
  boundaries: 'assets/img/hero-boundaries.webp',
  sources: 'assets/img/hero-sources.webp',
};

const pageId = document.body.dataset.page || 'home';
const inBuilderFolder = location.pathname.includes('/builders/');
const prefix = inBuilderFolder ? '../' : '';

function trebleIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12.3 2.2c1.6 0 2.9 1.2 2.9 2.8 0 1.5-.9 2.7-2.1 3.8l-.6.5v4.5a5.2 5.2 0 1 1-2.1-.4V7.5c0-2.9.8-5.3 1.9-5.3Zm.2 3.9c.5-.5.8-.9.8-1.3 0-.5-.4-.8-.9-.8-.3.5-.5 1.2-.5 2.2l.6-.1Zm-2 9.9a3.1 3.1 0 1 0 2.1 2.9v-2.4a3.1 3.1 0 0 0-2.1-.5Z"/>
    </svg>
  `;
}

function resolveHref(href) {
  if (href.startsWith('http')) return href;
  if (inBuilderFolder && !href.startsWith('builders/')) return `${prefix}${href}`;
  if (inBuilderFolder && href.startsWith('builders/')) return `${prefix}${href}`;
  return href;
}

function resolveAssetPath(src) {
  if (src.startsWith('http') || src.startsWith('../')) return src;
  return `${prefix}${src}`;
}

function renderHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const navLinks = sitePages.map((page) => {
    const current = page.id === pageId || (page.id === 'builders' && pageId.startsWith('builder-'));
    return `<a href="${resolveHref(page.href)}"${current ? ' aria-current="page"' : ''}>${page.label}</a>`;
  }).join('');

  header.innerHTML = `
    <a class="brand" href="${prefix}index.html" aria-label="Explorers Music Video Lab home">
      <span class="brand-mark">${trebleIcon()}</span>
      <span>Explorers Music Video Lab</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" data-nav-toggle>Menu</button>
    <nav class="site-nav" data-nav aria-label="Main navigation">${navLinks}</nav>
  `;

  const toggle = header.querySelector('[data-nav-toggle]');
  const nav = header.querySelector('[data-nav]');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function renderPageHero() {
  const hero = document.querySelector('.page-hero');
  const imageSrc = pageHeroImages[pageId];
  if (!hero || !imageSrc || hero.querySelector('.page-hero-media')) return;

  const copy = document.createElement('div');
  copy.className = 'page-hero-copy';
  while (hero.firstChild) copy.appendChild(hero.firstChild);

  const media = document.createElement('figure');
  media.className = 'page-hero-media';
  media.setAttribute('aria-hidden', 'true');

  const image = document.createElement('img');
  image.src = resolveAssetPath(imageSrc);
  image.alt = '';
  image.loading = 'eager';
  image.decoding = 'async';
  media.appendChild(image);

  hero.append(copy, media);
}

function renderBuilderIndex() {
  if (!pageId.startsWith('builder-')) return;
  const hero = document.querySelector('.page-hero');
  const main = document.querySelector('main');
  if (!hero || !main || document.querySelector('[data-builder-index]')) return;

  const links = [
    { id: 'builders', label: 'All builders', href: 'builders/index.html' },
    ...builderPages,
  ].map((builder) => {
    const current = builder.id === pageId;
    return `<a href="${resolveHref(builder.href)}"${current ? ' aria-current="page"' : ''}>${builder.label}</a>`;
  }).join('');

  const index = document.createElement('section');
  index.className = 'section builder-index-nav';
  index.setAttribute('data-builder-index', '');
  index.setAttribute('aria-labelledby', 'builder-index-title');
  index.innerHTML = `
    <div class="builder-index-nav-inner">
      <div>
        <span>Builder index</span>
        <h2 id="builder-index-title">Jump to any builder.</h2>
      </div>
      <nav class="builder-index-links" aria-label="Builder pages">${links}</nav>
    </div>
  `;
  hero.insertAdjacentElement('afterend', index);
}

function renderFooter() {
  const footer = document.querySelector('[data-site-footer]');
  if (!footer) return;
  const currentIndex = siteTrail.findIndex((page) => page.id === pageId);
  const previous = siteTrail[currentIndex - 1];
  const next = siteTrail[currentIndex + 1];
  const prevNext = currentIndex >= 0 ? `
    <nav class="footer-page-nav" aria-label="Previous and next pages">
      ${previous ? `<a href="${resolveHref(previous.href)}"><span>Previous</span><strong>${previous.label}</strong></a>` : '<span></span>'}
      ${next ? `<a href="${resolveHref(next.href)}"><span>Next</span><strong>${next.label}</strong></a>` : '<span></span>'}
    </nav>
  ` : '';

  footer.innerHTML = `
    ${prevNext}
    <div class="footer-main">
      <div>
        <strong>Explorers Music Video Lab</strong>
        <p>Song-first music-video builders for optimistic, self-sovereign creators.</p>
      </div>
      <nav class="footer-links" aria-label="Footer links">
        <a href="${prefix}workflow.html">Workflow</a>
        <a href="${prefix}builders/index.html">Builders</a>
        <a href="${prefix}boundaries.html">Boundaries</a>
        <a href="${prefix}sources.html">Sources</a>
      </nav>
    </div>
  `;
}

function renderPageNav() {
  const nav = document.querySelector('[data-page-nav]');
  if (!nav) return;
  nav.remove();
}

function setupToTop() {
  const button = document.querySelector('[data-to-top]');
  if (!button) return;
  const update = () => button.classList.toggle('is-visible', window.scrollY > 520);
  update();
  window.addEventListener('scroll', update, { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

renderHeader();
renderPageHero();
renderBuilderIndex();
renderFooter();
renderPageNav();
setupToTop();
