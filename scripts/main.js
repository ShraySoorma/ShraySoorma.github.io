/* Wiring. Boot, build the filesystem, mount the shell, bind the prompt. */
(function () {
  'use strict';

  function byId(id) { return document.getElementById(id); }

  function buildNav() {
    var list = byId('nav-projects');
    if (!list) return;
    list.innerHTML = (window.PROJECTS || []).map(function (p) {
      var f = window.FS.slug(p.name) + '.md';
      return '<li><button class="ent" data-cmd="cat projects/' + f + '">' + window.Render.esc(f) + '</button></li>';
    }).join('');
  }

  function clock() {
    var el = byId('bar-clock');
    if (!el) return;
    function paint() {
      var d = new Date();
      el.textContent = d.toISOString().slice(0, 10) + ' ' +
        String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }
    paint();
    window.setInterval(function () {
      if (document.visibilityState === 'visible') paint();
    }, 30000);
  }

  function bindPrompt() {
    var form = byId('prompt-form');
    var input = byId('prompt');
    var ps1 = byId('ps1');
    var path = byId('bar-path');
    if (!form || !input) return;

    function syncPrompt(p) {
      if (ps1) ps1.textContent = 'shray@soorma:' + p + '$';
      if (path) path.textContent = p;
    }

    window.Shell.init(byId('out'), syncPrompt);
    syncPrompt('~');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value;
      input.value = '';
      window.Shell.run(v);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        var p = window.Shell.prev();
        if (p != null) { input.value = p; e.preventDefault(); }
      } else if (e.key === 'ArrowDown') {
        var n = window.Shell.next();
        if (n != null) { input.value = n; e.preventDefault(); }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        input.value = window.Shell.complete(input.value);
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        window.Shell.run('clear', { echo: false });
      }
    });

    /* clicking any entry runs the command a visitor would have typed */
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-cmd]') : null;
      if (!btn) return;
      e.preventDefault();
      window.Shell.run(btn.getAttribute('data-cmd'));
      input.focus();
    });

    /* clicking dead space in the terminal focuses the prompt, like a real one */
    var wm = document.querySelector('.wm');
    if (wm) {
      wm.addEventListener('pointerdown', function (e) {
        if (e.target.closest('a, button, input, .out-scroll')) return;
        input.focus();
      });
    }
  }

  function firstRun() {
    window.Shell.run('neofetch', { echo: false });
    window.Shell.print(window.Render.text(
      'Type help for the command list, or click anything in the nav.', 'out--dim'));
    window.Shell.run('ls');
  }

  function boot() {
    try {
      window.FS.build();
      buildNav();
      clock();
      bindPrompt();
    } catch (e) {
      if (window.console) console.error('[init]', e);
    }

    window.Boot.start(function () {
      try {
        firstRun();
        window.Ambient.init();
        var input = byId('prompt');
        if (input && window.matchMedia && window.matchMedia('(min-width: 900px)').matches) input.focus();
      } catch (e) {
        if (window.console) console.error('[start]', e);
      }
    });
  }

  boot();
})();
