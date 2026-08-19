/* Boot order: render content, then wire effects onto the rendered DOM. */
(function () {
  'use strict';

  function boot() {
    try {
      if (window.Panels) window.Panels.render();
    } catch (e) {
      /* content failure must never blank the page */
      if (window.console) console.error('[panels]', e);
    }

    var year = document.getElementById('colophon-year');
    if (year) year.textContent = new Date().getFullYear();

    /* last resort: if anything above stalled, reveal the page anyway */
    setTimeout(function () {
      document.documentElement.classList.add('is-loaded');
    }, 2400);

    /* circuit breaker: if the reveal observer never fired, drop the animation
       gate so the page is readable rather than a wall of blank paper.
       Skipped while the tab is hidden, since browsers freeze the observer
       there and a backgrounded load would lose its animations for good. */
    function revealCheck() {
      if (document.visibilityState !== 'visible') return;
      if (!document.querySelector('.panel.is-inview')) {
        document.documentElement.classList.remove('fx-anim');
      }
    }
    setTimeout(revealCheck, 4000);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') setTimeout(revealCheck, 1500);
    });
  }

  /* deferred, so the DOM is already parsed and fx.js boots after this */
  boot();
})();
