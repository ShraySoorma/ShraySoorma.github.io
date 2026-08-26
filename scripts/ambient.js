/* Decorative only. Everything here is aria-hidden, pauses when the tab is
   hidden, and switches off entirely under reduced motion or on small screens. */
(function () {
  'use strict';

  var raf = 0;
  var rainOn = false;

  function reduced() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function roomy() {
    return !!(window.matchMedia && window.matchMedia('(min-width: 900px)').matches);
  }

  /* ---------- matrix rain ---------- */

  /* rows per frame. A full glyph per frame read as static; this drifts. */
  var SPEED = 0.22;

  var GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}[]$#*+=';

  function initRain(canvas) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d', { alpha: true });
    var cols = [], size = 14, w = 0, h = 0, dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = size + 'px ui-monospace, monospace';
      /* cap the column count so a very wide screen does not scale cost linearly */
      var n = Math.min(Math.ceil(w / size), 120);
      cols = new Array(n);
      for (var i = 0; i < n; i++) cols[i] = Math.random() * -60;
    }

    function frame() {
      raf = 0;
      if (!rainOn) return;
      ctx.fillStyle = 'rgba(5, 5, 5, 0.035)';
      ctx.fillRect(0, 0, w, h);
      for (var i = 0; i < cols.length; i++) {
        var x = i * size;
        var y = cols[i] * size;
        var ch = GLYPHS.charAt((Math.random() * GLYPHS.length) | 0);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(ch, x, y);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.fillText(GLYPHS.charAt((Math.random() * GLYPHS.length) | 0), x, y - size * 2);
        if (y > h && Math.random() > 0.975) cols[i] = 0;
        cols[i] += SPEED;
      }
      raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (rainOn || reduced() || !roomy()) return;
      rainOn = true;
      resize();
      canvas.hidden = false;
      if (!raf) raf = window.requestAnimationFrame(frame);
    }

    function stop() {
      rainOn = false;
      if (raf) { window.cancelAnimationFrame(raf); raf = 0; }
      canvas.hidden = true;
      ctx.clearRect(0, 0, w, h);
    }

    function sync() { if (reduced() || !roomy()) stop(); else start(); }

    window.addEventListener('resize', function () { if (rainOn) resize(); sync(); }, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') sync(); else stop();
    });
    if (window.matchMedia) {
      var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (rm.addEventListener) rm.addEventListener('change', sync);
      else if (rm.addListener) rm.addListener(sync);
    }
    sync();
    window.Ambient.rainOn = function () { return rainOn; };
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
      initRain(document.getElementById('rain'));
      initStream(document.getElementById('stream'));
      initStats(document.getElementById('stats'));
    },
    rainOn: function () { return rainOn; }
  };
})();
