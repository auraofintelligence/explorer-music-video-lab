const sitePages = [
  { id: 'home', label: 'Home', href: 'index.html' },
  { id: 'workflow', label: 'Workflow', href: 'workflow.html' },
  { id: 'questions', label: 'Questions', href: 'questions.html' },
  { id: 'builders', label: 'Builders', href: 'builders/index.html' },
  { id: 'ecosystem', label: 'Ecosystem', href: 'ecosystem.html' },
  { id: 'boundaries', label: 'Boundaries', href: 'boundaries.html' },
  { id: 'sources', label: 'Sources', href: 'sources.html' },
];

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

function renderHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const navLinks = sitePages.map((page) => {
    const current = page.id === pageId || (page.id === 'builders' && pageId.startsWith('builder-'));
    return `<a href="${resolveHref(page.href)}"${current ? ' aria-current="page"' : ''}>${page.label}</a>`;
  }).join('');

  header.innerHTML = `
    <a class="brand" href="${prefix}index.html" aria-label="Explorer Music Video Lab home">
      <span class="brand-mark">${trebleIcon()}</span>
      <span>Explorer Music Video Lab</span>
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

function renderFooter() {
  const footer = document.querySelector('[data-site-footer]');
  if (!footer) return;
  footer.innerHTML = `
    <div>
      <strong>Explorer Music Video Lab</strong>
      <p>Song-first music-video builders for optimistic, self-sovereign creators.</p>
    </div>
    <nav class="footer-links" aria-label="Footer links">
      <a href="${prefix}workflow.html">Workflow</a>
      <a href="${prefix}builders/index.html">Builders</a>
      <a href="${prefix}boundaries.html">Boundaries</a>
      <a href="${prefix}sources.html">Sources</a>
    </nav>
  `;
}

function renderPageNav() {
  const nav = document.querySelector('[data-page-nav]');
  if (!nav) return;
  const currentIndex = sitePages.findIndex((page) => page.id === pageId);
  const previous = sitePages[currentIndex - 1];
  const next = sitePages[currentIndex + 1];
  nav.innerHTML = `
    ${previous ? `<a href="${resolveHref(previous.href)}">Previous: ${previous.label}</a>` : '<span></span>'}
    ${next ? `<a href="${resolveHref(next.href)}">Next: ${next.label}</a>` : '<span></span>'}
  `;
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
renderFooter();
renderPageNav();
setupToTop();
