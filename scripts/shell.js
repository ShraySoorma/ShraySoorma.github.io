/* The shell. Parses a line, runs a built-in, hands the renderer a result.
   Nav buttons call Shell.run with the same string a visitor would type, so
   the clicking path and the typing path are one code path. */
(function () {
  'use strict';

  var cwd = null;
  var history = [];
  var histIndex = -1;
  var out = null;
  var onCwdChange = null;

  var HELP = [
    { cmd: 'ls',        desc: 'list what is in the current directory' },
    { cmd: 'cd <dir>',  desc: 'change directory, cd .. to go up', run: 'cd projects' },
    { cmd: 'cat <file>',desc: 'read a file, tab completes', run: 'cat projects/charlore.md' },
    { cmd: 'whoami',    desc: 'who is running this' },
    { cmd: 'arsenal',   desc: 'the stack, grouped' },
    { cmd: 'contact',   desc: 'how to reach me' },
    { cmd: 'neofetch',  desc: 'system summary' },
    { cmd: 'clear',     desc: 'wipe the screen' },
    { cmd: 'help',      desc: 'this list' }
  ];

  function print(node) {
    if (!node || !out) return;
    out.appendChild(node);
    out.scrollTop = out.scrollHeight;
  }

  function prompt() {
    return 'shray@soorma:' + window.FS.pathOf(cwd) + '$';
  }

  /* ---------- file dispatch ---------- */

  function openFile(node) {
    if (node.kind === 'project') return window.Render.project(node.payload);
    if (node.kind === 'about')   return window.Render.about(node.payload);
    if (node.kind === 'arsenal') return window.Render.arsenal(node.payload);
    if (node.kind === 'contact') return window.Render.contact(node.payload);
    return window.Render.error('cat: ' + node.name + ': unknown format');
  }

  /* ---------- built-ins ---------- */

  var CMDS = {
    help: function () { return window.Render.help(HELP); },

    ls: function (args) {
      var target = args[0] ? window.FS.resolve(cwd, args[0]) : cwd;
      if (!target) return window.Render.error('ls: ' + args[0] + ': no such file or directory');
      if (target.type === 'file') return window.Render.text(target.name);
      return window.Render.ls(window.FS.list(target), window.FS.pathOf(target));
    },

    cd: function (args) {
      var target = window.FS.resolve(cwd, args[0] || '~');
      if (!target) return window.Render.error('cd: ' + args[0] + ': no such directory');
      if (target.type !== 'dir') return window.Render.error('cd: ' + target.name + ': not a directory');
      cwd = target;
      if (onCwdChange) onCwdChange(window.FS.pathOf(cwd));
      return null;
    },

    cat: function (args) {
      if (!args[0]) return window.Render.error('cat: missing file name. Try: ls');
      var node = window.FS.resolve(cwd, args[0]) || window.FS.find(args[0]);
      if (!node) return window.Render.error('cat: ' + args[0] + ': no such file');
      if (node.type === 'dir') return window.Render.error('cat: ' + node.name + ': is a directory');
      return openFile(node);
    },

    whoami: function () {
      var n = window.FS.resolve(window.FS.root(), 'about.md');
      return n ? openFile(n) : window.Render.error('whoami: no record');
    },

    arsenal: function () {
      var n = window.FS.resolve(window.FS.root(), 'arsenal.txt');
      return n ? openFile(n) : window.Render.error('arsenal: not found');
    },

    contact: function () {
      var n = window.FS.resolve(window.FS.root(), 'contact.txt');
      return n ? openFile(n) : window.Render.error('contact: not found');
    },

    neofetch: function () {
      var a = window.AUTHOR || {};
      var count = (window.PROJECTS || []).length;
      var rows = [
        ['user',    (window.SITE && window.SITE.name) || 'shray'],
        ['role',    a.tagline || ''],
        ['work',    a.work || ''],
        ['shell',   'soorma-sh 1.0'],
        ['projects', count + ' production shipped, more under NDA'],
        ['stack',   'typescript, rust, swift, sql'],
        ['contact', (window.SITE && window.SITE.links && window.SITE.links[0].value) || '']
      ].map(function (r) {
        return '<tr><td class="k">' + window.Render.esc(r[0]) + '</td><td class="v">' + window.Render.esc(r[1]) + '</td></tr>';
      }).join('');

      var art = [
        ' ___ ___ ',
        '/ __/ __|',
        '\\__ \\__ \\',
        '|___/___/'
      ].join('\n');

      return window.Render.raw(
        '<div class="fetch"><pre class="fetch__art" aria-hidden="true">' + window.Render.esc(art) +
        '</pre><table class="kv"><tbody>' + rows + '</tbody></table></div>', 'out--fetch');
    },

    clear: function () {
      if (out) out.innerHTML = '';
      return null;
    },

    sudo: function () {
      return window.Render.text('nice try. This account is not in the sudoers file. The incident has been reported.', 'out--warn');
    },

    open: function (args) { return CMDS.cat(args); },
    stack: function () { return CMDS.arsenal(); },
    about: function () { return CMDS.whoami(); }
  };

  /* ---------- run ---------- */

  function run(line, opts) {
    opts = opts || {};
    var raw = String(line || '').trim();
    if (!raw) return;

    if (opts.echo !== false) print(window.Render.echo(prompt(), raw));
    if (raw && history[history.length - 1] !== raw) history.push(raw);
    histIndex = history.length;

    var parts = raw.split(/\s+/);
    var name = parts[0].toLowerCase();
    var args = parts.slice(1);

    var fn = CMDS[name];
    if (!fn) {
      print(window.Render.error(name + ': command not found. Try: help'));
      return;
    }
    print(fn(args));
  }

  /* ---------- completion and history ---------- */

  /* longest string every candidate starts with, the way a real shell fills in
     as far as it unambiguously can rather than giving up on a tie */
  function commonPrefix(list) {
    if (!list.length) return '';
    var p = list[0];
    for (var i = 1; i < list.length; i++) {
      var j = 0;
      while (j < p.length && j < list[i].length && p.charAt(j) === list[i].charAt(j)) j++;
      p = p.slice(0, j);
      if (!p) break;
    }
    return p;
  }

  function complete(line) {
    var parts = String(line).split(/\s+/);

    if (parts.length <= 1) {
      var names = Object.keys(CMDS).filter(function (c) { return c.indexOf(parts[0]) === 0; });
      if (!names.length) return line;
      if (names.length === 1) return names[0] + ' ';
      return commonPrefix(names);
    }

    var frag = parts[parts.length - 1];
    var here = window.FS.list(cwd).map(function (n) {
      return n.name + (n.type === 'dir' ? '/' : '');
    });
    var all = window.FS.all();

    /* prefer what is in the current directory, then any path, then match on a
       bare filename so "cat char" finds projects/charlore.md from anywhere */
    var hits = here.filter(function (p) { return p.indexOf(frag) === 0; });
    if (!hits.length) hits = all.filter(function (p) { return p.indexOf(frag) === 0; });
    if (!hits.length) {
      hits = all.filter(function (p) {
        var base = p.replace(/\/$/, '').split('/').pop();
        return base.indexOf(frag) === 0;
      });
    }
    if (!hits.length) return line;

    parts[parts.length - 1] = hits.length === 1 ? hits[0] : commonPrefix(hits);
    return parts.join(' ');
  }

  function prev() {
    if (!history.length) return null;
    histIndex = Math.max(0, histIndex - 1);
    return history[histIndex];
  }

  function next() {
    if (histIndex >= history.length - 1) { histIndex = history.length; return ''; }
    histIndex += 1;
    return history[histIndex];
  }

  window.Shell = {
    init: function (outEl, onCwd) {
      out = outEl;
      cwd = window.FS.root();
      onCwdChange = onCwd;
    },
    run: run,
    print: print,
    prompt: prompt,
    complete: complete,
    prev: prev,
    next: next,
    commands: function () { return Object.keys(CMDS); },
    helpRows: function () { return HELP; }
  };
})();
