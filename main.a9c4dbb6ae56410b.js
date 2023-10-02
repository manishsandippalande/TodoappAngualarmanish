"use strict";
(self.webpackChunkmanish_todo_list =
  self.webpackChunkmanish_todo_list || []).push([
  [179],
  {
    239: () => {
      function K(e) {
        return "function" == typeof e;
      }
      function _o(e) {
        const r = e((n) => {
          Error.call(n), (n.stack = new Error().stack);
        });
        return (
          (r.prototype = Object.create(Error.prototype)),
          (r.prototype.constructor = r),
          r
        );
      }
      const Zi = _o(
        (e) =>
          function (r) {
            e(this),
              (this.message = r
                ? `${r.length} errors occurred during unsubscription:\n${r
                    .map((n, o) => `${o + 1}) ${n.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = r);
          }
      );
      function Do(e, t) {
        if (e) {
          const r = e.indexOf(t);
          0 <= r && e.splice(r, 1);
        }
      }
      class et {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: r } = this;
            if (r)
              if (((this._parentage = null), Array.isArray(r)))
                for (const i of r) i.remove(this);
              else r.remove(this);
            const { initialTeardown: n } = this;
            if (K(n))
              try {
                n();
              } catch (i) {
                t = i instanceof Zi ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Yf(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Zi ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Zi(t);
          }
        }
        add(t) {
          var r;
          if (t && t !== this)
            if (this.closed) Yf(t);
            else {
              if (t instanceof et) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (r = this._finalizers) && void 0 !== r ? r : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: r } = this;
          return r === t || (Array.isArray(r) && r.includes(t));
        }
        _addParent(t) {
          const { _parentage: r } = this;
          this._parentage = Array.isArray(r) ? (r.push(t), r) : r ? [r, t] : t;
        }
        _removeParent(t) {
          const { _parentage: r } = this;
          r === t ? (this._parentage = null) : Array.isArray(r) && Do(r, t);
        }
        remove(t) {
          const { _finalizers: r } = this;
          r && Do(r, t), t instanceof et && t._removeParent(this);
        }
      }
      et.EMPTY = (() => {
        const e = new et();
        return (e.closed = !0), e;
      })();
      const Wf = et.EMPTY;
      function Zf(e) {
        return (
          e instanceof et ||
          (e && "closed" in e && K(e.remove) && K(e.add) && K(e.unsubscribe))
        );
      }
      function Yf(e) {
        K(e) ? e() : e.unsubscribe();
      }
      const jn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Yi = {
          setTimeout(e, t, ...r) {
            const { delegate: n } = Yi;
            return n?.setTimeout
              ? n.setTimeout(e, t, ...r)
              : setTimeout(e, t, ...r);
          },
          clearTimeout(e) {
            const { delegate: t } = Yi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Qf(e) {
        Yi.setTimeout(() => {
          const { onUnhandledError: t } = jn;
          if (!t) throw e;
          t(e);
        });
      }
      function _u() {}
      const ME = Du("C", void 0, void 0);
      function Du(e, t, r) {
        return { kind: e, value: t, error: r };
      }
      let $n = null;
      function Qi(e) {
        if (jn.useDeprecatedSynchronousErrorHandling) {
          const t = !$n;
          if ((t && ($n = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: r, error: n } = $n;
            if ((($n = null), r)) throw n;
          }
        } else e();
      }
      class Cu extends et {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Zf(t) && t.add(this))
              : (this.destination = xE);
        }
        static create(t, r, n) {
          return new Co(t, r, n);
        }
        next(t) {
          this.isStopped
            ? Eu(
                (function AE(e) {
                  return Du("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Eu(
                (function SE(e) {
                  return Du("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Eu(ME, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const NE = Function.prototype.bind;
      function wu(e, t) {
        return NE.call(e, t);
      }
      class RE {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: r } = this;
          if (r.next)
            try {
              r.next(t);
            } catch (n) {
              Ki(n);
            }
        }
        error(t) {
          const { partialObserver: r } = this;
          if (r.error)
            try {
              r.error(t);
            } catch (n) {
              Ki(n);
            }
          else Ki(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (r) {
              Ki(r);
            }
        }
      }
      class Co extends Cu {
        constructor(t, r, n) {
          let o;
          if ((super(), K(t) || !t))
            o = {
              next: t ?? void 0,
              error: r ?? void 0,
              complete: n ?? void 0,
            };
          else {
            let i;
            this && jn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && wu(t.next, i),
                  error: t.error && wu(t.error, i),
                  complete: t.complete && wu(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new RE(o);
        }
      }
      function Ki(e) {
        jn.useDeprecatedSynchronousErrorHandling
          ? (function TE(e) {
              jn.useDeprecatedSynchronousErrorHandling &&
                $n &&
                (($n.errorThrown = !0), ($n.error = e));
            })(e)
          : Qf(e);
      }
      function Eu(e, t) {
        const { onStoppedNotification: r } = jn;
        r && Yi.setTimeout(() => r(e, t));
      }
      const xE = {
          closed: !0,
          next: _u,
          error: function OE(e) {
            throw e;
          },
          complete: _u,
        },
        bu =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function _n(e) {
        return e;
      }
      function Kf(e) {
        return 0 === e.length
          ? _n
          : 1 === e.length
          ? e[0]
          : function (r) {
              return e.reduce((n, o) => o(n), r);
            };
      }
      let ve = (() => {
        class e {
          constructor(r) {
            r && (this._subscribe = r);
          }
          lift(r) {
            const n = new e();
            return (n.source = this), (n.operator = r), n;
          }
          subscribe(r, n, o) {
            const i = (function kE(e) {
              return (
                (e && e instanceof Cu) ||
                ((function FE(e) {
                  return e && K(e.next) && K(e.error) && K(e.complete);
                })(e) &&
                  Zf(e))
              );
            })(r)
              ? r
              : new Co(r, n, o);
            return (
              Qi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(r) {
            try {
              return this._subscribe(r);
            } catch (n) {
              r.error(n);
            }
          }
          forEach(r, n) {
            return new (n = Jf(n))((o, i) => {
              const s = new Co({
                next: (a) => {
                  try {
                    r(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(r) {
            var n;
            return null === (n = this.source) || void 0 === n
              ? void 0
              : n.subscribe(r);
          }
          [bu]() {
            return this;
          }
          pipe(...r) {
            return Kf(r)(this);
          }
          toPromise(r) {
            return new (r = Jf(r))((n, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => n(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Jf(e) {
        var t;
        return null !== (t = e ?? jn.Promise) && void 0 !== t ? t : Promise;
      }
      const LE = _o(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Et = (() => {
        class e extends ve {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(r) {
            const n = new Xf(this, this);
            return (n.operator = r), n;
          }
          _throwIfClosed() {
            if (this.closed) throw new LE();
          }
          next(r) {
            Qi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const n of this.currentObservers) n.next(r);
              }
            });
          }
          error(r) {
            Qi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = r);
                const { observers: n } = this;
                for (; n.length; ) n.shift().error(r);
              }
            });
          }
          complete() {
            Qi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: r } = this;
                for (; r.length; ) r.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var r;
            return (
              (null === (r = this.observers) || void 0 === r
                ? void 0
                : r.length) > 0
            );
          }
          _trySubscribe(r) {
            return this._throwIfClosed(), super._trySubscribe(r);
          }
          _subscribe(r) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(r),
              this._innerSubscribe(r)
            );
          }
          _innerSubscribe(r) {
            const { hasError: n, isStopped: o, observers: i } = this;
            return n || o
              ? Wf
              : ((this.currentObservers = null),
                i.push(r),
                new et(() => {
                  (this.currentObservers = null), Do(i, r);
                }));
          }
          _checkFinalizedStatuses(r) {
            const { hasError: n, thrownError: o, isStopped: i } = this;
            n ? r.error(o) : i && r.complete();
          }
          asObservable() {
            const r = new ve();
            return (r.source = this), r;
          }
        }
        return (e.create = (t, r) => new Xf(t, r)), e;
      })();
      class Xf extends Et {
        constructor(t, r) {
          super(), (this.destination = t), (this.source = r);
        }
        next(t) {
          var r, n;
          null ===
            (n =
              null === (r = this.destination) || void 0 === r
                ? void 0
                : r.next) ||
            void 0 === n ||
            n.call(r, t);
        }
        error(t) {
          var r, n;
          null ===
            (n =
              null === (r = this.destination) || void 0 === r
                ? void 0
                : r.error) ||
            void 0 === n ||
            n.call(r, t);
        }
        complete() {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === r ||
            r.call(t);
        }
        _subscribe(t) {
          var r, n;
          return null !==
            (n =
              null === (r = this.source) || void 0 === r
                ? void 0
                : r.subscribe(t)) && void 0 !== n
            ? n
            : Wf;
        }
      }
      function eh(e) {
        return K(e?.lift);
      }
      function Ce(e) {
        return (t) => {
          if (eh(t))
            return t.lift(function (r) {
              try {
                return e(r, this);
              } catch (n) {
                this.error(n);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function ye(e, t, r, n, o) {
        return new VE(e, t, r, n, o);
      }
      class VE extends Cu {
        constructor(t, r, n, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = r
              ? function (a) {
                  try {
                    r(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = n
              ? function () {
                  try {
                    n();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: r } = this;
            super.unsubscribe(),
              !r &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function J(e, t) {
        return Ce((r, n) => {
          let o = 0;
          r.subscribe(
            ye(n, (i) => {
              n.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Dn(e) {
        return this instanceof Dn ? ((this.v = e), this) : new Dn(e);
      }
      function oh(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Au(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                r = t && e[t],
                n = 0;
              if (r) return r.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && n >= e.length && (e = void 0),
                      { value: e && e[n++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (r = {}),
            n("next"),
            n("throw"),
            n("return"),
            (r[Symbol.asyncIterator] = function () {
              return this;
            }),
            r);
        function n(i) {
          r[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const ih = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function sh(e) {
        return K(e?.then);
      }
      function ah(e) {
        return K(e[bu]);
      }
      function uh(e) {
        return Symbol.asyncIterator && K(e?.[Symbol.asyncIterator]);
      }
      function lh(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const ch = (function sb() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function dh(e) {
        return K(e?.[ch]);
      }
      function fh(e) {
        return (function rh(e, t, r) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            n = r.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            n[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof Dn
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(n[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const r = e.getReader();
          try {
            for (;;) {
              const { value: n, done: o } = yield Dn(r.read());
              if (o) return yield Dn(void 0);
              yield yield Dn(n);
            }
          } finally {
            r.releaseLock();
          }
        });
      }
      function hh(e) {
        return K(e?.getReader);
      }
      function tt(e) {
        if (e instanceof ve) return e;
        if (null != e) {
          if (ah(e))
            return (function ab(e) {
              return new ve((t) => {
                const r = e[bu]();
                if (K(r.subscribe)) return r.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (ih(e))
            return (function ub(e) {
              return new ve((t) => {
                for (let r = 0; r < e.length && !t.closed; r++) t.next(e[r]);
                t.complete();
              });
            })(e);
          if (sh(e))
            return (function lb(e) {
              return new ve((t) => {
                e.then(
                  (r) => {
                    t.closed || (t.next(r), t.complete());
                  },
                  (r) => t.error(r)
                ).then(null, Qf);
              });
            })(e);
          if (uh(e)) return ph(e);
          if (dh(e))
            return (function cb(e) {
              return new ve((t) => {
                for (const r of e) if ((t.next(r), t.closed)) return;
                t.complete();
              });
            })(e);
          if (hh(e))
            return (function db(e) {
              return ph(fh(e));
            })(e);
        }
        throw lh(e);
      }
      function ph(e) {
        return new ve((t) => {
          (function fb(e, t) {
            var r, n, o, i;
            return (function th(e, t, r, n) {
              return new (r || (r = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(n.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(n.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof r
                          ? i
                          : new r(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((n = n.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (r = oh(e); !(n = yield r.next()).done; )
                  if ((t.next(n.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  n && !n.done && (i = r.return) && (yield i.call(r));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((r) => t.error(r));
        });
      }
      function Xt(e, t, r, n = 0, o = !1) {
        const i = t.schedule(function () {
          r(), o ? e.add(this.schedule(null, n)) : this.unsubscribe();
        }, n);
        if ((e.add(i), !o)) return i;
      }
      function Me(e, t, r = 1 / 0) {
        return K(t)
          ? Me((n, o) => J((i, s) => t(n, i, o, s))(tt(e(n, o))), r)
          : ("number" == typeof t && (r = t),
            Ce((n, o) =>
              (function hb(e, t, r, n, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < n ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let y = !1;
                    tt(r(g, c++)).subscribe(
                      ye(
                        t,
                        (C) => {
                          o?.(C), i ? h(C) : t.next(C);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < n; ) {
                                const C = u.shift();
                                s ? Xt(t, s, () => p(C)) : p(C);
                              }
                              f();
                            } catch (C) {
                              t.error(C);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    ye(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(n, o, e, r)
            ));
      }
      function lr(e = 1 / 0) {
        return Me(_n, e);
      }
      const Lt = new ve((e) => e.complete());
      function Tu(e) {
        return e[e.length - 1];
      }
      function gh(e) {
        return K(Tu(e)) ? e.pop() : void 0;
      }
      function wo(e) {
        return (function gb(e) {
          return e && K(e.schedule);
        })(Tu(e))
          ? e.pop()
          : void 0;
      }
      function mh(e, t = 0) {
        return Ce((r, n) => {
          r.subscribe(
            ye(
              n,
              (o) => Xt(n, e, () => n.next(o), t),
              () => Xt(n, e, () => n.complete(), t),
              (o) => Xt(n, e, () => n.error(o), t)
            )
          );
        });
      }
      function vh(e, t = 0) {
        return Ce((r, n) => {
          n.add(e.schedule(() => r.subscribe(n), t));
        });
      }
      function yh(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ve((r) => {
          Xt(r, t, () => {
            const n = e[Symbol.asyncIterator]();
            Xt(
              r,
              t,
              () => {
                n.next().then((o) => {
                  o.done ? r.complete() : r.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ie(e, t) {
        return t
          ? (function wb(e, t) {
              if (null != e) {
                if (ah(e))
                  return (function vb(e, t) {
                    return tt(e).pipe(vh(t), mh(t));
                  })(e, t);
                if (ih(e))
                  return (function _b(e, t) {
                    return new ve((r) => {
                      let n = 0;
                      return t.schedule(function () {
                        n === e.length
                          ? r.complete()
                          : (r.next(e[n++]), r.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (sh(e))
                  return (function yb(e, t) {
                    return tt(e).pipe(vh(t), mh(t));
                  })(e, t);
                if (uh(e)) return yh(e, t);
                if (dh(e))
                  return (function Db(e, t) {
                    return new ve((r) => {
                      let n;
                      return (
                        Xt(r, t, () => {
                          (n = e[ch]()),
                            Xt(
                              r,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = n.next());
                                } catch (s) {
                                  return void r.error(s);
                                }
                                i ? r.complete() : r.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => K(n?.return) && n.return()
                      );
                    });
                  })(e, t);
                if (hh(e))
                  return (function Cb(e, t) {
                    return yh(fh(e), t);
                  })(e, t);
              }
              throw lh(e);
            })(e, t)
          : tt(e);
      }
      class dt extends Et {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const r = super._subscribe(t);
          return !r.closed && t.next(this._value), r;
        }
        getValue() {
          const { hasError: t, thrownError: r, _value: n } = this;
          if (t) throw r;
          return this._throwIfClosed(), n;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function x(...e) {
        return Ie(e, wo(e));
      }
      function _h(e = {}) {
        const {
          connector: t = () => new Et(),
          resetOnError: r = !0,
          resetOnComplete: n = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            u,
            l = 0,
            c = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = u = void 0), (c = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return Ce((g, y) => {
            l++, !d && !c && f();
            const C = (u = u ?? t());
            y.add(() => {
              l--, 0 === l && !d && !c && (a = Nu(p, o));
            }),
              C.subscribe(y),
              !s &&
                l > 0 &&
                ((s = new Co({
                  next: (m) => C.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = Nu(h, r, m)), C.error(m);
                  },
                  complete: () => {
                    (c = !0), f(), (a = Nu(h, n)), C.complete();
                  },
                })),
                tt(g).subscribe(s));
          })(i);
        };
      }
      function Nu(e, t, ...r) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const n = new Co({
          next: () => {
            n.unsubscribe(), e();
          },
        });
        return tt(t(...r)).subscribe(n);
      }
      function Vt(e, t) {
        return Ce((r, n) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && n.complete();
          r.subscribe(
            ye(
              n,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                tt(e(u, c)).subscribe(
                  (o = ye(
                    n,
                    (d) => n.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Ib(e, t) {
        return e === t;
      }
      function Z(e) {
        for (let t in e) if (e[t] === Z) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Ji(e, t) {
        for (const r in t)
          t.hasOwnProperty(r) && !e.hasOwnProperty(r) && (e[r] = t[r]);
      }
      function we(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(we).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const r = t.indexOf("\n");
        return -1 === r ? t : t.substring(0, r);
      }
      function Ru(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Mb = Z({ __forward_ref__: Z });
      function ee(e) {
        return (
          (e.__forward_ref__ = ee),
          (e.toString = function () {
            return we(this());
          }),
          e
        );
      }
      function R(e) {
        return Ou(e) ? e() : e;
      }
      function Ou(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(Mb) &&
          e.__forward_ref__ === ee
        );
      }
      function xu(e) {
        return e && !!e.ɵproviders;
      }
      const Dh = "https://g.co/ng/security#xss";
      class _ extends Error {
        constructor(t, r) {
          super(
            (function Xi(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, r)
          ),
            (this.code = t);
        }
      }
      function P(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Pu(e, t) {
        throw new _(-201, !1);
      }
      function ft(e, t) {
        null == e &&
          (function A(e, t, r, n) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == n ? "" : ` [Expected=> ${r} ${n} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function M(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function ht(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function es(e) {
        return Ch(e, ns) || Ch(e, wh);
      }
      function Ch(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function ts(e) {
        return e && (e.hasOwnProperty(Fu) || e.hasOwnProperty(Pb))
          ? e[Fu]
          : null;
      }
      const ns = Z({ ɵprov: Z }),
        Fu = Z({ ɵinj: Z }),
        wh = Z({ ngInjectableDef: Z }),
        Pb = Z({ ngInjectorDef: Z });
      var j = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(j || {});
      let ku;
      function qe(e) {
        const t = ku;
        return (ku = e), t;
      }
      function bh(e, t, r) {
        const n = es(e);
        return n && "root" == n.providedIn
          ? void 0 === n.value
            ? (n.value = n.factory())
            : n.value
          : r & j.Optional
          ? null
          : void 0 !== t
          ? t
          : void Pu(we(e));
      }
      const te = globalThis,
        Eo = {},
        Bu = "__NG_DI_FLAG__",
        rs = "ngTempTokenPath",
        Lb = /\n/gm,
        Mh = "__source";
      let cr;
      function Cn(e) {
        const t = cr;
        return (cr = e), t;
      }
      function $b(e, t = j.Default) {
        if (void 0 === cr) throw new _(-203, !1);
        return null === cr
          ? bh(e, void 0, t)
          : cr.get(e, t & j.Optional ? null : void 0, t);
      }
      function S(e, t = j.Default) {
        return (
          (function Eh() {
            return ku;
          })() || $b
        )(R(e), t);
      }
      function E(e, t = j.Default) {
        return S(e, os(t));
      }
      function os(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Uu(e) {
        const t = [];
        for (let r = 0; r < e.length; r++) {
          const n = R(e[r]);
          if (Array.isArray(n)) {
            if (0 === n.length) throw new _(900, !1);
            let o,
              i = j.Default;
            for (let s = 0; s < n.length; s++) {
              const a = n[s],
                u = Bb(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(S(o, i));
          } else t.push(S(n));
        }
        return t;
      }
      function bo(e, t) {
        return (e[Bu] = t), (e.prototype[Bu] = t), e;
      }
      function Bb(e) {
        return e[Bu];
      }
      function en(e) {
        return { toString: e }.toString();
      }
      var is = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(is || {}),
        bt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(bt || {});
      const jt = {},
        G = [],
        ss = Z({ ɵcmp: Z }),
        Hu = Z({ ɵdir: Z }),
        Gu = Z({ ɵpipe: Z }),
        Ah = Z({ ɵmod: Z }),
        tn = Z({ ɵfac: Z }),
        Io = Z({ __NG_ELEMENT_ID__: Z }),
        Th = Z({ __NG_ENV_ID__: Z });
      function Nh(e, t, r) {
        let n = e.length;
        for (;;) {
          const o = e.indexOf(t, r);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === n || e.charCodeAt(o + i) <= 32) return o;
          }
          r = o + 1;
        }
      }
      function zu(e, t, r) {
        let n = 0;
        for (; n < r.length; ) {
          const o = r[n];
          if ("number" == typeof o) {
            if (0 !== o) break;
            n++;
            const i = r[n++],
              s = r[n++],
              a = r[n++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = r[++n];
            Oh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), n++;
          }
        }
        return n;
      }
      function Rh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Oh(e) {
        return 64 === e.charCodeAt(0);
      }
      function Mo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let r = -1;
            for (let n = 0; n < t.length; n++) {
              const o = t[n];
              "number" == typeof o
                ? (r = o)
                : 0 === r ||
                  xh(e, r, o, null, -1 === r || 2 === r ? t[++n] : null);
            }
          }
        return e;
      }
      function xh(e, t, r, n, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === r) {
            if (null === n) return void (null !== o && (e[i + 1] = o));
            if (n === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== n && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, r),
          null !== n && e.splice(i++, 0, n),
          null !== o && e.splice(i++, 0, o);
      }
      const Ph = "ng-template";
      function Gb(e, t, r) {
        let n = 0,
          o = !0;
        for (; n < e.length; ) {
          let i = e[n++];
          if ("string" == typeof i && o) {
            const s = e[n++];
            if (r && "class" === i && -1 !== Nh(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; n < e.length && "string" == typeof (i = e[n++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Fh(e) {
        return 4 === e.type && e.value !== Ph;
      }
      function zb(e, t, r) {
        return t === (4 !== e.type || r ? e.value : Ph);
      }
      function qb(e, t, r) {
        let n = 4;
        const o = e.attrs || [],
          i = (function Yb(e) {
            for (let t = 0; t < e.length; t++) if (Rh(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & n) {
                if (
                  ((n = 2 | (1 & n)),
                  ("" !== u && !zb(e, u, r)) || ("" === u && 1 === t.length))
                ) {
                  if (It(n)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & n ? u : t[++a];
                if (8 & n && null !== e.attrs) {
                  if (!Gb(e.attrs, l, r)) {
                    if (It(n)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = Wb(8 & n ? "class" : u, o, Fh(e), r);
                if (-1 === d) {
                  if (It(n)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & n ? f : null;
                  if ((h && -1 !== Nh(h, l, 0)) || (2 & n && l !== f)) {
                    if (It(n)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !It(n) && !It(u)) return !1;
            if (s && It(u)) continue;
            (s = !1), (n = u | (1 & n));
          }
        }
        return It(n) || s;
      }
      function It(e) {
        return 0 == (1 & e);
      }
      function Wb(e, t, r, n) {
        if (null === t) return -1;
        let o = 0;
        if (n || !r) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function Qb(e, t) {
          let r = e.indexOf(4);
          if (r > -1)
            for (r++; r < e.length; ) {
              const n = e[r];
              if ("number" == typeof n) return -1;
              if (n === t) return r;
              r++;
            }
          return -1;
        })(t, e);
      }
      function kh(e, t, r = !1) {
        for (let n = 0; n < t.length; n++) if (qb(e, t[n], r)) return !0;
        return !1;
      }
      function Lh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function Jb(e) {
        let t = e[0],
          r = 1,
          n = 2,
          o = "",
          i = !1;
        for (; r < e.length; ) {
          let s = e[r];
          if ("string" == typeof s)
            if (2 & n) {
              const a = e[++r];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & n ? (o += "." + s) : 4 & n && (o += " " + s);
          else
            "" !== o && !It(s) && ((t += Lh(i, o)), (o = "")),
              (n = s),
              (i = i || !It(n));
          r++;
        }
        return "" !== o && (t += Lh(i, o)), t;
      }
      function Un(e) {
        return en(() => {
          const t = jh(e),
            r = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === is.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || bt.Emulated,
              styles: e.styles || G,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          $h(r);
          const n = e.dependencies;
          return (
            (r.directiveDefs = as(n, !1)),
            (r.pipeDefs = as(n, !0)),
            (r.id = (function sI(e) {
              let t = 0;
              const r = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of r) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(r)),
            r
          );
        });
      }
      function nI(e) {
        return U(e) || Se(e);
      }
      function rI(e) {
        return null !== e;
      }
      function Mt(e) {
        return en(() => ({
          type: e.type,
          bootstrap: e.bootstrap || G,
          declarations: e.declarations || G,
          imports: e.imports || G,
          exports: e.exports || G,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Vh(e, t) {
        if (null == e) return jt;
        const r = {};
        for (const n in e)
          if (e.hasOwnProperty(n)) {
            let o = e[n],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (r[o] = n),
              t && (t[o] = i);
          }
        return r;
      }
      function O(e) {
        return en(() => {
          const t = jh(e);
          return $h(t), t;
        });
      }
      function U(e) {
        return e[ss] || null;
      }
      function Se(e) {
        return e[Hu] || null;
      }
      function Le(e) {
        return e[Gu] || null;
      }
      function rt(e, t) {
        const r = e[Ah] || null;
        if (!r && !0 === t)
          throw new Error(`Type ${we(e)} does not have '\u0275mod' property.`);
        return r;
      }
      function jh(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || jt,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || G,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Vh(e.inputs, t),
          outputs: Vh(e.outputs),
        };
      }
      function $h(e) {
        e.features?.forEach((t) => t(e));
      }
      function as(e, t) {
        if (!e) return null;
        const r = t ? Le : nI;
        return () =>
          ("function" == typeof e ? e() : e).map((n) => r(n)).filter(rI);
      }
      const fe = 0,
        w = 1,
        L = 2,
        le = 3,
        St = 4,
        So = 5,
        Oe = 6,
        fr = 7,
        pe = 8,
        wn = 9,
        hr = 10,
        F = 11,
        Ao = 12,
        Bh = 13,
        pr = 14,
        ge = 15,
        To = 16,
        gr = 17,
        $t = 18,
        No = 19,
        Uh = 20,
        En = 21,
        nn = 22,
        Ro = 23,
        Oo = 24,
        $ = 25,
        qu = 1,
        Hh = 2,
        Bt = 7,
        mr = 9,
        Ae = 11;
      function Ze(e) {
        return Array.isArray(e) && "object" == typeof e[qu];
      }
      function Ve(e) {
        return Array.isArray(e) && !0 === e[qu];
      }
      function Wu(e) {
        return 0 != (4 & e.flags);
      }
      function Hn(e) {
        return e.componentOffset > -1;
      }
      function ls(e) {
        return 1 == (1 & e.flags);
      }
      function At(e) {
        return !!e.template;
      }
      function Zu(e) {
        return 0 != (512 & e[L]);
      }
      function Gn(e, t) {
        return e.hasOwnProperty(tn) ? e[tn] : null;
      }
      let Te = null,
        cs = !1;
      function pt(e) {
        const t = Te;
        return (Te = e), t;
      }
      const qh = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function Zh(e) {
        if (!Po(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !Kh(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function Qh(e) {
        (e.dirty = !0),
          (function Yh(e) {
            if (void 0 === e.liveConsumerNode) return;
            const t = cs;
            cs = !0;
            try {
              for (const r of e.liveConsumerNode) r.dirty || Qh(r);
            } finally {
              cs = t;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function Qu(e) {
        return e && (e.nextProducerIndex = 0), pt(e);
      }
      function Ku(e, t) {
        if (
          (pt(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (Po(e))
            for (let r = e.nextProducerIndex; r < e.producerNode.length; r++)
              ds(e.producerNode[r], e.producerIndexOfThis[r]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function Kh(e) {
        vr(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const r = e.producerNode[t],
            n = e.producerLastReadVersion[t];
          if (n !== r.version || (Zh(r), n !== r.version)) return !0;
        }
        return !1;
      }
      function Jh(e) {
        if ((vr(e), Po(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            ds(e.producerNode[t], e.producerIndexOfThis[t]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function ds(e, t) {
        if (
          ((function ep(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          vr(e),
          1 === e.liveConsumerNode.length)
        )
          for (let n = 0; n < e.producerNode.length; n++)
            ds(e.producerNode[n], e.producerIndexOfThis[n]);
        const r = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[r]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[r]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const n = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
          vr(o), (o.producerIndexOfThis[n] = t);
        }
      }
      function Po(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function vr(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let tp = null;
      const ip = () => {},
        _I = (() => ({
          ...qh,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: ip,
        }))();
      class DI {
        constructor(t, r, n) {
          (this.previousValue = t),
            (this.currentValue = r),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function gt() {
        return sp;
      }
      function sp(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = wI), CI;
      }
      function CI() {
        const e = up(this),
          t = e?.current;
        if (t) {
          const r = e.previous;
          if (r === jt) e.previous = t;
          else for (let n in t) r[n] = t[n];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function wI(e, t, r, n) {
        const o = this.declaredInputs[r],
          i =
            up(e) ||
            (function EI(e, t) {
              return (e[ap] = t);
            })(e, { previous: jt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new DI(u && u.currentValue, t, a === jt)), (e[n] = t);
      }
      gt.ngInherit = !0;
      const ap = "__ngSimpleChanges__";
      function up(e) {
        return e[ap] || null;
      }
      const Ut = function (e, t, r) {};
      function ne(e) {
        for (; Array.isArray(e); ) e = e[fe];
        return e;
      }
      function fs(e, t) {
        return ne(t[e]);
      }
      function Ye(e, t) {
        return ne(t[e.index]);
      }
      function dp(e, t) {
        return e.data[t];
      }
      function ot(e, t) {
        const r = t[e];
        return Ze(r) ? r : r[fe];
      }
      function In(e, t) {
        return null == t ? null : e[t];
      }
      function fp(e) {
        e[gr] = 0;
      }
      function TI(e) {
        1024 & e[L] || ((e[L] |= 1024), pp(e, 1));
      }
      function hp(e) {
        1024 & e[L] && ((e[L] &= -1025), pp(e, -1));
      }
      function pp(e, t) {
        let r = e[le];
        if (null === r) return;
        r[So] += t;
        let n = r;
        for (
          r = r[le];
          null !== r && ((1 === t && 1 === n[So]) || (-1 === t && 0 === n[So]));

        )
          (r[So] += t), (n = r), (r = r[le]);
      }
      const T = {
        lFrame: Ip(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function vp() {
        return T.bindingsEnabled;
      }
      function v() {
        return T.lFrame.lView;
      }
      function H() {
        return T.lFrame.tView;
      }
      function nl(e) {
        return (T.lFrame.contextLView = e), e[pe];
      }
      function rl(e) {
        return (T.lFrame.contextLView = null), e;
      }
      function Ne() {
        let e = yp();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function yp() {
        return T.lFrame.currentTNode;
      }
      function Ht(e, t) {
        const r = T.lFrame;
        (r.currentTNode = e), (r.isParent = t);
      }
      function ol() {
        return T.lFrame.isParent;
      }
      function Dr() {
        return T.lFrame.bindingIndex++;
      }
      function BI(e, t) {
        const r = T.lFrame;
        (r.bindingIndex = r.bindingRootIndex = e), sl(t);
      }
      function sl(e) {
        T.lFrame.currentDirectiveIndex = e;
      }
      function ul(e) {
        T.lFrame.currentQueryIndex = e;
      }
      function HI(e) {
        const t = e[w];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Oe] : null;
      }
      function Ep(e, t, r) {
        if (r & j.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              r & j.Host ||
              ((o = HI(i)), null === o || ((i = i[pr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const n = (T.lFrame = bp());
        return (n.currentTNode = t), (n.lView = e), !0;
      }
      function ll(e) {
        const t = bp(),
          r = e[w];
        (T.lFrame = t),
          (t.currentTNode = r.firstChild),
          (t.lView = e),
          (t.tView = r),
          (t.contextLView = e),
          (t.bindingIndex = r.bindingStartIndex),
          (t.inI18n = !1);
      }
      function bp() {
        const e = T.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Ip(e) : t;
      }
      function Ip(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Mp() {
        const e = T.lFrame;
        return (
          (T.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Sp = Mp;
      function cl() {
        const e = Mp();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function $e() {
        return T.lFrame.selectedIndex;
      }
      function zn(e) {
        T.lFrame.selectedIndex = e;
      }
      function de() {
        const e = T.lFrame;
        return dp(e.tView, e.selectedIndex);
      }
      let Np = !0;
      function hs() {
        return Np;
      }
      function Mn(e) {
        Np = e;
      }
      function ps(e, t) {
        for (let r = t.directiveStart, n = t.directiveEnd; r < n; r++) {
          const i = e.data[r].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ??= []).push(-r, s),
            a &&
              ((e.contentHooks ??= []).push(r, a),
              (e.contentCheckHooks ??= []).push(r, a)),
            u && (e.viewHooks ??= []).push(-r, u),
            l &&
              ((e.viewHooks ??= []).push(r, l),
              (e.viewCheckHooks ??= []).push(r, l)),
            null != c && (e.destroyHooks ??= []).push(r, c);
        }
      }
      function gs(e, t, r) {
        Rp(e, t, 3, r);
      }
      function ms(e, t, r, n) {
        (3 & e[L]) === r && Rp(e, t, r, n);
      }
      function dl(e, t) {
        let r = e[L];
        (3 & r) === t && ((r &= 8191), (r += 1), (e[L] = r));
      }
      function Rp(e, t, r, n) {
        const i = n ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== n ? 65535 & e[gr] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != n && a >= n)) break;
          } else
            t[u] < 0 && (e[gr] += 65536),
              (a < i || -1 == i) &&
                (QI(e, r, t, u), (e[gr] = (4294901760 & e[gr]) + u + 2)),
              u++;
      }
      function Op(e, t) {
        Ut(4, e, t);
        const r = pt(null);
        try {
          t.call(e);
        } finally {
          pt(r), Ut(5, e, t);
        }
      }
      function QI(e, t, r, n) {
        const o = r[n] < 0,
          i = r[n + 1],
          a = e[o ? -r[n] : r[n]];
        o
          ? e[L] >> 13 < e[gr] >> 16 &&
            (3 & e[L]) === t &&
            ((e[L] += 8192), Op(a, i))
          : Op(a, i);
      }
      const Cr = -1;
      class ko {
        constructor(t, r, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = r),
            (this.injectImpl = n);
        }
      }
      function hl(e) {
        return e !== Cr;
      }
      function Lo(e) {
        return 32767 & e;
      }
      function Vo(e, t) {
        let r = (function eM(e) {
            return e >> 16;
          })(e),
          n = t;
        for (; r > 0; ) (n = n[pr]), r--;
        return n;
      }
      let pl = !0;
      function vs(e) {
        const t = pl;
        return (pl = e), t;
      }
      const xp = 255,
        Pp = 5;
      let tM = 0;
      const Gt = {};
      function ys(e, t) {
        const r = Fp(e, t);
        if (-1 !== r) return r;
        const n = t[w];
        n.firstCreatePass &&
          ((e.injectorIndex = t.length),
          gl(n.data, e),
          gl(t, null),
          gl(n.blueprint, null));
        const o = _s(e, t),
          i = e.injectorIndex;
        if (hl(o)) {
          const s = Lo(o),
            a = Vo(o, t),
            u = a[w].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function gl(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Fp(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function _s(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let r = 0,
          n = null,
          o = t;
        for (; null !== o; ) {
          if (((n = Up(o)), null === n)) return Cr;
          if ((r++, (o = o[pr]), -1 !== n.injectorIndex))
            return n.injectorIndex | (r << 16);
        }
        return Cr;
      }
      function ml(e, t, r) {
        !(function nM(e, t, r) {
          let n;
          "string" == typeof r
            ? (n = r.charCodeAt(0) || 0)
            : r.hasOwnProperty(Io) && (n = r[Io]),
            null == n && (n = r[Io] = tM++);
          const o = n & xp;
          t.data[e + (o >> Pp)] |= 1 << o;
        })(e, t, r);
      }
      function kp(e, t, r) {
        if (r & j.Optional || void 0 !== e) return e;
        Pu();
      }
      function Lp(e, t, r, n) {
        if (
          (r & j.Optional && void 0 === n && (n = null),
          !(r & (j.Self | j.Host)))
        ) {
          const o = e[wn],
            i = qe(void 0);
          try {
            return o ? o.get(t, n, r & j.Optional) : bh(t, n, r & j.Optional);
          } finally {
            qe(i);
          }
        }
        return kp(n, 0, r);
      }
      function Vp(e, t, r, n = j.Default, o) {
        if (null !== e) {
          if (2048 & t[L] && !(n & j.Self)) {
            const s = (function uM(e, t, r, n, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[L] && !(512 & s[L]);

              ) {
                const a = jp(i, s, r, n | j.Self, Gt);
                if (a !== Gt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[Uh];
                  if (l) {
                    const c = l.get(r, Gt, n);
                    if (c !== Gt) return c;
                  }
                  (u = Up(s)), (s = s[pr]);
                }
                i = u;
              }
              return o;
            })(e, t, r, n, Gt);
            if (s !== Gt) return s;
          }
          const i = jp(e, t, r, n, Gt);
          if (i !== Gt) return i;
        }
        return Lp(t, r, n, o);
      }
      function jp(e, t, r, n, o) {
        const i = (function iM(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Io) ? e[Io] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & xp : aM) : t;
        })(r);
        if ("function" == typeof i) {
          if (!Ep(t, e, n)) return n & j.Host ? kp(o, 0, n) : Lp(t, r, n, o);
          try {
            let s;
            if (((s = i(n)), null != s || n & j.Optional)) return s;
            Pu();
          } finally {
            Sp();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Fp(e, t),
            u = Cr,
            l = n & j.Host ? t[ge][Oe] : null;
          for (
            (-1 === a || n & j.SkipSelf) &&
            ((u = -1 === a ? _s(e, t) : t[a + 8]),
            u !== Cr && Bp(n, !1)
              ? ((s = t[w]), (a = Lo(u)), (t = Vo(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[w];
            if ($p(i, a, c.data)) {
              const d = oM(a, t, r, s, n, l);
              if (d !== Gt) return d;
            }
            (u = t[a + 8]),
              u !== Cr && Bp(n, t[w].data[a + 8] === l) && $p(i, a, t)
                ? ((s = c), (a = Lo(u)), (t = Vo(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function oM(e, t, r, n, o, i) {
        const s = t[w],
          a = s.data[e + 8],
          c = (function Ds(e, t, r, n, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = n ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && r === p) || (h >= u && p.type === r)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && At(h) && h.type === r) return u;
            }
            return null;
          })(
            a,
            s,
            r,
            null == n ? Hn(a) && pl : n != s && 0 != (3 & a.type),
            o & j.Host && i === a
          );
        return null !== c ? qn(t, s, c, a) : Gt;
      }
      function qn(e, t, r, n) {
        let o = e[r];
        const i = t.data;
        if (
          (function KI(e) {
            return e instanceof ko;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Sb(e, t) {
              const r = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new _(
                -200,
                `Circular dependency in DI detected for ${e}${r}`
              );
            })(
              (function W(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : P(e);
              })(i[r])
            );
          const a = vs(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? qe(s.injectImpl) : null;
          Ep(e, n, j.Default);
          try {
            (o = e[r] = s.factory(void 0, i, e, n)),
              t.firstCreatePass &&
                r >= n.directiveStart &&
                (function YI(e, t, r) {
                  const {
                    ngOnChanges: n,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (n) {
                    const s = sp(t);
                    (r.preOrderHooks ??= []).push(e, s),
                      (r.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (r.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((r.preOrderHooks ??= []).push(e, i),
                      (r.preOrderCheckHooks ??= []).push(e, i));
                })(r, i[r], t);
          } finally {
            null !== l && qe(l), vs(a), (s.resolving = !1), Sp();
          }
        }
        return o;
      }
      function $p(e, t, r) {
        return !!(r[t + (e >> Pp)] & (1 << e));
      }
      function Bp(e, t) {
        return !(e & j.Self || (e & j.Host && t));
      }
      class Be {
        constructor(t, r) {
          (this._tNode = t), (this._lView = r);
        }
        get(t, r, n) {
          return Vp(this._tNode, this._lView, t, os(n), r);
        }
      }
      function aM() {
        return new Be(Ne(), v());
      }
      function Re(e) {
        return en(() => {
          const t = e.prototype.constructor,
            r = t[tn] || vl(t),
            n = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== n; ) {
            const i = o[tn] || vl(o);
            if (i && i !== r) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function vl(e) {
        return Ou(e)
          ? () => {
              const t = vl(R(e));
              return t && t();
            }
          : Gn(e);
      }
      function Up(e) {
        const t = e[w],
          r = t.type;
        return 2 === r ? t.declTNode : 1 === r ? e[Oe] : null;
      }
      const Er = "__parameters__";
      function Ir(e, t, r) {
        return en(() => {
          const n = (function yl(e) {
            return function (...r) {
              if (e) {
                const n = e(...r);
                for (const o in n) this[o] = n[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return n.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(Er)
                ? u[Er]
                : Object.defineProperty(u, Er, { value: [] })[Er];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            r && (o.prototype = Object.create(r.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function Sr(e, t) {
        e.forEach((r) => (Array.isArray(r) ? Sr(r, t) : t(r)));
      }
      function Gp(e, t, r) {
        t >= e.length ? e.push(r) : e.splice(t, 0, r);
      }
      function ws(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function it(e, t, r) {
        let n = Ar(e, t);
        return (
          n >= 0
            ? (e[1 | n] = r)
            : ((n = ~n),
              (function gM(e, t, r, n) {
                let o = e.length;
                if (o == t) e.push(r, n);
                else if (1 === o) e.push(n, e[0]), (e[0] = r);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = r), (e[t + 1] = n);
                }
              })(e, n, t, r)),
          n
        );
      }
      function _l(e, t) {
        const r = Ar(e, t);
        if (r >= 0) return e[1 | r];
      }
      function Ar(e, t) {
        return (function zp(e, t, r) {
          let n = 0,
            o = e.length >> r;
          for (; o !== n; ) {
            const i = n + ((o - n) >> 1),
              s = e[i << r];
            if (t === s) return i << r;
            s > t ? (o = i) : (n = i + 1);
          }
          return ~(o << r);
        })(e, t, 1);
      }
      const bs = bo(Ir("Optional"), 8),
        Is = bo(Ir("SkipSelf"), 4);
      function Ns(e) {
        return 128 == (128 & e.flags);
      }
      var Sn = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(Sn || {});
      const bl = new Map();
      let jM = 0;
      const Ml = "__ngContext__";
      function xe(e, t) {
        Ze(t)
          ? ((e[Ml] = t[No]),
            (function BM(e) {
              bl.set(e[No], e);
            })(t))
          : (e[Ml] = t);
      }
      let Sl;
      function Al(e, t) {
        return Sl(e, t);
      }
      function Go(e) {
        const t = e[le];
        return Ve(t) ? t[le] : t;
      }
      function dg(e) {
        return hg(e[Ao]);
      }
      function fg(e) {
        return hg(e[St]);
      }
      function hg(e) {
        for (; null !== e && !Ve(e); ) e = e[St];
        return e;
      }
      function Rr(e, t, r, n, o) {
        if (null != n) {
          let i,
            s = !1;
          Ve(n) ? (i = n) : Ze(n) && ((s = !0), (n = n[fe]));
          const a = ne(n);
          0 === e && null !== r
            ? null == o
              ? vg(t, r, a)
              : Wn(t, r, a, o || null, !0)
            : 1 === e && null !== r
            ? Wn(t, r, a, o || null, !0)
            : 2 === e
            ? (function Ls(e, t, r) {
                const n = Fs(e, t);
                n &&
                  (function sS(e, t, r, n) {
                    e.removeChild(t, r, n);
                  })(e, n, t, r);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function lS(e, t, r, n, o) {
                const i = r[Bt];
                i !== ne(r) && Rr(t, e, n, i, o);
                for (let a = Ae; a < r.length; a++) {
                  const u = r[a];
                  qo(u[w], u, e, t, n, i);
                }
              })(t, e, i, r, o);
        }
      }
      function xs(e, t, r) {
        return e.createElement(t, r);
      }
      function gg(e, t) {
        const r = e[mr],
          n = r.indexOf(t);
        hp(t), r.splice(n, 1);
      }
      function Ps(e, t) {
        if (e.length <= Ae) return;
        const r = Ae + t,
          n = e[r];
        if (n) {
          const o = n[To];
          null !== o && o !== e && gg(o, n), t > 0 && (e[r - 1][St] = n[St]);
          const i = ws(e, Ae + t);
          !(function JM(e, t) {
            qo(e, t, t[F], 2, null, null), (t[fe] = null), (t[Oe] = null);
          })(n[w], n);
          const s = i[$t];
          null !== s && s.detachView(i[w]),
            (n[le] = null),
            (n[St] = null),
            (n[L] &= -129);
        }
        return n;
      }
      function Nl(e, t) {
        if (!(256 & t[L])) {
          const r = t[F];
          t[Ro] && Jh(t[Ro]),
            t[Oo] && Jh(t[Oo]),
            r.destroyNode && qo(e, t, r, 3, null, null),
            (function tS(e) {
              let t = e[Ao];
              if (!t) return Rl(e[w], e);
              for (; t; ) {
                let r = null;
                if (Ze(t)) r = t[Ao];
                else {
                  const n = t[Ae];
                  n && (r = n);
                }
                if (!r) {
                  for (; t && !t[St] && t !== e; )
                    Ze(t) && Rl(t[w], t), (t = t[le]);
                  null === t && (t = e), Ze(t) && Rl(t[w], t), (r = t && t[St]);
                }
                t = r;
              }
            })(t);
        }
      }
      function Rl(e, t) {
        if (!(256 & t[L])) {
          (t[L] &= -129),
            (t[L] |= 256),
            (function iS(e, t) {
              let r;
              if (null != e && null != (r = e.destroyHooks))
                for (let n = 0; n < r.length; n += 2) {
                  const o = t[r[n]];
                  if (!(o instanceof ko)) {
                    const i = r[n + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        Ut(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          Ut(5, a, u);
                        }
                      }
                    else {
                      Ut(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        Ut(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function oS(e, t) {
              const r = e.cleanup,
                n = t[fr];
              if (null !== r)
                for (let i = 0; i < r.length - 1; i += 2)
                  if ("string" == typeof r[i]) {
                    const s = r[i + 3];
                    s >= 0 ? n[s]() : n[-s].unsubscribe(), (i += 2);
                  } else r[i].call(n[r[i + 1]]);
              null !== n && (t[fr] = null);
              const o = t[En];
              if (null !== o) {
                t[En] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[w].type && t[F].destroy();
          const r = t[To];
          if (null !== r && Ve(t[le])) {
            r !== t[le] && gg(r, t);
            const n = t[$t];
            null !== n && n.detachView(e);
          }
          !(function UM(e) {
            bl.delete(e[No]);
          })(t);
        }
      }
      function Ol(e, t, r) {
        return (function mg(e, t, r) {
          let n = t;
          for (; null !== n && 40 & n.type; ) n = (t = n).parent;
          if (null === n) return r[fe];
          {
            const { componentOffset: o } = n;
            if (o > -1) {
              const { encapsulation: i } = e.data[n.directiveStart + o];
              if (i === bt.None || i === bt.Emulated) return null;
            }
            return Ye(n, r);
          }
        })(e, t.parent, r);
      }
      function Wn(e, t, r, n, o) {
        e.insertBefore(t, r, n, o);
      }
      function vg(e, t, r) {
        e.appendChild(t, r);
      }
      function yg(e, t, r, n, o) {
        null !== n ? Wn(e, t, r, n, o) : vg(e, t, r);
      }
      function Fs(e, t) {
        return e.parentNode(t);
      }
      let xl,
        Ll,
        js,
        Cg = function Dg(e, t, r) {
          return 40 & e.type ? Ye(e, r) : null;
        };
      function ks(e, t, r, n) {
        const o = Ol(e, n, t),
          i = t[F],
          a = (function _g(e, t, r) {
            return Cg(e, t, r);
          })(n.parent || t[Oe], n, t);
        if (null != o)
          if (Array.isArray(r))
            for (let u = 0; u < r.length; u++) yg(i, o, r[u], a, !1);
          else yg(i, o, r, a, !1);
        void 0 !== xl && xl(i, n, t, r, o);
      }
      function zo(e, t) {
        if (null !== t) {
          const r = t.type;
          if (3 & r) return Ye(t, e);
          if (4 & r) return Pl(-1, e[t.index]);
          if (8 & r) {
            const n = t.child;
            if (null !== n) return zo(e, n);
            {
              const o = e[t.index];
              return Ve(o) ? Pl(-1, o) : ne(o);
            }
          }
          if (32 & r) return Al(t, e)() || ne(e[t.index]);
          {
            const n = Eg(e, t);
            return null !== n
              ? Array.isArray(n)
                ? n[0]
                : zo(Go(e[ge]), n)
              : zo(e, t.next);
          }
        }
        return null;
      }
      function Eg(e, t) {
        return null !== t ? e[ge][Oe].projection[t.projection] : null;
      }
      function Pl(e, t) {
        const r = Ae + e + 1;
        if (r < t.length) {
          const n = t[r],
            o = n[w].firstChild;
          if (null !== o) return zo(n, o);
        }
        return t[Bt];
      }
      function Fl(e, t, r, n, o, i, s) {
        for (; null != r; ) {
          const a = n[r.index],
            u = r.type;
          if (
            (s && 0 === t && (a && xe(ne(a), n), (r.flags |= 2)),
            32 != (32 & r.flags))
          )
            if (8 & u) Fl(e, t, r.child, n, o, i, !1), Rr(t, e, o, a, i);
            else if (32 & u) {
              const l = Al(r, n);
              let c;
              for (; (c = l()); ) Rr(t, e, o, c, i);
              Rr(t, e, o, a, i);
            } else 16 & u ? Ig(e, t, n, r, o, i) : Rr(t, e, o, a, i);
          r = s ? r.projectionNext : r.next;
        }
      }
      function qo(e, t, r, n, o, i) {
        Fl(r, n, e.firstChild, t, o, i, !1);
      }
      function Ig(e, t, r, n, o, i) {
        const s = r[ge],
          u = s[Oe].projection[n.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Rr(t, e, o, u[l], i);
        else {
          let l = u;
          const c = s[le];
          Ns(n) && (l.flags |= 128), Fl(e, t, l, c, o, i, !0);
        }
      }
      function Mg(e, t, r) {
        "" === r
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", r);
      }
      function Sg(e, t, r) {
        const { mergedAttrs: n, classes: o, styles: i } = r;
        null !== n && zu(e, t, n),
          null !== o && Mg(e, t, o),
          null !== i &&
            (function dS(e, t, r) {
              e.setAttribute(t, "style", r);
            })(e, t, i);
      }
      function Ng(e) {
        return (
          (function Vl() {
            if (void 0 === js && ((js = null), te.trustedTypes))
              try {
                js = te.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return js;
          })()?.createScriptURL(e) || e
        );
      }
      class Rg {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Dh})`;
        }
      }
      function An(e) {
        return e instanceof Rg ? e.changingThisBreaksApplicationSecurity : e;
      }
      function Wo(e, t) {
        const r = (function CS(e) {
          return (e instanceof Rg && e.getTypeName()) || null;
        })(e);
        if (null != r && r !== t) {
          if ("ResourceURL" === r && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${r} (see ${Dh})`);
        }
        return r === t;
      }
      const IS = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var Pr = (function (e) {
        return (
          (e[(e.NONE = 0)] = "NONE"),
          (e[(e.HTML = 1)] = "HTML"),
          (e[(e.STYLE = 2)] = "STYLE"),
          (e[(e.SCRIPT = 3)] = "SCRIPT"),
          (e[(e.URL = 4)] = "URL"),
          (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          e
        );
      })(Pr || {});
      function Vg(e) {
        const t = Yo();
        return t
          ? t.sanitize(Pr.URL, e) || ""
          : Wo(e, "URL")
          ? An(e)
          : (function jl(e) {
              return (e = String(e)).match(IS) ? e : "unsafe:" + e;
            })(P(e));
      }
      function jg(e) {
        const t = Yo();
        if (t) return Ng(t.sanitize(Pr.RESOURCE_URL, e) || "");
        if (Wo(e, "ResourceURL")) return Ng(An(e));
        throw new _(904, !1);
      }
      function Yo() {
        const e = v();
        return e && e[hr].sanitizer;
      }
      class b {
        constructor(t, r) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof r
              ? (this.__NG_ELEMENT_ID__ = r)
              : void 0 !== r &&
                (this.ɵprov = M({
                  token: this,
                  providedIn: r.providedIn || "root",
                  factory: r.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Qo = new b("ENVIRONMENT_INITIALIZER"),
        Bg = new b("INJECTOR", -1),
        Ug = new b("INJECTOR_DEF_TYPES");
      class Hl {
        get(t, r = Eo) {
          if (r === Eo) {
            const n = new Error(`NullInjectorError: No provider for ${we(t)}!`);
            throw ((n.name = "NullInjectorError"), n);
          }
          return r;
        }
      }
      function VS(...e) {
        return { ɵproviders: Gg(0, e), ɵfromNgModule: !0 };
      }
      function Gg(e, ...t) {
        const r = [],
          n = new Set();
        let o;
        const i = (s) => {
          r.push(s);
        };
        return (
          Sr(t, (s) => {
            const a = s;
            Bs(a, i, [], n) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && zg(o, i),
          r
        );
      }
      function zg(e, t) {
        for (let r = 0; r < e.length; r++) {
          const { ngModule: n, providers: o } = e[r];
          Gl(o, (i) => {
            t(i, n);
          });
        }
      }
      function Bs(e, t, r, n) {
        if (!(e = R(e))) return !1;
        let o = null,
          i = ts(e);
        const s = !i && U(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = ts(u)), !i)) return !1;
          o = u;
        }
        const a = n.has(o);
        if (s) {
          if (a) return !1;
          if ((n.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) Bs(l, t, r, n);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              n.add(o);
              try {
                Sr(i.imports, (c) => {
                  Bs(c, t, r, n) && ((l ||= []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && zg(l, t);
            }
            if (!a) {
              const l = Gn(o) || (() => new o());
              t({ provide: o, useFactory: l, deps: G }, o),
                t({ provide: Ug, useValue: o, multi: !0 }, o),
                t({ provide: Qo, useValue: () => S(o), multi: !0 }, o);
            }
            const u = i.providers;
            if (null != u && !a) {
              const l = e;
              Gl(u, (c) => {
                t(c, l);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Gl(e, t) {
        for (let r of e)
          xu(r) && (r = r.ɵproviders), Array.isArray(r) ? Gl(r, t) : t(r);
      }
      const jS = Z({ provide: String, useValue: Z });
      function zl(e) {
        return null !== e && "object" == typeof e && jS in e;
      }
      function Zn(e) {
        return "function" == typeof e;
      }
      const ql = new b("Set Injector scope."),
        Us = {},
        BS = {};
      let Wl;
      function Hs() {
        return void 0 === Wl && (Wl = new Hl()), Wl;
      }
      class vt {}
      class Gs extends vt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, r, n, o) {
          super(),
            (this.parent = r),
            (this.source = n),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Yl(t, (s) => this.processProvider(s)),
            this.records.set(Bg, Fr(void 0, this)),
            o.has("environment") && this.records.set(vt, Fr(void 0, this));
          const i = this.records.get(ql);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Ug.multi, G, j.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const r of this._ngOnDestroyHooks) r.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const r of t) r();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const r = Cn(this),
            n = qe(void 0);
          try {
            return t();
          } finally {
            Cn(r), qe(n);
          }
        }
        get(t, r = Eo, n = j.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(Th)))
            return t[Th](this);
          n = os(n);
          const i = Cn(this),
            s = qe(void 0);
          try {
            if (!(n & j.SkipSelf)) {
              let u = this.records.get(t);
              if (void 0 === u) {
                const l =
                  (function qS(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof b)
                    );
                  })(t) && es(t);
                (u = l && this.injectableDefInScope(l) ? Fr(Zl(t), Us) : null),
                  this.records.set(t, u);
              }
              if (null != u) return this.hydrate(t, u);
            }
            return (n & j.Self ? Hs() : this.parent).get(
              t,
              (r = n & j.Optional && r === Eo ? null : r)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[rs] = a[rs] || []).unshift(we(t)), i)) throw a;
              return (function Ub(e, t, r, n) {
                const o = e[rs];
                throw (
                  (t[Mh] && o.unshift(t[Mh]),
                  (e.message = (function Hb(e, t, r, n = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = we(t);
                    if (Array.isArray(t)) o = t.map(we).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : we(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${r}${n ? "(" + n + ")" : ""}[${o}]: ${e.replace(
                      Lb,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, r, n)),
                  (e.ngTokenPath = o),
                  (e[rs] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            qe(s), Cn(i);
          }
        }
        resolveInjectorInitializers() {
          const t = Cn(this),
            r = qe(void 0);
          try {
            const o = this.get(Qo.multi, G, j.Self);
            for (const i of o) i();
          } finally {
            Cn(t), qe(r);
          }
        }
        toString() {
          const t = [],
            r = this.records;
          for (const n of r.keys()) t.push(we(n));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new _(205, !1);
        }
        processProvider(t) {
          let r = Zn((t = R(t))) ? t : R(t && t.provide);
          const n = (function HS(e) {
            return zl(e) ? Fr(void 0, e.useValue) : Fr(Zg(e), Us);
          })(t);
          if (Zn(t) || !0 !== t.multi) this.records.get(r);
          else {
            let o = this.records.get(r);
            o ||
              ((o = Fr(void 0, Us, !0)),
              (o.factory = () => Uu(o.multi)),
              this.records.set(r, o)),
              (r = t),
              o.multi.push(t);
          }
          this.records.set(r, n);
        }
        hydrate(t, r) {
          return (
            r.value === Us && ((r.value = BS), (r.value = r.factory())),
            "object" == typeof r.value &&
              r.value &&
              (function zS(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(r.value) &&
              this._ngOnDestroyHooks.add(r.value),
            r.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const r = R(t.providedIn);
          return "string" == typeof r
            ? "any" === r || this.scopes.has(r)
            : this.injectorDefTypes.has(r);
        }
        removeOnDestroy(t) {
          const r = this._onDestroyHooks.indexOf(t);
          -1 !== r && this._onDestroyHooks.splice(r, 1);
        }
      }
      function Zl(e) {
        const t = es(e),
          r = null !== t ? t.factory : Gn(e);
        if (null !== r) return r;
        if (e instanceof b) throw new _(204, !1);
        if (e instanceof Function)
          return (function US(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Bo(e, t) {
                  const r = [];
                  for (let n = 0; n < e; n++) r.push(t);
                  return r;
                })(t, "?"),
                new _(204, !1))
              );
            const r = (function xb(e) {
              return (e && (e[ns] || e[wh])) || null;
            })(e);
            return null !== r ? () => r.factory(e) : () => new e();
          })(e);
        throw new _(204, !1);
      }
      function Zg(e, t, r) {
        let n;
        if (Zn(e)) {
          const o = R(e);
          return Gn(o) || Zl(o);
        }
        if (zl(e)) n = () => R(e.useValue);
        else if (
          (function Wg(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          n = () => e.useFactory(...Uu(e.deps || []));
        else if (
          (function qg(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          n = () => S(R(e.useExisting));
        else {
          const o = R(e && (e.useClass || e.provide));
          if (
            !(function GS(e) {
              return !!e.deps;
            })(e)
          )
            return Gn(o) || Zl(o);
          n = () => new o(...Uu(e.deps));
        }
        return n;
      }
      function Fr(e, t, r = !1) {
        return { factory: e, value: t, multi: r ? [] : void 0 };
      }
      function Yl(e, t) {
        for (const r of e)
          Array.isArray(r) ? Yl(r, t) : r && xu(r) ? Yl(r.ɵproviders, t) : t(r);
      }
      const zs = new b("AppId", { providedIn: "root", factory: () => WS }),
        WS = "ng",
        Yg = new b("Platform Initializer"),
        kr = new b("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Qg = new b("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function xr() {
              if (void 0 !== Ll) return Ll;
              if (typeof document < "u") return document;
              throw new _(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let Kg = (e, t, r) => null;
      function rc(e, t, r = !1) {
        return Kg(e, t, r);
      }
      class r0 {}
      class em {}
      class s0 {
        resolveComponentFactory(t) {
          throw (function o0(e) {
            const t = Error(`No component factory found for ${we(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ks = (() => {
        class t {}
        return (t.NULL = new s0()), t;
      })();
      function a0() {
        return jr(Ne(), v());
      }
      function jr(e, t) {
        return new st(Ye(e, t));
      }
      let st = (() => {
        class t {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (t.__NG_ELEMENT_ID__ = a0), t;
      })();
      class nm {}
      let an = (() => {
          class t {
            constructor() {
              this.destroyNode = null;
            }
          }
          return (
            (t.__NG_ELEMENT_ID__ = () =>
              (function l0() {
                const e = v(),
                  r = ot(Ne().index, e);
                return (Ze(r) ? r : e)[F];
              })()),
            t
          );
        })(),
        c0 = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵprov = M({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            t
          );
        })();
      class Xo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const d0 = new Xo("16.2.6"),
        sc = {};
      function sm(e, t = null, r = null, n) {
        const o = am(e, t, r, n);
        return o.resolveInjectorInitializers(), o;
      }
      function am(e, t = null, r = null, n, o = new Set()) {
        const i = [r || G, VS(e)];
        return (
          (n = n || ("object" == typeof e ? void 0 : we(e))),
          new Gs(i, t || Hs(), n || null, o)
        );
      }
      let at = (() => {
        var e;
        class t {
          static create(n, o) {
            if (Array.isArray(n)) return sm({ name: "" }, o, n, "");
            {
              const i = n.name ?? "";
              return sm({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          ((e = t).THROW_IF_NOT_FOUND = Eo),
          (e.NULL = new Hl()),
          (e.ɵprov = M({ token: e, providedIn: "any", factory: () => S(Bg) })),
          (e.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function uc(e) {
        return e.ngOriginalError;
      }
      class un {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const r = this._findOriginalError(t);
          this._console.error("ERROR", t),
            r && this._console.error("ORIGINAL ERROR", r);
        }
        _findOriginalError(t) {
          let r = t && uc(t);
          for (; r && uc(r); ) r = uc(r);
          return r || null;
        }
      }
      function cc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const ae = class y0 extends Et {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, r, n) {
          let o = t,
            i = r || (() => null),
            s = n;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = cc(i)), o && (o = cc(o)), s && (s = cc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof et && t.add(a), a;
        }
      };
      function lm(...e) {}
      class re {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: r = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ae(!1)),
            (this.onMicrotaskEmpty = new ae(!1)),
            (this.onStable = new ae(!1)),
            (this.onError = new ae(!1)),
            typeof Zone > "u")
          )
            throw new _(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !n && r),
            (o.shouldCoalesceRunChangeDetection = n),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function _0() {
              const e = "function" == typeof te.requestAnimationFrame;
              let t = te[e ? "requestAnimationFrame" : "setTimeout"],
                r = te[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && r) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const o = r[Zone.__symbol__("OriginalDelegate")];
                o && (r = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: r,
              };
            })().nativeRequestAnimationFrame),
            (function w0(e) {
              const t = () => {
                !(function C0(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(te, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                fc(e),
                                (e.isCheckStableRunning = !0),
                                dc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    fc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (r, n, o, i, s, a) => {
                  if (
                    (function b0(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return r.invokeTask(o, i, s, a);
                  try {
                    return cm(e), r.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      dm(e);
                  }
                },
                onInvoke: (r, n, o, i, s, a, u) => {
                  try {
                    return cm(e), r.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), dm(e);
                  }
                },
                onHasTask: (r, n, o, i) => {
                  r.hasTask(o, i),
                    n === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          fc(e),
                          dc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (r, n, o, i) => (
                  r.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!re.isInAngularZone()) throw new _(909, !1);
        }
        static assertNotInAngularZone() {
          if (re.isInAngularZone()) throw new _(909, !1);
        }
        run(t, r, n) {
          return this._inner.run(t, r, n);
        }
        runTask(t, r, n, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, D0, lm, lm);
          try {
            return i.runTask(s, r, n);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, r, n) {
          return this._inner.runGuarded(t, r, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const D0 = {};
      function dc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function fc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function cm(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function dm(e) {
        e._nesting--, dc(e);
      }
      class E0 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ae()),
            (this.onMicrotaskEmpty = new ae()),
            (this.onStable = new ae()),
            (this.onError = new ae());
        }
        run(t, r, n) {
          return t.apply(r, n);
        }
        runGuarded(t, r, n) {
          return t.apply(r, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, r, n, o) {
          return t.apply(r, n);
        }
      }
      const fm = new b("", { providedIn: "root", factory: hm });
      function hm() {
        const e = E(re);
        let t = !0;
        return (function Eb(...e) {
          const t = wo(e),
            r = (function mb(e, t) {
              return "number" == typeof Tu(e) ? e.pop() : t;
            })(e, 1 / 0),
            n = e;
          return n.length ? (1 === n.length ? tt(n[0]) : lr(r)(Ie(n, t))) : Lt;
        })(
          new ve((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new ve((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                re.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              re.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(_h())
        );
      }
      function ln(e) {
        return e instanceof Function ? e() : e;
      }
      let hc = (() => {
        var e;
        class t {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
        }
        return (
          ((e = t).ɵprov = M({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          t
        );
      })();
      function ei(e) {
        for (; e; ) {
          e[L] |= 64;
          const t = Go(e);
          if (Zu(e) && !t) return e;
          e = t;
        }
        return null;
      }
      const ym = new b("", { providedIn: "root", factory: () => !1 });
      let Xs = null;
      function wm(e, t) {
        return e[t] ?? Im();
      }
      function Em(e, t) {
        const r = Im();
        r.producerNode?.length && ((e[t] = Xs), (r.lView = e), (Xs = bm()));
      }
      const P0 = {
        ...qh,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          ei(e.lView);
        },
        lView: null,
      };
      function bm() {
        return Object.create(P0);
      }
      function Im() {
        return (Xs ??= bm()), Xs;
      }
      const k = {};
      function Tt(e) {
        Mm(H(), v(), $e() + e, !1);
      }
      function Mm(e, t, r, n) {
        if (!n)
          if (3 == (3 & t[L])) {
            const i = e.preOrderCheckHooks;
            null !== i && gs(t, i, r);
          } else {
            const i = e.preOrderHooks;
            null !== i && ms(t, i, 0, r);
          }
        zn(r);
      }
      function D(e, t = j.Default) {
        const r = v();
        return null === r ? S(e, t) : Vp(Ne(), r, R(e), t);
      }
      function ea(e, t, r, n, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[fe] = o),
          (d[L] = 140 | n),
          (null !== l || (e && 2048 & e[L])) && (d[L] |= 2048),
          fp(d),
          (d[le] = d[pr] = e),
          (d[pe] = r),
          (d[hr] = s || (e && e[hr])),
          (d[F] = a || (e && e[F])),
          (d[wn] = u || (e && e[wn]) || null),
          (d[Oe] = i),
          (d[No] = (function $M() {
            return jM++;
          })()),
          (d[nn] = c),
          (d[Uh] = l),
          (d[ge] = 2 == t.type ? e[ge] : d),
          d
        );
      }
      function Ur(e, t, r, n, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function pc(e, t, r, n, o) {
            const i = yp(),
              s = ol(),
              u = (e.data[t] = (function U0(e, t, r, n, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function _r() {
                    return null !== T.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: r,
                    index: n,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, r, t, n, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, r, n, o)),
            (function $I() {
              return T.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = r), (i.value = n), (i.attrs = o);
          const s = (function Fo() {
            const e = T.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Ht(i, !0), i;
      }
      function ti(e, t, r, n) {
        if (0 === r) return -1;
        const o = t.length;
        for (let i = 0; i < r; i++)
          t.push(n), e.blueprint.push(n), e.data.push(null);
        return o;
      }
      function Am(e, t, r, n, o) {
        const i = wm(t, Ro),
          s = $e(),
          a = 2 & n;
        try {
          zn(-1), a && t.length > $ && Mm(e, t, $, !1), Ut(a ? 2 : 0, o);
          const l = a ? i : null,
            c = Qu(l);
          try {
            null !== l && (l.dirty = !1), r(n, o);
          } finally {
            Ku(l, c);
          }
        } finally {
          a && null === t[Ro] && Em(t, Ro), zn(s), Ut(a ? 3 : 1, o);
        }
      }
      function gc(e, t, r) {
        if (Wu(t)) {
          const n = pt(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, r[s], s);
            }
          } finally {
            pt(n);
          }
        }
      }
      function mc(e, t, r) {
        vp() &&
          ((function Y0(e, t, r, n) {
            const o = r.directiveStart,
              i = r.directiveEnd;
            Hn(r) &&
              (function nA(e, t, r) {
                const n = Ye(t, e),
                  o = Tm(r);
                let s = 16;
                r.signals ? (s = 4096) : r.onPush && (s = 64);
                const a = ta(
                  e,
                  ea(
                    e,
                    o,
                    null,
                    s,
                    n,
                    t,
                    null,
                    e[hr].rendererFactory.createRenderer(n, r),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, r, e.data[o + r.componentOffset]),
              e.firstCreatePass || ys(r, t),
              xe(n, t);
            const s = r.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = qn(t, e, a, r);
              xe(l, t),
                null !== s && rA(0, a - o, l, u, 0, s),
                At(u) && (ot(r.index, t)[pe] = qn(t, e, a, r));
            }
          })(e, t, r, Ye(r, t)),
          64 == (64 & r.flags) && Pm(e, t, r));
      }
      function vc(e, t, r = Ye) {
        const n = t.localNames;
        if (null !== n) {
          let o = t.index + 1;
          for (let i = 0; i < n.length; i += 2) {
            const s = n[i + 1],
              a = -1 === s ? r(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Tm(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = yc(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function yc(e, t, r, n, o, i, s, a, u, l, c) {
        const d = $ + n,
          f = d + o,
          h = (function k0(e, t) {
            const r = [];
            for (let n = 0; n < t; n++) r.push(n < e ? null : k);
            return r;
          })(d, f),
          p = "function" == typeof l ? l() : l;
        return (h[w] = {
          type: e,
          blueprint: h,
          template: r,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: c,
        });
      }
      let Nm = (e) => null;
      function Rm(e, t, r, n) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            r = null === r ? {} : r;
            const i = e[o];
            null === n
              ? Om(r, t, o, i)
              : n.hasOwnProperty(o) && Om(r, t, n[o], i);
          }
        return r;
      }
      function Om(e, t, r, n) {
        e.hasOwnProperty(r) ? e[r].push(t, n) : (e[r] = [t, n]);
      }
      function _c(e, t, r, n) {
        if (vp()) {
          const o = null === n ? null : { "": -1 },
            i = (function K0(e, t) {
              const r = e.directiveRegistry;
              let n = null,
                o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  if (kh(t, s.selectors, !1))
                    if ((n || (n = []), At(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          n.unshift(...a, s),
                          Dc(e, t, a.length);
                      } else n.unshift(s), Dc(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, n, o),
                        n.push(s);
                }
              return null === n ? null : [n, o];
            })(e, r);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && xm(e, t, r, s, o, a),
            o &&
              (function J0(e, t, r) {
                if (t) {
                  const n = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = r[t[o + 1]];
                    if (null == i) throw new _(-301, !1);
                    n.push(t[o], i);
                  }
                }
              })(r, n, o);
        }
        r.mergedAttrs = Mo(r.mergedAttrs, r.attrs);
      }
      function xm(e, t, r, n, o, i) {
        for (let l = 0; l < n.length; l++) ml(ys(r, t), e, n[l].type);
        !(function eA(e, t, r) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + r),
            (e.providerIndexes = t);
        })(r, e.data.length, n.length);
        for (let l = 0; l < n.length; l++) {
          const c = n[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = ti(e, t, n.length, null);
        for (let l = 0; l < n.length; l++) {
          const c = n[l];
          (r.mergedAttrs = Mo(r.mergedAttrs, c.hostAttrs)),
            tA(e, r, t, u, c),
            X0(u, c, o),
            null !== c.contentQueries && (r.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (r.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(r.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(r.index), (a = !0)),
            u++;
        }
        !(function H0(e, t, r) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = r ? r.get(d) : null,
              p = f ? f.outputs : null;
            (u = Rm(d.inputs, c, u, f ? f.inputs : null)),
              (l = Rm(d.outputs, c, l, p));
            const g = null === u || null === s || Fh(t) ? null : oA(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, r, i);
      }
      function Pm(e, t, r) {
        const n = r.directiveStart,
          o = r.directiveEnd,
          i = r.index,
          s = (function UI() {
            return T.lFrame.currentDirectiveIndex;
          })();
        try {
          zn(i);
          for (let a = n; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            sl(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                Q0(u, l);
          }
        } finally {
          zn(-1), sl(s);
        }
      }
      function Q0(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Dc(e, t, r) {
        (t.componentOffset = r), (e.components ??= []).push(t.index);
      }
      function X0(e, t, r) {
        if (r) {
          if (t.exportAs)
            for (let n = 0; n < t.exportAs.length; n++) r[t.exportAs[n]] = e;
          At(t) && (r[""] = e);
        }
      }
      function tA(e, t, r, n, o) {
        e.data[n] = o;
        const i = o.factory || (o.factory = Gn(o.type)),
          s = new ko(i, At(o), D);
        (e.blueprint[n] = s),
          (r[n] = s),
          (function W0(e, t, r, n, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function Z0(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const r = e[--t];
                  if ("number" == typeof r && r < 0) return r;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(r, n, i);
            }
          })(e, t, n, ti(e, r, o.hostVars, k), o);
      }
      function zt(e, t, r, n, o, i) {
        const s = Ye(e, t);
        !(function Cc(e, t, r, n, o, i, s) {
          if (null == i) e.removeAttribute(t, o, r);
          else {
            const a = null == s ? P(i) : s(i, n || "", o);
            e.setAttribute(t, o, a, r);
          }
        })(t[F], s, i, e.value, r, n, o);
      }
      function rA(e, t, r, n, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) Fm(n, r, s[a++], s[a++], s[a++]);
      }
      function Fm(e, t, r, n, o) {
        const i = pt(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(n) && (o = s[n].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, r, n) : (t[n] = o);
        } finally {
          pt(i);
        }
      }
      function oA(e, t, r) {
        let n = null,
          o = 0;
        for (; o < r.length; ) {
          const i = r[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === n && (n = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    n.push(i, s[a + 1], r[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return n;
      }
      function km(e, t, r, n) {
        return [e, !0, !1, t, null, 0, n, r, null, null, null];
      }
      function Lm(e, t) {
        const r = e.contentQueries;
        if (null !== r)
          for (let n = 0; n < r.length; n += 2) {
            const i = r[n + 1];
            if (-1 !== i) {
              const s = e.data[i];
              ul(r[n]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function ta(e, t) {
        return e[Ao] ? (e[Bh][St] = t) : (e[Ao] = t), (e[Bh] = t), t;
      }
      function wc(e, t, r) {
        ul(0);
        const n = pt(null);
        try {
          t(e, r);
        } finally {
          pt(n);
        }
      }
      function Bm(e, t) {
        const r = e[wn],
          n = r ? r.get(un, null) : null;
        n && n.handleError(t);
      }
      function Ec(e, t, r, n, o) {
        for (let i = 0; i < r.length; ) {
          const s = r[i++],
            a = r[i++];
          Fm(e.data[s], t[s], n, a, o);
        }
      }
      function iA(e, t) {
        const r = ot(t, e),
          n = r[w];
        !(function sA(e, t) {
          for (let r = t.length; r < e.blueprint.length; r++)
            t.push(e.blueprint[r]);
        })(n, r);
        const o = r[fe];
        null !== o && null === r[nn] && (r[nn] = rc(o, r[wn])), bc(n, r, r[pe]);
      }
      function bc(e, t, r) {
        ll(t);
        try {
          const n = e.viewQuery;
          null !== n && wc(1, n, r);
          const o = e.template;
          null !== o && Am(e, t, o, 1, r),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Lm(e, t),
            e.staticViewQueries && wc(2, e.viewQuery, r);
          const i = e.components;
          null !== i &&
            (function aA(e, t) {
              for (let r = 0; r < t.length; r++) iA(e, t[r]);
            })(t, i);
        } catch (n) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            n)
          );
        } finally {
          (t[L] &= -5), cl();
        }
      }
      let Um = (() => {
        var e;
        class t {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, o, i) {
            const s = typeof Zone > "u" ? null : Zone.current,
              a = (function yI(e, t, r) {
                const n = Object.create(_I);
                r && (n.consumerAllowSignalWrites = !0),
                  (n.fn = e),
                  (n.schedule = t);
                const o = (s) => {
                  n.cleanupFn = s;
                };
                return (
                  (n.ref = {
                    notify: () => Qh(n),
                    run: () => {
                      if (((n.dirty = !1), n.hasRun && !Kh(n))) return;
                      n.hasRun = !0;
                      const s = Qu(n);
                      try {
                        n.cleanupFn(), (n.cleanupFn = ip), n.fn(o);
                      } finally {
                        Ku(n, s);
                      }
                    },
                    cleanup: () => n.cleanupFn(),
                  }),
                  n.ref
                );
              })(
                n,
                (c) => {
                  this.all.has(c) && this.queue.set(c, s);
                },
                i
              );
            let u;
            this.all.add(a), a.notify();
            const l = () => {
              a.cleanup(), u?.(), this.all.delete(a), this.queue.delete(a);
            };
            return (u = o?.onDestroy(l)), { destroy: l };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, o] of this.queue)
                this.queue.delete(n), o ? o.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          ((e = t).ɵprov = M({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          t
        );
      })();
      function na(e, t, r) {
        let n = r ? e.styles : null,
          o = r ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ru(o, a))
              : 2 == i && (n = Ru(n, a + ": " + t[++s] + ";"));
          }
        r ? (e.styles = n) : (e.stylesWithoutHost = n),
          r ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function ni(e, t, r, n, o = !1) {
        for (; null !== r; ) {
          const i = t[r.index];
          null !== i && n.push(ne(i)), Ve(i) && Hm(i, n);
          const s = r.type;
          if (8 & s) ni(e, t, r.child, n);
          else if (32 & s) {
            const a = Al(r, t);
            let u;
            for (; (u = a()); ) n.push(u);
          } else if (16 & s) {
            const a = Eg(t, r);
            if (Array.isArray(a)) n.push(...a);
            else {
              const u = Go(t[ge]);
              ni(u[w], u, a, n, !0);
            }
          }
          r = o ? r.projectionNext : r.next;
        }
        return n;
      }
      function Hm(e, t) {
        for (let r = Ae; r < e.length; r++) {
          const n = e[r],
            o = n[w].firstChild;
          null !== o && ni(n[w], n, o, t);
        }
        e[Bt] !== e[fe] && t.push(e[Bt]);
      }
      function ra(e, t, r, n = !0) {
        const o = t[hr],
          i = o.rendererFactory,
          s = o.afterRenderEventManager;
        i.begin?.(), s?.begin();
        try {
          Gm(e, t, e.template, r);
        } catch (u) {
          throw (n && Bm(t, u), u);
        } finally {
          i.end?.(), o.effectManager?.flush(), s?.end();
        }
      }
      function Gm(e, t, r, n) {
        const o = t[L];
        if (256 != (256 & o)) {
          t[hr].effectManager?.flush(), ll(t);
          try {
            fp(t),
              (function Dp(e) {
                return (T.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== r && Am(e, t, r, 2, n);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && gs(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && ms(t, l, 0, null), dl(t, 0);
            }
            if (
              ((function cA(e) {
                for (let t = dg(e); null !== t; t = fg(t)) {
                  if (!t[Hh]) continue;
                  const r = t[mr];
                  for (let n = 0; n < r.length; n++) {
                    TI(r[n]);
                  }
                }
              })(t),
              zm(t, 2),
              null !== e.contentQueries && Lm(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && gs(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && ms(t, l, 1), dl(t, 1);
            }
            !(function F0(e, t) {
              const r = e.hostBindingOpCodes;
              if (null === r) return;
              const n = wm(t, Oo);
              try {
                for (let o = 0; o < r.length; o++) {
                  const i = r[o];
                  if (i < 0) zn(~i);
                  else {
                    const s = i,
                      a = r[++o],
                      u = r[++o];
                    BI(a, s), (n.dirty = !1);
                    const l = Qu(n);
                    try {
                      u(2, t[s]);
                    } finally {
                      Ku(n, l);
                    }
                  }
                }
              } finally {
                null === t[Oo] && Em(t, Oo), zn(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && Wm(t, a, 0);
            const u = e.viewQuery;
            if ((null !== u && wc(2, u, n), s)) {
              const l = e.viewCheckHooks;
              null !== l && gs(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && ms(t, l, 2), dl(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[L] &= -73),
              hp(t);
          } finally {
            cl();
          }
        }
      }
      function zm(e, t) {
        for (let r = dg(e); null !== r; r = fg(r))
          for (let n = Ae; n < r.length; n++) qm(r[n], t);
      }
      function dA(e, t, r) {
        qm(ot(t, e), r);
      }
      function qm(e, t) {
        if (
          !(function SI(e) {
            return 128 == (128 & e[L]);
          })(e)
        )
          return;
        const r = e[w],
          n = e[L];
        if ((80 & n && 0 === t) || 1024 & n || 2 === t)
          Gm(r, e, r.template, e[pe]);
        else if (e[So] > 0) {
          zm(e, 1);
          const o = r.components;
          null !== o && Wm(e, o, 1);
        }
      }
      function Wm(e, t, r) {
        for (let n = 0; n < t.length; n++) dA(e, t[n], r);
      }
      class ri {
        get rootNodes() {
          const t = this._lView,
            r = t[w];
          return ni(r, t, r.firstChild, []);
        }
        constructor(t, r) {
          (this._lView = t),
            (this._cdRefInjectingView = r),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[pe];
        }
        set context(t) {
          this._lView[pe] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[L]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[le];
            if (Ve(t)) {
              const r = t[8],
                n = r ? r.indexOf(this) : -1;
              n > -1 && (Ps(t, n), ws(r, n));
            }
            this._attachedToViewContainer = !1;
          }
          Nl(this._lView[w], this._lView);
        }
        onDestroy(t) {
          !(function gp(e, t) {
            if (256 == (256 & e[L])) throw new _(911, !1);
            null === e[En] && (e[En] = []), e[En].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          ei(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[L] &= -129;
        }
        reattach() {
          this._lView[L] |= 128;
        }
        detectChanges() {
          ra(this._lView[w], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new _(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function eS(e, t) {
              qo(e, t, t[F], 2, null, null);
            })(this._lView[w], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new _(902, !1);
          this._appRef = t;
        }
      }
      class fA extends ri {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          ra(t[w], t, t[pe], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Zm extends Ks {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const r = U(t);
          return new oi(r, this.ngModule);
        }
      }
      function Ym(e) {
        const t = [];
        for (let r in e)
          e.hasOwnProperty(r) && t.push({ propName: e[r], templateName: r });
        return t;
      }
      class pA {
        constructor(t, r) {
          (this.injector = t), (this.parentInjector = r);
        }
        get(t, r, n) {
          n = os(n);
          const o = this.injector.get(t, sc, n);
          return o !== sc || r === sc ? o : this.parentInjector.get(t, r, n);
        }
      }
      class oi extends em {
        get inputs() {
          const t = this.componentDef,
            r = t.inputTransforms,
            n = Ym(t.inputs);
          if (null !== r)
            for (const o of n)
              r.hasOwnProperty(o.propName) && (o.transform = r[o.propName]);
          return n;
        }
        get outputs() {
          return Ym(this.componentDef.outputs);
        }
        constructor(t, r) {
          super(),
            (this.componentDef = t),
            (this.ngModule = r),
            (this.componentType = t.type),
            (this.selector = (function Xb(e) {
              return e.map(Jb).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!r);
        }
        create(t, r, n, o) {
          let i = (o = o || this.ngModule) instanceof vt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new pA(t, i) : t,
            a = s.get(nm, null);
          if (null === a) throw new _(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: s.get(c0, null),
              effectManager: s.get(Um, null),
              afterRenderEventManager: s.get(hc, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = n
              ? (function L0(e, t, r, n) {
                  const i = n.get(ym, !1) || r === bt.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function V0(e) {
                      Nm(e);
                    })(s),
                    s
                  );
                })(f, n, this.componentDef.encapsulation, s)
              : xs(
                  f,
                  h,
                  (function hA(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(h)
                ),
            C = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let m = null;
          null !== p && (m = rc(p, s, !0));
          const I = yc(0, null, null, 1, 0, null, null, null, null, null, null),
            N = ea(null, I, null, C, null, null, d, f, s, null, m);
          let B, Xe;
          ll(N);
          try {
            const yn = this.componentDef;
            let yo,
              qf = null;
            yn.findHostDirectiveDefs
              ? ((yo = []),
                (qf = new Map()),
                yn.findHostDirectiveDefs(yn, yo, qf),
                yo.push(yn))
              : (yo = [yn]);
            const RV = (function mA(e, t) {
                const r = e[w],
                  n = $;
                return (e[n] = t), Ur(r, n, 2, "#host", null);
              })(N, p),
              OV = (function vA(e, t, r, n, o, i, s) {
                const a = o[w];
                !(function yA(e, t, r, n) {
                  for (const o of e)
                    t.mergedAttrs = Mo(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (na(t, t.mergedAttrs, !0), null !== r && Sg(n, r, t));
                })(n, e, t, s);
                let u = null;
                null !== t && (u = rc(t, o[wn]));
                const l = i.rendererFactory.createRenderer(t, r);
                let c = 16;
                r.signals ? (c = 4096) : r.onPush && (c = 64);
                const d = ea(
                  o,
                  Tm(r),
                  null,
                  c,
                  o[e.index],
                  e,
                  i,
                  l,
                  null,
                  null,
                  u
                );
                return (
                  a.firstCreatePass && Dc(a, e, n.length - 1),
                  ta(o, d),
                  (o[e.index] = d)
                );
              })(RV, p, yn, yo, N, d, f);
            (Xe = dp(I, $)),
              p &&
                (function DA(e, t, r, n) {
                  if (n) zu(e, r, ["ng-version", d0.full]);
                  else {
                    const { attrs: o, classes: i } = (function eI(e) {
                      const t = [],
                        r = [];
                      let n = 1,
                        o = 2;
                      for (; n < e.length; ) {
                        let i = e[n];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++n])
                            : 8 === o && r.push(i);
                        else {
                          if (!It(o)) break;
                          o = i;
                        }
                        n++;
                      }
                      return { attrs: t, classes: r };
                    })(t.selectors[0]);
                    o && zu(e, r, o),
                      i && i.length > 0 && Mg(e, r, i.join(" "));
                  }
                })(f, yn, p, n),
              void 0 !== r &&
                (function CA(e, t, r) {
                  const n = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = r[o];
                    n.push(null != i ? Array.from(i) : null);
                  }
                })(Xe, this.ngContentSelectors, r),
              (B = (function _A(e, t, r, n, o, i) {
                const s = Ne(),
                  a = o[w],
                  u = Ye(s, o);
                xm(a, o, s, r, null, n);
                for (let c = 0; c < r.length; c++)
                  xe(qn(o, a, s.directiveStart + c, s), o);
                Pm(a, o, s), u && xe(u, o);
                const l = qn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[pe] = o[pe] = l), null !== i))
                  for (const c of i) c(l, t);
                return gc(a, s, e), l;
              })(OV, yn, yo, qf, N, [wA])),
              bc(I, N, null);
          } finally {
            cl();
          }
          return new gA(this.componentType, B, jr(Xe, N), N, Xe);
        }
      }
      class gA extends r0 {
        constructor(t, r, n, o, i) {
          super(),
            (this.location = n),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = r),
            (this.hostView = this.changeDetectorRef = new fA(o)),
            (this.componentType = t);
        }
        setInput(t, r) {
          const n = this._tNode.inputs;
          let o;
          if (null !== n && (o = n[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), r))
            )
              return;
            const i = this._rootLView;
            Ec(i[w], i, o, t, r),
              this.previousInputValues.set(t, r),
              ei(ot(this._tNode.index, i));
          }
        }
        get injector() {
          return new Be(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function wA() {
        const e = Ne();
        ps(v()[w], e);
      }
      function Y(e) {
        let t = (function Qm(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          r = !0;
        const n = [e];
        for (; t; ) {
          let o;
          if (At(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new _(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (r) {
              n.push(o);
              const s = e;
              (s.inputs = oa(e.inputs)),
                (s.inputTransforms = oa(e.inputTransforms)),
                (s.declaredInputs = oa(e.declaredInputs)),
                (s.outputs = oa(e.outputs));
              const a = o.hostBindings;
              a && MA(e, a);
              const u = o.viewQuery,
                l = o.contentQueries;
              if (
                (u && bA(e, u),
                l && IA(e, l),
                Ji(e.inputs, o.inputs),
                Ji(e.declaredInputs, o.declaredInputs),
                Ji(e.outputs, o.outputs),
                null !== o.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  Ji(s.inputTransforms, o.inputTransforms)),
                At(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === Y && (r = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function EA(e) {
          let t = 0,
            r = null;
          for (let n = e.length - 1; n >= 0; n--) {
            const o = e[n];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Mo(o.hostAttrs, (r = Mo(r, o.hostAttrs))));
          }
        })(n);
      }
      function oa(e) {
        return e === jt ? {} : e === G ? [] : e;
      }
      function bA(e, t) {
        const r = e.viewQuery;
        e.viewQuery = r
          ? (n, o) => {
              t(n, o), r(n, o);
            }
          : t;
      }
      function IA(e, t) {
        const r = e.contentQueries;
        e.contentQueries = r
          ? (n, o, i) => {
              t(n, o, i), r(n, o, i);
            }
          : t;
      }
      function MA(e, t) {
        const r = e.hostBindings;
        e.hostBindings = r
          ? (n, o) => {
              t(n, o), r(n, o);
            }
          : t;
      }
      function ev(e) {
        const t = e.inputConfig,
          r = {};
        for (const n in t)
          if (t.hasOwnProperty(n)) {
            const o = t[n];
            Array.isArray(o) && o[2] && (r[n] = o[2]);
          }
        e.inputTransforms = r;
      }
      function ia(e) {
        return (
          !!Ic(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Ic(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Pe(e, t, r) {
        return !Object.is(e[t], r) && ((e[t] = r), !0);
      }
      function Wt(e, t, r, n) {
        const o = v();
        return Pe(o, Dr(), t) && (H(), zt(de(), o, e, t, r, n)), Wt;
      }
      function ca(e, t, r, n, o, i, s, a) {
        const u = v(),
          l = H(),
          c = e + $,
          d = l.firstCreatePass
            ? (function KA(e, t, r, n, o, i, s, a, u) {
                const l = t.consts,
                  c = Ur(t, e, 4, s || null, In(l, a));
                _c(t, r, c, In(l, u)), ps(t, c);
                const d = (c.tView = yc(
                  2,
                  c,
                  n,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, r, n, o, i, s)
            : l.data[c];
        Ht(d, !1);
        const f = hv(l, u, d, e);
        hs() && ks(l, u, f, d),
          xe(f, u),
          ta(u, (u[c] = km(f, u, f, d))),
          ls(d) && mc(l, u, d),
          null != s && vc(u, d, a);
      }
      let hv = function pv(e, t, r, n) {
        return Mn(!0), t[F].createComment("");
      };
      function Nt(e, t, r) {
        const n = v();
        return (
          Pe(n, Dr(), t) &&
            (function ut(e, t, r, n, o, i, s, a) {
              const u = Ye(t, r);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[n])
                ? (Ec(e, r, c, n, o),
                  Hn(t) &&
                    (function z0(e, t) {
                      const r = ot(t, e);
                      16 & r[L] || (r[L] |= 64);
                    })(r, t.index))
                : 3 & t.type &&
                  ((n = (function G0(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(n)),
                  (o = null != s ? s(o, t.value || "", n) : o),
                  i.setProperty(u, n, o));
            })(H(), de(), n, e, t, n[F], r, !1),
          Nt
        );
      }
      function Rc(e, t, r, n, o) {
        const s = o ? "class" : "style";
        Ec(e, r, t.inputs[s], s, n);
      }
      function oe(e, t, r, n) {
        const o = v(),
          i = H(),
          s = $ + e,
          a = o[F],
          u = i.firstCreatePass
            ? (function tT(e, t, r, n, o, i) {
                const s = t.consts,
                  u = Ur(t, e, 2, n, In(s, o));
                return (
                  _c(t, r, u, In(s, i)),
                  null !== u.attrs && na(u, u.attrs, !1),
                  null !== u.mergedAttrs && na(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, r, n)
            : i.data[s],
          l = mv(i, o, u, a, t, e);
        o[s] = l;
        const c = ls(u);
        return (
          Ht(u, !0),
          Sg(a, l, u),
          32 != (32 & u.flags) && hs() && ks(i, o, l, u),
          0 ===
            (function RI() {
              return T.lFrame.elementDepthCount;
            })() && xe(l, o),
          (function OI() {
            T.lFrame.elementDepthCount++;
          })(),
          c && (mc(i, o, u), gc(i, u, o)),
          null !== n && vc(o, u),
          oe
        );
      }
      function ue() {
        let e = Ne();
        ol()
          ? (function il() {
              T.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Ht(e, !1));
        const t = e;
        (function PI(e) {
          return T.skipHydrationRootTNode === e;
        })(t) &&
          (function VI() {
            T.skipHydrationRootTNode = null;
          })(),
          (function xI() {
            T.lFrame.elementDepthCount--;
          })();
        const r = H();
        return (
          r.firstCreatePass && (ps(r, e), Wu(e) && r.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function JI(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Rc(r, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function XI(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Rc(r, t, v(), t.stylesWithoutHost, !1),
          ue
        );
      }
      function Qn(e, t, r, n) {
        return oe(e, t, r, n), ue(), Qn;
      }
      let mv = (e, t, r, n, o, i) => (
        Mn(!0),
        xs(
          n,
          o,
          (function Tp() {
            return T.lFrame.currentNamespace;
          })()
        )
      );
      function li(e) {
        return !!e && "function" == typeof e.then;
      }
      function Dv(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function _e(e, t, r, n) {
        const o = v(),
          i = H(),
          s = Ne();
        return (
          (function wv(e, t, r, n, o, i, s) {
            const a = ls(n),
              l =
                e.firstCreatePass &&
                (function jm(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              c = t[pe],
              d = (function Vm(e) {
                return e[fr] || (e[fr] = []);
              })(t);
            let f = !0;
            if (3 & n.type || s) {
              const g = Ye(n, t),
                y = s ? s(g) : g,
                C = d.length,
                m = s ? (N) => s(ne(N[n.index])) : n.index;
              let I = null;
              if (
                (!s &&
                  a &&
                  (I = (function aT(e, t, r, n) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === r && o[i + 1] === n) {
                          const a = t[fr],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, n.index)),
                null !== I)
              )
                ((I.__ngLastListenerFn__ || I).__ngNextListenerFn__ = i),
                  (I.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = bv(n, t, c, i, !1);
                const N = r.listen(y, o, i);
                d.push(i, N), l && l.push(o, m, C, C + 1);
              }
            } else i = bv(n, t, c, i, !1);
            const h = n.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const B = t[p[y]][p[y + 1]].subscribe(i),
                    Xe = d.length;
                  d.push(i, B), l && l.push(o, n.index, Xe, -(Xe + 1));
                }
            }
          })(i, o, o[F], s, e, t, n),
          _e
        );
      }
      function Ev(e, t, r, n) {
        try {
          return Ut(6, t, r), !1 !== r(n);
        } catch (o) {
          return Bm(e, o), !1;
        } finally {
          Ut(7, t, r);
        }
      }
      function bv(e, t, r, n, o) {
        return function i(s) {
          if (s === Function) return n;
          ei(e.componentOffset > -1 ? ot(e.index, t) : t);
          let u = Ev(t, r, n, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Ev(t, r, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && s.preventDefault(), u;
        };
      }
      function da(e = 1) {
        return (function GI(e) {
          return (T.lFrame.contextLView = (function zI(e, t) {
            for (; e > 0; ) (t = t[pr]), e--;
            return t;
          })(e, T.lFrame.contextLView))[pe];
        })(e);
      }
      function fa(e, t) {
        return (e << 17) | (t << 2);
      }
      function Tn(e) {
        return (e >> 17) & 32767;
      }
      function Fc(e) {
        return 2 | e;
      }
      function Kn(e) {
        return (131068 & e) >> 2;
      }
      function kc(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Lc(e) {
        return 1 | e;
      }
      function Pv(e, t, r, n, o) {
        const i = e[r + 1],
          s = null === t;
        let a = n ? Tn(i) : Kn(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          mT(e[a], t) && ((u = !0), (e[a + 1] = n ? Lc(c) : Fc(c))),
            (a = n ? Tn(c) : Kn(c));
        }
        u && (e[r + 1] = n ? Fc(i) : Lc(i));
      }
      function mT(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Ar(e, t) >= 0)
        );
      }
      function ha(e, t) {
        return (
          (function Rt(e, t, r, n) {
            const o = v(),
              i = H(),
              s = (function on(e) {
                const t = T.lFrame,
                  r = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), r;
              })(2);
            i.firstUpdatePass &&
              (function Hv(e, t, r, n) {
                const o = e.data;
                if (null === o[r + 1]) {
                  const i = o[$e()],
                    s = (function Uv(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, r);
                  (function Wv(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, n) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function IT(e, t, r, n) {
                      const o = (function al(e) {
                        const t = T.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = n ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (n ? t.classBindings : t.styleBindings) &&
                          ((r = ci((r = Vc(null, e, t, r, n)), t.attrs, n)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((r = Vc(o, e, t, r, n)), null === i)) {
                            let u = (function MT(e, t, r) {
                              const n = r ? t.classBindings : t.styleBindings;
                              if (0 !== Kn(n)) return e[Tn(n)];
                            })(e, t, n);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = Vc(null, e, t, u[1], n)),
                              (u = ci(u, t.attrs, n)),
                              (function ST(e, t, r, n) {
                                e[Tn(r ? t.classBindings : t.styleBindings)] =
                                  n;
                              })(e, t, n, u));
                          } else
                            i = (function AT(e, t, r) {
                              let n;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                n = ci(n, e[i].hostAttrs, r);
                              return ci(n, t.attrs, r);
                            })(e, t, n);
                      }
                      return (
                        void 0 !== i &&
                          (n
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        r
                      );
                    })(o, i, t, n)),
                    (function pT(e, t, r, n, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = Tn(s),
                        u = Kn(s);
                      e[n] = r;
                      let c,
                        l = !1;
                      if (
                        (Array.isArray(r)
                          ? ((c = r[1]),
                            (null === c || Ar(r, c) > 0) && (l = !0))
                          : (c = r),
                        o)
                      )
                        if (0 !== u) {
                          const f = Tn(e[a + 1]);
                          (e[n + 1] = fa(f, a)),
                            0 !== f && (e[f + 1] = kc(e[f + 1], n)),
                            (e[a + 1] = (function fT(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], n));
                        } else
                          (e[n + 1] = fa(a, 0)),
                            0 !== a && (e[a + 1] = kc(e[a + 1], n)),
                            (a = n);
                      else
                        (e[n + 1] = fa(u, 0)),
                          0 === a ? (a = n) : (e[u + 1] = kc(e[u + 1], n)),
                          (u = n);
                      l && (e[n + 1] = Fc(e[n + 1])),
                        Pv(e, c, n, !0),
                        Pv(e, c, n, !1),
                        (function gT(e, t, r, n, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            Ar(i, t) >= 0 &&
                            (r[n + 1] = Lc(r[n + 1]));
                        })(t, c, e, n, i),
                        (s = fa(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, r, s, n);
                }
              })(i, e, s, n),
              t !== k &&
                Pe(o, s, t) &&
                (function zv(e, t, r, n, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1],
                    c = (function hT(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? qv(u, t, r, o, Kn(l), s)
                      : void 0;
                  pa(c) ||
                    (pa(i) ||
                      ((function dT(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = qv(u, null, r, o, a, s))),
                    (function cS(e, t, r, n, o) {
                      if (t) o ? e.addClass(r, n) : e.removeClass(r, n);
                      else {
                        let i = -1 === n.indexOf("-") ? void 0 : Sn.DashCase;
                        null == o
                          ? e.removeStyle(r, n, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= Sn.Important)),
                            e.setStyle(r, n, o, i));
                      }
                    })(n, s, fs($e(), r), o, i));
                })(
                  i,
                  i.data[$e()],
                  o,
                  o[F],
                  e,
                  (o[s + 1] = (function OT(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = we(An(e)))),
                      e
                    );
                  })(t, r)),
                  n,
                  s
                );
          })(e, t, null, !0),
          ha
        );
      }
      function Vc(e, t, r, n, o) {
        let i = null;
        const s = r.directiveEnd;
        let a = r.directiveStylingLast;
        for (
          -1 === a ? (a = r.directiveStart) : a++;
          a < s && ((i = t[a]), (n = ci(n, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (r.directiveStylingLast = a), n;
      }
      function ci(e, t, r) {
        const n = r ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === n &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                it(e, s, !!r || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function qv(e, t, r, n, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = r[o + 1];
          f === k && (f = d ? G : void 0);
          let h = d ? _l(f, n) : c === n ? f : void 0;
          if ((l && !pa(h) && (h = _l(u, n)), pa(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Tn(p) : Kn(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = _l(u, n));
        }
        return a;
      }
      function pa(e) {
        return void 0 !== e;
      }
      function lt(e, t = "") {
        const r = v(),
          n = H(),
          o = e + $,
          i = n.firstCreatePass ? Ur(n, o, 1, t, null) : n.data[o],
          s = Zv(n, r, i, t, e);
        (r[o] = s), hs() && ks(n, r, s, i), Ht(i, !1);
      }
      let Zv = (e, t, r, n, o) => (
        Mn(!0),
        (function Os(e, t) {
          return e.createText(t);
        })(t[F], n)
      );
      function di(e, t, r) {
        const n = v(),
          o = (function Gr(e, t, r, n) {
            return Pe(e, Dr(), r) ? t + P(r) + n : k;
          })(n, e, t, r);
        return (
          o !== k &&
            (function cn(e, t, r) {
              const n = fs(t, e);
              !(function pg(e, t, r) {
                e.setValue(t, r);
              })(e[F], n, r);
            })(n, $e(), o),
          di
        );
      }
      const eo = "en-US";
      let vy = eo;
      function Bc(e, t, r, n, o) {
        if (((e = R(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) Bc(e[i], t, r, n, o);
        else {
          const i = H(),
            s = v(),
            a = Ne();
          let u = Zn(e) ? e : R(e.provide);
          const l = Zg(e),
            c = 1048575 & a.providerIndexes,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
          if (Zn(e) || !e.multi) {
            const h = new ko(l, o, D),
              p = Hc(u, t, o ? c : c + f, d);
            -1 === p
              ? (ml(ys(a, s), i, u),
                Uc(i, e, t.length),
                t.push(u),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                r.push(h),
                s.push(h))
              : ((r[p] = h), (s[p] = h));
          } else {
            const h = Hc(u, t, c + f, d),
              p = Hc(u, t, c, c + f),
              y = p >= 0 && r[p];
            if ((o && !y) || (!o && !(h >= 0 && r[h]))) {
              ml(ys(a, s), i, u);
              const C = (function XN(e, t, r, n, o) {
                const i = new ko(e, r, D);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Uy(i, o, n && !r),
                  i
                );
              })(o ? JN : KN, r.length, o, n, l);
              !o && y && (r[p].providerFactory = C),
                Uc(i, e, t.length, 0),
                t.push(u),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                r.push(C),
                s.push(C);
            } else Uc(i, e, h > -1 ? h : p, Uy(r[o ? p : h], l, !o && n));
            !o && n && y && r[p].componentProviders++;
          }
        }
      }
      function Uc(e, t, r, n) {
        const o = Zn(t),
          i = (function $S(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const u = (i ? R(t.useClass) : t).prototype.ngOnDestroy;
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = l.indexOf(r);
              -1 === c ? l.push(r, [n, u]) : l[c + 1].push(n, u);
            } else l.push(r, u);
          }
        }
      }
      function Uy(e, t, r) {
        return r && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Hc(e, t, r, n) {
        for (let o = r; o < n; o++) if (t[o] === e) return o;
        return -1;
      }
      function KN(e, t, r, n) {
        return Gc(this.multi, []);
      }
      function JN(e, t, r, n) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = qn(r, r[w], this.providerFactory.index, n);
          (i = a.slice(0, s)), Gc(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
        } else (i = []), Gc(o, i);
        return i;
      }
      function Gc(e, t) {
        for (let r = 0; r < e.length; r++) t.push((0, e[r])());
        return t;
      }
      function ce(e, t = []) {
        return (r) => {
          r.providersResolver = (n, o) =>
            (function QN(e, t, r) {
              const n = H();
              if (n.firstCreatePass) {
                const o = At(e);
                Bc(r, n.data, n.blueprint, o, !0),
                  Bc(t, n.data, n.blueprint, o, !1);
              }
            })(n, o ? o(e) : e, t);
        };
      }
      class Xn {}
      class Hy {}
      class zc extends Xn {
        constructor(t, r, n) {
          super(),
            (this._parent = r),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Zm(this));
          const o = rt(t);
          (this._bootstrapComponents = ln(o.bootstrap)),
            (this._r3Injector = am(
              t,
              r,
              [
                { provide: Xn, useValue: this },
                { provide: Ks, useValue: this.componentFactoryResolver },
                ...n,
              ],
              we(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((r) => r()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class qc extends Hy {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new zc(this.moduleType, t, []);
        }
      }
      class Gy extends Xn {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new Zm(this)),
            (this.instance = null);
          const r = new Gs(
            [
              ...t.providers,
              { provide: Xn, useValue: this },
              { provide: Ks, useValue: this.componentFactoryResolver },
            ],
            t.parent || Hs(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = r),
            t.runEnvironmentInitializers && r.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Wc(e, t, r = null) {
        return new Gy({
          providers: e,
          parent: t,
          debugName: r,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let nR = (() => {
        var e;
        class t {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              const o = Gg(0, n.type),
                i =
                  o.length > 0
                    ? Wc([o], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n, i);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          ((e = t).ɵprov = M({
            token: e,
            providedIn: "environment",
            factory: () => new e(S(vt)),
          })),
          t
        );
      })();
      function zy(e) {
        e.getStandaloneInjector = (t) =>
          t.get(nR).getOrCreateStandaloneInjector(e);
      }
      function Yc(e, t, r, n) {
        return (function Jy(e, t, r, n, o, i) {
          const s = t + r;
          return Pe(e, s, o)
            ? (function qt(e, t, r) {
                return (e[t] = r);
              })(e, s + 1, i ? n.call(i, o) : n(o))
            : (function vi(e, t) {
                const r = e[t];
                return r === k ? void 0 : r;
              })(e, s + 1);
        })(
          v(),
          (function je() {
            const e = T.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          r,
          n
        );
      }
      function TR(e, t, r, n = !0) {
        const o = t[w];
        if (
          ((function nS(e, t, r, n) {
            const o = Ae + n,
              i = r.length;
            n > 0 && (r[o - 1][St] = t),
              n < i - Ae
                ? ((t[St] = r[o]), Gp(r, Ae + n, t))
                : (r.push(t), (t[St] = null)),
              (t[le] = r);
            const s = t[To];
            null !== s &&
              r !== s &&
              (function rS(e, t) {
                const r = e[mr];
                t[ge] !== t[le][le][ge] && (e[Hh] = !0),
                  null === r ? (e[mr] = [t]) : r.push(t);
              })(s, t);
            const a = t[$t];
            null !== a && a.insertView(e), (t[L] |= 128);
          })(o, t, e, r),
          n)
        ) {
          const i = Pl(r, e),
            s = t[F],
            a = Fs(s, e[Bt]);
          null !== a &&
            (function XM(e, t, r, n, o, i) {
              (n[fe] = o), (n[Oe] = t), qo(e, n, r, 1, o, i);
            })(o, e[Oe], s, t, a, i);
        }
      }
      let dn = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = OR), t;
      })();
      const NR = dn,
        RR = class extends NR {
          constructor(t, r, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = r),
              (this.elementRef = n);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, r) {
            return this.createEmbeddedViewImpl(t, r);
          }
          createEmbeddedViewImpl(t, r, n) {
            const o = (function AR(e, t, r, n) {
              const o = t.tView,
                a = ea(
                  e,
                  o,
                  r,
                  4096 & e[L] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  n?.injector ?? null,
                  n?.hydrationInfo ?? null
                );
              a[To] = e[t.index];
              const l = e[$t];
              return (
                null !== l && (a[$t] = l.createEmbeddedView(o)), bc(o, a, r), a
              );
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: r,
              hydrationInfo: n,
            });
            return new ri(o);
          }
        };
      function OR() {
        return _a(Ne(), v());
      }
      function _a(e, t) {
        return 4 & e.type ? new RR(t, e, jr(e, t)) : null;
      }
      let xt = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = VR), t;
      })();
      function VR() {
        return (function l_(e, t) {
          let r;
          const n = t[e.index];
          return (
            Ve(n)
              ? (r = n)
              : ((r = km(n, t, null, e)), (t[e.index] = r), ta(t, r)),
            c_(r, t, e, n),
            new a_(r, e, t)
          );
        })(Ne(), v());
      }
      const jR = xt,
        a_ = class extends jR {
          constructor(t, r, n) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = r),
              (this._hostLView = n);
          }
          get element() {
            return jr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Be(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = _s(this._hostTNode, this._hostLView);
            if (hl(t)) {
              const r = Vo(t, this._hostLView),
                n = Lo(t);
              return new Be(r[w].data[n + 8], r);
            }
            return new Be(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const r = u_(this._lContainer);
            return (null !== r && r[t]) || null;
          }
          get length() {
            return this._lContainer.length - Ae;
          }
          createEmbeddedView(t, r, n) {
            let o, i;
            "number" == typeof n
              ? (o = n)
              : null != n && ((o = n.index), (i = n.injector));
            const a = t.createEmbeddedViewImpl(r || {}, i, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(t, r, n, o, i) {
            const s =
              t &&
              !(function $o(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = r;
            else {
              const g = r || {};
              (a = g.index),
                (n = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef);
            }
            const u = s ? t : new oi(U(t)),
              l = n || this.parentInjector;
            if (!i && null == u.ngModule) {
              const y = (s ? l : this.parentInjector).get(vt, null);
              y && (i = y);
            }
            U(u.componentType ?? {});
            const h = u.create(l, o, null, i);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, r) {
            return this.insertImpl(t, r, !1);
          }
          insertImpl(t, r, n) {
            const o = t._lView;
            if (
              (function AI(e) {
                return Ve(e[le]);
              })(o)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const l = o[le],
                  c = new a_(l, l[Oe], l[le]);
                c.detach(c.indexOf(t));
              }
            }
            const s = this._adjustIndex(r),
              a = this._lContainer;
            return (
              TR(a, o, s, !n), t.attachToViewContainerRef(), Gp(Kc(a), s, t), t
            );
          }
          move(t, r) {
            return this.insert(t, r);
          }
          indexOf(t) {
            const r = u_(this._lContainer);
            return null !== r ? r.indexOf(t) : -1;
          }
          remove(t) {
            const r = this._adjustIndex(t, -1),
              n = Ps(this._lContainer, r);
            n && (ws(Kc(this._lContainer), r), Nl(n[w], n));
          }
          detach(t) {
            const r = this._adjustIndex(t, -1),
              n = Ps(this._lContainer, r);
            return n && null != ws(Kc(this._lContainer), r) ? new ri(n) : null;
          }
          _adjustIndex(t, r = 0) {
            return t ?? this.length + r;
          }
        };
      function u_(e) {
        return e[8];
      }
      function Kc(e) {
        return e[8] || (e[8] = []);
      }
      let c_ = function d_(e, t, r, n) {
        if (e[Bt]) return;
        let o;
        (o =
          8 & r.type
            ? ne(n)
            : (function $R(e, t) {
                const r = e[F],
                  n = r.createComment(""),
                  o = Ye(t, e);
                return (
                  Wn(
                    r,
                    Fs(r, o),
                    n,
                    (function aS(e, t) {
                      return e.nextSibling(t);
                    })(r, o),
                    !1
                  ),
                  n
                );
              })(t, r)),
          (e[Bt] = o);
      };
      function D_(e, t) {
        return _a(e, t);
      }
      const ud = new b("Application Initializer");
      let ld = (() => {
          var e;
          class t {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, o) => {
                  (this.resolve = n), (this.reject = o);
                })),
                (this.appInits = E(ud, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const i of this.appInits) {
                const s = i();
                if (li(s)) n.push(s);
                else if (Dv(s)) {
                  const a = new Promise((u, l) => {
                    s.subscribe({ complete: u, error: l });
                  });
                  n.push(a);
                }
              }
              const o = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  o();
                })
                .catch((i) => {
                  this.reject(i);
                }),
                0 === n.length && o(),
                (this.initialized = !0);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        L_ = (() => {
          var e;
          class t {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })();
      const fn = new b("LocaleId", {
        providedIn: "root",
        factory: () =>
          E(fn, j.Optional | j.SkipSelf) ||
          (function mO() {
            return (typeof $localize < "u" && $localize.locale) || eo;
          })(),
      });
      let V_ = (() => {
        var e;
        class t {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new dt(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class _O {
        constructor(t, r) {
          (this.ngModuleFactory = t), (this.componentFactories = r);
        }
      }
      let j_ = (() => {
        var e;
        class t {
          compileModuleSync(n) {
            return new qc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const o = this.compileModuleSync(n),
              s = ln(rt(n).declarations).reduce((a, u) => {
                const l = U(u);
                return l && a.push(new oi(l)), a;
              }, []);
            return new _O(o, s);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const H_ = new b(""),
        Ea = new b("");
      let pd,
        fd = (() => {
          var e;
          class t {
            constructor(n, o, i) {
              (this._ngZone = n),
                (this.registry = o),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                pd ||
                  ((function jO(e) {
                    pd = e;
                  })(i),
                  i.addToWindow(o)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      re.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (o) =>
                    !o.updateCb ||
                    !o.updateCb(n) ||
                    (clearTimeout(o.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, o, i) {
              let s = -1;
              o &&
                o > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (a) => a.timeoutId !== s
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, o)),
                this._callbacks.push({ doneCb: n, timeoutId: s, updateCb: i });
            }
            whenStable(n, o, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, o, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, o, i) {
              return [];
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(S(re), S(hd), S(Ea));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        hd = (() => {
          var e;
          class t {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, o) {
              this._applications.set(n, o);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, o = !0) {
              return pd?.findTestabilityInTree(this, n, o) ?? null;
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })(),
        Nn = null;
      const G_ = new b("AllowMultipleToken"),
        gd = new b("PlatformDestroyListeners"),
        md = new b("appBootstrapListener");
      class q_ {
        constructor(t, r) {
          (this.name = t), (this.token = r);
        }
      }
      function Z_(e, t, r = []) {
        const n = `Platform: ${t}`,
          o = new b(n);
        return (i = []) => {
          let s = vd();
          if (!s || s.injector.get(G_, !1)) {
            const a = [...r, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function UO(e) {
                  if (Nn && !Nn.get(G_, !1)) throw new _(400, !1);
                  (function z_() {
                    !(function hI(e) {
                      tp = e;
                    })(() => {
                      throw new _(600, !1);
                    });
                  })(),
                    (Nn = e);
                  const t = e.get(Q_);
                  (function W_(e) {
                    e.get(Yg, null)?.forEach((r) => r());
                  })(e);
                })(
                  (function Y_(e = [], t) {
                    return at.create({
                      name: t,
                      providers: [
                        { provide: ql, useValue: "platform" },
                        { provide: gd, useValue: new Set([() => (Nn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, n)
                );
          }
          return (function GO(e) {
            const t = vd();
            if (!t) throw new _(401, !1);
            return t;
          })();
        };
      }
      function vd() {
        return Nn?.get(Q_) ?? null;
      }
      let Q_ = (() => {
        var e;
        class t {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, o) {
            const i = (function zO(e = "zone.js", t) {
              return "noop" === e ? new E0() : "zone.js" === e ? new re(t) : e;
            })(
              o?.ngZone,
              (function K_(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: o?.ngZoneEventCoalescing,
                runCoalescing: o?.ngZoneRunCoalescing,
              })
            );
            return i.run(() => {
              const s = (function tR(e, t, r) {
                  return new zc(e, t, r);
                })(
                  n.moduleType,
                  this.injector,
                  (function nD(e) {
                    return [
                      { provide: re, useFactory: e },
                      {
                        provide: Qo,
                        multi: !0,
                        useFactory: () => {
                          const t = E(WO, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: tD, useFactory: qO },
                      { provide: fm, useFactory: hm },
                    ];
                  })(() => i)
                ),
                a = s.injector.get(un, null);
              return (
                i.runOutsideAngular(() => {
                  const u = i.onError.subscribe({
                    next: (l) => {
                      a.handleError(l);
                    },
                  });
                  s.onDestroy(() => {
                    ba(this._modules, s), u.unsubscribe();
                  });
                }),
                (function J_(e, t, r) {
                  try {
                    const n = r();
                    return li(n)
                      ? n.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : n;
                  } catch (n) {
                    throw (t.runOutsideAngular(() => e.handleError(n)), n);
                  }
                })(a, i, () => {
                  const u = s.injector.get(ld);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function yy(e) {
                          ft(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (vy = e.toLowerCase().replace(/_/g, "-"));
                        })(s.injector.get(fn, eo) || eo),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, o = []) {
            const i = X_({}, o);
            return (function $O(e, t, r) {
              const n = new qc(r);
              return Promise.resolve(n);
            })(0, 0, n).then((s) => this.bootstrapModuleFactory(s, i));
          }
          _moduleDoBootstrap(n) {
            const o = n.injector.get(ro);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => o.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new _(-403, !1);
              n.instance.ngDoBootstrap(o);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new _(404, !1);
            this._modules.slice().forEach((o) => o.destroy()),
              this._destroyListeners.forEach((o) => o());
            const n = this._injector.get(gd, null);
            n && (n.forEach((o) => o()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(S(at));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          t
        );
      })();
      function X_(e, t) {
        return Array.isArray(t) ? t.reduce(X_, e) : { ...e, ...t };
      }
      let ro = (() => {
        var e;
        class t {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = E(tD)),
              (this.zoneIsStable = E(fm)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = E(V_).hasPendingTasks.pipe(
                Vt((n) => (n ? x(!1) : this.zoneIsStable)),
                (function bb(e, t = _n) {
                  return (
                    (e = e ?? Ib),
                    Ce((r, n) => {
                      let o,
                        i = !0;
                      r.subscribe(
                        ye(n, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), n.next(s));
                        })
                      );
                    })
                  );
                })(),
                _h()
              )),
              (this._injector = E(vt));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, o) {
            const i = n instanceof em;
            if (!this._injector.get(ld).done)
              throw (
                (!i &&
                  (function dr(e) {
                    const t = U(e) || Se(e) || Le(e);
                    return null !== t && t.standalone;
                  })(n),
                new _(405, !1))
              );
            let a;
            (a = i ? n : this._injector.get(Ks).resolveComponentFactory(n)),
              this.componentTypes.push(a.componentType);
            const u = (function BO(e) {
                return e.isBoundToModule;
              })(a)
                ? void 0
                : this._injector.get(Xn),
              c = a.create(at.NULL, [], o || a.selector, u),
              d = c.location.nativeElement,
              f = c.injector.get(H_, null);
            return (
              f?.registerApplication(d),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  ba(this.components, c),
                  f?.unregisterApplication(d);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new _(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const o = n;
            this._views.push(o), o.attachToAppRef(this);
          }
          detachView(n) {
            const o = n;
            ba(this._views, o), o.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const o = this._injector.get(md, []);
            o.push(...this._bootstrapListeners), o.forEach((i) => i(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => ba(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new _(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function ba(e, t) {
        const r = e.indexOf(t);
        r > -1 && e.splice(r, 1);
      }
      const tD = new b("", {
        providedIn: "root",
        factory: () => E(un).handleError.bind(void 0),
      });
      function qO() {
        const e = E(re),
          t = E(un);
        return (r) => e.runOutsideAngular(() => t.handleError(r));
      }
      let WO = (() => {
        var e;
        class t {
          constructor() {
            (this.zone = E(re)), (this.applicationRef = E(ro));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      let Ia = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = YO), t;
      })();
      function YO(e) {
        return (function QO(e, t, r) {
          if (Hn(e) && !r) {
            const n = ot(e.index, t);
            return new ri(n, n);
          }
          return 47 & e.type ? new ri(t[ge], t) : null;
        })(Ne(), v(), 16 == (16 & e));
      }
      class sD {
        constructor() {}
        supports(t) {
          return ia(t);
        }
        create(t) {
          return new n1(t);
        }
      }
      const t1 = (e, t) => t;
      class n1 {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || t1);
        }
        forEachItem(t) {
          let r;
          for (r = this._itHead; null !== r; r = r._next) t(r);
        }
        forEachOperation(t) {
          let r = this._itHead,
            n = this._removalsHead,
            o = 0,
            i = null;
          for (; r || n; ) {
            const s = !n || (r && r.currentIndex < uD(n, o, i)) ? r : n,
              a = uD(s, o, i),
              u = s.currentIndex;
            if (s === n) o--, (n = n._nextRemoved);
            else if (((r = r._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let r;
          for (r = this._previousItHead; null !== r; r = r._nextPrevious) t(r);
        }
        forEachAddedItem(t) {
          let r;
          for (r = this._additionsHead; null !== r; r = r._nextAdded) t(r);
        }
        forEachMovedItem(t) {
          let r;
          for (r = this._movesHead; null !== r; r = r._nextMoved) t(r);
        }
        forEachRemovedItem(t) {
          let r;
          for (r = this._removalsHead; null !== r; r = r._nextRemoved) t(r);
        }
        forEachIdentityChange(t) {
          let r;
          for (
            r = this._identityChangesHead;
            null !== r;
            r = r._nextIdentityChange
          )
            t(r);
        }
        diff(t) {
          if ((null == t && (t = []), !ia(t))) throw new _(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            r = this._itHead,
            n = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== r && Object.is(r.trackById, s)
                  ? (n && (r = this._verifyReinsertion(r, i, s, a)),
                    Object.is(r.item, i) || this._addIdentityChange(r, i))
                  : ((r = this._mismatch(r, i, s, a)), (n = !0)),
                (r = r._next);
          } else
            (o = 0),
              (function xA(e, t) {
                if (Array.isArray(e))
                  for (let r = 0; r < e.length; r++) t(e[r]);
                else {
                  const r = e[Symbol.iterator]();
                  let n;
                  for (; !(n = r.next()).done; ) t(n.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== r && Object.is(r.trackById, s)
                    ? (n && (r = this._verifyReinsertion(r, a, s, o)),
                      Object.is(r.item, a) || this._addIdentityChange(r, a))
                    : ((r = this._mismatch(r, a, s, o)), (n = !0)),
                  (r = r._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(r), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, r, n, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, r) || this._addIdentityChange(t, r),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(n, o))
              ? (Object.is(t.item, r) || this._addIdentityChange(t, r),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new r1(r, n), i, o)),
            t
          );
        }
        _verifyReinsertion(t, r, n, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const r = t._next;
            this._addToRemovals(this._unlink(t)), (t = r);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, r, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, r, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, r, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, r, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, r, n) {
          return (
            this._insertAfter(t, r, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, r, n) {
          const o = null === r ? this._itHead : r._next;
          return (
            (t._next = o),
            (t._prev = r),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === r ? (this._itHead = t) : (r._next = t),
            null === this._linkedRecords && (this._linkedRecords = new aD()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const r = t._prev,
            n = t._next;
          return (
            null === r ? (this._itHead = n) : (r._next = n),
            null === n ? (this._itTail = r) : (n._prev = r),
            t
          );
        }
        _addToMoves(t, r) {
          return (
            t.previousIndex === r ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new aD()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, r) {
          return (
            (t.item = r),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class r1 {
        constructor(t, r) {
          (this.item = t),
            (this.trackById = r),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class o1 {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, r) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === r || r <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const r = t._prevDup,
            n = t._nextDup;
          return (
            null === r ? (this._head = n) : (r._nextDup = n),
            null === n ? (this._tail = r) : (n._prevDup = r),
            null === this._head
          );
        }
      }
      class aD {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const r = t.trackById;
          let n = this.map.get(r);
          n || ((n = new o1()), this.map.set(r, n)), n.add(t);
        }
        get(t, r) {
          const o = this.map.get(t);
          return o ? o.get(t, r) : null;
        }
        remove(t) {
          const r = t.trackById;
          return this.map.get(r).remove(t) && this.map.delete(r), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function uD(e, t, r) {
        const n = e.previousIndex;
        if (null === n) return n;
        let o = 0;
        return r && n < r.length && (o = r[n]), n + t + o;
      }
      class lD {
        constructor() {}
        supports(t) {
          return t instanceof Map || Ic(t);
        }
        create() {
          return new i1();
        }
      }
      class i1 {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let r;
          for (r = this._mapHead; null !== r; r = r._next) t(r);
        }
        forEachPreviousItem(t) {
          let r;
          for (r = this._previousMapHead; null !== r; r = r._nextPrevious) t(r);
        }
        forEachChangedItem(t) {
          let r;
          for (r = this._changesHead; null !== r; r = r._nextChanged) t(r);
        }
        forEachAddedItem(t) {
          let r;
          for (r = this._additionsHead; null !== r; r = r._nextAdded) t(r);
        }
        forEachRemovedItem(t) {
          let r;
          for (r = this._removalsHead; null !== r; r = r._nextRemoved) t(r);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Ic(t))) throw new _(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let r = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (n, o) => {
              if (r && r.key === o)
                this._maybeAddToChanges(r, n),
                  (this._appendAfter = r),
                  (r = r._next);
              else {
                const i = this._getOrCreateRecordForKey(o, n);
                r = this._insertBeforeOrAppend(r, i);
              }
            }),
            r)
          ) {
            r._prev && (r._prev._next = null), (this._removalsHead = r);
            for (let n = r; null !== n; n = n._nextRemoved)
              n === this._mapHead && (this._mapHead = null),
                this._records.delete(n.key),
                (n._nextRemoved = n._next),
                (n.previousValue = n.currentValue),
                (n.currentValue = null),
                (n._prev = null),
                (n._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, r) {
          if (t) {
            const n = t._prev;
            return (
              (r._next = t),
              (r._prev = n),
              (t._prev = r),
              n && (n._next = r),
              t === this._mapHead && (this._mapHead = r),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = r), (r._prev = this._appendAfter))
              : (this._mapHead = r),
            (this._appendAfter = r),
            null
          );
        }
        _getOrCreateRecordForKey(t, r) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, r);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const n = new s1(t);
          return (
            this._records.set(t, n),
            (n.currentValue = r),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, r) {
          Object.is(r, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = r),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, r) {
          t instanceof Map
            ? t.forEach(r)
            : Object.keys(t).forEach((n) => r(t[n], n));
        }
      }
      class s1 {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function cD() {
        return new Aa([new sD()]);
      }
      let Aa = (() => {
        var e;
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, o) {
            if (null != o) {
              const i = o.factories.slice();
              n = n.concat(i);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (o) => t.create(n, o || cD()),
              deps: [[t, new Is(), new bs()]],
            };
          }
          find(n) {
            const o = this.factories.find((i) => i.supports(n));
            if (null != o) return o;
            throw new _(901, !1);
          }
        }
        return (
          ((e = t).ɵprov = M({ token: e, providedIn: "root", factory: cD })), t
        );
      })();
      function dD() {
        return new Ci([new lD()]);
      }
      let Ci = (() => {
        var e;
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, o) {
            if (o) {
              const i = o.factories.slice();
              n = n.concat(i);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (o) => t.create(n, o || dD()),
              deps: [[t, new Is(), new bs()]],
            };
          }
          find(n) {
            const o = this.factories.find((i) => i.supports(n));
            if (o) return o;
            throw new _(901, !1);
          }
        }
        return (
          ((e = t).ɵprov = M({ token: e, providedIn: "root", factory: dD })), t
        );
      })();
      const l1 = Z_(null, "core", []);
      let c1 = (() => {
        var e;
        class t {
          constructor(n) {}
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(S(ro));
          }),
          (e.ɵmod = Mt({ type: e })),
          (e.ɵinj = ht({})),
          t
        );
      })();
      function oo(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let Ed = null;
      function Rn() {
        return Ed;
      }
      class b1 {}
      const _t = new b("DocumentToken");
      let bd = (() => {
        var e;
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return E(M1);
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      const I1 = new b("Location Initialized");
      let M1 = (() => {
        var e;
        class t extends bd {
          constructor() {
            super(),
              (this._doc = E(_t)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Rn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const o = Rn().getGlobalEventTarget(this._doc, "window");
            return (
              o.addEventListener("popstate", n, !1),
              () => o.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const o = Rn().getGlobalEventTarget(this._doc, "window");
            return (
              o.addEventListener("hashchange", n, !1),
              () => o.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, o, i) {
            this._history.pushState(n, o, i);
          }
          replaceState(n, o, i) {
            this._history.replaceState(n, o, i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      function Id(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let r = 0;
        return (
          e.endsWith("/") && r++,
          t.startsWith("/") && r++,
          2 == r ? e + t.substring(1) : 1 == r ? e + t : e + "/" + t
        );
      }
      function DD(e) {
        const t = e.match(/#|\?|$/),
          r = (t && t.index) || e.length;
        return e.slice(0, r - ("/" === e[r - 1] ? 1 : 0)) + e.slice(r);
      }
      function hn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let tr = (() => {
        var e;
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return E(wD);
            },
            providedIn: "root",
          })),
          t
        );
      })();
      const CD = new b("appBaseHref");
      let wD = (() => {
          var e;
          class t extends tr {
            constructor(n, o) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  o ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  E(_t).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Id(this._baseHref, n);
            }
            path(n = !1) {
              const o =
                  this._platformLocation.pathname +
                  hn(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${o}${i}` : o;
            }
            pushState(n, o, i, s) {
              const a = this.prepareExternalUrl(i + hn(s));
              this._platformLocation.pushState(n, o, a);
            }
            replaceState(n, o, i, s) {
              const a = this.prepareExternalUrl(i + hn(s));
              this._platformLocation.replaceState(n, o, a);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(S(bd), S(CD, 8));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        S1 = (() => {
          var e;
          class t extends tr {
            constructor(n, o) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != o && (this._baseHref = o);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let o = this._platformLocation.hash;
              return null == o && (o = "#"), o.length > 0 ? o.substring(1) : o;
            }
            prepareExternalUrl(n) {
              const o = Id(this._baseHref, n);
              return o.length > 0 ? "#" + o : o;
            }
            pushState(n, o, i, s) {
              let a = this.prepareExternalUrl(i + hn(s));
              0 == a.length && (a = this._platformLocation.pathname),
                this._platformLocation.pushState(n, o, a);
            }
            replaceState(n, o, i, s) {
              let a = this.prepareExternalUrl(i + hn(s));
              0 == a.length && (a = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, o, a);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(S(bd), S(CD, 8));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        Md = (() => {
          var e;
          class t {
            constructor(n) {
              (this._subject = new ae()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const o = this._locationStrategy.getBaseHref();
              (this._basePath = (function N1(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, r] = e.split(/\/\/[^\/]+/);
                  return r;
                }
                return e;
              })(DD(ED(o)))),
                this._locationStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, o = "") {
              return this.path() == this.normalize(n + hn(o));
            }
            normalize(n) {
              return t.stripTrailingSlash(
                (function T1(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const r = t.substring(e.length);
                  return "" === r || ["/", ";", "?", "#"].includes(r[0])
                    ? r
                    : t;
                })(this._basePath, ED(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, o = "", i = null) {
              this._locationStrategy.pushState(i, "", n, o),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + hn(o)),
                  i
                );
            }
            replaceState(n, o = "", i = null) {
              this._locationStrategy.replaceState(i, "", n, o),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + hn(o)),
                  i
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((o) => {
                    this._notifyUrlChangeListeners(o.url, o.state);
                  })),
                () => {
                  const o = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(o, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", o) {
              this._urlChangeListeners.forEach((i) => i(n, o));
            }
            subscribe(n, o, i) {
              return this._subject.subscribe({
                next: n,
                error: o,
                complete: i,
              });
            }
          }
          return (
            ((e = t).normalizeQueryParams = hn),
            (e.joinWithSlash = Id),
            (e.stripTrailingSlash = DD),
            (e.ɵfac = function (n) {
              return new (n || e)(S(tr));
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return (function A1() {
                  return new Md(S(tr));
                })();
              },
              providedIn: "root",
            })),
            t
          );
        })();
      function ED(e) {
        return e.replace(/\/index.html$/, "");
      }
      const kd = /\s+/,
        OD = [];
      let xD = (() => {
        var e;
        class t {
          constructor(n, o, i, s) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = o),
              (this._ngEl = i),
              (this._renderer = s),
              (this.initialClasses = OD),
              (this.stateMap = new Map());
          }
          set klass(n) {
            this.initialClasses = null != n ? n.trim().split(kd) : OD;
          }
          set ngClass(n) {
            this.rawClass = "string" == typeof n ? n.trim().split(kd) : n;
          }
          ngDoCheck() {
            for (const o of this.initialClasses) this._updateState(o, !0);
            const n = this.rawClass;
            if (Array.isArray(n) || n instanceof Set)
              for (const o of n) this._updateState(o, !0);
            else if (null != n)
              for (const o of Object.keys(n)) this._updateState(o, !!n[o]);
            this._applyStateDiff();
          }
          _updateState(n, o) {
            const i = this.stateMap.get(n);
            void 0 !== i
              ? (i.enabled !== o && ((i.changed = !0), (i.enabled = o)),
                (i.touched = !0))
              : this.stateMap.set(n, { enabled: o, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const n of this.stateMap) {
              const o = n[0],
                i = n[1];
              i.changed
                ? (this._toggleClass(o, i.enabled), (i.changed = !1))
                : i.touched ||
                  (i.enabled && this._toggleClass(o, !1),
                  this.stateMap.delete(o)),
                (i.touched = !1);
            }
          }
          _toggleClass(n, o) {
            (n = n.trim()).length > 0 &&
              n.split(kd).forEach((i) => {
                o
                  ? this._renderer.addClass(this._ngEl.nativeElement, i)
                  : this._renderer.removeClass(this._ngEl.nativeElement, i);
              });
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(D(Aa), D(Ci), D(st), D(an));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          t
        );
      })();
      class mx {
        constructor(t, r, n, o) {
          (this.$implicit = t),
            (this.ngForOf = r),
            (this.index = n),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let FD = (() => {
        var e;
        class t {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, o, i) {
            (this._viewContainer = n),
              (this._template = o),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const o = this._viewContainer;
            n.forEachOperation((i, s, a) => {
              if (null == i.previousIndex)
                o.createEmbeddedView(
                  this._template,
                  new mx(i.item, this._ngForOf, -1, -1),
                  null === a ? void 0 : a
                );
              else if (null == a) o.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const u = o.get(s);
                o.move(u, a), kD(u, i);
              }
            });
            for (let i = 0, s = o.length; i < s; i++) {
              const u = o.get(i).context;
              (u.index = i), (u.count = s), (u.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              kD(o.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, o) {
            return !0;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(D(xt), D(dn), D(Aa));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          t
        );
      })();
      function kD(e, t) {
        e.context.$implicit = t.item;
      }
      let LD = (() => {
        var e;
        class t {
          constructor(n, o) {
            (this._viewContainer = n),
              (this._context = new vx()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = o);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            VD("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            VD("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, o) {
            return !0;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(D(xt), D(dn));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          t
        );
      })();
      class vx {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function VD(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${we(t)}'.`
          );
      }
      let BD = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Mt({ type: e })),
          (e.ɵinj = ht({})),
          t
        );
      })();
      function HD(e) {
        return "server" === e;
      }
      let zx = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵprov = M({
            token: e,
            providedIn: "root",
            factory: () => new qx(S(_t), window),
          })),
          t
        );
      })();
      class qx {
        constructor(t, r) {
          (this.document = t), (this.window = r), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const r = (function Wx(e, t) {
            const r = e.getElementById(t) || e.getElementsByName(t)[0];
            if (r) return r;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const n = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = n.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = n.nextNode();
              }
            }
            return null;
          })(this.document, t);
          r && (this.scrollToElement(r), r.focus());
        }
        setHistoryScrollRestoration(t) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = t);
        }
        scrollToElement(t) {
          const r = t.getBoundingClientRect(),
            n = r.left + this.window.pageXOffset,
            o = r.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(n - i[0], o - i[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class vP extends b1 {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Hd extends vP {
        static makeCurrent() {
          !(function E1(e) {
            Ed || (Ed = e);
          })(new Hd());
        }
        onAndCancel(t, r, n) {
          return (
            t.addEventListener(r, n),
            () => {
              t.removeEventListener(r, n);
            }
          );
        }
        dispatchEvent(t, r) {
          t.dispatchEvent(r);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, r) {
          return (r = r || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, r) {
          return "window" === r
            ? window
            : "document" === r
            ? t
            : "body" === r
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const r = (function yP() {
            return (
              (Ii = Ii || document.querySelector("base")),
              Ii ? Ii.getAttribute("href") : null
            );
          })();
          return null == r
            ? null
            : (function _P(e) {
                (Ua = Ua || document.createElement("a")),
                  Ua.setAttribute("href", e);
                const t = Ua.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(r);
        }
        resetBaseElement() {
          Ii = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function px(e, t) {
            t = encodeURIComponent(t);
            for (const r of e.split(";")) {
              const n = r.indexOf("="),
                [o, i] = -1 == n ? [r, ""] : [r.slice(0, n), r.slice(n + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Ua,
        Ii = null,
        CP = (() => {
          var e;
          class t {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })();
      const Gd = new b("EventManagerPlugins");
      let ZD = (() => {
        var e;
        class t {
          constructor(n, o) {
            (this._zone = o),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => {
                i.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, o, i) {
            return this._findPluginFor(o).addEventListener(n, o, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let o = this._eventNameToPlugin.get(n);
            if (o) return o;
            if (((o = this._plugins.find((s) => s.supports(n))), !o))
              throw new _(5101, !1);
            return this._eventNameToPlugin.set(n, o), o;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(S(Gd), S(re));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class YD {
        constructor(t) {
          this._doc = t;
        }
      }
      const zd = "ng-app-id";
      let QD = (() => {
        var e;
        class t {
          constructor(n, o, i, s = {}) {
            (this.doc = n),
              (this.appId = o),
              (this.nonce = i),
              (this.platformId = s),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = HD(s)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const o of n)
              1 === this.changeUsageCount(o, 1) && this.onStyleAdded(o);
          }
          removeStyles(n) {
            for (const o of n)
              this.changeUsageCount(o, -1) <= 0 && this.onStyleRemoved(o);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((o) => o.remove()), n.clear());
            for (const o of this.getAllStyles()) this.onStyleRemoved(o);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const o of this.getAllStyles()) this.addStyleToHost(n, o);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const o of this.hostNodes) this.addStyleToHost(o, n);
          }
          onStyleRemoved(n) {
            const o = this.styleRef;
            o.get(n)?.elements?.forEach((i) => i.remove()), o.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${zd}="${this.appId}"]`
            );
            if (n?.length) {
              const o = new Map();
              return (
                n.forEach((i) => {
                  null != i.textContent && o.set(i.textContent, i);
                }),
                o
              );
            }
            return null;
          }
          changeUsageCount(n, o) {
            const i = this.styleRef;
            if (i.has(n)) {
              const s = i.get(n);
              return (s.usage += o), s.usage;
            }
            return i.set(n, { usage: o, elements: [] }), o;
          }
          getStyleElement(n, o) {
            const i = this.styleNodesInDOM,
              s = i?.get(o);
            if (s?.parentNode === n)
              return i.delete(o), s.removeAttribute(zd), s;
            {
              const a = this.doc.createElement("style");
              return (
                this.nonce && a.setAttribute("nonce", this.nonce),
                (a.textContent = o),
                this.platformIsServer && a.setAttribute(zd, this.appId),
                a
              );
            }
          }
          addStyleToHost(n, o) {
            const i = this.getStyleElement(n, o);
            n.appendChild(i);
            const s = this.styleRef,
              a = s.get(o)?.elements;
            a ? a.push(i) : s.set(o, { elements: [i], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(S(_t), S(zs), S(Qg, 8), S(kr));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const qd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Wd = /%COMP%/g,
        IP = new b("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function JD(e, t) {
        return t.map((r) => r.replace(Wd, e));
      }
      let XD = (() => {
        var e;
        class t {
          constructor(n, o, i, s, a, u, l, c = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = o),
              (this.appId = i),
              (this.removeStylesOnCompDestroy = s),
              (this.doc = a),
              (this.platformId = u),
              (this.ngZone = l),
              (this.nonce = c),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = HD(u)),
              (this.defaultRenderer = new Zd(n, a, l, this.platformIsServer));
          }
          createRenderer(n, o) {
            if (!n || !o) return this.defaultRenderer;
            this.platformIsServer &&
              o.encapsulation === bt.ShadowDom &&
              (o = { ...o, encapsulation: bt.Emulated });
            const i = this.getOrCreateRenderer(n, o);
            return (
              i instanceof tC
                ? i.applyToHost(n)
                : i instanceof Yd && i.applyStyles(),
              i
            );
          }
          getOrCreateRenderer(n, o) {
            const i = this.rendererByCompId;
            let s = i.get(o.id);
            if (!s) {
              const a = this.doc,
                u = this.ngZone,
                l = this.eventManager,
                c = this.sharedStylesHost,
                d = this.removeStylesOnCompDestroy,
                f = this.platformIsServer;
              switch (o.encapsulation) {
                case bt.Emulated:
                  s = new tC(l, c, o, this.appId, d, a, u, f);
                  break;
                case bt.ShadowDom:
                  return new TP(l, c, n, o, a, u, this.nonce, f);
                default:
                  s = new Yd(l, c, o, d, a, u, f);
              }
              i.set(o.id, s);
            }
            return s;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(
              S(ZD),
              S(QD),
              S(zs),
              S(IP),
              S(_t),
              S(kr),
              S(re),
              S(Qg)
            );
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class Zd {
        constructor(t, r, n, o) {
          (this.eventManager = t),
            (this.doc = r),
            (this.ngZone = n),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, r) {
          return r
            ? this.doc.createElementNS(qd[r] || r, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, r) {
          (eC(t) ? t.content : t).appendChild(r);
        }
        insertBefore(t, r, n) {
          t && (eC(t) ? t.content : t).insertBefore(r, n);
        }
        removeChild(t, r) {
          t && t.removeChild(r);
        }
        selectRootElement(t, r) {
          let n = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!n) throw new _(-5104, !1);
          return r || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, r, n, o) {
          if (o) {
            r = o + ":" + r;
            const i = qd[o];
            i ? t.setAttributeNS(i, r, n) : t.setAttribute(r, n);
          } else t.setAttribute(r, n);
        }
        removeAttribute(t, r, n) {
          if (n) {
            const o = qd[n];
            o ? t.removeAttributeNS(o, r) : t.removeAttribute(`${n}:${r}`);
          } else t.removeAttribute(r);
        }
        addClass(t, r) {
          t.classList.add(r);
        }
        removeClass(t, r) {
          t.classList.remove(r);
        }
        setStyle(t, r, n, o) {
          o & (Sn.DashCase | Sn.Important)
            ? t.style.setProperty(r, n, o & Sn.Important ? "important" : "")
            : (t.style[r] = n);
        }
        removeStyle(t, r, n) {
          n & Sn.DashCase ? t.style.removeProperty(r) : (t.style[r] = "");
        }
        setProperty(t, r, n) {
          t[r] = n;
        }
        setValue(t, r) {
          t.nodeValue = r;
        }
        listen(t, r, n) {
          if (
            "string" == typeof t &&
            !(t = Rn().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${r}`);
          return this.eventManager.addEventListener(
            t,
            r,
            this.decoratePreventDefault(n)
          );
        }
        decoratePreventDefault(t) {
          return (r) => {
            if ("__ngUnwrap__" === r) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(r))
                : t(r)) && r.preventDefault();
          };
        }
      }
      function eC(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class TP extends Zd {
        constructor(t, r, n, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = r),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const l = JD(o.id, o.styles);
          for (const c of l) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = c),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, r) {
          return super.appendChild(this.nodeOrShadowRoot(t), r);
        }
        insertBefore(t, r, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), r, n);
        }
        removeChild(t, r) {
          return super.removeChild(this.nodeOrShadowRoot(t), r);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Yd extends Zd {
        constructor(t, r, n, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = r),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? JD(u, n.styles) : n.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class tC extends Yd {
        constructor(t, r, n, o, i, s, a, u) {
          const l = o + "-" + n.id;
          super(t, r, n, i, s, a, u, l),
            (this.contentAttr = (function MP(e) {
              return "_ngcontent-%COMP%".replace(Wd, e);
            })(l)),
            (this.hostAttr = (function SP(e) {
              return "_nghost-%COMP%".replace(Wd, e);
            })(l));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, r) {
          const n = super.createElement(t, r);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      let NP = (() => {
        var e;
        class t extends YD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, o, i) {
            return (
              n.addEventListener(o, i, !1),
              () => this.removeEventListener(n, o, i)
            );
          }
          removeEventListener(n, o, i) {
            return n.removeEventListener(o, i);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(S(_t));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const nC = ["alt", "control", "meta", "shift"],
        RP = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        OP = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let xP = (() => {
        var e;
        class t extends YD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != t.parseEventName(n);
          }
          addEventListener(n, o, i) {
            const s = t.parseEventName(o),
              a = t.eventCallback(s.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Rn().onAndCancel(n, s.domEventName, a));
          }
          static parseEventName(n) {
            const o = n.toLowerCase().split("."),
              i = o.shift();
            if (0 === o.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const s = t._normalizeKey(o.pop());
            let a = "",
              u = o.indexOf("code");
            if (
              (u > -1 && (o.splice(u, 1), (a = "code.")),
              nC.forEach((c) => {
                const d = o.indexOf(c);
                d > -1 && (o.splice(d, 1), (a += c + "."));
              }),
              (a += s),
              0 != o.length || 0 === s.length)
            )
              return null;
            const l = {};
            return (l.domEventName = i), (l.fullKey = a), l;
          }
          static matchEventFullKeyCode(n, o) {
            let i = RP[n.key] || n.key,
              s = "";
            return (
              o.indexOf("code.") > -1 && ((i = n.code), (s = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                nC.forEach((a) => {
                  a !== i && (0, OP[a])(n) && (s += a + ".");
                }),
                (s += i),
                s === o)
            );
          }
          static eventCallback(n, o, i) {
            return (s) => {
              t.matchEventFullKeyCode(s, n) && i.runGuarded(() => o(s));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(S(_t));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const LP = Z_(l1, "browser", [
          { provide: kr, useValue: "browser" },
          {
            provide: Yg,
            useValue: function PP() {
              Hd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: _t,
            useFactory: function kP() {
              return (
                (function gS(e) {
                  Ll = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        VP = new b(""),
        iC = [
          {
            provide: Ea,
            useClass: class DP {
              addToWindow(t) {
                (te.getAngularTestability = (n, o = !0) => {
                  const i = t.findTestabilityInTree(n, o);
                  if (null == i) throw new _(5103, !1);
                  return i;
                }),
                  (te.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (te.getAllAngularRootElements = () => t.getAllRootElements()),
                  te.frameworkStabilizers || (te.frameworkStabilizers = []),
                  te.frameworkStabilizers.push((n) => {
                    const o = te.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && n(s);
                    };
                    o.forEach((u) => {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, r, n) {
                return null == r
                  ? null
                  : t.getTestability(r) ??
                      (n
                        ? Rn().isShadowRoot(r)
                          ? this.findTestabilityInTree(t, r.host, !0)
                          : this.findTestabilityInTree(t, r.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: H_, useClass: fd, deps: [re, hd, Ea] },
          { provide: fd, useClass: fd, deps: [re, hd, Ea] },
        ],
        sC = [
          { provide: ql, useValue: "root" },
          {
            provide: un,
            useFactory: function FP() {
              return new un();
            },
            deps: [],
          },
          { provide: Gd, useClass: NP, multi: !0, deps: [_t, re, kr] },
          { provide: Gd, useClass: xP, multi: !0, deps: [_t] },
          XD,
          QD,
          ZD,
          { provide: nm, useExisting: XD },
          { provide: class Zx {}, useClass: CP, deps: [] },
          [],
        ];
      let jP = (() => {
          var e;
          class t {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: t,
                providers: [{ provide: zs, useValue: n.appId }],
              };
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(S(VP, 12));
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = ht({ providers: [...sC, ...iC], imports: [BD, c1] })),
            t
          );
        })(),
        aC = (() => {
          var e;
          class t {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(S(_t));
            }),
            (e.ɵprov = M({
              token: e,
              factory: function (n) {
                let o = null;
                return (
                  (o = n
                    ? new n()
                    : (function BP() {
                        return new aC(S(_t));
                      })()),
                  o
                );
              },
              providedIn: "root",
            })),
            t
          );
        })();
      typeof window < "u" && window;
      const { isArray: WP } = Array,
        { getPrototypeOf: ZP, prototype: YP, keys: QP } = Object;
      function dC(e) {
        if (1 === e.length) {
          const t = e[0];
          if (WP(t)) return { args: t, keys: null };
          if (
            (function KP(e) {
              return e && "object" == typeof e && ZP(e) === YP;
            })(t)
          ) {
            const r = QP(t);
            return { args: r.map((n) => t[n]), keys: r };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: JP } = Array;
      function fC(e) {
        return J((t) =>
          (function XP(e, t) {
            return JP(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function hC(e, t) {
        return e.reduce((r, n, o) => ((r[n] = t[o]), r), {});
      }
      function Kd(...e) {
        const t = wo(e),
          r = gh(e),
          { args: n, keys: o } = dC(e);
        if (0 === n.length) return Ie([], t);
        const i = new ve(
          (function eF(e, t, r = _n) {
            return (n) => {
              pC(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    pC(
                      t,
                      () => {
                        const l = Ie(e[u], t);
                        let c = !1;
                        l.subscribe(
                          ye(
                            n,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || n.next(r(i.slice()));
                            },
                            () => {
                              --s || n.complete();
                            }
                          )
                        );
                      },
                      n
                    );
                },
                n
              );
            };
          })(n, t, o ? (s) => hC(o, s) : _n)
        );
        return r ? i.pipe(fC(r)) : i;
      }
      function pC(e, t, r) {
        e ? Xt(r, e, t) : t();
      }
      const Ha = _o(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Jd(...e) {
        return (function tF() {
          return lr(1);
        })()(Ie(e, wo(e)));
      }
      function gC(e) {
        return new ve((t) => {
          tt(e()).subscribe(t);
        });
      }
      function Mi(e, t) {
        const r = K(e) ? e : () => e,
          n = (o) => o.error(r());
        return new ve(t ? (o) => t.schedule(n, 0, o) : n);
      }
      function Xd() {
        return Ce((e, t) => {
          let r = null;
          e._refCount++;
          const n = ye(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (r = null);
            const o = e._connection,
              i = r;
            (r = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(n), n.closed || (r = e.connect());
        });
      }
      class mC extends ve {
        constructor(t, r) {
          super(),
            (this.source = t),
            (this.subjectFactory = r),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            eh(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new et();
            const r = this.getSubject();
            t.add(
              this.source.subscribe(
                ye(
                  r,
                  void 0,
                  () => {
                    this._teardown(), r.complete();
                  },
                  (n) => {
                    this._teardown(), r.error(n);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = et.EMPTY));
          }
          return t;
        }
        refCount() {
          return Xd()(this);
        }
      }
      function so(e) {
        return e <= 0
          ? () => Lt
          : Ce((t, r) => {
              let n = 0;
              t.subscribe(
                ye(r, (o) => {
                  ++n <= e && (r.next(o), e <= n && r.complete());
                })
              );
            });
      }
      function xn(e, t) {
        return Ce((r, n) => {
          let o = 0;
          r.subscribe(ye(n, (i) => e.call(t, i, o++) && n.next(i)));
        });
      }
      function Ga(e) {
        return Ce((t, r) => {
          let n = !1;
          t.subscribe(
            ye(
              r,
              (o) => {
                (n = !0), r.next(o);
              },
              () => {
                n || r.next(e), r.complete();
              }
            )
          );
        });
      }
      function vC(e = rF) {
        return Ce((t, r) => {
          let n = !1;
          t.subscribe(
            ye(
              r,
              (o) => {
                (n = !0), r.next(o);
              },
              () => (n ? r.complete() : r.error(e()))
            )
          );
        });
      }
      function rF() {
        return new Ha();
      }
      function nr(e, t) {
        const r = arguments.length >= 2;
        return (n) =>
          n.pipe(
            e ? xn((o, i) => e(o, i, n)) : _n,
            so(1),
            r ? Ga(t) : vC(() => new Ha())
          );
      }
      function Si(e, t) {
        return K(t) ? Me(e, t, 1) : Me(e, 1);
      }
      function Fe(e, t, r) {
        const n = K(e) || t || r ? { next: e, error: t, complete: r } : e;
        return n
          ? Ce((o, i) => {
              var s;
              null === (s = n.subscribe) || void 0 === s || s.call(n);
              let a = !0;
              o.subscribe(
                ye(
                  i,
                  (u) => {
                    var l;
                    null === (l = n.next) || void 0 === l || l.call(n, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = n.complete) || void 0 === u || u.call(n),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = n.error) || void 0 === l || l.call(n, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = n.unsubscribe) ||
                        void 0 === u ||
                        u.call(n)),
                      null === (l = n.finalize) || void 0 === l || l.call(n);
                  }
                )
              );
            })
          : _n;
      }
      function rr(e) {
        return Ce((t, r) => {
          let i,
            n = null,
            o = !1;
          (n = t.subscribe(
            ye(r, void 0, void 0, (s) => {
              (i = tt(e(s, rr(e)(t)))),
                n ? (n.unsubscribe(), (n = null), i.subscribe(r)) : (o = !0);
            })
          )),
            o && (n.unsubscribe(), (n = null), i.subscribe(r));
        });
      }
      function ef(e) {
        return e <= 0
          ? () => Lt
          : Ce((t, r) => {
              let n = [];
              t.subscribe(
                ye(
                  r,
                  (o) => {
                    n.push(o), e < n.length && n.shift();
                  },
                  () => {
                    for (const o of n) r.next(o);
                    r.complete();
                  },
                  void 0,
                  () => {
                    n = null;
                  }
                )
              );
            });
      }
      function tf(e) {
        return Ce((t, r) => {
          try {
            t.subscribe(r);
          } finally {
            r.add(e);
          }
        });
      }
      const V = "primary",
        Ai = Symbol("RouteTitle");
      class lF {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const r = this.params[t];
            return Array.isArray(r) ? r[0] : r;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const r = this.params[t];
            return Array.isArray(r) ? r : [r];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function ao(e) {
        return new lF(e);
      }
      function cF(e, t, r) {
        const n = r.path.split("/");
        if (
          n.length > e.length ||
          ("full" === r.pathMatch && (t.hasChildren() || n.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < n.length; i++) {
          const s = n[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, n.length), posParams: o };
      }
      function Qt(e, t) {
        const r = e ? Object.keys(e) : void 0,
          n = t ? Object.keys(t) : void 0;
        if (!r || !n || r.length != n.length) return !1;
        let o;
        for (let i = 0; i < r.length; i++)
          if (((o = r[i]), !yC(e[o], t[o]))) return !1;
        return !0;
      }
      function yC(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const r = [...e].sort(),
            n = [...t].sort();
          return r.every((o, i) => n[i] === o);
        }
        return e === t;
      }
      function _C(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Pn(e) {
        return (function qP(e) {
          return !!e && (e instanceof ve || (K(e.lift) && K(e.subscribe)));
        })(e)
          ? e
          : li(e)
          ? Ie(Promise.resolve(e))
          : x(e);
      }
      const fF = {
          exact: function wC(e, t, r) {
            if (
              !or(e.segments, t.segments) ||
              !za(e.segments, t.segments, r) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const n in t.children)
              if (!e.children[n] || !wC(e.children[n], t.children[n], r))
                return !1;
            return !0;
          },
          subset: EC,
        },
        DC = {
          exact: function hF(e, t) {
            return Qt(e, t);
          },
          subset: function pF(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((r) => yC(e[r], t[r]))
            );
          },
          ignored: () => !0,
        };
      function CC(e, t, r) {
        return (
          fF[r.paths](e.root, t.root, r.matrixParams) &&
          DC[r.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === r.fragment && e.fragment !== t.fragment)
        );
      }
      function EC(e, t, r) {
        return bC(e, t, t.segments, r);
      }
      function bC(e, t, r, n) {
        if (e.segments.length > r.length) {
          const o = e.segments.slice(0, r.length);
          return !(!or(o, r) || t.hasChildren() || !za(o, r, n));
        }
        if (e.segments.length === r.length) {
          if (!or(e.segments, r) || !za(e.segments, r, n)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !EC(e.children[o], t.children[o], n))
              return !1;
          return !0;
        }
        {
          const o = r.slice(0, e.segments.length),
            i = r.slice(e.segments.length);
          return (
            !!(or(e.segments, o) && za(e.segments, o, n) && e.children[V]) &&
            bC(e.children[V], t, i, n)
          );
        }
      }
      function za(e, t, r) {
        return t.every((n, o) => DC[r](e[o].parameters, n.parameters));
      }
      class uo {
        constructor(t = new Q([], {}), r = {}, n = null) {
          (this.root = t), (this.queryParams = r), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ao(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return vF.serialize(this);
        }
      }
      class Q {
        constructor(t, r) {
          (this.segments = t),
            (this.children = r),
            (this.parent = null),
            Object.values(r).forEach((n) => (n.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return qa(this);
        }
      }
      class Ti {
        constructor(t, r) {
          (this.path = t), (this.parameters = r);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = ao(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return SC(this);
        }
      }
      function or(e, t) {
        return e.length === t.length && e.every((r, n) => r.path === t[n].path);
      }
      let Ni = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return new nf();
            },
            providedIn: "root",
          })),
          t
        );
      })();
      class nf {
        parse(t) {
          const r = new AF(t);
          return new uo(
            r.parseRootSegment(),
            r.parseQueryParams(),
            r.parseFragment()
          );
        }
        serialize(t) {
          const r = `/${Ri(t.root, !0)}`,
            n = (function DF(e) {
              const t = Object.keys(e)
                .map((r) => {
                  const n = e[r];
                  return Array.isArray(n)
                    ? n.map((o) => `${Wa(r)}=${Wa(o)}`).join("&")
                    : `${Wa(r)}=${Wa(n)}`;
                })
                .filter((r) => !!r);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${r}${n}${
            "string" == typeof t.fragment
              ? `#${(function yF(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const vF = new nf();
      function qa(e) {
        return e.segments.map((t) => SC(t)).join("/");
      }
      function Ri(e, t) {
        if (!e.hasChildren()) return qa(e);
        if (t) {
          const r = e.children[V] ? Ri(e.children[V], !1) : "",
            n = [];
          return (
            Object.entries(e.children).forEach(([o, i]) => {
              o !== V && n.push(`${o}:${Ri(i, !1)}`);
            }),
            n.length > 0 ? `${r}(${n.join("//")})` : r
          );
        }
        {
          const r = (function mF(e, t) {
            let r = [];
            return (
              Object.entries(e.children).forEach(([n, o]) => {
                n === V && (r = r.concat(t(o, n)));
              }),
              Object.entries(e.children).forEach(([n, o]) => {
                n !== V && (r = r.concat(t(o, n)));
              }),
              r
            );
          })(e, (n, o) =>
            o === V ? [Ri(e.children[V], !1)] : [`${o}:${Ri(n, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[V]
            ? `${qa(e)}/${r[0]}`
            : `${qa(e)}/(${r.join("//")})`;
        }
      }
      function IC(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Wa(e) {
        return IC(e).replace(/%3B/gi, ";");
      }
      function rf(e) {
        return IC(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Za(e) {
        return decodeURIComponent(e);
      }
      function MC(e) {
        return Za(e.replace(/\+/g, "%20"));
      }
      function SC(e) {
        return `${rf(e.path)}${(function _F(e) {
          return Object.keys(e)
            .map((t) => `;${rf(t)}=${rf(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const CF = /^[^\/()?;#]+/;
      function sf(e) {
        const t = e.match(CF);
        return t ? t[0] : "";
      }
      const wF = /^[^\/()?;=#]+/,
        bF = /^[^=?&#]+/,
        MF = /^[^&#]+/;
      class AF {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Q([], {})
              : new Q([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let r = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (r = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(r).length > 0) && (n[V] = new Q(t, r)),
            n
          );
        }
        parseSegment() {
          const t = sf(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new _(4009, !1);
          return this.capture(t), new Ti(Za(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const r = (function EF(e) {
            const t = e.match(wF);
            return t ? t[0] : "";
          })(this.remaining);
          if (!r) return;
          this.capture(r);
          let n = "";
          if (this.consumeOptional("=")) {
            const o = sf(this.remaining);
            o && ((n = o), this.capture(n));
          }
          t[Za(r)] = Za(n);
        }
        parseQueryParam(t) {
          const r = (function IF(e) {
            const t = e.match(bF);
            return t ? t[0] : "";
          })(this.remaining);
          if (!r) return;
          this.capture(r);
          let n = "";
          if (this.consumeOptional("=")) {
            const s = (function SF(e) {
              const t = e.match(MF);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((n = s), this.capture(n));
          }
          const o = MC(r),
            i = MC(n);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const r = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = sf(this.remaining),
              o = this.remaining[n.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new _(4010, !1);
            let i;
            n.indexOf(":") > -1
              ? ((i = n.slice(0, n.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = V);
            const s = this.parseChildren();
            (r[i] = 1 === Object.keys(s).length ? s[V] : new Q([], s)),
              this.consumeOptional("//");
          }
          return r;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new _(4011, !1);
        }
      }
      function AC(e) {
        return e.segments.length > 0 ? new Q([], { [V]: e }) : e;
      }
      function TC(e) {
        const t = {};
        for (const n of Object.keys(e.children)) {
          const i = TC(e.children[n]);
          if (n === V && 0 === i.segments.length && i.hasChildren())
            for (const [s, a] of Object.entries(i.children)) t[s] = a;
          else (i.segments.length > 0 || i.hasChildren()) && (t[n] = i);
        }
        return (function TF(e) {
          if (1 === e.numberOfChildren && e.children[V]) {
            const t = e.children[V];
            return new Q(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new Q(e.segments, t));
      }
      function ir(e) {
        return e instanceof uo;
      }
      function NC(e) {
        let t;
        const o = AC(
          (function r(i) {
            const s = {};
            for (const u of i.children) {
              const l = r(u);
              s[u.outlet] = l;
            }
            const a = new Q(i.url, s);
            return i === e && (t = a), a;
          })(e.root)
        );
        return t ?? o;
      }
      function RC(e, t, r, n) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === t.length) return af(o, o, o, r, n);
        const i = (function RF(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new xC(!0, 0, e);
          let t = 0,
            r = !1;
          const n = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Object.entries(i.outlets).forEach(([u, l]) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (r = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new xC(r, t, n);
        })(t);
        if (i.toRoot()) return af(o, o, new Q([], {}), r, n);
        const s = (function OF(e, t, r) {
            if (e.isAbsolute) return new Qa(t, !0, 0);
            if (!r) return new Qa(t, !1, NaN);
            if (null === r.parent) return new Qa(r, !0, 0);
            const n = Ya(e.commands[0]) ? 0 : 1;
            return (function xF(e, t, r) {
              let n = e,
                o = t,
                i = r;
              for (; i > o; ) {
                if (((i -= o), (n = n.parent), !n)) throw new _(4005, !1);
                o = n.segments.length;
              }
              return new Qa(n, !1, o - i);
            })(r, r.segments.length - 1 + n, e.numberOfDoubleDots);
          })(i, o, e),
          a = s.processChildren
            ? xi(s.segmentGroup, s.index, i.commands)
            : PC(s.segmentGroup, s.index, i.commands);
        return af(o, s.segmentGroup, a, r, n);
      }
      function Ya(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Oi(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function af(e, t, r, n, o) {
        let s,
          i = {};
        n &&
          Object.entries(n).forEach(([u, l]) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? r : OC(e, t, r));
        const a = AC(TC(s));
        return new uo(a, i, o);
      }
      function OC(e, t, r) {
        const n = {};
        return (
          Object.entries(e.children).forEach(([o, i]) => {
            n[o] = i === t ? r : OC(i, t, r);
          }),
          new Q(e.segments, n)
        );
      }
      class xC {
        constructor(t, r, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = r),
            (this.commands = n),
            t && n.length > 0 && Ya(n[0]))
          )
            throw new _(4003, !1);
          const o = n.find(Oi);
          if (o && o !== _C(n)) throw new _(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Qa {
        constructor(t, r, n) {
          (this.segmentGroup = t), (this.processChildren = r), (this.index = n);
        }
      }
      function PC(e, t, r) {
        if (
          (e || (e = new Q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return xi(e, t, r);
        const n = (function FF(e, t, r) {
            let n = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (n >= r.length) return i;
              const s = e.segments[o],
                a = r[n];
              if (Oi(a)) break;
              const u = `${a}`,
                l = n < r.length - 1 ? r[n + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!kC(u, l, s)) return i;
                n += 2;
              } else {
                if (!kC(u, {}, s)) return i;
                n++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: n };
          })(e, t, r),
          o = r.slice(n.commandIndex);
        if (n.match && n.pathIndex < e.segments.length) {
          const i = new Q(e.segments.slice(0, n.pathIndex), {});
          return (
            (i.children[V] = new Q(e.segments.slice(n.pathIndex), e.children)),
            xi(i, 0, o)
          );
        }
        return n.match && 0 === o.length
          ? new Q(e.segments, {})
          : n.match && !e.hasChildren()
          ? uf(e, t, r)
          : n.match
          ? xi(e, 0, o)
          : uf(e, t, r);
      }
      function xi(e, t, r) {
        if (0 === r.length) return new Q(e.segments, {});
        {
          const n = (function PF(e) {
              return Oi(e[0]) ? e[0].outlets : { [V]: e };
            })(r),
            o = {};
          if (
            Object.keys(n).some((i) => i !== V) &&
            e.children[V] &&
            1 === e.numberOfChildren &&
            0 === e.children[V].segments.length
          ) {
            const i = xi(e.children[V], t, r);
            return new Q(e.segments, i.children);
          }
          return (
            Object.entries(n).forEach(([i, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (o[i] = PC(e.children[i], t, s));
            }),
            Object.entries(e.children).forEach(([i, s]) => {
              void 0 === n[i] && (o[i] = s);
            }),
            new Q(e.segments, o)
          );
        }
      }
      function uf(e, t, r) {
        const n = e.segments.slice(0, t);
        let o = 0;
        for (; o < r.length; ) {
          const i = r[o];
          if (Oi(i)) {
            const u = kF(i.outlets);
            return new Q(n, u);
          }
          if (0 === o && Ya(r[0])) {
            n.push(new Ti(e.segments[t].path, FC(r[0]))), o++;
            continue;
          }
          const s = Oi(i) ? i.outlets[V] : `${i}`,
            a = o < r.length - 1 ? r[o + 1] : null;
          s && a && Ya(a)
            ? (n.push(new Ti(s, FC(a))), (o += 2))
            : (n.push(new Ti(s, {})), o++);
        }
        return new Q(n, {});
      }
      function kF(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([r, n]) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = uf(new Q([], {}), 0, n));
          }),
          t
        );
      }
      function FC(e) {
        const t = {};
        return Object.entries(e).forEach(([r, n]) => (t[r] = `${n}`)), t;
      }
      function kC(e, t, r) {
        return e == r.path && Qt(t, r.parameters);
      }
      const Pi = "imperative";
      class Kt {
        constructor(t, r) {
          (this.id = t), (this.url = r);
        }
      }
      class Ka extends Kt {
        constructor(t, r, n = "imperative", o = null) {
          super(t, r),
            (this.type = 0),
            (this.navigationTrigger = n),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Fn extends Kt {
        constructor(t, r, n) {
          super(t, r), (this.urlAfterRedirects = n), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Fi extends Kt {
        constructor(t, r, n, o) {
          super(t, r), (this.reason = n), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class lo extends Kt {
        constructor(t, r, n, o) {
          super(t, r), (this.reason = n), (this.code = o), (this.type = 16);
        }
      }
      class Ja extends Kt {
        constructor(t, r, n, o) {
          super(t, r), (this.error = n), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class LC extends Kt {
        constructor(t, r, n, o) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class LF extends Kt {
        constructor(t, r, n, o) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class VF extends Kt {
        constructor(t, r, n, o, i) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class jF extends Kt {
        constructor(t, r, n, o) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class $F extends Kt {
        constructor(t, r, n, o) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class BF {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class UF {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class HF {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class GF {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zF {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class qF {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class VC {
        constructor(t, r, n) {
          (this.routerEvent = t),
            (this.position = r),
            (this.anchor = n),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class lf {}
      class cf {
        constructor(t) {
          this.url = t;
        }
      }
      class WF {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new ki()),
            (this.attachRef = null);
        }
      }
      let ki = (() => {
        var e;
        class t {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, o) {
            const i = this.getOrCreateContext(n);
            (i.outlet = o), this.contexts.set(n, i);
          }
          onChildOutletDestroyed(n) {
            const o = this.getContext(n);
            o && ((o.outlet = null), (o.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let o = this.getContext(n);
            return o || ((o = new WF()), this.contexts.set(n, o)), o;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class jC {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const r = this.pathFromRoot(t);
          return r.length > 1 ? r[r.length - 2] : null;
        }
        children(t) {
          const r = df(t, this._root);
          return r ? r.children.map((n) => n.value) : [];
        }
        firstChild(t) {
          const r = df(t, this._root);
          return r && r.children.length > 0 ? r.children[0].value : null;
        }
        siblings(t) {
          const r = ff(t, this._root);
          return r.length < 2
            ? []
            : r[r.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return ff(t, this._root).map((r) => r.value);
        }
      }
      function df(e, t) {
        if (e === t.value) return t;
        for (const r of t.children) {
          const n = df(e, r);
          if (n) return n;
        }
        return null;
      }
      function ff(e, t) {
        if (e === t.value) return [t];
        for (const r of t.children) {
          const n = ff(e, r);
          if (n.length) return n.unshift(t), n;
        }
        return [];
      }
      class mn {
        constructor(t, r) {
          (this.value = t), (this.children = r);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function co(e) {
        const t = {};
        return e && e.children.forEach((r) => (t[r.value.outlet] = r)), t;
      }
      class $C extends jC {
        constructor(t, r) {
          super(t), (this.snapshot = r), hf(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function BC(e, t) {
        const r = (function ZF(e, t) {
            const s = new Xa([], {}, {}, "", {}, V, t, null, {});
            return new HC("", new mn(s, []));
          })(0, t),
          n = new dt([new Ti("", {})]),
          o = new dt({}),
          i = new dt({}),
          s = new dt({}),
          a = new dt(""),
          u = new fo(n, o, s, a, i, V, t, r.root);
        return (u.snapshot = r.root), new $C(new mn(u, []), r);
      }
      class fo {
        constructor(t, r, n, o, i, s, a, u) {
          (this.urlSubject = t),
            (this.paramsSubject = r),
            (this.queryParamsSubject = n),
            (this.fragmentSubject = o),
            (this.dataSubject = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title = this.dataSubject?.pipe(J((l) => l[Ai])) ?? x(void 0)),
            (this.url = t),
            (this.params = r),
            (this.queryParams = n),
            (this.fragment = o),
            (this.data = i);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(J((t) => ao(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(J((t) => ao(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function UC(e, t = "emptyOnly") {
        const r = e.pathFromRoot;
        let n = 0;
        if ("always" !== t)
          for (n = r.length - 1; n >= 1; ) {
            const o = r[n],
              i = r[n - 1];
            if (o.routeConfig && "" === o.routeConfig.path) n--;
            else {
              if (i.component) break;
              n--;
            }
          }
        return (function YF(e) {
          return e.reduce(
            (t, r) => ({
              params: { ...t.params, ...r.params },
              data: { ...t.data, ...r.data },
              resolve: {
                ...r.data,
                ...t.resolve,
                ...r.routeConfig?.data,
                ...r._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(r.slice(n));
      }
      class Xa {
        get title() {
          return this.data?.[Ai];
        }
        constructor(t, r, n, o, i, s, a, u, l) {
          (this.url = t),
            (this.params = r),
            (this.queryParams = n),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = l);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = ao(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ao(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((n) => n.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class HC extends jC {
        constructor(t, r) {
          super(r), (this.url = t), hf(this, r);
        }
        toString() {
          return GC(this._root);
        }
      }
      function hf(e, t) {
        (t.value._routerState = e), t.children.forEach((r) => hf(e, r));
      }
      function GC(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(GC).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function pf(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            r = e._futureSnapshot;
          (e.snapshot = r),
            Qt(t.queryParams, r.queryParams) ||
              e.queryParamsSubject.next(r.queryParams),
            t.fragment !== r.fragment && e.fragmentSubject.next(r.fragment),
            Qt(t.params, r.params) || e.paramsSubject.next(r.params),
            (function dF(e, t) {
              if (e.length !== t.length) return !1;
              for (let r = 0; r < e.length; ++r) if (!Qt(e[r], t[r])) return !1;
              return !0;
            })(t.url, r.url) || e.urlSubject.next(r.url),
            Qt(t.data, r.data) || e.dataSubject.next(r.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function gf(e, t) {
        const r =
          Qt(e.params, t.params) &&
          (function gF(e, t) {
            return (
              or(e, t) && e.every((r, n) => Qt(r.parameters, t[n].parameters))
            );
          })(e.url, t.url);
        return (
          r &&
          !(!e.parent != !t.parent) &&
          (!e.parent || gf(e.parent, t.parent))
        );
      }
      let mf = (() => {
        var e;
        class t {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = V),
              (this.activateEvents = new ae()),
              (this.deactivateEvents = new ae()),
              (this.attachEvents = new ae()),
              (this.detachEvents = new ae()),
              (this.parentContexts = E(ki)),
              (this.location = E(xt)),
              (this.changeDetector = E(Ia)),
              (this.environmentInjector = E(vt)),
              (this.inputBinder = E(eu, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: o, previousValue: i } = n.name;
              if (o) return;
              this.isTrackedInParentContexts(i) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(i)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new _(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new _(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new _(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, o) {
            (this.activated = n),
              (this._activatedRoute = o),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, o) {
            if (this.isActivated) throw new _(4013, !1);
            this._activatedRoute = n;
            const i = this.location,
              a = n.snapshot.component,
              u = this.parentContexts.getOrCreateContext(this.name).children,
              l = new QF(n, u, i.injector);
            (this.activated = i.createComponent(a, {
              index: i.length,
              injector: l,
              environmentInjector: o ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [gt],
          })),
          t
        );
      })();
      class QF {
        constructor(t, r, n) {
          (this.route = t), (this.childContexts = r), (this.parent = n);
        }
        get(t, r) {
          return t === fo
            ? this.route
            : t === ki
            ? this.childContexts
            : this.parent.get(t, r);
        }
      }
      const eu = new b("");
      let zC = (() => {
        var e;
        class t {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(n) {
            this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
          }
          unsubscribeFromRouteData(n) {
            this.outletDataSubscriptions.get(n)?.unsubscribe(),
              this.outletDataSubscriptions.delete(n);
          }
          subscribeToRouteData(n) {
            const { activatedRoute: o } = n,
              i = Kd([o.queryParams, o.params, o.data])
                .pipe(
                  Vt(
                    ([s, a, u], l) => (
                      (u = { ...s, ...a, ...u }),
                      0 === l ? x(u) : Promise.resolve(u)
                    )
                  )
                )
                .subscribe((s) => {
                  if (
                    !n.isActivated ||
                    !n.activatedComponentRef ||
                    n.activatedRoute !== o ||
                    null === o.component
                  )
                    return void this.unsubscribeFromRouteData(n);
                  const a = (function w1(e) {
                    const t = U(e);
                    if (!t) return null;
                    const r = new oi(t);
                    return {
                      get selector() {
                        return r.selector;
                      },
                      get type() {
                        return r.componentType;
                      },
                      get inputs() {
                        return r.inputs;
                      },
                      get outputs() {
                        return r.outputs;
                      },
                      get ngContentSelectors() {
                        return r.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(o.component);
                  if (a)
                    for (const { templateName: u } of a.inputs)
                      n.activatedComponentRef.setInput(u, s[u]);
                  else this.unsubscribeFromRouteData(n);
                });
            this.outletDataSubscriptions.set(n, i);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function Li(e, t, r) {
        if (r && e.shouldReuseRoute(t.value, r.value.snapshot)) {
          const n = r.value;
          n._futureSnapshot = t.value;
          const o = (function JF(e, t, r) {
            return t.children.map((n) => {
              for (const o of r.children)
                if (e.shouldReuseRoute(n.value, o.value.snapshot))
                  return Li(e, n, o);
              return Li(e, n);
            });
          })(e, t, r);
          return new mn(n, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Li(e, a))),
                s
              );
            }
          }
          const n = (function XF(e) {
              return new fo(
                new dt(e.url),
                new dt(e.params),
                new dt(e.queryParams),
                new dt(e.fragment),
                new dt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Li(e, i));
          return new mn(n, o);
        }
      }
      const vf = "ngNavigationCancelingError";
      function qC(e, t) {
        const { redirectTo: r, navigationBehaviorOptions: n } = ir(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = WC(!1, 0, t);
        return (o.url = r), (o.navigationBehaviorOptions = n), o;
      }
      function WC(e, t, r) {
        const n = new Error("NavigationCancelingError: " + (e || ""));
        return (n[vf] = !0), (n.cancellationCode = t), r && (n.url = r), n;
      }
      function ZC(e) {
        return e && e[vf];
      }
      let YC = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Un({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [zy],
            decls: 1,
            vars: 0,
            template: function (n, o) {
              1 & n && Qn(0, "router-outlet");
            },
            dependencies: [mf],
            encapsulation: 2,
          })),
          t
        );
      })();
      function yf(e) {
        const t = e.children && e.children.map(yf),
          r = t ? { ...e, children: t } : { ...e };
        return (
          !r.component &&
            !r.loadComponent &&
            (t || r.loadChildren) &&
            r.outlet &&
            r.outlet !== V &&
            (r.component = YC),
          r
        );
      }
      function kt(e) {
        return e.outlet || V;
      }
      function Vi(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const r = t.routeConfig;
          if (r?._loadedInjector) return r._loadedInjector;
          if (r?._injector) return r._injector;
        }
        return null;
      }
      class ak {
        constructor(t, r, n, o, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = r),
            (this.currState = n),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = i);
        }
        activate(t) {
          const r = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(r, n, t),
            pf(this.futureState.root),
            this.activateChildRoutes(r, n, t);
        }
        deactivateChildRoutes(t, r, n) {
          const o = co(r);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], n), delete o[s];
          }),
            Object.values(o).forEach((i) => {
              this.deactivateRouteAndItsChildren(i, n);
            });
        }
        deactivateRoutes(t, r, n) {
          const o = t.value,
            i = r ? r.value : null;
          if (o === i)
            if (o.component) {
              const s = n.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, r, s.children);
            } else this.deactivateChildRoutes(t, r, n);
          else i && this.deactivateRouteAndItsChildren(r, n);
        }
        deactivateRouteAndItsChildren(t, r) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, r)
            : this.deactivateRouteAndOutlet(t, r);
        }
        detachAndStoreRouteSubtree(t, r) {
          const n = r.getContext(t.value.outlet),
            o = n && t.value.component ? n.children : r,
            i = co(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (n && n.outlet) {
            const s = n.outlet.detach(),
              a = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, r) {
          const n = r.getContext(t.value.outlet),
            o = n && t.value.component ? n.children : r,
            i = co(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          n &&
            (n.outlet &&
              (n.outlet.deactivate(), n.children.onOutletDeactivated()),
            (n.attachRef = null),
            (n.route = null));
        }
        activateChildRoutes(t, r, n) {
          const o = co(r);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], n),
              this.forwardEvent(new qF(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new GF(t.value.snapshot));
        }
        activateRoutes(t, r, n) {
          const o = t.value,
            i = r ? r.value : null;
          if ((pf(o), o === i))
            if (o.component) {
              const s = n.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, r, s.children);
            } else this.activateChildRoutes(t, r, n);
          else if (o.component) {
            const s = n.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                pf(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Vi(o.snapshot);
              (s.attachRef = null),
                (s.route = o),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      class QC {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class tu {
        constructor(t, r) {
          (this.component = t), (this.route = r);
        }
      }
      function uk(e, t, r) {
        const n = e._root;
        return ji(n, t ? t._root : null, r, [n.value]);
      }
      function ho(e, t) {
        const r = Symbol(),
          n = t.get(e, r);
        return n === r
          ? "function" != typeof e ||
            (function Ob(e) {
              return null !== es(e);
            })(e)
            ? t.get(e)
            : e
          : n;
      }
      function ji(
        e,
        t,
        r,
        n,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = co(t);
        return (
          e.children.forEach((s) => {
            (function ck(
              e,
              t,
              r,
              n,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = r ? r.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function dk(e, t, r) {
                  if ("function" == typeof r) return r(e, t);
                  switch (r) {
                    case "pathParamsChange":
                      return !or(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !or(e.url, t.url) || !Qt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !gf(e, t) || !Qt(e.queryParams, t.queryParams);
                    default:
                      return !gf(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new QC(n))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  ji(e, t, i.component ? (a ? a.children : null) : r, n, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new tu(a.outlet.component, s));
              } else
                s && $i(t, a, o),
                  o.canActivateChecks.push(new QC(n)),
                  ji(e, null, i.component ? (a ? a.children : null) : r, n, o);
            })(s, i[s.value.outlet], r, n.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Object.entries(i).forEach(([s, a]) => $i(a, r.getContext(s), o)),
          o
        );
      }
      function $i(e, t, r) {
        const n = co(e),
          o = e.value;
        Object.entries(n).forEach(([i, s]) => {
          $i(s, o.component ? (t ? t.children.getContext(i) : null) : t, r);
        }),
          r.canDeactivateChecks.push(
            new tu(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Bi(e) {
        return "function" == typeof e;
      }
      function KC(e) {
        return e instanceof Ha || "EmptyError" === e?.name;
      }
      const nu = Symbol("INITIAL_VALUE");
      function po() {
        return Vt((e) =>
          Kd(
            e.map((t) =>
              t.pipe(
                so(1),
                (function nF(...e) {
                  const t = wo(e);
                  return Ce((r, n) => {
                    (t ? Jd(e, r, t) : Jd(e, r)).subscribe(n);
                  });
                })(nu)
              )
            )
          ).pipe(
            J((t) => {
              for (const r of t)
                if (!0 !== r) {
                  if (r === nu) return nu;
                  if (!1 === r || r instanceof uo) return r;
                }
              return !0;
            }),
            xn((t) => t !== nu),
            so(1)
          )
        );
      }
      function JC(e) {
        return (function PE(...e) {
          return Kf(e);
        })(
          Fe((t) => {
            if (ir(t)) throw qC(0, t);
          }),
          J((t) => !0 === t)
        );
      }
      class ru {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class XC {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function go(e) {
        return Mi(new ru(e));
      }
      function ew(e) {
        return Mi(new XC(e));
      }
      class Rk {
        constructor(t, r) {
          (this.urlSerializer = t), (this.urlTree = r);
        }
        noMatchError(t) {
          return new _(4002, !1);
        }
        lineralizeSegments(t, r) {
          let n = [],
            o = r.root;
          for (;;) {
            if (((n = n.concat(o.segments)), 0 === o.numberOfChildren))
              return x(n);
            if (o.numberOfChildren > 1 || !o.children[V])
              return Mi(new _(4e3, !1));
            o = o.children[V];
          }
        }
        applyRedirectCommands(t, r, n) {
          return this.applyRedirectCreateUrlTree(
            r,
            this.urlSerializer.parse(r),
            t,
            n
          );
        }
        applyRedirectCreateUrlTree(t, r, n, o) {
          const i = this.createSegmentGroup(t, r.root, n, o);
          return new uo(
            i,
            this.createQueryParams(r.queryParams, this.urlTree.queryParams),
            r.fragment
          );
        }
        createQueryParams(t, r) {
          const n = {};
          return (
            Object.entries(t).forEach(([o, i]) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                n[o] = r[a];
              } else n[o] = i;
            }),
            n
          );
        }
        createSegmentGroup(t, r, n, o) {
          const i = this.createSegments(t, r.segments, n, o);
          let s = {};
          return (
            Object.entries(r.children).forEach(([a, u]) => {
              s[a] = this.createSegmentGroup(t, u, n, o);
            }),
            new Q(i, s)
          );
        }
        createSegments(t, r, n, o) {
          return r.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, n)
          );
        }
        findPosParam(t, r, n) {
          const o = n[r.path.substring(1)];
          if (!o) throw new _(4001, !1);
          return o;
        }
        findOrReturn(t, r) {
          let n = 0;
          for (const o of r) {
            if (o.path === t.path) return r.splice(n), o;
            n++;
          }
          return t;
        }
      }
      const _f = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Ok(e, t, r, n, o) {
        const i = Df(e, t, r);
        return i.matched
          ? ((n = (function tk(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = Wc(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, n)),
            (function Ak(e, t, r, n) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? x(
                    o.map((s) => {
                      const a = ho(s, e);
                      return Pn(
                        (function vk(e) {
                          return e && Bi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, r)
                          : e.runInContext(() => a(t, r))
                      );
                    })
                  ).pipe(po(), JC())
                : x(!0);
            })(n, t, r).pipe(J((s) => (!0 === s ? i : { ..._f }))))
          : x(i);
      }
      function Df(e, t, r) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || r.length > 0)
            ? { ..._f }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: r,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || cF)(r, e, t);
        if (!o) return { ..._f };
        const i = {};
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: r.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function tw(e, t, r, n) {
        return r.length > 0 &&
          (function Fk(e, t, r) {
            return r.some((n) => ou(e, t, n) && kt(n) !== V);
          })(e, r, n)
          ? {
              segmentGroup: new Q(t, Pk(n, new Q(r, e.children))),
              slicedSegments: [],
            }
          : 0 === r.length &&
            (function kk(e, t, r) {
              return r.some((n) => ou(e, t, n));
            })(e, r, n)
          ? {
              segmentGroup: new Q(e.segments, xk(e, 0, r, n, e.children)),
              slicedSegments: r,
            }
          : { segmentGroup: new Q(e.segments, e.children), slicedSegments: r };
      }
      function xk(e, t, r, n, o) {
        const i = {};
        for (const s of n)
          if (ou(e, r, s) && !o[kt(s)]) {
            const a = new Q([], {});
            i[kt(s)] = a;
          }
        return { ...o, ...i };
      }
      function Pk(e, t) {
        const r = {};
        r[V] = t;
        for (const n of e)
          if ("" === n.path && kt(n) !== V) {
            const o = new Q([], {});
            r[kt(n)] = o;
          }
        return r;
      }
      function ou(e, t, r) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== r.pathMatch) &&
          "" === r.path
        );
      }
      class $k {
        constructor(t, r, n, o, i, s, a) {
          (this.injector = t),
            (this.configLoader = r),
            (this.rootComponentType = n),
            (this.config = o),
            (this.urlTree = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new Rk(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new _(4002, !1);
        }
        recognize() {
          const t = tw(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            V
          ).pipe(
            rr((r) => {
              if (r instanceof XC)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = r.urlTree),
                  this.match(r.urlTree)
                );
              throw r instanceof ru ? this.noMatchError(r) : r;
            }),
            J((r) => {
              const n = new Xa(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  V,
                  this.rootComponentType,
                  null,
                  {}
                ),
                o = new mn(n, r),
                i = new HC("", o),
                s = (function NF(e, t, r = null, n = null) {
                  return RC(NC(e), t, r, n);
                })(n, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (i.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(i._root),
                { state: i, tree: s }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            V
          ).pipe(
            rr((n) => {
              throw n instanceof ru ? this.noMatchError(n) : n;
            })
          );
        }
        inheritParamsAndData(t) {
          const r = t.value,
            n = UC(r, this.paramsInheritanceStrategy);
          (r.params = Object.freeze(n.params)),
            (r.data = Object.freeze(n.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, r, n, o) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(t, r, n)
            : this.processSegment(t, r, n, n.segments, o, !0);
        }
        processChildren(t, r, n) {
          const o = [];
          for (const i of Object.keys(n.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Ie(o).pipe(
            Si((i) => {
              const s = n.children[i],
                a = (function ik(e, t) {
                  const r = e.filter((n) => kt(n) === t);
                  return r.push(...e.filter((n) => kt(n) !== t)), r;
                })(r, i);
              return this.processSegmentGroup(t, a, s, i);
            }),
            (function iF(e, t) {
              return Ce(
                (function oF(e, t, r, n, o) {
                  return (i, s) => {
                    let a = r,
                      u = t,
                      l = 0;
                    i.subscribe(
                      ye(
                        s,
                        (c) => {
                          const d = l++;
                          (u = a ? e(u, c, d) : ((a = !0), c)), n && s.next(u);
                        },
                        o &&
                          (() => {
                            a && s.next(u), s.complete();
                          })
                      )
                    );
                  };
                })(e, t, arguments.length >= 2, !0)
              );
            })((i, s) => (i.push(...s), i)),
            Ga(null),
            (function sF(e, t) {
              const r = arguments.length >= 2;
              return (n) =>
                n.pipe(
                  e ? xn((o, i) => e(o, i, n)) : _n,
                  ef(1),
                  r ? Ga(t) : vC(() => new Ha())
                );
            })(),
            Me((i) => {
              if (null === i) return go(n);
              const s = nw(i);
              return (
                (function Bk(e) {
                  e.sort((t, r) =>
                    t.value.outlet === V
                      ? -1
                      : r.value.outlet === V
                      ? 1
                      : t.value.outlet.localeCompare(r.value.outlet)
                  );
                })(s),
                x(s)
              );
            })
          );
        }
        processSegment(t, r, n, o, i, s) {
          return Ie(r).pipe(
            Si((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                r,
                a,
                n,
                o,
                i,
                s
              ).pipe(
                rr((u) => {
                  if (u instanceof ru) return x(null);
                  throw u;
                })
              )
            ),
            nr((a) => !!a),
            rr((a) => {
              if (KC(a))
                return (function Vk(e, t, r) {
                  return 0 === t.length && !e.children[r];
                })(n, o, i)
                  ? x([])
                  : go(n);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, r, n, o, i, s, a) {
          return (function Lk(e, t, r, n) {
            return (
              !!(kt(e) === n || (n !== V && ou(t, r, e))) &&
              ("**" === e.path || Df(t, e, r).matched)
            );
          })(n, o, i, s)
            ? void 0 === n.redirectTo
              ? this.matchSegmentAgainstRoute(t, o, n, i, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, o, r, n, i, s)
              : go(o)
            : go(o);
        }
        expandSegmentAgainstRouteUsingRedirect(t, r, n, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                r,
                n,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, n, o) {
          const i = this.applyRedirects.applyRedirectCommands(
            [],
            n.redirectTo,
            {}
          );
          return n.redirectTo.startsWith("/")
            ? ew(i)
            : this.applyRedirects.lineralizeSegments(n, i).pipe(
                Me((s) => {
                  const a = new Q(s, {});
                  return this.processSegment(t, r, a, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, r, n, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = Df(r, o, i);
          if (!a) return go(r);
          const d = this.applyRedirects.applyRedirectCommands(
            u,
            o.redirectTo,
            c
          );
          return o.redirectTo.startsWith("/")
            ? ew(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  Me((f) => this.processSegment(t, n, r, f.concat(l), s, !1))
                );
        }
        matchSegmentAgainstRoute(t, r, n, o, i, s) {
          let a;
          if ("**" === n.path) {
            const u = o.length > 0 ? _C(o).parameters : {};
            (a = x({
              snapshot: new Xa(
                o,
                u,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                rw(n),
                kt(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                ow(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (r.children = {});
          } else
            a = Ok(r, n, o, t).pipe(
              J(
                ({
                  matched: u,
                  consumedSegments: l,
                  remainingSegments: c,
                  parameters: d,
                }) =>
                  u
                    ? {
                        snapshot: new Xa(
                          l,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          rw(n),
                          kt(n),
                          n.component ?? n._loadedComponent ?? null,
                          n,
                          ow(n)
                        ),
                        consumedSegments: l,
                        remainingSegments: c,
                      }
                    : null
              )
            );
          return a.pipe(
            Vt((u) =>
              null === u
                ? go(r)
                : this.getChildConfig((t = n._injector ?? t), n, o).pipe(
                    Vt(({ routes: l }) => {
                      const c = n._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = u,
                        { segmentGroup: p, slicedSegments: g } = tw(r, f, h, l);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(c, l, p).pipe(
                          J((C) => (null === C ? null : [new mn(d, C)]))
                        );
                      if (0 === l.length && 0 === g.length)
                        return x([new mn(d, [])]);
                      const y = kt(n) === i;
                      return this.processSegment(
                        c,
                        l,
                        p,
                        g,
                        y ? V : i,
                        !0
                      ).pipe(J((C) => [new mn(d, C)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, r, n) {
          return r.children
            ? x({ routes: r.children, injector: t })
            : r.loadChildren
            ? void 0 !== r._loadedRoutes
              ? x({ routes: r._loadedRoutes, injector: r._loadedInjector })
              : (function Sk(e, t, r, n) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? x(!0)
                    : x(
                        o.map((s) => {
                          const a = ho(s, e);
                          return Pn(
                            (function hk(e) {
                              return e && Bi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, r)
                              : e.runInContext(() => a(t, r))
                          );
                        })
                      ).pipe(po(), JC());
                })(t, r, n).pipe(
                  Me((o) =>
                    o
                      ? this.configLoader.loadChildren(t, r).pipe(
                          Fe((i) => {
                            (r._loadedRoutes = i.routes),
                              (r._loadedInjector = i.injector);
                          })
                        )
                      : (function Nk(e) {
                          return Mi(WC(!1, 3));
                        })()
                  )
                )
            : x({ routes: [], injector: t });
        }
      }
      function Uk(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function nw(e) {
        const t = [],
          r = new Set();
        for (const n of e) {
          if (!Uk(n)) {
            t.push(n);
            continue;
          }
          const o = t.find((i) => n.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...n.children), r.add(o)) : t.push(n);
        }
        for (const n of r) {
          const o = nw(n.children);
          t.push(new mn(n.value, o));
        }
        return t.filter((n) => !r.has(n));
      }
      function rw(e) {
        return e.data || {};
      }
      function ow(e) {
        return e.resolve || {};
      }
      function iw(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Cf(e) {
        return Vt((t) => {
          const r = e(t);
          return r ? Ie(r).pipe(J(() => t)) : x(t);
        });
      }
      const mo = new b("ROUTES");
      let wf = (() => {
        var e;
        class t {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = E(j_));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return x(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const o = Pn(n.loadComponent()).pipe(
                J(sw),
                Fe((s) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = s);
                }),
                tf(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              i = new mC(o, () => new Et()).pipe(Xd());
            return this.componentLoaders.set(n, i), i;
          }
          loadChildren(n, o) {
            if (this.childrenLoaders.get(o)) return this.childrenLoaders.get(o);
            if (o._loadedRoutes)
              return x({
                routes: o._loadedRoutes,
                injector: o._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(o);
            const s = (function Yk(e, t, r, n) {
                return Pn(e.loadChildren()).pipe(
                  J(sw),
                  Me((o) =>
                    o instanceof Hy || Array.isArray(o)
                      ? x(o)
                      : Ie(t.compileModuleAsync(o))
                  ),
                  J((o) => {
                    n && n(e);
                    let i,
                      s,
                      a = !1;
                    return (
                      Array.isArray(o)
                        ? ((s = o), !0)
                        : ((i = o.create(r).injector),
                          (s = i
                            .get(mo, [], { optional: !0, self: !0 })
                            .flat())),
                      { routes: s.map(yf), injector: i }
                    );
                  })
                );
              })(o, this.compiler, n, this.onLoadEndListener).pipe(
                tf(() => {
                  this.childrenLoaders.delete(o);
                })
              ),
              a = new mC(s, () => new Et()).pipe(Xd());
            return this.childrenLoaders.set(o, a), a;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function sw(e) {
        return (function Qk(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let iu = (() => {
        var e;
        class t {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Et()),
              (this.transitionAbortSubject = new Et()),
              (this.configLoader = E(wf)),
              (this.environmentInjector = E(vt)),
              (this.urlSerializer = E(Ni)),
              (this.rootContexts = E(ki)),
              (this.inputBindingEnabled = null !== E(eu, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => x(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (i) =>
                this.events.next(new UF(i))),
              (this.configLoader.onLoadStartListener = (i) =>
                this.events.next(new BF(i)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const o = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: o });
          }
          setupNavigations(n, o, i) {
            return (
              (this.transitions = new dt({
                id: 0,
                currentUrlTree: o,
                currentRawUrl: o,
                currentBrowserUrl: o,
                extractedUrl: n.urlHandlingStrategy.extract(o),
                urlAfterRedirects: n.urlHandlingStrategy.extract(o),
                rawUrl: o,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Pi,
                restoredState: null,
                currentSnapshot: i.snapshot,
                targetSnapshot: null,
                currentRouterState: i,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                xn((s) => 0 !== s.id),
                J((s) => ({
                  ...s,
                  extractedUrl: n.urlHandlingStrategy.extract(s.rawUrl),
                })),
                Vt((s) => {
                  this.currentTransition = s;
                  let a = !1,
                    u = !1;
                  return x(s).pipe(
                    Fe((l) => {
                      this.currentNavigation = {
                        id: l.id,
                        initialUrl: l.rawUrl,
                        extractedUrl: l.extractedUrl,
                        trigger: l.source,
                        extras: l.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Vt((l) => {
                      const c = l.currentBrowserUrl.toString(),
                        d =
                          !n.navigated ||
                          l.extractedUrl.toString() !== c ||
                          c !== l.currentUrlTree.toString();
                      if (
                        !d &&
                        "reload" !==
                          (l.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const h = "";
                        return (
                          this.events.next(
                            new lo(
                              l.id,
                              this.urlSerializer.serialize(l.rawUrl),
                              h,
                              0
                            )
                          ),
                          l.resolve(null),
                          Lt
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                        return x(l).pipe(
                          Vt((h) => {
                            const p = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new Ka(
                                  h.id,
                                  this.urlSerializer.serialize(h.extractedUrl),
                                  h.source,
                                  h.restoredState
                                )
                              ),
                              p !== this.transitions?.getValue()
                                ? Lt
                                : Promise.resolve(h)
                            );
                          }),
                          (function Hk(e, t, r, n, o, i) {
                            return Me((s) =>
                              (function jk(e, t, r, n, o, i, s = "emptyOnly") {
                                return new $k(e, t, r, n, o, s, i).recognize();
                              })(e, t, r, n, s.extractedUrl, o, i).pipe(
                                J(({ state: a, tree: u }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: u,
                                }))
                              )
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            n.config,
                            this.urlSerializer,
                            n.paramsInheritanceStrategy
                          ),
                          Fe((h) => {
                            (s.targetSnapshot = h.targetSnapshot),
                              (s.urlAfterRedirects = h.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: h.urlAfterRedirects,
                              });
                            const p = new LC(
                              h.id,
                              this.urlSerializer.serialize(h.extractedUrl),
                              this.urlSerializer.serialize(h.urlAfterRedirects),
                              h.targetSnapshot
                            );
                            this.events.next(p);
                          })
                        );
                      if (
                        d &&
                        n.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                      ) {
                        const {
                            id: h,
                            extractedUrl: p,
                            source: g,
                            restoredState: y,
                            extras: C,
                          } = l,
                          m = new Ka(h, this.urlSerializer.serialize(p), g, y);
                        this.events.next(m);
                        const I = BC(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = s =
                            {
                              ...l,
                              targetSnapshot: I,
                              urlAfterRedirects: p,
                              extras: {
                                ...C,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          x(s)
                        );
                      }
                      {
                        const h = "";
                        return (
                          this.events.next(
                            new lo(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              h,
                              1
                            )
                          ),
                          l.resolve(null),
                          Lt
                        );
                      }
                    }),
                    Fe((l) => {
                      const c = new LF(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects),
                        l.targetSnapshot
                      );
                      this.events.next(c);
                    }),
                    J(
                      (l) => (
                        (this.currentTransition = s =
                          {
                            ...l,
                            guards: uk(
                              l.targetSnapshot,
                              l.currentSnapshot,
                              this.rootContexts
                            ),
                          }),
                        s
                      )
                    ),
                    (function _k(e, t) {
                      return Me((r) => {
                        const {
                          targetSnapshot: n,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = r;
                        return 0 === s.length && 0 === i.length
                          ? x({ ...r, guardsResult: !0 })
                          : (function Dk(e, t, r, n) {
                              return Ie(e).pipe(
                                Me((o) =>
                                  (function Mk(e, t, r, n, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? x(
                                          i.map((a) => {
                                            const u = Vi(t) ?? o,
                                              l = ho(a, u);
                                            return Pn(
                                              (function mk(e) {
                                                return e && Bi(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, r, n)
                                                : u.runInContext(() =>
                                                    l(e, t, r, n)
                                                  )
                                            ).pipe(nr());
                                          })
                                        ).pipe(po())
                                      : x(!0);
                                  })(o.component, o.route, r, t, n)
                                ),
                                nr((o) => !0 !== o, !0)
                              );
                            })(s, n, o, e).pipe(
                              Me((a) =>
                                a &&
                                (function fk(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function Ck(e, t, r, n) {
                                      return Ie(t).pipe(
                                        Si((o) =>
                                          Jd(
                                            (function Ek(e, t) {
                                              return (
                                                null !== e && t && t(new HF(e)),
                                                x(!0)
                                              );
                                            })(o.route.parent, n),
                                            (function wk(e, t) {
                                              return (
                                                null !== e && t && t(new zF(e)),
                                                x(!0)
                                              );
                                            })(o.route, n),
                                            (function Ik(e, t, r) {
                                              const n = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function lk(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    gC(() =>
                                                      x(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              Vi(s.node) ?? r,
                                                            c = ho(u, l);
                                                          return Pn(
                                                            (function gk(e) {
                                                              return (
                                                                e &&
                                                                Bi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  n,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(n, e)
                                                                )
                                                          ).pipe(nr());
                                                        })
                                                      ).pipe(po())
                                                    )
                                                  );
                                              return x(i).pipe(po());
                                            })(e, o.path, r),
                                            (function bk(e, t, r) {
                                              const n = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!n || 0 === n.length)
                                                return x(!0);
                                              const o = n.map((i) =>
                                                gC(() => {
                                                  const s = Vi(t) ?? r,
                                                    a = ho(i, s);
                                                  return Pn(
                                                    (function pk(e) {
                                                      return (
                                                        e && Bi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(nr());
                                                })
                                              );
                                              return x(o).pipe(po());
                                            })(e, o.route, r)
                                          )
                                        ),
                                        nr((o) => !0 !== o, !0)
                                      );
                                    })(n, i, e, t)
                                  : x(a)
                              ),
                              J((a) => ({ ...r, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (l) => this.events.next(l)),
                    Fe((l) => {
                      if (
                        ((s.guardsResult = l.guardsResult), ir(l.guardsResult))
                      )
                        throw qC(0, l.guardsResult);
                      const c = new VF(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects),
                        l.targetSnapshot,
                        !!l.guardsResult
                      );
                      this.events.next(c);
                    }),
                    xn(
                      (l) =>
                        !!l.guardsResult ||
                        (this.cancelNavigationTransition(l, "", 3), !1)
                    ),
                    Cf((l) => {
                      if (l.guards.canActivateChecks.length)
                        return x(l).pipe(
                          Fe((c) => {
                            const d = new jF(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                              c.targetSnapshot
                            );
                            this.events.next(d);
                          }),
                          Vt((c) => {
                            let d = !1;
                            return x(c).pipe(
                              (function Gk(e, t) {
                                return Me((r) => {
                                  const {
                                    targetSnapshot: n,
                                    guards: { canActivateChecks: o },
                                  } = r;
                                  if (!o.length) return x(r);
                                  let i = 0;
                                  return Ie(o).pipe(
                                    Si((s) =>
                                      (function zk(e, t, r, n) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !iw(o) &&
                                            (i[Ai] = o.title),
                                          (function qk(e, t, r, n) {
                                            const o = (function Wk(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return x({});
                                            const i = {};
                                            return Ie(o).pipe(
                                              Me((s) =>
                                                (function Zk(e, t, r, n) {
                                                  const o = Vi(t) ?? n,
                                                    i = ho(e, o);
                                                  return Pn(
                                                    i.resolve
                                                      ? i.resolve(t, r)
                                                      : o.runInContext(() =>
                                                          i(t, r)
                                                        )
                                                  );
                                                })(e[s], t, r, n).pipe(
                                                  nr(),
                                                  Fe((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              ef(1),
                                              (function aF(e) {
                                                return J(() => e);
                                              })(i),
                                              rr((s) => (KC(s) ? Lt : Mi(s)))
                                            );
                                          })(i, e, t, n).pipe(
                                            J(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = UC(e, r).resolve),
                                                o &&
                                                  iw(o) &&
                                                  (e.data[Ai] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, n, e, t)
                                    ),
                                    Fe(() => i++),
                                    ef(1),
                                    Me((s) => (i === o.length ? x(r) : Lt))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Fe({
                                next: () => (d = !0),
                                complete: () => {
                                  d ||
                                    this.cancelNavigationTransition(c, "", 2);
                                },
                              })
                            );
                          }),
                          Fe((c) => {
                            const d = new $F(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                              c.targetSnapshot
                            );
                            this.events.next(d);
                          })
                        );
                    }),
                    Cf((l) => {
                      const c = (d) => {
                        const f = [];
                        d.routeConfig?.loadComponent &&
                          !d.routeConfig._loadedComponent &&
                          f.push(
                            this.configLoader.loadComponent(d.routeConfig).pipe(
                              Fe((h) => {
                                d.component = h;
                              }),
                              J(() => {})
                            )
                          );
                        for (const h of d.children) f.push(...c(h));
                        return f;
                      };
                      return Kd(c(l.targetSnapshot.root)).pipe(Ga(), so(1));
                    }),
                    Cf(() => this.afterPreactivation()),
                    J((l) => {
                      const c = (function KF(e, t, r) {
                        const n = Li(e, t._root, r ? r._root : void 0);
                        return new $C(n, t);
                      })(
                        n.routeReuseStrategy,
                        l.targetSnapshot,
                        l.currentRouterState
                      );
                      return (
                        (this.currentTransition = s =
                          { ...l, targetRouterState: c }),
                        s
                      );
                    }),
                    Fe(() => {
                      this.events.next(new lf());
                    }),
                    ((e, t, r, n) =>
                      J(
                        (o) => (
                          new ak(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            r,
                            n
                          ).activate(e),
                          o
                        )
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (l) => this.events.next(l),
                      this.inputBindingEnabled
                    ),
                    so(1),
                    Fe({
                      next: (l) => {
                        (a = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new Fn(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            l.targetRouterState.snapshot
                          ),
                          l.resolve(!0);
                      },
                      complete: () => {
                        a = !0;
                      },
                    }),
                    (function uF(e) {
                      return Ce((t, r) => {
                        tt(e).subscribe(ye(r, () => r.complete(), _u)),
                          !r.closed && t.subscribe(r);
                      });
                    })(
                      this.transitionAbortSubject.pipe(
                        Fe((l) => {
                          throw l;
                        })
                      )
                    ),
                    tf(() => {
                      a || u || this.cancelNavigationTransition(s, "", 1),
                        this.currentNavigation?.id === s.id &&
                          (this.currentNavigation = null);
                    }),
                    rr((l) => {
                      if (((u = !0), ZC(l)))
                        this.events.next(
                          new Fi(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            l.message,
                            l.cancellationCode
                          )
                        ),
                          (function ek(e) {
                            return ZC(e) && ir(e.url);
                          })(l)
                            ? this.events.next(new cf(l.url))
                            : s.resolve(!1);
                      else {
                        this.events.next(
                          new Ja(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            l,
                            s.targetSnapshot ?? void 0
                          )
                        );
                        try {
                          s.resolve(n.errorHandler(l));
                        } catch (c) {
                          s.reject(c);
                        }
                      }
                      return Lt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, o, i) {
            const s = new Fi(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              o,
              i
            );
            this.events.next(s), n.resolve(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function aw(e) {
        return e !== Pi;
      }
      let uw = (() => {
          var e;
          class t {
            buildTitle(n) {
              let o,
                i = n.root;
              for (; void 0 !== i; )
                (o = this.getResolvedTitleForRoute(i) ?? o),
                  (i = i.children.find((s) => s.outlet === V));
              return o;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Ai];
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return E(Kk);
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        Kk = (() => {
          var e;
          class t extends uw {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const o = this.buildTitle(n);
              void 0 !== o && this.title.setTitle(o);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(S(aC));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Jk = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return E(eL);
              },
              providedIn: "root",
            })),
            t
          );
        })();
      class Xk {
        shouldDetach(t) {
          return !1;
        }
        store(t, r) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, r) {
          return t.routeConfig === r.routeConfig;
        }
      }
      let eL = (() => {
        var e;
        class t extends Xk {}
        return (
          ((e = t).ɵfac = (function () {
            let r;
            return function (o) {
              return (r || (r = Re(e)))(o || e);
            };
          })()),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const su = new b("", { providedIn: "root", factory: () => ({}) });
      let tL = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return E(nL);
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        nL = (() => {
          var e;
          class t {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, o) {
              return n;
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })();
      var Ui = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = "COMPLETE"),
          (e[(e.FAILED = 1)] = "FAILED"),
          (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
          e
        );
      })(Ui || {});
      function lw(e, t) {
        e.events
          .pipe(
            xn(
              (r) =>
                r instanceof Fn ||
                r instanceof Fi ||
                r instanceof Ja ||
                r instanceof lo
            ),
            J((r) =>
              r instanceof Fn || r instanceof lo
                ? Ui.COMPLETE
                : r instanceof Fi && (0 === r.code || 1 === r.code)
                ? Ui.REDIRECTING
                : Ui.FAILED
            ),
            xn((r) => r !== Ui.REDIRECTING),
            so(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function rL(e) {
        throw e;
      }
      function oL(e, t, r) {
        return t.parse("/");
      }
      const iL = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        sL = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let wt = (() => {
        var e;
        class t {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return "computed" !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = E(L_)),
              (this.isNgZoneEnabled = !1),
              (this._events = new Et()),
              (this.options = E(su, { optional: !0 }) || {}),
              (this.pendingTasks = E(V_)),
              (this.errorHandler = this.options.errorHandler || rL),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || oL),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = E(tL)),
              (this.routeReuseStrategy = E(Jk)),
              (this.titleStrategy = E(uw)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = E(mo, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = E(iu)),
              (this.urlSerializer = E(Ni)),
              (this.location = E(Md)),
              (this.componentInputBindingEnabled = !!E(eu, { optional: !0 })),
              (this.eventsSubscription = new et()),
              (this.isNgZoneEnabled =
                E(re) instanceof re && re.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new uo()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = BC(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const n = this.navigationTransitions.events.subscribe((o) => {
              try {
                const { currentTransition: i } = this.navigationTransitions;
                if (null === i) return void (cw(o) && this._events.next(o));
                if (o instanceof Ka)
                  aw(i.source) && (this.browserUrlTree = i.extractedUrl);
                else if (o instanceof lo) this.rawUrlTree = i.rawUrl;
                else if (o instanceof LC) {
                  if ("eager" === this.urlUpdateStrategy) {
                    if (!i.extras.skipLocationChange) {
                      const s = this.urlHandlingStrategy.merge(
                        i.urlAfterRedirects,
                        i.rawUrl
                      );
                      this.setBrowserUrl(s, i);
                    }
                    this.browserUrlTree = i.urlAfterRedirects;
                  }
                } else if (o instanceof lf)
                  (this.currentUrlTree = i.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      i.urlAfterRedirects,
                      i.rawUrl
                    )),
                    (this.routerState = i.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (i.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, i),
                      (this.browserUrlTree = i.urlAfterRedirects));
                else if (o instanceof Fi)
                  0 !== o.code && 1 !== o.code && (this.navigated = !0),
                    (3 === o.code || 2 === o.code) && this.restoreHistory(i);
                else if (o instanceof cf) {
                  const s = this.urlHandlingStrategy.merge(
                      o.url,
                      i.currentRawUrl
                    ),
                    a = {
                      skipLocationChange: i.extras.skipLocationChange,
                      replaceUrl:
                        "eager" === this.urlUpdateStrategy || aw(i.source),
                    };
                  this.scheduleNavigation(s, Pi, null, a, {
                    resolve: i.resolve,
                    reject: i.reject,
                    promise: i.promise,
                  });
                }
                o instanceof Ja && this.restoreHistory(i, !0),
                  o instanceof Fn && (this.navigated = !0),
                  cw(o) && this._events.next(o);
              } catch (i) {
                this.navigationTransitions.transitionAbortSubject.next(i);
              }
            });
            this.eventsSubscription.add(n);
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Pi, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const o = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === o &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, o, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, o, i) {
            const s = { replaceUrl: !0 },
              a = i?.navigationId ? i : null;
            if (i) {
              const l = { ...i };
              delete l.navigationId,
                delete l.ɵrouterPageId,
                0 !== Object.keys(l).length && (s.state = l);
            }
            const u = this.parseUrl(n);
            this.scheduleNavigation(u, o, a, s);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(yf)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(n, o = {}) {
            const {
                relativeTo: i,
                queryParams: s,
                fragment: a,
                queryParamsHandling: u,
                preserveFragment: l,
              } = o,
              c = l ? this.currentUrlTree.fragment : a;
            let f,
              d = null;
            switch (u) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...s };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = s || null;
            }
            null !== d && (d = this.removeEmptyProps(d));
            try {
              f = NC(i ? i.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                (f = this.currentUrlTree.root);
            }
            return RC(f, n, d, c ?? null);
          }
          navigateByUrl(n, o = { skipLocationChange: !1 }) {
            const i = ir(n) ? n : this.parseUrl(n),
              s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(s, Pi, null, o);
          }
          navigate(n, o = { skipLocationChange: !1 }) {
            return (
              (function aL(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new _(4008, !1);
              })(n),
              this.navigateByUrl(this.createUrlTree(n, o), o)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let o;
            try {
              o = this.urlSerializer.parse(n);
            } catch (i) {
              o = this.malformedUriErrorHandler(i, this.urlSerializer, n);
            }
            return o;
          }
          isActive(n, o) {
            let i;
            if (((i = !0 === o ? { ...iL } : !1 === o ? { ...sL } : o), ir(n)))
              return CC(this.currentUrlTree, n, i);
            const s = this.parseUrl(n);
            return CC(this.currentUrlTree, s, i);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((o, i) => {
              const s = n[i];
              return null != s && (o[i] = s), o;
            }, {});
          }
          scheduleNavigation(n, o, i, s, a) {
            if (this.disposed) return Promise.resolve(!1);
            let u, l, c;
            a
              ? ((u = a.resolve), (l = a.reject), (c = a.promise))
              : (c = new Promise((f, h) => {
                  (u = f), (l = h);
                }));
            const d = this.pendingTasks.add();
            return (
              lw(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(d));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: o,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: n,
                extras: s,
                resolve: u,
                reject: l,
                promise: c,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              c.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(n, o) {
            const i = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(i) || o.extras.replaceUrl) {
              const a = {
                ...o.extras.state,
                ...this.generateNgRouterState(o.id, this.browserPageId),
              };
              this.location.replaceState(i, "", a);
            } else {
              const s = {
                ...o.extras.state,
                ...this.generateNgRouterState(o.id, this.browserPageId + 1),
              };
              this.location.go(i, "", s);
            }
          }
          restoreHistory(n, o = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const s = this.currentPageId - this.browserPageId;
              0 !== s
                ? this.location.historyGo(s)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === s &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (o && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, o) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: o }
              : { navigationId: n };
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function cw(e) {
        return !(e instanceof lf || e instanceof cf);
      }
      let au = (() => {
        var e;
        class t {
          constructor(n, o, i, s, a, u) {
            (this.router = n),
              (this.route = o),
              (this.tabIndexAttribute = i),
              (this.renderer = s),
              (this.el = a),
              (this.locationStrategy = u),
              (this.href = null),
              (this.commands = null),
              (this.onChanges = new Et()),
              (this.preserveFragment = !1),
              (this.skipLocationChange = !1),
              (this.replaceUrl = !1);
            const l = a.nativeElement.tagName?.toLowerCase();
            (this.isAnchorElement = "a" === l || "area" === l),
              this.isAnchorElement
                ? (this.subscription = n.events.subscribe((c) => {
                    c instanceof Fn && this.updateHref();
                  }))
                : this.setTabIndexIfNotOnNativeEl("0");
          }
          setTabIndexIfNotOnNativeEl(n) {
            null != this.tabIndexAttribute ||
              this.isAnchorElement ||
              this.applyAttributeValue("tabindex", n);
          }
          ngOnChanges(n) {
            this.isAnchorElement && this.updateHref(),
              this.onChanges.next(this);
          }
          set routerLink(n) {
            null != n
              ? ((this.commands = Array.isArray(n) ? n : [n]),
                this.setTabIndexIfNotOnNativeEl("0"))
              : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
          }
          onClick(n, o, i, s, a) {
            return (
              !!(
                null === this.urlTree ||
                (this.isAnchorElement &&
                  (0 !== n ||
                    o ||
                    i ||
                    s ||
                    a ||
                    ("string" == typeof this.target && "_self" != this.target)))
              ) ||
              (this.router.navigateByUrl(this.urlTree, {
                skipLocationChange: this.skipLocationChange,
                replaceUrl: this.replaceUrl,
                state: this.state,
              }),
              !this.isAnchorElement)
            );
          }
          ngOnDestroy() {
            this.subscription?.unsubscribe();
          }
          updateHref() {
            this.href =
              null !== this.urlTree && this.locationStrategy
                ? this.locationStrategy?.prepareExternalUrl(
                    this.router.serializeUrl(this.urlTree)
                  )
                : null;
            const n =
              null === this.href
                ? null
                : (function $g(e, t, r) {
                    return (function LS(e, t) {
                      return ("src" === t &&
                        ("embed" === e ||
                          "frame" === e ||
                          "iframe" === e ||
                          "media" === e ||
                          "script" === e)) ||
                        ("href" === t && ("base" === e || "link" === e))
                        ? jg
                        : Vg;
                    })(
                      t,
                      r
                    )(e);
                  })(
                    this.href,
                    this.el.nativeElement.tagName.toLowerCase(),
                    "href"
                  );
            this.applyAttributeValue("href", n);
          }
          applyAttributeValue(n, o) {
            const i = this.renderer,
              s = this.el.nativeElement;
            null !== o ? i.setAttribute(s, n, o) : i.removeAttribute(s, n);
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: this.preserveFragment,
                });
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(
              D(wt),
              D(fo),
              (function Cs(e) {
                return (function rM(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const r = e.attrs;
                  if (r) {
                    const n = r.length;
                    let o = 0;
                    for (; o < n; ) {
                      const i = r[o];
                      if (Rh(i)) break;
                      if (0 === i) o += 2;
                      else if ("number" == typeof i)
                        for (o++; o < n && "string" == typeof r[o]; ) o++;
                      else {
                        if (i === t) return r[o + 1];
                        o += 2;
                      }
                    }
                  }
                  return null;
                })(Ne(), e);
              })("tabindex"),
              D(an),
              D(st),
              D(tr)
            );
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "routerLink", ""]],
            hostVars: 1,
            hostBindings: function (n, o) {
              1 & n &&
                _e("click", function (s) {
                  return o.onClick(
                    s.button,
                    s.ctrlKey,
                    s.shiftKey,
                    s.altKey,
                    s.metaKey
                  );
                }),
                2 & n && Wt("target", o.target);
            },
            inputs: {
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              state: "state",
              relativeTo: "relativeTo",
              preserveFragment: ["preserveFragment", "preserveFragment", oo],
              skipLocationChange: [
                "skipLocationChange",
                "skipLocationChange",
                oo,
              ],
              replaceUrl: ["replaceUrl", "replaceUrl", oo],
              routerLink: "routerLink",
            },
            standalone: !0,
            features: [ev, gt],
          })),
          t
        );
      })();
      class dw {}
      let cL = (() => {
        var e;
        class t {
          constructor(n, o, i, s, a) {
            (this.router = n),
              (this.injector = i),
              (this.preloadingStrategy = s),
              (this.loader = a);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                xn((n) => n instanceof Fn),
                Si(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, o) {
            const i = [];
            for (const s of o) {
              s.providers &&
                !s._injector &&
                (s._injector = Wc(s.providers, n, `Route: ${s.path}`));
              const a = s._injector ?? n,
                u = s._loadedInjector ?? a;
              ((s.loadChildren && !s._loadedRoutes && void 0 === s.canLoad) ||
                (s.loadComponent && !s._loadedComponent)) &&
                i.push(this.preloadConfig(a, s)),
                (s.children || s._loadedRoutes) &&
                  i.push(this.processRoutes(u, s.children ?? s._loadedRoutes));
            }
            return Ie(i).pipe(lr());
          }
          preloadConfig(n, o) {
            return this.preloadingStrategy.preload(o, () => {
              let i;
              i =
                o.loadChildren && void 0 === o.canLoad
                  ? this.loader.loadChildren(n, o)
                  : x(null);
              const s = i.pipe(
                Me((a) =>
                  null === a
                    ? x(void 0)
                    : ((o._loadedRoutes = a.routes),
                      (o._loadedInjector = a.injector),
                      this.processRoutes(a.injector ?? n, a.routes))
                )
              );
              return o.loadComponent && !o._loadedComponent
                ? Ie([s, this.loader.loadComponent(o)]).pipe(lr())
                : s;
            });
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(S(wt), S(j_), S(vt), S(dw), S(wf));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const Ef = new b("");
      let fw = (() => {
        var e;
        class t {
          constructor(n, o, i, s, a = {}) {
            (this.urlSerializer = n),
              (this.transitions = o),
              (this.viewportScroller = i),
              (this.zone = s),
              (this.options = a),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (a.scrollPositionRestoration =
                a.scrollPositionRestoration || "disabled"),
              (a.anchorScrolling = a.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Ka
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Fn
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ))
                : n instanceof lo &&
                  0 === n.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof VC &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, o) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new VC(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      o
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            !(function Sm() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function vn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function pw() {
        const e = E(at);
        return (t) => {
          const r = e.get(ro);
          if (t !== r.components[0]) return;
          const n = e.get(wt),
            o = e.get(gw);
          1 === e.get(bf) && n.initialNavigation(),
            e.get(mw, null, j.Optional)?.setUpPreloading(),
            e.get(Ef, null, j.Optional)?.init(),
            n.resetRootComponentType(r.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const gw = new b("", { factory: () => new Et() }),
        bf = new b("", { providedIn: "root", factory: () => 1 }),
        mw = new b("");
      function pL(e) {
        return vn(0, [
          { provide: mw, useExisting: cL },
          { provide: dw, useExisting: e },
        ]);
      }
      const vw = new b("ROUTER_FORROOT_GUARD"),
        mL = [
          Md,
          { provide: Ni, useClass: nf },
          wt,
          ki,
          {
            provide: fo,
            useFactory: function hw(e) {
              return e.routerState.root;
            },
            deps: [wt],
          },
          wf,
          [],
        ];
      function vL() {
        return new q_("Router", wt);
      }
      let yw = (() => {
        var e;
        class t {
          constructor(n) {}
          static forRoot(n, o) {
            return {
              ngModule: t,
              providers: [
                mL,
                [],
                { provide: mo, multi: !0, useValue: n },
                {
                  provide: vw,
                  useFactory: CL,
                  deps: [[wt, new bs(), new Is()]],
                },
                { provide: su, useValue: o || {} },
                o?.useHash
                  ? { provide: tr, useClass: S1 }
                  : { provide: tr, useClass: wD },
                {
                  provide: Ef,
                  useFactory: () => {
                    const e = E(zx),
                      t = E(re),
                      r = E(su),
                      n = E(iu),
                      o = E(Ni);
                    return (
                      r.scrollOffset && e.setOffset(r.scrollOffset),
                      new fw(o, n, e, t, r)
                    );
                  },
                },
                o?.preloadingStrategy
                  ? pL(o.preloadingStrategy).ɵproviders
                  : [],
                { provide: q_, multi: !0, useFactory: vL },
                o?.initialNavigation ? wL(o) : [],
                o?.bindToComponentInputs
                  ? vn(8, [zC, { provide: eu, useExisting: zC }]).ɵproviders
                  : [],
                [
                  { provide: _w, useFactory: pw },
                  { provide: md, multi: !0, useExisting: _w },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: t,
              providers: [{ provide: mo, multi: !0, useValue: n }],
            };
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(S(vw, 8));
          }),
          (e.ɵmod = Mt({ type: e })),
          (e.ɵinj = ht({})),
          t
        );
      })();
      function CL(e) {
        return "guarded";
      }
      function wL(e) {
        return [
          "disabled" === e.initialNavigation
            ? vn(3, [
                {
                  provide: ud,
                  multi: !0,
                  useFactory: () => {
                    const t = E(wt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: bf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? vn(2, [
                { provide: bf, useValue: 0 },
                {
                  provide: ud,
                  multi: !0,
                  deps: [at],
                  useFactory: (t) => {
                    const r = t.get(I1, Promise.resolve());
                    return () =>
                      r.then(
                        () =>
                          new Promise((n) => {
                            const o = t.get(wt),
                              i = t.get(gw);
                            lw(o, () => {
                              n(!0);
                            }),
                              (t.get(iu).afterPreactivation = () => (
                                n(!0), i.closed ? x(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const _w = new b("");
      class bL {}
      const Dw = function (e) {
        return { strike: e };
      };
      let IL = (() => {
          var e;
          class t {
            onclick(n) {
              this.todoDelete.emit(this.todos);
            }
            oncheckboxclick(n) {
              this.todoCheckbox.emit(this.todos);
            }
            constructor() {
              (this.todoDelete = new ae()),
                (this.todoCheckbox = new ae()),
                (this.todos = new bL());
            }
            ngOnInit() {}
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Un({
              type: e,
              selectors: [["app-todo-item"]],
              inputs: { todos: "todos" },
              outputs: {
                todoDelete: "todoDelete",
                todoCheckbox: "todoCheckbox",
              },
              decls: 11,
              vars: 9,
              consts: [
                [1, "items", "px-5", "py-3", "mx-5", "rounded-4", "py-2"],
                [3, "ngClass"],
                [
                  1,
                  "mb-3",
                  "form-check",
                  "d-flex",
                  "gap-2",
                  "justify-content-end",
                ],
                [
                  "type",
                  "checkbox",
                  "id",
                  "exampleCheck1",
                  1,
                  "form-check-input",
                  3,
                  "checked",
                  "click",
                ],
                ["for", "exampleCheck1", 1, "form-check-label", "whitefont"],
                [1, "btn", "btn-danger", 3, "click"],
              ],
              template: function (n, o) {
                1 & n &&
                  (oe(0, "div", 0)(1, "h4", 1),
                  lt(2),
                  ue(),
                  oe(3, "p", 1),
                  lt(4),
                  ue(),
                  oe(5, "div", 2)(6, "input", 3),
                  _e("click", function () {
                    return o.oncheckboxclick(o.todos);
                  }),
                  ue(),
                  oe(7, "label", 4),
                  lt(8, "Mark As Done"),
                  ue()(),
                  oe(9, "button", 5),
                  _e("click", function () {
                    return o.onclick(o.todos);
                  }),
                  lt(10, "Delete"),
                  ue()()),
                  2 & n &&
                    (Tt(1),
                    Nt("ngClass", Yc(5, Dw, !o.todos.active)),
                    Tt(1),
                    di(" ", o.todos.title, " "),
                    Tt(1),
                    Nt("ngClass", Yc(7, Dw, !o.todos.active)),
                    Tt(1),
                    di(" ", o.todos.desc, " "),
                    Tt(2),
                    Nt("checked", !o.todos.active));
              },
              dependencies: [xD],
              styles: [
                "h4[_ngcontent-%COMP%]{color:#ff0}p[_ngcontent-%COMP%]{color:#fff}.active[_ngcontent-%COMP%]{color:#0f0}.items[_ngcontent-%COMP%]{background-color:#00000074}.whitefont[_ngcontent-%COMP%]{color:#fff}.strike[_ngcontent-%COMP%]{text-decoration:line-through}",
              ],
            })),
            t
          );
        })(),
        Cw = (() => {
          var e;
          class t {
            constructor(n, o) {
              (this._renderer = n),
                (this._elementRef = o),
                (this.onChange = (i) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, o) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, o);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(D(an), D(st));
            }),
            (e.ɵdir = O({ type: e })),
            t
          );
        })(),
        sr = (() => {
          var e;
          class t extends Cw {}
          return (
            ((e = t).ɵfac = (function () {
              let r;
              return function (o) {
                return (r || (r = Re(e)))(o || e);
              };
            })()),
            (e.ɵdir = O({ type: e, features: [Y] })),
            t
          );
        })();
      const Jt = new b("NgValueAccessor"),
        AL = { provide: Jt, useExisting: ee(() => uu), multi: !0 },
        NL = new b("CompositionEventMode");
      let uu = (() => {
        var e;
        class t extends Cw {
          constructor(n, o, i) {
            super(n, o),
              (this._compositionMode = i),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function TL() {
                  const e = Rn() ? Rn().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(D(an), D(st), D(NL, 8));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, o) {
              1 & n &&
                _e("input", function (s) {
                  return o._handleInput(s.target.value);
                })("blur", function () {
                  return o.onTouched();
                })("compositionstart", function () {
                  return o._compositionStart();
                })("compositionend", function (s) {
                  return o._compositionEnd(s.target.value);
                });
            },
            features: [ce([AL]), Y],
          })),
          t
        );
      })();
      const ke = new b("NgValidators"),
        Ln = new b("NgAsyncValidators");
      function Ow(e) {
        return null != e;
      }
      function xw(e) {
        return li(e) ? Ie(e) : e;
      }
      function Pw(e) {
        let t = {};
        return (
          e.forEach((r) => {
            t = null != r ? { ...t, ...r } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function Fw(e, t) {
        return t.map((r) => r(e));
      }
      function kw(e) {
        return e.map((t) =>
          (function OL(e) {
            return !e.validate;
          })(t)
            ? t
            : (r) => t.validate(r)
        );
      }
      function If(e) {
        return null != e
          ? (function Lw(e) {
              if (!e) return null;
              const t = e.filter(Ow);
              return 0 == t.length
                ? null
                : function (r) {
                    return Pw(Fw(r, t));
                  };
            })(kw(e))
          : null;
      }
      function Mf(e) {
        return null != e
          ? (function Vw(e) {
              if (!e) return null;
              const t = e.filter(Ow);
              return 0 == t.length
                ? null
                : function (r) {
                    return (function ML(...e) {
                      const t = gh(e),
                        { args: r, keys: n } = dC(e),
                        o = new ve((i) => {
                          const { length: s } = r;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let u = s,
                            l = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            tt(r[c]).subscribe(
                              ye(
                                i,
                                (f) => {
                                  d || ((d = !0), l--), (a[c] = f);
                                },
                                () => u--,
                                void 0,
                                () => {
                                  (!u || !d) &&
                                    (l || i.next(n ? hC(n, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(fC(t)) : o;
                    })(Fw(r, t).map(xw)).pipe(J(Pw));
                  };
            })(kw(e))
          : null;
      }
      function jw(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function Sf(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function cu(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function Uw(e, t) {
        const r = Sf(t);
        return (
          Sf(e).forEach((o) => {
            cu(r, o) || r.push(o);
          }),
          r
        );
      }
      function Hw(e, t) {
        return Sf(t).filter((r) => !cu(e, r));
      }
      class Gw {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = If(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Mf(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t = void 0) {
          this.control && this.control.reset(t);
        }
        hasError(t, r) {
          return !!this.control && this.control.hasError(t, r);
        }
        getError(t, r) {
          return this.control ? this.control.getError(t, r) : null;
        }
      }
      class ze extends Gw {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Vn extends Gw {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class zw {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let qw = (() => {
          var e;
          class t extends zw {
            constructor(n) {
              super(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(D(Vn, 2));
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, o) {
                2 & n &&
                  ha("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
                    "ng-pristine",
                    o.isPristine
                  )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
                    "ng-invalid",
                    o.isInvalid
                  )("ng-pending", o.isPending);
              },
              features: [Y],
            })),
            t
          );
        })(),
        Ww = (() => {
          var e;
          class t extends zw {
            constructor(n) {
              super(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(D(ze, 10));
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, o) {
                2 & n &&
                  ha("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
                    "ng-pristine",
                    o.isPristine
                  )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
                    "ng-invalid",
                    o.isInvalid
                  )("ng-pending", o.isPending)("ng-submitted", o.isSubmitted);
              },
              features: [Y],
            })),
            t
          );
        })();
      const Hi = "VALID",
        fu = "INVALID",
        vo = "PENDING",
        Gi = "DISABLED";
      function Nf(e) {
        return (hu(e) ? e.validators : e) || null;
      }
      function Rf(e, t) {
        return (hu(t) ? t.asyncValidators : e) || null;
      }
      function hu(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class Kw {
        constructor(t, r) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(r);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === Hi;
        }
        get invalid() {
          return this.status === fu;
        }
        get pending() {
          return this.status == vo;
        }
        get disabled() {
          return this.status === Gi;
        }
        get enabled() {
          return this.status !== Gi;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(Uw(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(Uw(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(Hw(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(Hw(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return cu(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return cu(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((r) => {
              r.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((r) => {
              r.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = vo),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const r = this._parentMarkedDirty(t.onlySelf);
          (this.status = Gi),
            (this.errors = null),
            this._forEachChild((n) => {
              n.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: r }),
            this._onDisabledChange.forEach((n) => n(!0));
        }
        enable(t = {}) {
          const r = this._parentMarkedDirty(t.onlySelf);
          (this.status = Hi),
            this._forEachChild((n) => {
              n.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: r }),
            this._onDisabledChange.forEach((n) => n(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === Hi || this.status === vo) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((r) => r._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Gi : Hi;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = vo), (this._hasOwnPendingAsyncValidator = !0);
            const r = xw(this.asyncValidator(this));
            this._asyncValidationSubscription = r.subscribe((n) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(n, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, r = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== r.emitEvent);
        }
        get(t) {
          let r = t;
          return null == r ||
            (Array.isArray(r) || (r = r.split(".")), 0 === r.length)
            ? null
            : r.reduce((n, o) => n && n._find(o), this);
        }
        getError(t, r) {
          const n = r ? this.get(r) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, r) {
          return !!this.getError(t, r);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new ae()), (this.statusChanges = new ae());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Gi
            : this.errors
            ? fu
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(vo)
            ? vo
            : this._anyControlsHaveStatus(fu)
            ? fu
            : Hi;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((r) => r.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          hu(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function kL(e) {
              return Array.isArray(e) ? If(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function LL(e) {
              return Array.isArray(e) ? Mf(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class Of extends Kw {
        constructor(t, r, n) {
          super(Nf(r), Rf(n, r)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(r),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, r) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = r),
              r.setParent(this),
              r._registerOnCollectionChange(this._onCollectionChange),
              r);
        }
        addControl(t, r, n = {}) {
          this.registerControl(t, r),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, r, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            r && this.registerControl(t, r),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, r = {}) {
          (function Qw(e, t, r) {
            e._forEachChild((n, o) => {
              if (void 0 === r[o]) throw new _(1002, "");
            });
          })(this, 0, t),
            Object.keys(t).forEach((n) => {
              (function Yw(e, t, r) {
                const n = e.controls;
                if (!(t ? Object.keys(n) : n).length) throw new _(1e3, "");
                if (!n[r]) throw new _(1001, "");
              })(this, !0, n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: r.emitEvent,
                });
            }),
            this.updateValueAndValidity(r);
        }
        patchValue(t, r = {}) {
          null != t &&
            (Object.keys(t).forEach((n) => {
              const o = this.controls[n];
              o && o.patchValue(t[n], { onlySelf: !0, emitEvent: r.emitEvent });
            }),
            this.updateValueAndValidity(r));
        }
        reset(t = {}, r = {}) {
          this._forEachChild((n, o) => {
            n.reset(t[o], { onlySelf: !0, emitEvent: r.emitEvent });
          }),
            this._updatePristine(r),
            this._updateTouched(r),
            this.updateValueAndValidity(r);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, r, n) => ((t[n] = r.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (r, n) => !!n._syncPendingControls() || r
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((r) => {
            const n = this.controls[r];
            n && t(n, r);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [r, n] of Object.entries(this.controls))
            if (this.contains(r) && t(n)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (r, n, o) => ((n.enabled || this.disabled) && (r[o] = n.value), r)
          );
        }
        _reduceChildren(t, r) {
          let n = t;
          return (
            this._forEachChild((o, i) => {
              n = r(n, o, i);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      const ar = new b("CallSetDisabledState", {
          providedIn: "root",
          factory: () => zi,
        }),
        zi = "always";
      function qi(e, t, r = zi) {
        xf(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === r) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function $L(e, t) {
            t.valueAccessor.registerOnChange((r) => {
              (e._pendingValue = r),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && Jw(e, t);
            });
          })(e, t),
          (function UL(e, t) {
            const r = (n, o) => {
              t.valueAccessor.writeValue(n), o && t.viewToModelUpdate(n);
            };
            e.registerOnChange(r),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(r);
              });
          })(e, t),
          (function BL(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && Jw(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function jL(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const r = (n) => {
                t.valueAccessor.setDisabledState(n);
              };
              e.registerOnDisabledChange(r),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(r);
                });
            }
          })(e, t);
      }
      function mu(e, t) {
        e.forEach((r) => {
          r.registerOnValidatorChange && r.registerOnValidatorChange(t);
        });
      }
      function xf(e, t) {
        const r = (function $w(e) {
          return e._rawValidators;
        })(e);
        null !== t.validator
          ? e.setValidators(jw(r, t.validator))
          : "function" == typeof r && e.setValidators([r]);
        const n = (function Bw(e) {
          return e._rawAsyncValidators;
        })(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(jw(n, t.asyncValidator))
          : "function" == typeof n && e.setAsyncValidators([n]);
        const o = () => e.updateValueAndValidity();
        mu(t._rawValidators, o), mu(t._rawAsyncValidators, o);
      }
      function Jw(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      const WL = { provide: ze, useExisting: ee(() => yu) },
        Wi = (() => Promise.resolve())();
      let yu = (() => {
        var e;
        class t extends ze {
          constructor(n, o, i) {
            super(),
              (this.callSetDisabledState = i),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new ae()),
              (this.form = new Of({}, If(n), Mf(o)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(n) {
            Wi.then(() => {
              const o = this._findContainer(n.path);
              (n.control = o.registerControl(n.name, n.control)),
                qi(n.control, n, this.callSetDisabledState),
                n.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(n);
            });
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            Wi.then(() => {
              const o = this._findContainer(n.path);
              o && o.removeControl(n.name), this._directives.delete(n);
            });
          }
          addFormGroup(n) {
            Wi.then(() => {
              const o = this._findContainer(n.path),
                i = new Of({});
              (function Xw(e, t) {
                xf(e, t);
              })(i, n),
                o.registerControl(n.name, i),
                i.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(n) {
            Wi.then(() => {
              const o = this._findContainer(n.path);
              o && o.removeControl(n.name);
            });
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          updateModel(n, o) {
            Wi.then(() => {
              this.form.get(n.path).setValue(o);
            });
          }
          setValue(n) {
            this.control.setValue(n);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function eE(e, t) {
                e._syncPendingControls(),
                  t.forEach((r) => {
                    const n = r.control;
                    "submit" === n.updateOn &&
                      n._pendingChange &&
                      (r.viewToModelUpdate(n._pendingValue),
                      (n._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n = void 0) {
            this.form.reset(n), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(n) {
            return n.pop(), n.length ? this.form.get(n) : this.form;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(D(ke, 10), D(Ln, 10), D(ar, 8));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (n, o) {
              1 & n &&
                _e("submit", function (s) {
                  return o.onSubmit(s);
                })("reset", function () {
                  return o.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [ce([WL]), Y],
          })),
          t
        );
      })();
      function tE(e, t) {
        const r = e.indexOf(t);
        r > -1 && e.splice(r, 1);
      }
      function nE(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const rE = class extends Kw {
          constructor(t = null, r, n) {
            super(Nf(r), Rf(n, r)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(r),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              hu(r) &&
                (r.nonNullable || r.initialValueIsDefault) &&
                (this.defaultValue = nE(t) ? t.value : t);
          }
          setValue(t, r = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== r.emitModelToViewChange &&
                this._onChange.forEach((n) =>
                  n(this.value, !1 !== r.emitViewToModelChange)
                ),
              this.updateValueAndValidity(r);
          }
          patchValue(t, r = {}) {
            this.setValue(t, r);
          }
          reset(t = this.defaultValue, r = {}) {
            this._applyFormState(t),
              this.markAsPristine(r),
              this.markAsUntouched(r),
              this.setValue(this.value, r),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            tE(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            tE(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            nE(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        QL = { provide: Vn, useExisting: ee(() => Lf) },
        sE = (() => Promise.resolve())();
      let Lf = (() => {
          var e;
          class t extends Vn {
            constructor(n, o, i, s, a, u) {
              super(),
                (this._changeDetectorRef = a),
                (this.callSetDisabledState = u),
                (this.control = new rE()),
                (this._registered = !1),
                (this.name = ""),
                (this.update = new ae()),
                (this._parent = n),
                this._setValidators(o),
                this._setAsyncValidators(i),
                (this.valueAccessor = (function kf(e, t) {
                  if (!t) return null;
                  let r, n, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === uu
                        ? (r = i)
                        : (function zL(e) {
                            return Object.getPrototypeOf(e.constructor) === sr;
                          })(i)
                        ? (n = i)
                        : (o = i);
                    }),
                    o || n || r || null
                  );
                })(0, s));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const o = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: o,
                    path: this._getPath(o),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function Ff(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const r = e.model;
                  return !!r.isFirstChange() || !Object.is(t, r.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              qi(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              sE.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const o = n.isDisabled.currentValue,
                i = 0 !== o && oo(o);
              sE.then(() => {
                i && !this.control.disabled
                  ? this.control.disable()
                  : !i && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function pu(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(
                D(ze, 9),
                D(ke, 10),
                D(Ln, 10),
                D(Jt, 10),
                D(Ia, 8),
                D(ar, 8)
              );
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ce([QL]), Y, gt],
            })),
            t
          );
        })(),
        aE = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            t
          );
        })();
      const KL = { provide: Jt, useExisting: ee(() => Vf), multi: !0 };
      let Vf = (() => {
          var e;
          class t extends sr {
            writeValue(n) {
              this.setProperty("value", n ?? "");
            }
            registerOnChange(n) {
              this.onChange = (o) => {
                n("" == o ? null : parseFloat(o));
              };
            }
          }
          return (
            ((e = t).ɵfac = (function () {
              let r;
              return function (o) {
                return (r || (r = Re(e)))(o || e);
              };
            })()),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["input", "type", "number", "formControlName", ""],
                ["input", "type", "number", "formControl", ""],
                ["input", "type", "number", "ngModel", ""],
              ],
              hostBindings: function (n, o) {
                1 & n &&
                  _e("input", function (s) {
                    return o.onChange(s.target.value);
                  })("blur", function () {
                    return o.onTouched();
                  });
              },
              features: [ce([KL]), Y],
            })),
            t
          );
        })(),
        uE = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = ht({})),
            t
          );
        })();
      const jf = new b("NgModelWithFormControlWarning");
      let IE = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = ht({ imports: [uE] })),
            t
          );
        })(),
        CV = (() => {
          var e;
          class t {
            static withConfig(n) {
              return {
                ngModule: t,
                providers: [
                  { provide: ar, useValue: n.callSetDisabledState ?? zi },
                ],
              };
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = ht({ imports: [IE] })),
            t
          );
        })(),
        wV = (() => {
          var e;
          class t {
            static withConfig(n) {
              return {
                ngModule: t,
                providers: [
                  {
                    provide: jf,
                    useValue: n.warnOnNgModelWithFormControl ?? "always",
                  },
                  { provide: ar, useValue: n.callSetDisabledState ?? zi },
                ],
              };
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = ht({ imports: [IE] })),
            t
          );
        })(),
        EV = (() => {
          var e;
          class t {
            constructor() {
              this.todoadd = new ae();
            }
            ngOnInit() {}
            OnSubmit() {
              this.todoadd.emit({
                sno: this.sno,
                title: this.title,
                desc: this.desc,
                active: !0,
              });
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Un({
              type: e,
              selectors: [["app-add-todo"]],
              outputs: { todoadd: "todoadd" },
              decls: 17,
              vars: 3,
              consts: [
                [
                  1,
                  "container",
                  "d-flex-column",
                  "align-items-center",
                  "justify-content-center",
                  "rounded-4",
                  "w-50",
                  "bg-manish",
                  "p-5",
                ],
                [1, "text-center", "newcolorf"],
                [
                  1,
                  "d-flex",
                  "align-items-center",
                  "justify-content-center",
                  "p-2",
                  3,
                  "ngSubmit",
                ],
                [1, "newcolor", "d-inline", "px-4", "py-3", "rounded-4"],
                [
                  1,
                  "d-flex",
                  "align-items-center",
                  "justify-content-center",
                  "p-2",
                ],
                [
                  "type",
                  "number",
                  "placeholder",
                  "Enter serial no...",
                  "id",
                  "sno",
                  "name",
                  "sno",
                  1,
                  "rounded",
                  "px-3",
                  "p-1",
                  "inp-fonts",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "placeholder",
                  "Enter Title...",
                  "type",
                  "text",
                  "id",
                  "title",
                  "name",
                  "title",
                  1,
                  "rounded",
                  "px-3",
                  "p-1",
                  "inp-fonts",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "placeholder",
                  "Enter Description...",
                  "type",
                  "text",
                  "id",
                  "desc",
                  "name",
                  "desc",
                  1,
                  "rounded",
                  "px-3",
                  "p-1",
                  "inp-fonts",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  1,
                  "d-flex",
                  "px-4",
                  "align-items-center",
                  "justify-content-center",
                  "p-3",
                ],
                [
                  "type",
                  "submit",
                  "value",
                  "ADD Todo",
                  1,
                  "rounded",
                  "btn",
                  "bg-manish",
                  "fw-bolder",
                  "newcolorf",
                ],
              ],
              template: function (n, o) {
                1 & n &&
                  (oe(0, "div", 0)(1, "h4", 1),
                  lt(2, "Create Your ToDo's"),
                  ue(),
                  oe(3, "form", 2),
                  _e("ngSubmit", function () {
                    return o.OnSubmit();
                  }),
                  oe(4, "table", 3)(5, "tr")(6, "td", 4)(7, "input", 5),
                  _e("ngModelChange", function (s) {
                    return (o.sno = s);
                  }),
                  ue()()(),
                  oe(8, "tr")(9, "td", 4)(10, "input", 6),
                  _e("ngModelChange", function (s) {
                    return (o.title = s);
                  }),
                  ue()()(),
                  oe(11, "tr")(12, "td", 4)(13, "input", 7),
                  _e("ngModelChange", function (s) {
                    return (o.desc = s);
                  }),
                  ue()()(),
                  oe(14, "tr")(15, "td", 8),
                  Qn(16, "input", 9),
                  ue()()()()()),
                  2 & n &&
                    (Tt(7),
                    Nt("ngModel", o.sno),
                    Tt(3),
                    Nt("ngModel", o.title),
                    Tt(3),
                    Nt("ngModel", o.desc));
              },
              dependencies: [aE, uu, Vf, qw, Ww, Lf, yu],
              styles: [
                ".inp-fonts[_ngcontent-%COMP%]{font-size:1.2rem;font-weight:600}.bg-manish[_ngcontent-%COMP%]{background-color:#ffff00db}input[_ngcontent-%COMP%]{outline:none;border:1px solid yellow}.newcolor[_ngcontent-%COMP%]{background-color:teal}.newcolorf[_ngcontent-%COMP%]{color:teal}",
              ],
            })),
            t
          );
        })();
      function bV(e, t) {
        1 & e && (oe(0, "div", 5), lt(1, "There Is No Todo To Show"), ue());
      }
      function IV(e, t) {
        if (1 & e) {
          const r = (function _v() {
            return v();
          })();
          oe(0, "div", 1)(1, "app-todo-item", 7),
            _e("todoDelete", function (o) {
              return nl(r), rl(da(2).deleteTodo(o));
            })("todoCheckbox", function (o) {
              return nl(r), rl(da(2).toggleTodo(o));
            }),
            ue()();
        }
        if (2 & e) {
          const r = t.$implicit;
          Tt(1), Nt("todos", r);
        }
      }
      function MV(e, t) {
        1 & e && ca(0, IV, 2, 1, "div", 6), 2 & e && Nt("ngForOf", da().todos);
      }
      const SV = [
        {
          path: "",
          component: (() => {
            var e;
            class t {
              addTodo(n) {
                console.log("Hiii it is triggering"),
                  console.log(n),
                  this.todos.push(n),
                  localStorage.setItem("todos", JSON.stringify(this.todos));
              }
              deleteTodo(n) {
                const o = this.todos.indexOf(n);
                console.log(this.todos[o]),
                  this.todos.splice(o, 1),
                  localStorage.setItem("todos", JSON.stringify(this.todos));
              }
              toggleTodo(n) {
                const o = this.todos.indexOf(n);
                console.log(this.todos[o]),
                  (this.todos[o].active = !this.todos[o].active),
                  localStorage.setItem("todos", JSON.stringify(this.todos));
              }
              constructor() {
                (this.localItem = localStorage.getItem("todos")),
                  (this.todos =
                    null == this.localItem
                      ? [
                          {
                            sno: 1,
                            title: "Playing Cricket",
                            desc: "on nandivali ground at 4 pm",
                            active: !0,
                          },
                          {
                            sno: 2,
                            title: "Playing Kabbadi",
                            desc: "on church ground at 6 pm",
                            active: !0,
                          },
                          {
                            sno: 3,
                            title: "Learning HTML",
                            desc: "In ITVedant at 1 pm",
                            active: !0,
                          },
                          {
                            sno: 4,
                            title: "Learning CSS",
                            desc: "In ITVedant at 2 pm",
                            active: !0,
                          },
                          {
                            sno: 5,
                            title: "Learning JavaScript",
                            desc: "In ITVedant at 3 pm",
                            active: !0,
                          },
                          {
                            sno: 6,
                            title: "Learning Angular",
                            desc: "At Home 12 am",
                            active: !0,
                          },
                        ]
                      : JSON.parse(this.localItem));
              }
            }
            return (
              ((e = t).ɵfac = function (n) {
                return new (n || e)();
              }),
              (e.ɵcmp = Un({
                type: e,
                selectors: [["app-todo"]],
                decls: 6,
                vars: 2,
                consts: [
                  [1, "todos-cont", "pt-4"],
                  [1, "container-fluid", "px-5", "container-fluid1", "pb-3"],
                  [3, "todoadd"],
                  [
                    "style",
                    "text-align: center;color: white;",
                    4,
                    "ngIf",
                    "ngIfElse",
                  ],
                  ["elseBlock", ""],
                  [2, "text-align", "center", "color", "white"],
                  [
                    "class",
                    "container-fluid px-5 container-fluid1 pb-3",
                    4,
                    "ngFor",
                    "ngForOf",
                  ],
                  [3, "todos", "todoDelete", "todoCheckbox"],
                ],
                template: function (n, o) {
                  if (
                    (1 & n &&
                      (oe(0, "div", 0)(1, "div", 1)(2, "app-add-todo", 2),
                      _e("todoadd", function (s) {
                        return o.addTodo(s);
                      }),
                      ue()(),
                      ca(3, bV, 2, 0, "div", 3),
                      ca(4, MV, 1, 1, "ng-template", null, 4, D_),
                      ue()),
                    2 & n)
                  ) {
                    const i = (function gv(e) {
                      return (function yr(e, t) {
                        return e[t];
                      })(
                        (function jI() {
                          return T.lFrame.contextLView;
                        })(),
                        $ + e
                      );
                    })(5);
                    Tt(3), Nt("ngIf", 0 === o.todos.length)("ngIfElse", i);
                  }
                },
                dependencies: [FD, LD, IL, EV],
                styles: [
                  ".l-item[_ngcontent-%COMP%]{font-size:1.3rem;color:#000;font-weight:600}li[_ngcontent-%COMP%]{list-style:none}.todos-cont[_ngcontent-%COMP%]{min-height:90vh}",
                ],
              })),
              t
            );
          })(),
        },
        {
          path: "about-todo",
          component: (() => {
            var e;
            class t {}
            return (
              ((e = t).ɵfac = function (n) {
                return new (n || e)();
              }),
              (e.ɵcmp = Un({
                type: e,
                selectors: [["app-about-todo"]],
                decls: 9,
                vars: 0,
                consts: [
                  [1, "about", "container-fluid", "p-5"],
                  [
                    1,
                    "white-font",
                    "fs-1",
                    "fw-bolder",
                    "text-decoration-underline",
                    "text-center",
                    "pt-5",
                  ],
                  [
                    1,
                    "white-font",
                    "fs-4",
                    "fw-bold",
                    "text-center",
                    "px-3",
                    "py-3",
                  ],
                  [1, "svg", "text-center", "pt-4"],
                  [
                    "xmlns",
                    "http://www.w3.org/2000/svg",
                    "width",
                    "15vh",
                    "height",
                    "15vh",
                    "fill",
                    "currentColor",
                    "viewBox",
                    "0 0 16 16",
                    1,
                    "bi",
                    "bi-person-raised-hand",
                  ],
                  [
                    "d",
                    "M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a.998.998 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207Z",
                  ],
                  ["d", "M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"],
                ],
                template: function (n, o) {
                  1 & n &&
                    (oe(0, "div", 0)(1, "p", 1),
                    lt(2, "ABOUT"),
                    ue(),
                    oe(3, "p", 2),
                    lt(
                      4,
                      " \"Hello, I'm Manish Palande, the creator of this ToDo app. I hold a BCA degree from CV Raman University, and I'm passionate about developing innovative solutions to streamline daily tasks and enhance productivity. This app is a testament to my commitment to providing a user-friendly and efficient tool for managing your to-do lists. I hope you find it helpful and enjoy using it as much as I enjoyed creating it.\" "
                    ),
                    ue(),
                    oe(5, "p", 3),
                    (function Ap() {
                      T.lFrame.currentNamespace = "svg";
                    })(),
                    oe(6, "svg", 4),
                    Qn(7, "path", 5)(8, "path", 6),
                    ue()()());
                },
                styles: [
                  ".white-font[_ngcontent-%COMP%]{color:#fff}svg[_ngcontent-%COMP%]{color:#df0}",
                ],
              })),
              t
            );
          })(),
        },
      ];
      let AV = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = ht({ imports: [yw.forRoot(SV), yw] })),
            t
          );
        })(),
        TV = (() => {
          var e;
          class t {
            constructor() {
              this.title = "manish-todo-list";
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Un({
              type: e,
              selectors: [["app-root"]],
              decls: 18,
              vars: 0,
              consts: [
                [1, "navbar", "navbar-expand-lg"],
                [1, "container-fluid"],
                ["routerLink", "", 1, "navbar-brand", "fs-2", "fw-bolder"],
                [
                  "type",
                  "button",
                  "data-bs-toggle",
                  "collapse",
                  "data-bs-target",
                  "#navbarSupportedContent",
                  "aria-controls",
                  "navbarSupportedContent",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                ],
                [1, "navbar-toggler-icon"],
                [
                  "id",
                  "navbarSupportedContent",
                  1,
                  "collapse",
                  "navbar-collapse",
                ],
                [
                  1,
                  "navbar-nav",
                  "me-auto",
                  "mb-2",
                  "ms-3",
                  "mb-lg-0",
                  "gap-3",
                ],
                [1, "nav-item"],
                [
                  "aria-current",
                  "page",
                  "routerLink",
                  "",
                  1,
                  "nav-link",
                  "active",
                  "yfonts",
                ],
                [
                  "aria-current",
                  "page",
                  "routerLink",
                  "/about-todo",
                  1,
                  "nav-link",
                  "active",
                  "yfonts",
                ],
                [
                  "aria-current",
                  "page",
                  "routerLink",
                  "/contact",
                  1,
                  "nav-link",
                  "active",
                  "yfonts",
                ],
              ],
              template: function (n, o) {
                1 & n &&
                  (oe(0, "nav", 0)(1, "div", 1)(2, "a", 2),
                  lt(3, "Todo App"),
                  ue(),
                  oe(4, "button", 3),
                  Qn(5, "span", 4),
                  ue(),
                  oe(6, "div", 5)(7, "ul", 6)(8, "li", 7)(9, "a", 8),
                  lt(10, "Home"),
                  ue()(),
                  oe(11, "li", 7)(12, "a", 9),
                  lt(13, "About"),
                  ue()(),
                  oe(14, "li", 7)(15, "a", 10),
                  lt(16, "Contact"),
                  ue()()()()()(),
                  Qn(17, "router-outlet"));
              },
              dependencies: [mf, au],
              styles: [
                ".nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]{color:#000;font-size:1.3rem;font-weight:600}.navbar-brand[_ngcontent-%COMP%]{color:#005cfb;font-size:1.8rem}.navbar[_ngcontent-%COMP%]{background-color:#ff0}body[_ngcontent-%COMP%]{background-color:#5f9ea0}.btn-search[_ngcontent-%COMP%]{background-color:#00b8fb}.btn-search[_ngcontent-%COMP%]:hover{border:1px solid rgb(142,117,184)}",
              ],
            })),
            t
          );
        })(),
        NV = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Mt({ type: e, bootstrap: [TV] })),
            (e.ɵinj = ht({ imports: [jP, AV, CV, wV, BD] })),
            t
          );
        })();
      LP()
        .bootstrapModule(NV)
        .catch((e) => console.error(e));
    },
  },
  (K) => {
    K((K.s = 239));
  },
]);
