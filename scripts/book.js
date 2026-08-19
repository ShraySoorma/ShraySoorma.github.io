/* A real book: leaves with two printed sides, hinged on a centre spine.
   Leaf k carries page 2k on its front and page 2k+1 on its back, so turning
   one leaf swaps both halves of the spread the way paper actually does.
   Scroll is never hijacked: the rail supplies one screen of real scroll per
   turn, and the controller only maps scroll position onto a --turn value. */
(function () {
  'use strict';

  var root = document.documentElement;
  var book, stage, rail, spread;
  var pages = [], leaves = [];
  var turns = 0;
  var frame = 0;
  var spreadIndex = -1;
  var enabled = false;
  var built = false;

  var MODE = '(min-width: 900px) and (min-height: 640px)';

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function shouldEnable() {
    return !reducedMotion() && !!window.matchMedia && window.matchMedia(MODE).matches;
  }

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  /* ---------- build the leaves ---------- */

  function build() {
    if (built) return;
    built = true;

    spread = document.createElement('div');
    spread.className = 'spread';

    var baseL = document.createElement('div');
    baseL.className = 'spread__base spread__base--left';
    baseL.setAttribute('aria-hidden', 'true');
    var baseR = document.createElement('div');
    baseR.className = 'spread__base spread__base--right';
    baseR.setAttribute('aria-hidden', 'true');
    var cast = document.createElement('div');
    cast.className = 'spread__cast';
    cast.setAttribute('aria-hidden', 'true');
    spread.appendChild(baseL);
    spread.appendChild(baseR);
    spread.appendChild(cast);

    var leafCount = Math.ceil(pages.length / 2);
    for (var k = 0; k < leafCount; k++) {
      var leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.style.setProperty('--k', k);

      var front = document.createElement('div');
      front.className = 'leaf__face leaf__face--front';
      var back = document.createElement('div');
      back.className = 'leaf__face leaf__face--back';

      leaf.appendChild(front);
      leaf.appendChild(back);
      spread.appendChild(leaf);
      leaves.push({ el: leaf, front: front, back: back, z: null, moving: false });
    }

    /* page 2k to the front of leaf k, page 2k+1 to its back */
    for (var i = 0; i < pages.length; i++) {
      var slot = leaves[Math.floor(i / 2)][i % 2 === 0 ? 'front' : 'back'];
      slot.appendChild(pages[i]);
    }

    /* the last leaf's blank reverse is the back cover */
    var last = leaves[leaves.length - 1];
    if (!last.back.firstChild) last.back.classList.add('leaf__face--blank');

    stage.appendChild(spread);
    turns = leaves.length - 1;

    /* one snap slot per turn, plus one for the closed book */
    var frag = document.createDocumentFragment();
    for (var s = 0; s <= turns; s++) {
      var slot = document.createElement('div');
      slot.className = 'book__slot';
      frag.appendChild(slot);
    }
    rail.appendChild(frag);
  }

  /* ---------- reveal ---------- */

  function revealPage(page) {
    if (!page || page.dataset.revealed === '1') return;
    page.dataset.revealed = '1';
    page.classList.add('is-inview');
    var kids = page.querySelectorAll('.panel, [data-stagger]');
    for (var i = 0; i < kids.length; i++) kids[i].classList.add('is-inview');
    var stag = page.querySelectorAll('[data-stagger]');
    for (var s = 0; s < stag.length; s++) {
      var c = stag[s].children;
      for (var j = 0; j < c.length; j++) c[j].style.setProperty('--i', j);
    }
  }

  /* the two pages facing the reader at spread s */
  function facingPages(s) {
    var out = [];
    if (s > 0 && pages[2 * s - 1]) out.push(pages[2 * s - 1]);  /* left: back of leaf s-1 */
    if (pages[2 * s]) out.push(pages[2 * s]);                    /* right: front of leaf s */
    return out;
  }

  function setSpread(s) {
    if (s === spreadIndex) return;
    spreadIndex = s;
    var facing = facingPages(s).concat(facingPages(s + 1));
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (facing.indexOf(p) > -1) {
        p.removeAttribute('inert');
        p.removeAttribute('aria-hidden');
        revealPage(p);
      } else {
        p.setAttribute('inert', '');
        p.setAttribute('aria-hidden', 'true');
      }
    }
  }

  /* ---------- turn ----------
     The leaf never reads raw scroll. A wheel notch arrives as one large jump,
     and mapping that straight onto the rotation makes the sheet snap over in
     visible steps. Instead scroll sets a target and the rendered value chases
     it every frame, so the paper carries its own momentum and settles. */

  var current = 0;
  var target = 0;
  var running = false;
  var last = 0;
  var CHASE = 0.17;      /* fraction of the remaining gap closed per 60Hz frame */
  var SETTLED = 0.0006;  /* close enough to stop the loop */

  function readTarget() {
    var h = window.innerHeight || 1;
    target = (window.pageYOffset || root.scrollTop || 0) / h;
  }

  /* smoothstep: the leaf eases off the spine and settles rather than
     rotating at a constant rate the whole way over */
  function ease(t) { return t * t * (3 - 2 * t); }

  function render() {
    if (!enabled) return;
    var lift = 0;

    for (var k = 0; k < leaves.length; k++) {
      var raw = clamp01(current - k);
      var t = ease(raw);
      var leaf = leaves[k];
      var moving = raw > 0.0005 && raw < 0.9995;

      leaf.el.style.setProperty('--turn', t.toFixed(4));
      if (moving) lift = Math.max(lift, 4 * raw * (1 - raw));

      /* unturned leaves stack with the cover on top, turned leaves stack in
         the order they landed, and whichever leaf is moving sits above both */
      var z;
      if (moving) z = 500;
      else if (raw >= 1) z = 100 + k;
      else z = 50 - k;
      if (leaf.z !== z) { leaf.el.style.zIndex = z; leaf.z = z; }
      if (leaf.moving !== moving) {
        leaf.el.classList.toggle('is-turning', moving);
        leaf.moving = moving;
      }
    }

    /* the closed book sits centred on its cover, then slides to a full spread */
    spread.style.setProperty('--open', ease(clamp01(current)).toFixed(4));
    /* the raised leaf throws a shadow across the page it is uncovering */
    spread.style.setProperty('--cast', lift.toFixed(4));
  }

  function tick(now) {
    frame = 0;
    if (!enabled) { running = false; return; }

    /* Damp against elapsed time, not frame count. A fixed fraction per frame
       would settle twice as fast on a 120Hz screen as on a 60Hz one, so the
       book would feel different depending on the monitor. */
    var dt = last ? Math.min(now - last, 64) : 16.67;
    last = now;
    var k = 1 - Math.pow(1 - CHASE, dt / 16.67);

    var d = target - current;
    if ((d < 0 ? -d : d) < SETTLED) {
      current = target;
      running = false;
      last = 0;
      render();
      return;
    }
    current += d * k;
    render();
    frame = window.requestAnimationFrame(tick);
  }

  function queue() {
    if (!enabled) return;
    readTarget();

    var s = Math.round(target);
    if (s < 0) s = 0;
    if (s > turns) s = turns;
    setSpread(s);

    if (!running) {
      running = true;
      last = 0;
      frame = window.requestAnimationFrame(tick);
    }
  }

  /* jump straight to the target with no chase, for first paint and resizes */
  function write() {
    if (!enabled) return;
    readTarget();
    current = target;
    last = 0;
    var s = Math.round(target);
    if (s < 0) s = 0;
    if (s > turns) s = turns;
    setSpread(s);
    render();
  }

  /* ---------- mode ---------- */

  function enable() {
    if (enabled) return;
    build();
    enabled = true;
    root.classList.add('fx-book');
    rail.style.height = ((turns + 1) * 100) + 'svh';
    spreadIndex = -1;
    write();
  }

  function disable() {
    enabled = false;
    running = false;
    if (frame) { window.cancelAnimationFrame(frame); frame = 0; }
    root.classList.remove('fx-book');
    if (rail) rail.style.height = '';
    spreadIndex = -1;
    for (var i = 0; i < pages.length; i++) {
      pages[i].removeAttribute('inert');
      pages[i].removeAttribute('aria-hidden');
    }
    for (var k = 0; k < leaves.length; k++) {
      var leaf = leaves[k];
      leaf.el.style.zIndex = '';
      leaf.el.style.removeProperty('--turn');
      leaf.el.classList.remove('is-turning');
      leaf.z = null;
      leaf.moving = false;
    }
  }

  function syncMode() {
    if (shouldEnable()) enable(); else disable();
  }

  /* ---------- boot ---------- */

  function init() {
    book = document.querySelector('.book');
    if (!book) return;
    stage = book.querySelector('.book__stage');
    rail = book.querySelector('.book__rail');
    pages = [].slice.call(book.querySelectorAll('.page'));
    if (!stage || !rail || !pages.length) return;

    function spreadOf(id) {
      for (var i = 0; i < pages.length; i++) if (pages[i].id === id) return Math.floor(i / 2);
      return -1;
    }

    function goTo(id) {
      var s = spreadOf(id);
      if (s < 0) return false;
      /* plain scrollTo, so the sheet's scroll-behavior wins and the whole
         thing honours prefers-reduced-motion without asking */
      window.scrollTo(0, s * (window.innerHeight || 0));
      return true;
    }

    /* leaves are fixed in book mode, so a plain #hash jump has nothing to
       scroll to. Translate in page anchors into a scroll to that spread. */
    document.addEventListener('click', function (e) {
      if (!enabled || e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (id && goTo(id)) {
        e.preventDefault();
        var target = document.getElementById(id);
        if (target) {
          target.setAttribute('tabindex', '-1');
          try { target.focus({ preventScroll: true }); } catch (er) { target.focus(); }
        }
      }
    });

    window.addEventListener('hashchange', function () {
      if (enabled) goTo(location.hash.slice(1));
    });

    syncMode();

    if (location.hash) window.setTimeout(function () {
      if (enabled) { goTo(location.hash.slice(1)); queue(); }
    }, 0);

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', function () { syncMode(); queue(); }, { passive: true });
    if (window.matchMedia) {
      var mq = window.matchMedia(MODE);
      var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
      var onChange = function () { syncMode(); queue(); };
      if (mq.addEventListener) { mq.addEventListener('change', onChange); rm.addEventListener('change', onChange); }
      else if (mq.addListener) { mq.addListener(onChange); rm.addListener(onChange); }
    }
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') queue();
    });
  }

  window.Book = {
    init: init,
    refresh: write,
    isEnabled: function () { return enabled; },
    leafCount: function () { return leaves.length; }
  };
})();
