/* Turns command results into terminal output. Everything returns a DOM node,
   so the shell never builds markup and the renderer never parses commands. */
(function () {
  'use strict';

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

  function block(cls, html) {
    return el('<div class="out ' + cls + '">' + html + '</div>');
  }

  function hostOf(url) {
    try { return new URL(url).host.replace(/^www\./, ''); } catch (e) { return url; }
  }

  function link(href, label) {
    var external = /^https?:/.test(href);
    return '<a class="lnk" href="' + esc(href) + '"' +
      (external ? ' target="_blank" rel="noopener"' : '') + '>' + esc(label) +
      (external ? '<span class="lnk__ext" aria-hidden="true"> [↗]</span>' : '') + '</a>';
  }

  /* ---------- listings ---------- */

  function ls(nodes, cwdPath) {
    if (!nodes.length) return block('out--dim', 'empty');
    var items = nodes.map(function (n) {
      var cls = n.type === 'dir' ? 'ent ent--dir' : 'ent ent--file';
      var name = esc(n.name) + (n.type === 'dir' ? '/' : '');
      var cmd = n.type === 'dir' ? 'cd ' + n.name : 'cat ' + n.name;
      return '<button class="' + cls + '" data-cmd="' + esc(cmd) + '">' + name + '</button>';
    }).join('');
    return block('out--ls', '<div class="ls">' + items + '</div>' +
      '<p class="hint">' + esc(nodes.length) + ' entries in ' + esc(cwdPath) + '</p>');
  }

  /* ---------- a project file ---------- */

  function project(p) {
    var tags = (p.stack || []).map(function (t) {
      var slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return '<span class="tag" data-tag="' + esc(slug) + '">' + esc(t) + '</span>';
    }).join('');

    var bullets = (p.highlights || []).map(function (h) {
      return '<li>' + esc(h) + '</li>';
    }).join('');

    var body = (p.body || []).map(function (b) {
      return '<p>' + esc(b) + '</p>';
    }).join('');

    var cta = p.link
      ? link(p.link, hostOf(p.link))
      : '<span class="muted">' + esc(p.linkNote || 'private repo') + '</span>';

    return block('out--file',
      '<div class="fh">' +
        '<span class="fh__name">' + esc(p.name) + '</span>' +
        '<span class="fh__status" data-status="' + esc(p.status) + '">' + esc(p.status) + '</span>' +
      '</div>' +
      '<p class="fh__issue">// ' + esc(p.issue) + '</p>' +
      '<p class="lede">' + esc(p.logline) + '</p>' +
      '<div class="prose">' + body + '</div>' +
      '<ul class="bul">' + bullets + '</ul>' +
      '<div class="tags">' + tags + '</div>' +
      '<p class="cta">' + cta + '</p>'
    );
  }

  /* ---------- about ---------- */

  function about(a) {
    var lines = (a.origin || []).map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('');
    return block('out--file',
      '<div class="fh"><span class="fh__name">' + esc(window.SITE ? window.SITE.name : 'about') + '</span></div>' +
      '<p class="lede">' + esc(a.tagline) + '</p>' +
      '<div class="prose">' + lines + '</div>' +
      (a.bubble ? '<p class="quote">&gt; ' + esc(a.bubble) + '</p>' : '') +
      (a.epigraph && a.epigraph.text
        ? '<figure class="epi">' +
            '<blockquote class="epi__text">' + esc(a.epigraph.text) + '</blockquote>' +
            '<figcaption class="epi__by">-- ' + esc(a.epigraph.author || '') +
              (a.epigraph.source ? ' <span class="epi__src">' + esc(a.epigraph.source) + '</span>' : '') +
            '</figcaption>' +
          '</figure>'
        : '')
    );
  }

  /* ---------- arsenal ---------- */

  function arsenal(groups) {
    var cols = Object.keys(groups || {}).map(function (name) {
      var items = (groups[name] || []).map(function (t) {
        return '<li>' + esc(t) + '</li>';
      }).join('');
      return '<div class="grp"><h3 class="grp__name">' + esc(name) + '</h3><ul class="grp__list">' + items + '</ul></div>';
    }).join('');
    return block('out--arsenal', '<div class="grps">' + cols + '</div>');
  }

  /* ---------- contact ---------- */

  function contact(links) {
    var rows = (links || []).map(function (l) {
      return '<tr><td class="k">' + esc(l.label) + '</td><td class="v">' + link(l.href, l.value) + '</td></tr>';
    }).join('');
    return block('out--contact', '<table class="kv"><tbody>' + rows + '</tbody></table>');
  }

  /* ---------- help ---------- */

  function help(rows) {
    var body = rows.map(function (r) {
      return '<tr><td class="k"><button class="ent ent--cmd" data-cmd="' + esc(r.run || r.cmd) + '">' +
        esc(r.cmd) + '</button></td><td class="v">' + esc(r.desc) + '</td></tr>';
    }).join('');
    return block('out--help', '<table class="kv"><tbody>' + body + '</tbody></table>');
  }

  function text(s, cls) { return block(cls || '', '<p>' + esc(s) + '</p>'); }
  function error(s) { return block('out--err', '<p>' + esc(s) + '</p>'); }
  function raw(html, cls) { return block(cls || '', html); }

  function echo(prompt, cmd) {
    return el('<div class="out out--echo"><span class="ps1">' + esc(prompt) +
      '</span> <span class="cmd">' + esc(cmd) + '</span></div>');
  }

  window.Render = {
    ls: ls, project: project, about: about, arsenal: arsenal, contact: contact,
    help: help, text: text, error: error, raw: raw, echo: echo, esc: esc, link: link
  };
})();
