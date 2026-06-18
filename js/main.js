// ── Dark / Light mode toggle ──────────────────────────────────
(function () {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', stored);
})();

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme') || 'dark';

  const btn   = document.getElementById('theme-toggle');
  const label = document.getElementById('theme-label');

  const updateTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    // Swap profile photo
    const photo = document.getElementById('profile-photo');
    if (photo) {
      const src = theme === 'dark' ? photo.dataset.srcDark : photo.dataset.srcLight;
      if (src) photo.src = src;
    }
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
  
  const rawData = window.SITE_DATA || {};
  const data = {};
  for (const groupKey in rawData) {
      if (Array.isArray(rawData[groupKey])) {
          for (const item of rawData[groupKey]) {
              if (item.id) {
                  data[item.id] = item;
                  if (!item.type) {
                      if (groupKey === 'themes') item.type = 'Theme';
                      if (groupKey === 'questions') item.type = 'Question';
                  }
              }
          }
      }
  }

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

  // Render markdown + protect math blocks from markdown parser
  function renderBody(text) {
    if (!text) return '';
    // 1. Stash all \[...\] and \(...\) blocks so marked never sees them
    const stash = [];
    const protected_text = text
      .replace(/\\\[[\s\S]*?\\\]/g, m => { stash.push(m); return `\x00MATH${stash.length - 1}\x00`; })
      .replace(/\\\([\s\S]*?\\\)/g, m => { stash.push(m); return `\x00MATH${stash.length - 1}\x00`; });
    // 2. Parse markdown
    let html = window.marked ? window.marked.parse(protected_text) : `<p>${protected_text}</p>`;
    // 3. Restore math blocks
    html = html.replace(/\x00MATH(\d+)\x00/g, (_, i) => stash[parseInt(i)]);
    return html;
  }

  // Build the inner HTML shared by the workspace panel and the accordion
  // Uses inline styles to avoid CSS cascade/specificity issues.

  // Resolve connections based on arrays of IDs
  function buildConnections(item) {
    let conns = [];
    
    function addLinks(ids, prefix) {
      if (!ids) return;
      ids.forEach(id => {
         const target = data[id];
         if (target) {
            let title = target.title || target.name || target.question || target.shortTitle || id;
            conns.push(`<li><strong>${prefix}:</strong> <a href="#" data-item-id="${id}" onclick="event.preventDefault(); document.querySelector('[data-item-id=\'${id}\']').click()">${title}</a></li>`);
         }
      });
    }

    addLinks(item.themeIds || item.relatedThemeIds, 'Theme');
    addLinks(item.relatedPaperIds, 'Research');
    addLinks(item.relatedCourseIds, 'Teaching');
    addLinks(item.relatedSoftwareIds, 'Software');
    addLinks(item.relatedQuestionIds, 'Question');

    if (conns.length === 0) return '';
    return `<div style="margin-top:1rem;font-size:.78rem;"><strong>Connections:</strong><ul style="margin-top:0.2rem;padding-left:1.2rem;color:var(--text-muted); line-height: 1.5;">${conns.join('')}</ul></div>`;
  }

  function buildContent(item) {
    let meta = [];
    if (item.coauthors) meta.push(`with ${item.coauthors}`);
    else if (item.authors) meta.push(item.authors);
    
    if (item.journal) {
      meta.push(`${item.journal}, ${item.year || ''}`);
    } else {
      if (item.presentations && item.presentations.length > 0) {
        const presNames = item.presentations.map(p => p.name).join(', ');
        meta.push(`Presented at ${presNames}`);
      }
      if (item.year) meta.push(item.year);
    }
    
    if (item.level) meta.push(item.level);
    if (item.tagline) meta.push(item.tagline);

    let metaStr = meta.join(' • ');

    let links = [];
    if (item.url && item.url !== '#' && item.url !== '/') {
      const label = (item.type === 'Paper' || item.type === 'Working Paper') ? 'Download PDF ↗' : 'Open ↗';
      links.push(`<a href="${item.url}" target="_blank" rel="noopener"
            style="font-size:.74rem;font-weight:500;color:var(--orange);display:inline-flex;align-items:center;gap:.25rem;text-decoration:none;">${label}</a>`);
    }
    if (item.presentations && item.presentations.length > 0) {
      item.presentations.forEach(pres => {
        if (pres.url) {
          links.push(`<a href="${pres.url}" target="_blank" rel="noopener"
                style="font-size:.74rem;font-weight:500;color:var(--orange);display:inline-flex;align-items:center;gap:.25rem;text-decoration:none;">${pres.name} PDF ↗</a>`);
        }
      });
    }
    const openLink = links.join('<span style="color:var(--text-light);font-size:.74rem;margin:0 .4rem;"> • </span>');

    let bodyText = item.long_description || item.abstract || item.description || item.question || '';
    let titleText = item.title || item.name || item.shortTitle || item.question || '';
    
    return `
      <div style="display:flex;flex-direction:column;gap:.15rem;">
        <div style="font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-light);">${item.type || 'Item'}</div>
        <div style="font-family:'Instrument Serif',Georgia,serif;font-size:1.05rem;line-height:1.35;font-weight:400;color:var(--text);margin-top:.1rem;">${titleText}</div>
        ${metaStr ? `<div style="font-size:.73rem;color:var(--text-muted);font-style:italic;">${metaStr}</div>` : ''}
      </div>
      ${bodyText ? `<div class="panel-body" style="font-size:.78rem;color:var(--text-muted);line-height:1.7;">${renderBody(bodyText)}</div>` : ''}
      <div style="margin-top:0.5rem;">${openLink}</div>`;
  }

  // Re-run KaTeX on dynamically injected content
  function renderMath(el) {
    if (window.renderMathInElement && window.KATEX_OPTS)
      renderMathInElement(el, window.KATEX_OPTS);
  }

  // ── Workspace panel (wide screens) ─────────────────────────
  const workspace  = document.getElementById('workspace');
  const activePane = document.getElementById('workspace-active');

  function renderWorkspace(item) {
    if (!workspace || !activePane) return;
    activePane.innerHTML = buildContent(item);
    workspace.classList.add('has-selection');
    renderMath(activePane);
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
    acc.innerHTML = `<div class="accordion-inner">${buildContent(item)}</div>`;
    anchor.insertAdjacentElement('afterend', acc);
    acc.getBoundingClientRect();
    acc.classList.add('open');
    renderMath(acc);
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

  // ── Resize: migrate active selection across breakpoint ───────
  let wasNarrow = isNarrow();
  window.addEventListener('resize', () => {
    const narrow = isNarrow();
    if (narrow === wasNarrow || !currentId) { wasNarrow = narrow; return; }
    wasNarrow = narrow;

    const item = data[currentId];
    if (!item) return;

    if (narrow) {
      // Wide → Narrow: workspace panel → accordion
      clearWorkspace();
      const anchor = document.querySelector(`[data-item-id="${currentId}"].selected`);
      if (anchor) insertAccordion(anchor, item, currentId);
    } else {
      // Narrow → Wide: accordion → workspace panel
      removeAccordions();
      renderWorkspace(item);
    }
  });

  document.querySelectorAll('[data-item-id]').forEach(el =>
    el.addEventListener('click', () => selectItem(el.getAttribute('data-item-id'), el))
  );
});
