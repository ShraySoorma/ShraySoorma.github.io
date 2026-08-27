/* A virtual filesystem generated from data.js. Adding a project to PROJECTS
   adds a file here with no other edits anywhere. */
(function () {
  'use strict';

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  var tree = { name: '~', type: 'dir', children: {} };

  function dir(parent, name) {
    if (!parent.children[name]) {
      parent.children[name] = { name: name, type: 'dir', children: {}, parent: parent };
    }
    return parent.children[name];
  }

  function file(parent, name, kind, payload) {
    parent.children[name] = { name: name, type: 'file', kind: kind, payload: payload, parent: parent };
    return parent.children[name];
  }

  function build() {
    var projects = dir(tree, 'projects');

    (window.PROJECTS || []).forEach(function (p) {
      file(projects, slug(p.name) + '.md', 'project', p);
    });

    if (window.AUTHOR) {
      file(tree, 'about.md', 'about', window.AUTHOR);
      file(tree, 'arsenal.txt', 'arsenal', window.AUTHOR.arsenal);
    }
    if (window.EXPERIENCE) {
      file(tree, 'experience.txt', 'experience', window.EXPERIENCE);
    }
    if (window.SITE) {
      file(tree, 'contact.txt', 'contact', window.SITE.links);
    }
  }

  /* resolve a path string against a starting directory */
  function resolve(from, path) {
    var node = from;
    if (!path || path === '.') return node;
    if (path === '~' || path === '/') return tree;

    var parts = String(path).split('/').filter(function (s) { return s && s !== '.'; });
    if (path.charAt(0) === '~' || path.charAt(0) === '/') {
      node = tree;
      if (parts[0] === '~') parts.shift();
    }

    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === '..') {
        node = node.parent || tree;
        continue;
      }
      if (node.type !== 'dir') return null;
      var next = node.children[parts[i]];
      /* let people type "cat charlore" and mean charlore.md */
      if (!next) next = node.children[parts[i] + '.md'] || node.children[parts[i] + '.txt'];
      if (!next) return null;
      node = next;
    }
    return node;
  }

  function pathOf(node) {
    var parts = [];
    while (node && node !== tree) { parts.unshift(node.name); node = node.parent; }
    return '~' + (parts.length ? '/' + parts.join('/') : '');
  }

  function list(node) {
    if (!node || node.type !== 'dir') return [];
    return Object.keys(node.children).map(function (k) { return node.children[k]; });
  }

  /* every path in the tree, for tab completion */
  function walk(node, base, out) {
    list(node).forEach(function (child) {
      var p = base + child.name + (child.type === 'dir' ? '/' : '');
      out.push(p);
      if (child.type === 'dir') walk(child, p, out);
    });
    return out;
  }

  /* search the whole tree for a file by name or stem, so "cat charlore" works
     from anywhere rather than only from inside ~/projects */
  function find(name) {
    var want = String(name || '').toLowerCase().replace(/\.(md|txt)$/, '');
    var hit = null;
    (function scan(node) {
      list(node).forEach(function (child) {
        if (hit) return;
        if (child.type === 'dir') return scan(child);
        var stem = child.name.toLowerCase().replace(/\.(md|txt)$/, '');
        if (stem === want) hit = child;
      });
    })(tree);
    return hit;
  }

  window.FS = {
    build: build,
    find: find,
    root: function () { return tree; },
    resolve: resolve,
    pathOf: pathOf,
    list: list,
    all: function () { return walk(tree, '', []); },
    slug: slug
  };
})();
