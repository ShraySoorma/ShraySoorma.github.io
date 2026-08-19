/* Page turn controller. Presentation only: real scroll drives everything,
   so the scrollbar, keyboard, trackpad, and touch are never hijacked. */
(function () {
  'use strict';

  var root = document.documentElement;
  var book, stage, rail, pages = [];
  var pageCount = 0;
  var frame = 0;
  var active = -1;
  var enabled = false;

  var MODE = '(min-width: 900px) and (min-height: 700px)';
  var TURN_DEG = -168;

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function shouldEnable() {
    if (reducedMotion()) return false;
    if (!window.matchMedia) return false;
    if (!('transform' in root.style) && !('webkitTransform' in root.style)) return false;
    return window.matchMedia(MODE).matches;
  }

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

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

  function setActive(n) {
    if (n === active) return;
    active = n;
    for (var i = 0; i < pageCount; i++) {
      var p = pages[i];
      var current = (i === n);
      p.classList.toggle('is-current', current);
      /* keep focus and screen readers on the page actually facing the reader */
      if (current) {
        p.removeAttribute('inert');
        p.removeAttribute('aria-hidden');
        revealPage(p);
      } else {
        p.setAttribute('inert', '');
        p.setAttribute('aria-hidden', 'true');
      }
    }
  }

  /* ---------- turn ---------- */

  function write() {
    frame = 0;
    if (!enabled) return;
    var h = window.innerHeight || 1;
    var progress = (window.pageYOffset || root.scrollTop || 0) / h;
    for (var i = 0; i < pageCount; i++) {
      pages[i].style.setProperty('--turn', clamp(progress - i).toFixed(4));
    }
    var n = Math.round(progress);
    if (n < 0) n = 0;
    if (n > pageCount - 1) n = pageCount - 1;
    setActive(n);
    /* the page you are turning onto is already in view, so it must be
       revealed before it becomes current or you flip onto blank paper */
    if (n + 1 < pageCount) revealPage(pages[n + 1]);
  }

  function queue() {
    if (!frame && enabled) frame = window.requestAnimationFrame(write);
  }

  /* ---------- mode ---------- */

  function enable() {
    if (enabled) return;
    enabled = true;
    root.classList.add('fx-book');
    rail.style.height = (pageCount * 100) + 'svh';
    write();
  }

  function disable() {
    if (!enabled) return;
    enabled = false;
    root.classList.remove('fx-book');
    rail.style.height = '';
    active = -1;
    for (var i = 0; i < pageCount; i++) {
      pages[i].style.removeProperty('--turn');
      pages[i].classList.remove('is-current');
      pages[i].removeAttribute('inert');
      pages[i].removeAttribute('aria-hidden');
      /* everything stays visible in the scrolling fallback */
      revealPage(pages[i]);
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
    pageCount = pages.length;
    if (!stage || !rail || !pageCount) return;

    for (var i = 0; i < pageCount; i++) pages[i].style.setProperty('--n', i);
    book.style.setProperty('--pages', pageCount);

    /* build the scroll rail: one snap slot per page */
    var frag = document.createDocumentFragment();
    for (var s = 0; s < pageCount; s++) {
      var slot = document.createElement('div');
      slot.className = 'book__slot';
      frag.appendChild(slot);
    }
    rail.appendChild(frag);

    syncMode();

    /* pages are fixed in book mode, so a plain #hash jump has nothing to
       scroll to. Translate in page anchors into a scroll to that page's slot. */
    function pageIndexOf(id) {
      for (var i = 0; i < pageCount; i++) if (pages[i].id === id) return i;
      return -1;
    }

    function goTo(id) {
      var i = pageIndexOf(id);
      if (i < 0) return false;
      /* plain scrollTo, so the sheet's scroll-behavior wins and the whole
         thing honours prefers-reduced-motion without asking */
      window.scrollTo(0, i * (window.innerHeight || 0));
      return true;
    }

    document.addEventListener('click', function (e) {
      if (!enabled || e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      if (goTo(id)) {
        e.preventDefault();
        var target = document.getElementById(id);
        if (target) {
          /* move focus with the page so keyboard users land where they clicked */
          target.setAttribute('tabindex', '-1');
          try { target.focus({ preventScroll: true }); } catch (er) { target.focus(); }
        }
      }
    });

    /* deep link on load, and support back and forward between pages */
    function applyHash() {
      if (!enabled || !location.hash) return;
      goTo(location.hash.slice(1));
      queue();
    }
    window.addEventListener('hashchange', function () {
      if (!enabled) return;
      goTo(location.hash.slice(1));
    });
    if (location.hash) window.setTimeout(applyHash, 0);

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
    /* synchronous recompute, used after content changes and by tests */
    refresh: write,
    pageOffset: function (id) {
      for (var i = 0; i < pageCount; i++) if (pages[i].id === id) return i * (window.innerHeight || 0);
      return 0;
    },
    isEnabled: function () { return enabled; }
  };
})();
