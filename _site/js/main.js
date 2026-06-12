// ── Dark / Light mode toggle ──────────────────────────────────
(function () {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', stored);
})();

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme') || 'light';

  const btn   = document.getElementById('theme-toggle');
  const label = document.getElementById('theme-label');

  const updateTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  };
  updateTheme(stored);
  if (btn) btn.addEventListener('click', () => {
    updateTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // ── Active nav link ─────────────────────────────────────────
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (path === href || (href !== '/' && path.startsWith(href)))
      link.classList.add('active');
  });

  // ── Newsletter form ─────────────────────────────────────────
  const form = document.getElementById('newsletter-form');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = form.querySelector('input[type="email"]');
    if (inp && inp.value) { inp.value = ''; inp.placeholder = 'Thanks for subscribing!'; }
  });

  // ── Helpers ─────────────────────────────────────────────────
  const data = (window.SITE_DATA && window.SITE_DATA.items) || {};
  let currentId = null;

  const TYPE_LABEL = {
    paper: 'Paper', software: 'Software', teaching: 'Teaching',
    talk: 'Talk', note: 'Note', project: 'Project', question: 'Question'
  };
  const CONN_CLASS = {
    paper: 'conn-paper', software: 'conn-software', teaching: 'conn-teaching',
    talk: 'conn-talk', note: 'conn-note'
  };

  const typeLabel  = t => TYPE_LABEL[t] || t;
  const connClass  = t => CONN_CLASS[t] || 'conn-note';

  // Prepend "With " for paper coauthors
  const formatMeta = item =>
    item.meta ? (item.type === 'paper' ? `With ${item.meta}` : item.meta) : '';

  // Build the inner HTML shared by the workspace panel and the accordion
  // Uses inline styles to avoid CSS cascade/specificity issues.
  function buildContent(item) {
    const meta = formatMeta(item);

    const openLink = item.url && item.url !== '#' && item.url !== '/'
      ? `<a href="${item.url}" target="_blank" rel="noopener"
            style="font-size:.74rem;font-weight:500;color:var(--orange);display:inline-flex;align-items:center;gap:.25rem;text-decoration:none;">Open ↗</a>`
      : '';

    return `
      <div style="display:flex;flex-direction:column;gap:.15rem;">
        <div style="font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-light);">${typeLabel(item.type)}</div>
        <div style="font-family:'Instrument Serif',Georgia,serif;font-size:1.05rem;line-height:1.35;font-weight:400;color:var(--text);margin-top:.1rem;">${item.title}</div>
        ${meta ? `<div style="font-size:.73rem;color:var(--text-muted);font-style:italic;">${meta}</div>` : ''}
      </div>
      ${item.body ? `<div style="font-size:.78rem;color:var(--text-muted);line-height:1.7;">${item.body}</div>` : ''}
      ${openLink}`;
  }

  // ── Workspace panel (wide screens) ─────────────────────────
  const workspace  = document.getElementById('workspace');
  const activePane = document.getElementById('workspace-active');

  function renderWorkspace(item) {
    if (!workspace || !activePane) return;
    activePane.innerHTML = buildContent(item) +
      `<button class="workspace-clear" id="workspace-clear">✕ Clear</button>`;
    document.getElementById('workspace-clear').addEventListener('click', clearAll);
    workspace.classList.add('has-selection');
  }

  function clearWorkspace() {
    if (!workspace) return;
    workspace.classList.remove('has-selection');
    if (activePane) activePane.innerHTML = '';
  }

  // ── Accordion (narrow screens) ──────────────────────────────
  const BREAKPOINT = 960; // must match CSS @media max-width

  function isNarrow() { return window.innerWidth <= BREAKPOINT; }

  function removeAccordions() {
    document.querySelectorAll('.item-accordion').forEach(acc => {
      acc.classList.remove('open');
      // wait for CSS transition before removing from DOM
      acc.addEventListener('transitionend', () => acc.remove(), { once: true });
    });
  }

  function insertAccordion(anchor, item, id) {
    removeAccordions();
    const acc = document.createElement('div');
    acc.className = 'item-accordion';
    acc.dataset.accordionFor = id;
    acc.innerHTML = `<div class="accordion-inner">${buildContent(item)}
      <button class="workspace-clear accordion-close">✕ Close</button></div>`;
    anchor.insertAdjacentElement('afterend', acc);
    // trigger reflow so transition fires
    acc.getBoundingClientRect();
    acc.classList.add('open');
    acc.querySelector('.accordion-close').addEventListener('click', () => {
      removeAccordions();
      deselect(currentId);
      currentId = null;
    });
  }

  // ── Selection logic (shared) ────────────────────────────────
  function deselect(id) {
    if (!id) return;
    document.querySelectorAll(`[data-item-id="${id}"]`).forEach(x => x.classList.remove('selected'));
  }

  function clearAll() {
    clearWorkspace();
    removeAccordions();
    deselect(currentId);
    currentId = null;
  }

  function selectItem(id, el) {
    if (currentId === id) { clearAll(); return; } // toggle off

    const item = data[id];
    if (!item) return;

    deselect(currentId);
    currentId = id;
    document.querySelectorAll(`[data-item-id="${id}"]`).forEach(x => x.classList.add('selected'));

    if (isNarrow()) {
      clearWorkspace();
      insertAccordion(el, item, id);
    } else {
      removeAccordions();
      renderWorkspace(item);
    }
  }

  document.querySelectorAll('[data-item-id]').forEach(el =>
    el.addEventListener('click', () => selectItem(el.getAttribute('data-item-id'), el))
  );
});
