/* ============================================================
   fx.js  Golden Age comic animation driver
   Classic script, no modules, no dependencies. Exposes window.FX.
   Every module is defensive and no-ops when unsupported.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Shared state and helpers ---------- */
  var root = document.documentElement;
  var rmQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var loops = [];
  var cursorDot = null;
  var booted = false;
  var easeCache = {};

  function reducedMotion() {
    return !!(rmQuery && rmQuery.matches);
  }

  function qsa(sel, scope) {
    try {
      return Array.prototype.slice.call((scope || document).querySelectorAll(sel));
    } catch (e) {
      return [];
    }
  }

  function clamp(v, lo, hi) {
    return v < lo ? lo : (v > hi ? hi : v);
  }

  function onReady(cb) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", cb, { once: true, passive: true });
    } else {
      cb();
    }
  }

  function safe(fn, label) {
    try {
      fn();
    } catch (e) {
      if (window.console && console.warn) console.warn("FX module failed: " + label, e);
    }
  }

  function ease(token) {
    if (!easeCache[token]) {
      var v = "";
      try { v = window.getComputedStyle(root).getPropertyValue(token).trim(); } catch (e) {}
      easeCache[token] = v || "ease-out";
    }
    return easeCache[token];
  }

  /* ---------- rAF loop registry, paused while the tab is hidden ---------- */
  function addLoop(fn) {
    var state = { running: false, id: 0 };
    function tick() {
      if (!state.running) return;
      fn();
      state.id = window.requestAnimationFrame(tick);
    }
    state.start = function () {
      if (state.running || !window.requestAnimationFrame) return;
      state.running = true;
      state.id = window.requestAnimationFrame(tick);
    };
    state.stop = function () {
      state.running = false;
      if (state.id) window.cancelAnimationFrame(state.id);
    };
    loops.push(state);
    state.start();
    return state;
  }

  document.addEventListener("visibilitychange", function () {
    var i;
    if (document.hidden) {
      for (i = 0; i < loops.length; i++) loops[i].stop();
    } else if (!reducedMotion()) {
      for (i = 0; i < loops.length; i++) loops[i].start();
    }
  }, { passive: true });

  /* ---------- Live reduced-motion flip: stop loops, drop the cursor ---------- */
  function onRMFlip() {
    if (!reducedMotion()) return;
    for (var i = 0; i < loops.length; i++) loops[i].stop();
    if (cursorDot && cursorDot.parentNode) cursorDot.parentNode.removeChild(cursorDot);
    cursorDot = null;
    root.classList.remove("fx-cursor");
  }
  if (rmQuery) {
    if (rmQuery.addEventListener) rmQuery.addEventListener("change", onRMFlip);
    else if (rmQuery.addListener) rmQuery.addListener(onRMFlip);
  }

  /* ---------- FX.splitLetters ---------- */
  function splitLetters(el) {
    if (!el || el.__fxSplit) return;
    var text = el.textContent || "";
    if (!text) return;
    el.__fxSplit = true;
    el.setAttribute("aria-label", text);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement("span");
      span.className = "letter";
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--i", String(i));
      span.textContent = text.charAt(i);
      frag.appendChild(span);
    }
    el.textContent = "";
    el.appendChild(frag);
  }

  /* ---------- FX.initPreloader ---------- */
  function initPreloader() {
    var finished = false;
    function removePre() {
      var pre = document.getElementById("preloader");
      if (pre && pre.parentNode) pre.parentNode.removeChild(pre);
    }
    function finish() {
      if (finished) return;
      finished = true;
      root.classList.add("is-loaded");
      var pre = document.getElementById("preloader");
      if (!pre) return;
      if (reducedMotion()) { removePre(); return; }
      var last = pre.querySelector(".preloader__half--r") || pre;
      last.addEventListener("transitionend", function (e) {
        if (e.propertyName === "transform") removePre();
      }, { passive: true });
      window.setTimeout(removePre, 1900);
    }
    /* Hard failsafe: the page is never left covered past 2000ms */
    window.setTimeout(finish, 2000);
    onReady(function () {
      var go = function () { window.setTimeout(finish, 250); };
      if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === "function") {
        document.fonts.ready.then(go, go);
      } else {
        go();
      }
    });
  }

  /* ---------- FX.initInView ---------- */
  function initInView(sel) {
    var selector = (typeof sel === "string" && sel) ? sel : ".panel, .issue, [data-stagger], [data-inview]";
    var targets = qsa(selector);
    var containers = qsa("[data-stagger]");
    for (var c = 0; c < containers.length; c++) {
      var kids = containers[c].children;
      for (var k = 0; k < kids.length; k++) {
        kids[k].style.setProperty("--i", String(k));
      }
    }
    function revealAll() {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add("is-inview");
    }
    if (!("IntersectionObserver" in window) || reducedMotion()) {
      revealAll();
      return;
    }
    try {
      var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue;
          entries[i].target.classList.add("is-inview");
          io.unobserve(entries[i].target);
        }
      }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
      for (var j = 0; j < targets.length; j++) io.observe(targets[j]);
    } catch (e) {
      revealAll();
    }
  }

  /* ---------- FX.initTilt ---------- */
  function initTilt() {
    if (reducedMotion() || !window.requestAnimationFrame) return;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    var panels = qsa(".panel");
    if (!panels.length) return;
    var MAX = 8;
    var frame = 0;
    var active = null;
    function apply() {
      frame = 0;
      if (!active) return;
      var px = clamp((active.x - active.rect.left) / active.rect.width, 0, 1);
      var py = clamp((active.y - active.rect.top) / active.rect.height, 0, 1);
      var s = active.el.style;
      s.setProperty("--tilt-x", ((0.5 - py) * 2 * MAX).toFixed(2) + "deg");
      s.setProperty("--tilt-y", ((px - 0.5) * 2 * MAX).toFixed(2) + "deg");
      s.setProperty("--px", px.toFixed(3));
      s.setProperty("--py", py.toFixed(3));
    }
    function onEnter(e) {
      active = {
        el: e.currentTarget,
        rect: e.currentTarget.getBoundingClientRect(),
        x: e.clientX,
        y: e.clientY
      };
    }
    function onMove(e) {
      if (!active || active.el !== e.currentTarget) onEnter(e);
      active.x = e.clientX;
      active.y = e.clientY;
      if (!frame) frame = window.requestAnimationFrame(apply);
    }
    function onLeave(e) {
      var s = e.currentTarget.style;
      s.setProperty("--tilt-x", "0deg");
      s.setProperty("--tilt-y", "0deg");
      s.setProperty("--px", "0.5");
      s.setProperty("--py", "0.5");
      if (active && active.el === e.currentTarget) active = null;
    }
    for (var i = 0; i < panels.length; i++) {
      panels[i].addEventListener("pointerenter", onEnter, { passive: true });
      panels[i].addEventListener("pointermove", onMove, { passive: true });
      panels[i].addEventListener("pointerleave", onLeave, { passive: true });
    }
  }

  /* ---------- FX.initCursor ---------- */
  function initCursor() {
    if (reducedMotion() || !window.requestAnimationFrame || !document.body) return;
    if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
    if (cursorDot) return;
    cursorDot = document.createElement("div");
    cursorDot.className = "ink-cursor";
    cursorDot.setAttribute("aria-hidden", "true");
    cursorDot.innerHTML =
      '<svg class="ink-cursor__arrow" viewBox="0 0 24 30" focusable="false">' +
        '<path class="ink-cursor__plate" d="M2 1 L2 23 L8 17.5 L11.5 26 L15.5 24 L12 16 L20 15.5 Z"/>' +
        '<path class="ink-cursor__blade" d="M2 1 L2 23 L8 17.5 L11.5 26 L15.5 24 L12 16 L20 15.5 Z"/>' +
      '</svg>';
    document.body.appendChild(cursorDot);
    root.classList.add("fx-cursor");
    var tx = -100, ty = -100;
    var dx = -100, dy = -100;
    var scale = 1, targetScale = 1, pressScale = 1;
    document.addEventListener("pointermove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
    }, { passive: true });
    document.addEventListener("pointerover", function (e) {
      var t = e.target;
      var hit = (t && t.closest) ? t.closest("a, button, .btn, .panel, [data-cursor]") : null;
      targetScale = hit ? 1.3 : 1;
    }, { passive: true });
    document.addEventListener("pointerdown", function () { pressScale = 0.72; }, { passive: true });
    document.addEventListener("pointerup", function () { pressScale = 1; }, { passive: true });
    addLoop(function () {
      if (!cursorDot) return;
      /* dx trails the raw position only to derive a lean angle */
      dx += (tx - dx) * 0.42;
      dy += (ty - dy) * 0.42;
      scale += (targetScale * pressScale - scale) * 0.2;
      cursorDot.style.transform =
        "translate3d(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px,0) rotate(" +
        ((dx - tx) * 0.45).toFixed(2) + "deg) scale(" + scale.toFixed(3) + ")";
    });
  }

  /* ---------- FX.initParallax ---------- */
  function initParallax() {
    if (reducedMotion() || !window.requestAnimationFrame) return;
    var frame = 0;
    var sy = window.pageYOffset || 0;
    var mx = 0, my = 0;
    function write() {
      frame = 0;
      root.style.setProperty("--scroll-y", String(Math.round(sy)));
      root.style.setProperty("--mx", mx.toFixed(3));
      root.style.setProperty("--my", my.toFixed(3));
    }
    function queue() {
      if (!frame) frame = window.requestAnimationFrame(write);
    }
    window.addEventListener("scroll", function () {
      sy = window.pageYOffset || root.scrollTop || 0;
      queue();
    }, { passive: true });
    window.addEventListener("pointermove", function (e) {
      if (!window.innerWidth || !window.innerHeight) return;
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      queue();
    }, { passive: true });
    write();
  }

  /* ---------- FX.initTypewriter ---------- */
  function initTypewriter(sel) {
    var selector = (typeof sel === "string" && sel) ? sel : "[data-typewriter]";
    var els = qsa(selector);
    if (!els.length) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) return;
    function type(el) {
      var text = el.__fxText || "";
      if (!text) return;
      var h = el.offsetHeight;
      if (h) el.style.minHeight = h + "px";
      el.textContent = "";
      el.classList.add("is-typing");
      var i = 0;
      var timer = window.setInterval(function () {
        i++;
        el.textContent = text.slice(0, i);
        if (i < text.length) return;
        window.clearInterval(timer);
        el.textContent = text;
        window.setTimeout(function () {
          el.classList.remove("is-typing");
          el.style.minHeight = "";
        }, 700);
      }, 18);
    }
    try {
      var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue;
          io.unobserve(entries[i].target);
          type(entries[i].target);
        }
      }, { threshold: 0.4 });
      for (var j = 0; j < els.length; j++) {
        els[j].__fxText = els[j].textContent;
        els[j].setAttribute("aria-label", els[j].__fxText);
        io.observe(els[j]);
      }
    } catch (e) {}
  }

  /* ---------- FX.initBursts ---------- */
  function initBursts() {
    if (reducedMotion()) return;
    if (!window.Element || !Element.prototype.animate) return;
    var panels = qsa(".panel");
    var THROTTLE = 650;
    function onEnter(e) {
      var b = e.currentTarget.querySelector(".burst");
      if (!b) return;
      var now = Date.now();
      if (b.__fxLast && now - b.__fxLast < THROTTLE) return;
      b.__fxLast = now;
      b.animate([
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(1.22) rotate(-4deg)", offset: 0.4 },
        { transform: "scale(0.96) rotate(1.5deg)", offset: 0.72 },
        { transform: "scale(1) rotate(0deg)" }
      ], { duration: 560, easing: ease("--ease-thwack") });
    }
    for (var i = 0; i < panels.length; i++) {
      panels[i].addEventListener("pointerenter", onEnter, { passive: true });
    }
  }

  /* ---------- FX.initKonami ---------- */
  function initKonami() {
    var seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var pos = 0;
    document.addEventListener("keydown", function (e) {
      if (!e.key) return;
      var got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === seq[pos]) pos++;
      else pos = (got === seq[0]) ? 1 : 0;
      if (pos < seq.length) return;
      pos = 0;
      if (root.getAttribute("data-variant") === "villain") root.removeAttribute("data-variant");
      else root.setAttribute("data-variant", "villain");
      if (reducedMotion() || !window.Element || !Element.prototype.animate) return;
      var b = document.querySelector(".burst");
      if (!b) return;
      b.animate([
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(1.8) rotate(-8deg)", offset: 0.35 },
        { transform: "scale(0.92) rotate(3deg)", offset: 0.7 },
        { transform: "scale(1) rotate(0deg)" }
      ], { duration: 900, easing: ease("--ease-thwack") });
    }, { passive: true });
  }

  /* ---------- FX.initAll ---------- */
  function initAll() {
    if (booted) return;
    booted = true;
    root.classList.add("fx-anim");
    safe(initPreloader, "preloader");
    onReady(function () {
      safe(function () {
        var names = qsa(".cover__name:not(.cover__name--red):not(.cover__name--blue)");
        for (var i = 0; i < names.length; i++) splitLetters(names[i]);
      }, "splitLetters");
      safe(initInView, "inView");
      safe(initTilt, "tilt");
      safe(initCursor, "cursor");
      safe(initParallax, "parallax");
      safe(initTypewriter, "typewriter");
      safe(initBursts, "bursts");
      safe(initKonami, "konami");
    });
  }

  /* ---------- Export + guarded auto-boot ---------- */
  window.FX = {
    reducedMotion: reducedMotion,
    splitLetters: splitLetters,
    initPreloader: initPreloader,
    initInView: initInView,
    initTilt: initTilt,
    initCursor: initCursor,
    initParallax: initParallax,
    initTypewriter: initTypewriter,
    initBursts: initBursts,
    initKonami: initKonami,
    initAll: initAll
  };
  initAll();
})();
