/* POST crawl. Skippable with any key or click, plays once per session, and
   never runs at all under reduced motion. It can only ever delay the desktop,
   never prevent it: the finish path is idempotent and always fires. */
(function () {
  'use strict';

  var KEY = 'soorma.booted';
  var done = false;
  var timers = [];

  var LINES = [
    'soorma bios v1.0.4 ... ok',
    'memory test ......... 16384k ok',
    'detecting devices ... kbd, mouse, crt',
    'mounting /dev/projects ... ok',
    'loading shray.soorma profile ... ok',
    'starting soorma-sh ...',
    ''
  ];

  function finish(onDone) {
    if (done) return;
    done = true;
    timers.forEach(clearTimeout);
    timers = [];
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* private mode */ }
    var el = document.getElementById('boot');
    if (el) {
      el.classList.add('is-gone');
      window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 320);
    }
    document.documentElement.classList.add('is-booted');
    if (onDone) onDone();
  }

  function reduced() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function seen() {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  function start(onDone) {
    var el = document.getElementById('boot');
    if (!el || reduced() || seen()) { finish(onDone); return; }

    var log = el.querySelector('.boot__log');
    var step = 190;

    LINES.forEach(function (line, i) {
      timers.push(window.setTimeout(function () {
        if (done || !log) return;
        var p = document.createElement('p');
        p.className = 'boot__line';
        p.textContent = line;
        log.appendChild(p);
      }, i * step));
    });

    timers.push(window.setTimeout(function () { finish(onDone); }, LINES.length * step + 260));
    /* hard ceiling: the desktop appears even if a timer is throttled away */
    timers.push(window.setTimeout(function () { finish(onDone); }, 3200));

    function skip() { finish(onDone); }
    document.addEventListener('keydown', skip, { once: true });
    document.addEventListener('pointerdown', skip, { once: true });
  }

  window.Boot = { start: start };
})();
