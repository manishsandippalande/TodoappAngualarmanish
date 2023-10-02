(() => {
  "use strict";
  var e,
    _ = {},
    v = {};
  function n(e) {
    var o = v[e];
    if (void 0 !== o) return o.exports;
    var r = (v[e] = { exports: {} });
    return _[e](r, r.exports, n), r.exports;
  }
  (n.m = _),
    (e = []),
    (n.O = (o, r, f, l) => {
      if (!r) {
        var u = 1 / 0;
        for (a = 0; a < e.length; a++) {
          for (var [r, f, l] = e[a], i = !0, s = 0; s < r.length; s++)
            (!1 & l || u >= l) && Object.keys(n.O).every((p) => n.O[p](r[s]))
              ? r.splice(s--, 1)
              : ((i = !1), l < u && (u = l));
          if (i) {
            e.splice(a--, 1);
            var t = f();
            void 0 !== t && (o = t);
          }
        }
        return o;
      }
      l = l || 0;
      for (var a = e.length; a > 0 && e[a - 1][2] > l; a--) e[a] = e[a - 1];
      e[a] = [r, f, l];
    }),
    (n.o = (e, o) => Object.prototype.hasOwnProperty.call(e, o)),
    (() => {
      var e = { 666: 0 };
      n.O.j = (f) => 0 === e[f];
      var o = (f, l) => {
          var s,
            t,
            [a, u, i] = l,
            c = 0;
          if (a.some((h) => 0 !== e[h])) {
            for (s in u) n.o(u, s) && (n.m[s] = u[s]);
            if (i) var d = i(n);
          }
          for (f && f(l); c < a.length; c++)
            n.o(e, (t = a[c])) && e[t] && e[t][0](), (e[t] = 0);
          return n.O(d);
        },
        r = (self.webpackChunkmanish_todo_list =
          self.webpackChunkmanish_todo_list || []);
      r.forEach(o.bind(null, 0)), (r.push = o.bind(null, r.push.bind(r)));
    })();
})();
