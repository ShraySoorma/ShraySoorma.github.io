/* Decorative only. Everything here is aria-hidden, pauses when the tab is
   hidden, and switches off entirely under reduced motion. */
(function () {
  'use strict';

  function reduced() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* ---------- code stream ---------- */

  function initStream(el) {
    if (!el) return;
    var snippets = [];
    (window.PROJECTS || []).forEach(function (p) {
      snippets.push('// ' + p.name.toLowerCase() + ' :: ' + p.issue.toLowerCase());
      (p.stack || []).slice(0, 6).forEach(function (t, i) {
        snippets.push('import ' + t.toLowerCase().replace(/[^a-z0-9]/g, '') + ' from "' + t.toLowerCase().replace(/\s+/g, '-') + '"');
      });
      (p.highlights || []).forEach(function (h) { snippets.push('  ' + h.toLowerCase()); });
      snippets.push('export default ' + p.id.replace(/-/g, '_'));
      snippets.push('');
    });
    if (!snippets.length) return;

    /* doubled so the CSS scroll loop is seamless */
    var body = snippets.concat(snippets).map(function (s) {
      return '<span class="stream__line">' + window.Render.esc(s) + '</span>';
    }).join('');
    el.innerHTML = '<div class="stream__reel">' + body + '</div>';
  }

  /* ---------- fake process readout ---------- */

  function initStats(el) {
    if (!el) return;
    var rows = [
      ['cpu',  function () { return (28 + Math.round(Math.random() * 34)) + '%'; }],
      ['mem',  function () { return (1.7 + Math.random() * 1.4).toFixed(1) + 'G'; }],
      ['net',  function () { return (Math.round(Math.random() * 900)) + 'kb/s'; }],
      ['jobs', function () { return String(2 + ((Math.random() * 5) | 0)); }]
    ];

    function paint() {
      el.innerHTML = rows.map(function (r) {
        return '<div class="stat"><span class="stat__k">' + r[0] + '</span>' +
               '<span class="stat__v">' + r[1]() + '</span></div>';
      }).join('');
    }
    paint();
    if (reduced()) return;
    var timer = window.setInterval(function () {
      if (document.visibilityState === 'visible') paint();
    }, 2200);
    window.addEventListener('pagehide', function () { window.clearInterval(timer); });
  }

  window.Ambient = {
    init: function () {
      initStream(document.getElementById('stream'));
      initStats(document.getElementById('stats'));
    }
  };
})();
