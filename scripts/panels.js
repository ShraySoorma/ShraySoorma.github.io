/* Renders every data driven section. Classic script, no modules. */
(function () {
  'use strict';

  var ROTATIONS = [-1.1, 0.7, -0.4, 1.2, -0.8, 0.5];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function panelBorder() {
    return '<svg class="panel__frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
           '<rect class="panel__border" x="1" y="1" width="98" height="98" pathLength="1"/></svg>';
  }

  function hostOf(url) {
    try { return new URL(url).host.replace(/^www\./, ''); } catch (e) { return url; }
  }

  /* ---------- project lineup ---------- */

  function projectPage(p, i) {
    var num = String(i + 1).padStart(2, '0');
    var rot = ROTATIONS[i % ROTATIONS.length];
    var tid = 't-' + p.id;

    var bullets = (p.highlights || []).map(function (h) {
      return '<li>' + esc(h) + '</li>';
    }).join('');

    var tags = (p.stack || []).map(function (t) {
      return '<span class="tag">' + esc(t) + '</span>';
    }).join('');

    var cta = p.link
      ? '<a class="panel__link" href="' + esc(p.link) + '" target="_blank" rel="noopener">' +
        esc(hostOf(p.link)) + '</a>'
      : '<span class="panel__link panel__link--muted">' + esc(p.linkNote || 'Private repo') + '</span>';

    /* the lead paragraph is dropped: the highlights already carry it, and a
       page has to fit one screen alongside the art */
    var dek = i === 0
      ? '<p class="caption-box page__dek">Selected work. The rest is private or under NDA.</p>'
      : '';

    var page = document.createElement('section');
    page.className = 'page';
    page.id = 'p-' + p.id;
    page.setAttribute('aria-labelledby', tid);
    page.innerHTML =
      '<div class="page__inner">' +
        dek +
        '<article class="panel panel--project panel--page" data-status="' + esc(p.status) + '" style="--rot:' + rot + 'deg">' +
          panelBorder() +
          '<span class="panel__num">' + num + '</span>' +
          '<div class="panel__media" aria-hidden="true">' +
            '<div class="burst" aria-hidden="true"><span class="burst__word">' + esc(p.burst) + '</span></div>' +
          '</div>' +
          '<div class="panel__inner" data-stagger>' +
            '<p class="panel__issue">' + esc(p.issue) + '</p>' +
            '<h2 class="panel__title" id="' + tid + '">' + esc(p.name) + '</h2>' +
            '<span class="panel__status">' + esc(p.status) + '</span>' +
            '<p class="panel__logline">' + esc(p.logline) + '</p>' +
            '<ul class="panel__list">' + bullets + '</ul>' +
            '<div class="panel__tags">' + tags + '</div>' +
            cta +
          '</div>' +
        '</article>' +
      '</div>' +
      '<span class="page__folio" aria-hidden="true">Page ' + (i + 2) + '</span>';
    return page;
  }

  function renderProjects() {
    var slot = document.getElementById('project-pages');
    var list = window.PROJECTS;
    if (!slot || !list || !list.length) return;
    var frag = document.createDocumentFragment();
    list.forEach(function (p, i) { frag.appendChild(projectPage(p, i)); });
    slot.parentNode.insertBefore(frag, slot);
    slot.parentNode.removeChild(slot);
  }

  /* ---------- arsenal ---------- */

  function renderArsenal() {
    var strip = document.getElementById('arsenal-strip');
    var groups = window.AUTHOR && window.AUTHOR.arsenal;
    if (!strip || !groups) return;

    var frag = document.createDocumentFragment();
    Object.keys(groups).forEach(function (name, i) {
      var items = (groups[name] || []).map(function (t) {
        return '<li class="tag">' + esc(t) + '</li>';
      }).join('');
      frag.appendChild(el(
        '<article class="panel panel--arsenal" style="--rot:' + (i % 2 ? 0.6 : -0.6) + 'deg">' +
          panelBorder() +
          '<h3 class="panel__kicker">' + esc(name) + '</h3>' +
          '<ul class="panel__tags panel__tags--list" data-stagger>' + items + '</ul>' +
        '</article>'
      ));
    });
    strip.appendChild(frag);
  }

  /* ---------- contact ---------- */

  function renderContact() {
    var grid = document.getElementById('contact-grid');
    var links = window.SITE && window.SITE.links;
    if (!grid || !links) return;

    var frag = document.createDocumentFragment();
    links.forEach(function (l) {
      if (!l.href) return;
      var external = /^https?:/.test(l.href);
      var attrs = external ? ' target="_blank" rel="noopener"' : '';
      frag.appendChild(el(
        '<a class="contact-card' + (l.primary ? ' contact-card--primary' : '') + '" href="' + esc(l.href) + '"' + attrs + '>' +
          '<span class="contact-card__label">' + esc(l.label) + '</span>' +
          '<span class="contact-card__value">' + esc(l.value) + '</span>' +
        '</a>'
      ));
    });
    grid.appendChild(frag);
  }

  /* ---------- origin + cover text ---------- */

  function renderAuthor() {
    var a = window.AUTHOR;
    if (!a) return;

    var tagline = document.getElementById('cover-tagline');
    if (tagline && a.tagline) tagline.textContent = a.tagline;

    var prose = document.getElementById('origin-prose');
    if (prose && a.origin) {
      prose.innerHTML = a.origin.map(function (line) {
        return '<p class="panel__prose-line">' + esc(line) + '</p>';
      }).join('');
    }

    var bubble = document.getElementById('origin-bubble');
    if (bubble && a.bubble) bubble.textContent = a.bubble;
  }

  window.Panels = {
    render: function () {
      renderAuthor();
      renderProjects();
      renderArsenal();
      renderContact();
    }
  };
})();
