!(function (R, Ht) {
  "object" == typeof exports && typeof module < "u"
    ? (module.exports = Ht(require("@popperjs/core")))
    : "function" == typeof define && define.amd
    ? define(["@popperjs/core"], Ht)
    : ((R = typeof globalThis < "u" ? globalThis : R || self).bootstrap = Ht(
        R.Popper
      ));
})(this, function (R) {
  "use strict";
  function Ht(d) {
    const n = Object.create(null, {
      [Symbol.toStringTag]: { value: "Module" },
    });
    if (d)
      for (const u in d)
        if ("default" !== u) {
          const p = Object.getOwnPropertyDescriptor(d, u);
          Object.defineProperty(
            n,
            u,
            p.get ? p : { enumerable: !0, get: () => d[u] }
          );
        }
    return (n.default = d), Object.freeze(n);
  }
  const tt = Ht(R),
    jt = new Map(),
    st = {
      set(d, n, u) {
        jt.has(d) || jt.set(d, new Map());
        const p = jt.get(d);
        p.has(n) || 0 === p.size
          ? p.set(n, u)
          : console.error(
              `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                Array.from(p.keys())[0]
              }.`
            );
      },
      get: (d, n) => (jt.has(d) && jt.get(d).get(n)) || null,
      remove(d, n) {
        if (!jt.has(d)) return;
        const u = jt.get(d);
        u.delete(n), 0 === u.size && jt.delete(d);
      },
    },
    yt = "transitionend",
    Te = (d) => (
      d &&
        window.CSS &&
        window.CSS.escape &&
        (d = d.replace(/#([^\s"#']+)/g, (n, u) => `#${CSS.escape(u)}`)),
      d
    ),
    Yn = (d) => {
      d.dispatchEvent(new Event(yt));
    },
    P = (d) =>
      !(!d || "object" != typeof d) &&
      (typeof d.jquery < "u" && (d = d[0]), typeof d.nodeType < "u"),
    H = (d) =>
      P(d)
        ? d.jquery
          ? d[0]
          : d
        : "string" == typeof d && d.length > 0
        ? document.querySelector(Te(d))
        : null,
    vt = (d) => {
      if (!P(d) || 0 === d.getClientRects().length) return !1;
      const n =
          "visible" === getComputedStyle(d).getPropertyValue("visibility"),
        u = d.closest("details:not([open])");
      if (!u) return n;
      if (u !== d) {
        const p = d.closest("summary");
        if ((p && p.parentNode !== u) || null === p) return !1;
      }
      return n;
    },
    M = (d) =>
      !(
        d &&
        d.nodeType === Node.ELEMENT_NODE &&
        !d.classList.contains("disabled")
      ) ||
      (typeof d.disabled < "u"
        ? d.disabled
        : d.hasAttribute("disabled") && "false" !== d.getAttribute("disabled")),
    Un = (d) => {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof d.getRootNode) {
        const n = d.getRootNode();
        return n instanceof ShadowRoot ? n : null;
      }
      return d instanceof ShadowRoot
        ? d
        : d.parentNode
        ? Un(d.parentNode)
        : null;
    },
    Ce = () => {},
    ln = () =>
      window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
        ? window.jQuery
        : null,
    fn = [],
    ut = () => "rtl" === document.documentElement.dir,
    Y = (d) => {
      ((d) => {
        "loading" === document.readyState
          ? (fn.length ||
              document.addEventListener("DOMContentLoaded", () => {
                for (const n of fn) n();
              }),
            fn.push(d))
          : d();
      })(() => {
        const n = ln();
        if (n) {
          const u = d.NAME,
            p = n.fn[u];
          (n.fn[u] = d.jQueryInterface),
            (n.fn[u].Constructor = d),
            (n.fn[u].noConflict = () => ((n.fn[u] = p), d.jQueryInterface));
        }
      });
    },
    ct = (d, n = [], u = d) => ("function" == typeof d ? d(...n) : u),
    zn = (d, n, u = !0) => {
      if (!u) return void ct(d);
      const A =
        ((d) => {
          if (!d) return 0;
          let { transitionDuration: n, transitionDelay: u } =
            window.getComputedStyle(d);
          const p = Number.parseFloat(n),
            A = Number.parseFloat(u);
          return p || A
            ? ((n = n.split(",")[0]),
              (u = u.split(",")[0]),
              1e3 * (Number.parseFloat(n) + Number.parseFloat(u)))
            : 0;
        })(n) + 5;
      let D = !1;
      const N = ({ target: K }) => {
        K === n && ((D = !0), n.removeEventListener(yt, N), ct(d));
      };
      n.addEventListener(yt, N),
        setTimeout(() => {
          D || Yn(n);
        }, A);
    },
    dn = (d, n, u, p) => {
      const A = d.length;
      let D = d.indexOf(n);
      return -1 === D
        ? !u && p
          ? d[A - 1]
          : d[0]
        : ((D += u ? 1 : -1),
          p && (D = (D + A) % A),
          d[Math.max(0, Math.min(D, A - 1))]);
    },
    Q = /[^.]*(?=\..*)\.|.*/,
    Se = /\..*/,
    ki = /::\d+$/,
    hn = {};
  let Dt = 1;
  const Ge = { mouseenter: "mouseover", mouseleave: "mouseout" },
    se = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function pn(d, n) {
    return (n && `${n}::${Dt++}`) || d.uidEvent || Dt++;
  }
  function gn(d) {
    const n = pn(d);
    return (d.uidEvent = n), (hn[n] = hn[n] || {}), hn[n];
  }
  function mn(d, n, u = null) {
    return Object.values(d).find(
      (p) => p.callable === n && p.delegationSelector === u
    );
  }
  function Xn(d, n, u) {
    const p = "string" == typeof n,
      A = p ? u : n || u;
    let D = yn(d);
    return se.has(D) || (D = d), [p, A, D];
  }
  function Qn(d, n, u, p, A) {
    if ("string" != typeof n || !d) return;
    let [D, N, K] = Xn(n, u, p);
    var to;
    n in Ge &&
      ((to = N),
      (N = function (cn) {
        if (
          !cn.relatedTarget ||
          (cn.relatedTarget !== cn.delegateTarget &&
            !cn.delegateTarget.contains(cn.relatedTarget))
        )
          return to.call(this, cn);
      }));
    const Et = gn(d),
      Rt = Et[K] || (Et[K] = {}),
      rt = mn(Rt, N, D ? u : null);
    if (rt) return void (rt.oneOff = rt.oneOff && A);
    const Jt = pn(N, n.replace(Q, "")),
      Yt = D
        ? (function _n(d, n, u) {
            return function p(A) {
              const D = d.querySelectorAll(n);
              for (let { target: N } = A; N && N !== this; N = N.parentNode)
                for (const K of D)
                  if (K === N)
                    return (
                      vn(A, { delegateTarget: N }),
                      p.oneOff && C.off(d, A.type, n, u),
                      u.apply(N, [A])
                    );
            };
          })(d, u, N)
        : (function Gn(d, n) {
            return function u(p) {
              return (
                vn(p, { delegateTarget: d }),
                u.oneOff && C.off(d, p.type, n),
                n.apply(d, [p])
              );
            };
          })(d, N);
    (Yt.delegationSelector = D ? u : null),
      (Yt.callable = N),
      (Yt.oneOff = A),
      (Yt.uidEvent = Jt),
      (Rt[Jt] = Yt),
      d.addEventListener(K, Yt, D);
  }
  function En(d, n, u, p, A) {
    const D = mn(n[u], p, A);
    D && (d.removeEventListener(u, D, !!A), delete n[u][D.uidEvent]);
  }
  function Mi(d, n, u, p) {
    const A = n[u] || {};
    for (const [D, N] of Object.entries(A))
      D.includes(p) && En(d, n, u, N.callable, N.delegationSelector);
  }
  function yn(d) {
    return (d = d.replace(Se, "")), Ge[d] || d;
  }
  const C = {
    on(d, n, u, p) {
      Qn(d, n, u, p, !1);
    },
    one(d, n, u, p) {
      Qn(d, n, u, p, !0);
    },
    off(d, n, u, p) {
      if ("string" != typeof n || !d) return;
      const [A, D, N] = Xn(n, u, p),
        K = N !== n,
        Et = gn(d),
        Rt = Et[N] || {},
        rt = n.startsWith(".");
      if (typeof D < "u") {
        if (!Object.keys(Rt).length) return;
        En(d, Et, N, D, A ? u : null);
      } else {
        if (rt) for (const Jt of Object.keys(Et)) Mi(d, Et, Jt, n.slice(1));
        for (const [Jt, Yt] of Object.entries(Rt)) {
          const $i = Jt.replace(ki, "");
          (!K || n.includes($i)) &&
            En(d, Et, N, Yt.callable, Yt.delegationSelector);
        }
      }
    },
    trigger(d, n, u) {
      if ("string" != typeof n || !d) return null;
      const p = ln();
      let N = null,
        K = !0,
        Et = !0,
        Rt = !1;
      n !== yn(n) &&
        p &&
        ((N = p.Event(n, u)),
        p(d).trigger(N),
        (K = !N.isPropagationStopped()),
        (Et = !N.isImmediatePropagationStopped()),
        (Rt = N.isDefaultPrevented()));
      const rt = vn(new Event(n, { bubbles: K, cancelable: !0 }), u);
      return (
        Rt && rt.preventDefault(),
        Et && d.dispatchEvent(rt),
        rt.defaultPrevented && N && N.preventDefault(),
        rt
      );
    },
  };
  function vn(d, n = {}) {
    for (const [u, p] of Object.entries(n))
      try {
        d[u] = p;
      } catch {
        Object.defineProperty(d, u, { configurable: !0, get: () => p });
      }
    return d;
  }
  function Zt(d) {
    if ("true" === d) return !0;
    if ("false" === d) return !1;
    if (d === Number(d).toString()) return Number(d);
    if ("" === d || "null" === d) return null;
    if ("string" != typeof d) return d;
    try {
      return JSON.parse(decodeURIComponent(d));
    } catch {
      return d;
    }
  }
  function oe(d) {
    return d.replace(/[A-Z]/g, (n) => `-${n.toLowerCase()}`);
  }
  const xt = {
    setDataAttribute(d, n, u) {
      d.setAttribute(`data-bs-${oe(n)}`, u);
    },
    removeDataAttribute(d, n) {
      d.removeAttribute(`data-bs-${oe(n)}`);
    },
    getDataAttributes(d) {
      if (!d) return {};
      const n = {},
        u = Object.keys(d.dataset).filter(
          (p) => p.startsWith("bs") && !p.startsWith("bsConfig")
        );
      for (const p of u) {
        let A = p.replace(/^bs/, "");
        (A = A.charAt(0).toLowerCase() + A.slice(1, A.length)),
          (n[A] = Zt(d.dataset[p]));
      }
      return n;
    },
    getDataAttribute: (d, n) => Zt(d.getAttribute(`data-bs-${oe(n)}`)),
  };
  class Ne {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!'
      );
    }
    _getConfig(n) {
      return (
        (n = this._mergeConfigObj(n)),
        (n = this._configAfterMerge(n)),
        this._typeCheckConfig(n),
        n
      );
    }
    _configAfterMerge(n) {
      return n;
    }
    _mergeConfigObj(n, u) {
      const p = P(u) ? xt.getDataAttribute(u, "config") : {};
      return {
        ...this.constructor.Default,
        ...("object" == typeof p ? p : {}),
        ...(P(u) ? xt.getDataAttributes(u) : {}),
        ...("object" == typeof n ? n : {}),
      };
    }
    _typeCheckConfig(n, u = this.constructor.DefaultType) {
      for (const [p, A] of Object.entries(u)) {
        const D = n[p],
          N = P(D)
            ? "element"
            : null == (d = D)
            ? `${d}`
            : Object.prototype.toString
                .call(d)
                .match(/\s([a-z]+)/i)[1]
                .toLowerCase();
        if (!new RegExp(A).test(N))
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${p}" provided type "${N}" but expected type "${A}".`
          );
      }
      var d;
    }
  }
  class lt extends Ne {
    constructor(n, u) {
      super(),
        (n = H(n)) &&
          ((this._element = n),
          (this._config = this._getConfig(u)),
          st.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      st.remove(this._element, this.constructor.DATA_KEY),
        C.off(this._element, this.constructor.EVENT_KEY);
      for (const n of Object.getOwnPropertyNames(this)) this[n] = null;
    }
    _queueCallback(n, u, p = !0) {
      zn(n, u, p);
    }
    _getConfig(n) {
      return (
        (n = this._mergeConfigObj(n, this._element)),
        (n = this._configAfterMerge(n)),
        this._typeCheckConfig(n),
        n
      );
    }
    static getInstance(n) {
      return st.get(H(n), this.DATA_KEY);
    }
    static getOrCreateInstance(n, u = {}) {
      return (
        this.getInstance(n) || new this(n, "object" == typeof u ? u : null)
      );
    }
    static get VERSION() {
      return "5.3.2";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(n) {
      return `${n}${this.EVENT_KEY}`;
    }
  }
  const bt = (d) => {
      let n = d.getAttribute("data-bs-target");
      if (!n || "#" === n) {
        let u = d.getAttribute("href");
        if (!u || (!u.includes("#") && !u.startsWith("."))) return null;
        u.includes("#") && !u.startsWith("#") && (u = `#${u.split("#")[1]}`),
          (n = u && "#" !== u ? Te(u.trim()) : null);
      }
      return n;
    },
    $ = {
      find: (d, n = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(n, d)),
      findOne: (d, n = document.documentElement) =>
        Element.prototype.querySelector.call(n, d),
      children: (d, n) => [].concat(...d.children).filter((u) => u.matches(n)),
      parents(d, n) {
        const u = [];
        let p = d.parentNode.closest(n);
        for (; p; ) u.push(p), (p = p.parentNode.closest(n));
        return u;
      },
      prev(d, n) {
        let u = d.previousElementSibling;
        for (; u; ) {
          if (u.matches(n)) return [u];
          u = u.previousElementSibling;
        }
        return [];
      },
      next(d, n) {
        let u = d.nextElementSibling;
        for (; u; ) {
          if (u.matches(n)) return [u];
          u = u.nextElementSibling;
        }
        return [];
      },
      focusableChildren(d) {
        const n = [
          "a",
          "button",
          "input",
          "textarea",
          "select",
          "details",
          "[tabindex]",
          '[contenteditable="true"]',
        ]
          .map((u) => `${u}:not([tabindex^="-"])`)
          .join(",");
        return this.find(n, d).filter((u) => !M(u) && vt(u));
      },
      getSelectorFromElement(d) {
        const n = bt(d);
        return n && $.findOne(n) ? n : null;
      },
      getElementFromSelector(d) {
        const n = bt(d);
        return n ? $.findOne(n) : null;
      },
      getMultipleElementsFromSelector(d) {
        const n = bt(d);
        return n ? $.find(n) : [];
      },
    },
    Xe = (d, n = "hide") => {
      const p = d.NAME;
      C.on(
        document,
        `click.dismiss${d.EVENT_KEY}`,
        `[data-bs-dismiss="${p}"]`,
        function (A) {
          if (
            (["A", "AREA"].includes(this.tagName) && A.preventDefault(),
            M(this))
          )
            return;
          const D = $.getElementFromSelector(this) || this.closest(`.${p}`);
          d.getOrCreateInstance(D)[n]();
        }
      );
    },
    ae = ".bs.alert",
    we = `close${ae}`,
    I = `closed${ae}`;
  class De extends lt {
    static get NAME() {
      return "alert";
    }
    close() {
      if (C.trigger(this._element, we).defaultPrevented) return;
      this._element.classList.remove("show");
      const u = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, u);
    }
    _destroyElement() {
      this._element.remove(), C.trigger(this._element, I), this.dispose();
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = De.getOrCreateInstance(this);
        if ("string" == typeof n) {
          if (void 0 === u[n] || n.startsWith("_") || "constructor" === n)
            throw new TypeError(`No method named "${n}"`);
          u[n](this);
        }
      });
    }
  }
  Xe(De, "close"), Y(De);
  const Ut = '[data-bs-toggle="button"]';
  class Oe extends lt {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active")
      );
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = Oe.getOrCreateInstance(this);
        "toggle" === n && u[n]();
      });
    }
  }
  C.on(document, "click.bs.button.data-api", Ut, (d) => {
    d.preventDefault();
    const n = d.target.closest(Ut);
    Oe.getOrCreateInstance(n).toggle();
  }),
    Y(Oe);
  const te = ".bs.swipe",
    Zn = `touchstart${te}`,
    Vi = `touchmove${te}`,
    ce = `touchend${te}`,
    Le = `pointerdown${te}`,
    ti = `pointerup${te}`,
    Wi = { endCallback: null, leftCallback: null, rightCallback: null },
    ni = {
      endCallback: "(function|null)",
      leftCallback: "(function|null)",
      rightCallback: "(function|null)",
    };
  class Ie extends Ne {
    constructor(n, u) {
      super(),
        (this._element = n),
        n &&
          Ie.isSupported() &&
          ((this._config = this._getConfig(u)),
          (this._deltaX = 0),
          (this._supportPointerEvents = !!window.PointerEvent),
          this._initEvents());
    }
    static get Default() {
      return Wi;
    }
    static get DefaultType() {
      return ni;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      C.off(this._element, te);
    }
    _start(n) {
      this._supportPointerEvents
        ? this._eventIsPointerPenTouch(n) && (this._deltaX = n.clientX)
        : (this._deltaX = n.touches[0].clientX);
    }
    _end(n) {
      this._eventIsPointerPenTouch(n) &&
        (this._deltaX = n.clientX - this._deltaX),
        this._handleSwipe(),
        ct(this._config.endCallback);
    }
    _move(n) {
      this._deltaX =
        n.touches && n.touches.length > 1
          ? 0
          : n.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const n = Math.abs(this._deltaX);
      if (n <= 40) return;
      const u = n / this._deltaX;
      (this._deltaX = 0),
        u && ct(u > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents
        ? (C.on(this._element, Le, (n) => this._start(n)),
          C.on(this._element, ti, (n) => this._end(n)),
          this._element.classList.add("pointer-event"))
        : (C.on(this._element, Zn, (n) => this._start(n)),
          C.on(this._element, Vi, (n) => this._move(n)),
          C.on(this._element, ce, (n) => this._end(n)));
    }
    _eventIsPointerPenTouch(n) {
      return (
        this._supportPointerEvents &&
        ("pen" === n.pointerType || "touch" === n.pointerType)
      );
    }
    static isSupported() {
      return (
        "ontouchstart" in document.documentElement ||
        navigator.maxTouchPoints > 0
      );
    }
  }
  const Ot = ".bs.carousel",
    ke = ".data-api",
    fe = "next",
    de = "prev",
    he = "left",
    Me = "right",
    Ki = `slide${Ot}`,
    zt = `slid${Ot}`,
    ii = `keydown${Ot}`,
    An = `mouseenter${Ot}`,
    Cn = `mouseleave${Ot}`,
    Je = `dragstart${Ot}`,
    ri = `load${Ot}${ke}`,
    Yi = `click${Ot}${ke}`,
    pe = "carousel",
    Pe = "active",
    ui = ".active",
    ci = ".carousel-item",
    li = ui + ci,
    ge = { ArrowLeft: Me, ArrowRight: he },
    Ze = {
      interval: 5e3,
      keyboard: !0,
      pause: "hover",
      ride: !1,
      touch: !0,
      wrap: !0,
    },
    zi = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      pause: "(string|boolean)",
      ride: "(boolean|string)",
      touch: "boolean",
      wrap: "boolean",
    };
  class _e extends lt {
    constructor(n, u) {
      super(n, u),
        (this._interval = null),
        (this._activeElement = null),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this._swipeHelper = null),
        (this._indicatorsElement = $.findOne(
          ".carousel-indicators",
          this._element
        )),
        this._addEventListeners(),
        this._config.ride === pe && this.cycle();
    }
    static get Default() {
      return Ze;
    }
    static get DefaultType() {
      return zi;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(fe);
    }
    nextWhenVisible() {
      !document.hidden && vt(this._element) && this.next();
    }
    prev() {
      this._slide(de);
    }
    pause() {
      this._isSliding && Yn(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(),
        this._updateInterval(),
        (this._interval = setInterval(
          () => this.nextWhenVisible(),
          this._config.interval
        ));
    }
    _maybeEnableCycle() {
      if (this._config.ride) {
        if (this._isSliding)
          return void C.one(this._element, zt, () => this.cycle());
        this.cycle();
      }
    }
    to(n) {
      const u = this._getItems();
      if (n > u.length - 1 || n < 0) return;
      if (this._isSliding)
        return void C.one(this._element, zt, () => this.to(n));
      const p = this._getItemIndex(this._getActive());
      p !== n && this._slide(n > p ? fe : de, u[n]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(n) {
      return (n.defaultInterval = n.interval), n;
    }
    _addEventListeners() {
      this._config.keyboard && C.on(this._element, ii, (n) => this._keydown(n)),
        "hover" === this._config.pause &&
          (C.on(this._element, An, () => this.pause()),
          C.on(this._element, Cn, () => this._maybeEnableCycle())),
        this._config.touch &&
          Ie.isSupported() &&
          this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const p of $.find(".carousel-item img", this._element))
        C.on(p, Je, (A) => A.preventDefault());
      this._swipeHelper = new Ie(this._element, {
        leftCallback: () => this._slide(this._directionToOrder(he)),
        rightCallback: () => this._slide(this._directionToOrder(Me)),
        endCallback: () => {
          "hover" === this._config.pause &&
            (this.pause(),
            this.touchTimeout && clearTimeout(this.touchTimeout),
            (this.touchTimeout = setTimeout(
              () => this._maybeEnableCycle(),
              500 + this._config.interval
            )));
        },
      });
    }
    _keydown(n) {
      if (/input|textarea/i.test(n.target.tagName)) return;
      const u = ge[n.key];
      u && (n.preventDefault(), this._slide(this._directionToOrder(u)));
    }
    _getItemIndex(n) {
      return this._getItems().indexOf(n);
    }
    _setActiveIndicatorElement(n) {
      if (!this._indicatorsElement) return;
      const u = $.findOne(ui, this._indicatorsElement);
      u.classList.remove(Pe), u.removeAttribute("aria-current");
      const p = $.findOne(`[data-bs-slide-to="${n}"]`, this._indicatorsElement);
      p && (p.classList.add(Pe), p.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const n = this._activeElement || this._getActive();
      if (!n) return;
      const u = Number.parseInt(n.getAttribute("data-bs-interval"), 10);
      this._config.interval = u || this._config.defaultInterval;
    }
    _slide(n, u = null) {
      if (this._isSliding) return;
      const p = this._getActive(),
        A = n === fe,
        D = u || dn(this._getItems(), p, A, this._config.wrap);
      if (D === p) return;
      const N = this._getItemIndex(D),
        K = ($i) =>
          C.trigger(this._element, $i, {
            relatedTarget: D,
            direction: this._orderToDirection(n),
            from: this._getItemIndex(p),
            to: N,
          });
      if (K(Ki).defaultPrevented || !p || !D) return;
      const Rt = !!this._interval;
      this.pause(),
        (this._isSliding = !0),
        this._setActiveIndicatorElement(N),
        (this._activeElement = D);
      const rt = A ? "carousel-item-start" : "carousel-item-end",
        Jt = A ? "carousel-item-next" : "carousel-item-prev";
      D.classList.add(Jt),
        p.classList.add(rt),
        D.classList.add(rt),
        this._queueCallback(
          () => {
            D.classList.remove(rt, Jt),
              D.classList.add(Pe),
              p.classList.remove(Pe, Jt, rt),
              (this._isSliding = !1),
              K(zt);
          },
          p,
          this._isAnimated()
        ),
        Rt && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return $.findOne(li, this._element);
    }
    _getItems() {
      return $.find(ci, this._element);
    }
    _clearInterval() {
      this._interval &&
        (clearInterval(this._interval), (this._interval = null));
    }
    _directionToOrder(n) {
      return ut() ? (n === he ? de : fe) : n === he ? fe : de;
    }
    _orderToDirection(n) {
      return ut() ? (n === de ? he : Me) : n === de ? Me : he;
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = _e.getOrCreateInstance(this, n);
        if ("number" != typeof n) {
          if ("string" == typeof n) {
            if (void 0 === u[n] || n.startsWith("_") || "constructor" === n)
              throw new TypeError(`No method named "${n}"`);
            u[n]();
          }
        } else u.to(n);
      });
    }
  }
  C.on(document, Yi, "[data-bs-slide], [data-bs-slide-to]", function (d) {
    const n = $.getElementFromSelector(this);
    if (!n || !n.classList.contains(pe)) return;
    d.preventDefault();
    const u = _e.getOrCreateInstance(n),
      p = this.getAttribute("data-bs-slide-to");
    return p
      ? (u.to(p), void u._maybeEnableCycle())
      : "next" === xt.getDataAttribute(this, "slide")
      ? (u.next(), void u._maybeEnableCycle())
      : (u.prev(), void u._maybeEnableCycle());
  }),
    C.on(window, ri, () => {
      const d = $.find('[data-bs-ride="carousel"]');
      for (const n of d) _e.getOrCreateInstance(n);
    }),
    Y(_e);
  const Gt = ".bs.collapse",
    Xi = `show${Gt}`,
    Qi = `shown${Gt}`,
    Tt = `hide${Gt}`,
    pi = `hidden${Gt}`,
    Re = `click${Gt}.data-api`,
    Dn = "show",
    me = "collapse",
    Lt = "collapsing",
    xn = `:scope .${me} .${me}`,
    tn = '[data-bs-toggle="collapse"]',
    _i = { parent: null, toggle: !0 },
    Zi = { parent: "(null|element)", toggle: "boolean" };
  class ne extends lt {
    constructor(n, u) {
      super(n, u), (this._isTransitioning = !1), (this._triggerArray = []);
      const p = $.find(tn);
      for (const A of p) {
        const D = $.getSelectorFromElement(A),
          N = $.find(D).filter((K) => K === this._element);
        null !== D && N.length && this._triggerArray.push(A);
      }
      this._initializeChildren(),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return _i;
    }
    static get DefaultType() {
      return Zi;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let n = [];
      if (
        (this._config.parent &&
          (n = this._getFirstLevelChildren(
            ".collapse.show, .collapse.collapsing"
          )
            .filter((K) => K !== this._element)
            .map((K) => ne.getOrCreateInstance(K, { toggle: !1 }))),
        (n.length && n[0]._isTransitioning) ||
          C.trigger(this._element, Xi).defaultPrevented)
      )
        return;
      for (const K of n) K.hide();
      const p = this._getDimension();
      this._element.classList.remove(me),
        this._element.classList.add(Lt),
        (this._element.style[p] = 0),
        this._addAriaAndCollapsedClass(this._triggerArray, !0),
        (this._isTransitioning = !0);
      const N = `scroll${p[0].toUpperCase() + p.slice(1)}`;
      this._queueCallback(
        () => {
          (this._isTransitioning = !1),
            this._element.classList.remove(Lt),
            this._element.classList.add(me, Dn),
            (this._element.style[p] = ""),
            C.trigger(this._element, Qi);
        },
        this._element,
        !0
      ),
        (this._element.style[p] = `${this._element[N]}px`);
    }
    hide() {
      if (
        this._isTransitioning ||
        !this._isShown() ||
        C.trigger(this._element, Tt).defaultPrevented
      )
        return;
      const u = this._getDimension();
      (this._element.style[u] = `${
        this._element.getBoundingClientRect()[u]
      }px`),
        this._element.classList.add(Lt),
        this._element.classList.remove(me, Dn);
      for (const A of this._triggerArray) {
        const D = $.getElementFromSelector(A);
        D && !this._isShown(D) && this._addAriaAndCollapsedClass([A], !1);
      }
      (this._isTransitioning = !0),
        (this._element.style[u] = ""),
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(Lt),
              this._element.classList.add(me),
              C.trigger(this._element, pi);
          },
          this._element,
          !0
        );
    }
    _isShown(n = this._element) {
      return n.classList.contains(Dn);
    }
    _configAfterMerge(n) {
      return (n.toggle = !!n.toggle), (n.parent = H(n.parent)), n;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal")
        ? "width"
        : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const n = this._getFirstLevelChildren(tn);
      for (const u of n) {
        const p = $.getElementFromSelector(u);
        p && this._addAriaAndCollapsedClass([u], this._isShown(p));
      }
    }
    _getFirstLevelChildren(n) {
      const u = $.find(xn, this._config.parent);
      return $.find(n, this._config.parent).filter((p) => !u.includes(p));
    }
    _addAriaAndCollapsedClass(n, u) {
      if (n.length)
        for (const p of n)
          p.classList.toggle("collapsed", !u),
            p.setAttribute("aria-expanded", u);
    }
    static jQueryInterface(n) {
      const u = {};
      return (
        "string" == typeof n && /show|hide/.test(n) && (u.toggle = !1),
        this.each(function () {
          const p = ne.getOrCreateInstance(this, u);
          if ("string" == typeof n) {
            if (typeof p[n] > "u")
              throw new TypeError(`No method named "${n}"`);
            p[n]();
          }
        })
      );
    }
  }
  C.on(document, Re, tn, function (d) {
    ("A" === d.target.tagName ||
      (d.delegateTarget && "A" === d.delegateTarget.tagName)) &&
      d.preventDefault();
    for (const n of $.getMultipleElementsFromSelector(this))
      ne.getOrCreateInstance(n, { toggle: !1 }).toggle();
  }),
    Y(ne);
  const mi = "dropdown",
    qt = ".bs.dropdown",
    Ln = ".data-api",
    er = "ArrowUp",
    yi = "ArrowDown",
    ir = `hide${qt}`,
    vi = `hidden${qt}`,
    In = `show${qt}`,
    bi = `shown${qt}`,
    en = `click${qt}${Ln}`,
    $n = `keydown${qt}${Ln}`,
    Ti = `keyup${qt}${Ln}`,
    Xt = "show",
    Ft = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    ar = `${Ft}.${Xt}`,
    nn = ".dropdown-menu",
    i = ut() ? "top-end" : "top-start",
    r = ut() ? "top-start" : "top-end",
    o = ut() ? "bottom-end" : "bottom-start",
    a = ut() ? "bottom-start" : "bottom-end",
    c = ut() ? "left-start" : "right-start",
    h = ut() ? "right-start" : "left-start",
    v = {
      autoClose: !0,
      boundary: "clippingParents",
      display: "dynamic",
      offset: [0, 2],
      popperConfig: null,
      reference: "toggle",
    },
    T = {
      autoClose: "(boolean|string)",
      boundary: "(string|element)",
      display: "string",
      offset: "(array|string|function)",
      popperConfig: "(null|object|function)",
      reference: "(string|element|object)",
    };
  class m extends lt {
    constructor(n, u) {
      super(n, u),
        (this._popper = null),
        (this._parent = this._element.parentNode),
        (this._menu =
          $.next(this._element, nn)[0] ||
          $.prev(this._element, nn)[0] ||
          $.findOne(nn, this._parent)),
        (this._inNavbar = this._detectNavbar());
    }
    static get Default() {
      return v;
    }
    static get DefaultType() {
      return T;
    }
    static get NAME() {
      return mi;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (M(this._element) || this._isShown()) return;
      const n = { relatedTarget: this._element };
      if (!C.trigger(this._element, In, n).defaultPrevented) {
        if (
          (this._createPopper(),
          "ontouchstart" in document.documentElement &&
            !this._parent.closest(".navbar-nav"))
        )
          for (const p of [].concat(...document.body.children))
            C.on(p, "mouseover", Ce);
        this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.add(Xt),
          this._element.classList.add(Xt),
          C.trigger(this._element, bi, n);
      }
    }
    hide() {
      !M(this._element) &&
        this._isShown() &&
        this._completeHide({ relatedTarget: this._element });
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _completeHide(n) {
      if (!C.trigger(this._element, ir, n).defaultPrevented) {
        if ("ontouchstart" in document.documentElement)
          for (const p of [].concat(...document.body.children))
            C.off(p, "mouseover", Ce);
        this._popper && this._popper.destroy(),
          this._menu.classList.remove(Xt),
          this._element.classList.remove(Xt),
          this._element.setAttribute("aria-expanded", "false"),
          xt.removeDataAttribute(this._menu, "popper"),
          C.trigger(this._element, vi, n);
      }
    }
    _getConfig(n) {
      if (
        "object" == typeof (n = super._getConfig(n)).reference &&
        !P(n.reference) &&
        "function" != typeof n.reference.getBoundingClientRect
      )
        throw new TypeError(
          `${mi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
        );
      return n;
    }
    _createPopper() {
      if (typeof tt > "u")
        throw new TypeError(
          "Bootstrap's dropdowns require Popper (https://popper.js.org)"
        );
      let n = this._element;
      "parent" === this._config.reference
        ? (n = this._parent)
        : P(this._config.reference)
        ? (n = H(this._config.reference))
        : "object" == typeof this._config.reference &&
          (n = this._config.reference);
      const u = this._getPopperConfig();
      this._popper = tt.createPopper(n, this._menu, u);
    }
    _isShown() {
      return this._menu.classList.contains(Xt);
    }
    _getPlacement() {
      const n = this._parent;
      if (n.classList.contains("dropend")) return c;
      if (n.classList.contains("dropstart")) return h;
      if (n.classList.contains("dropup-center")) return "top";
      if (n.classList.contains("dropdown-center")) return "bottom";
      const u =
        "end" ===
        getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return n.classList.contains("dropup") ? (u ? r : i) : u ? a : o;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: n } = this._config;
      return "string" == typeof n
        ? n.split(",").map((u) => Number.parseInt(u, 10))
        : "function" == typeof n
        ? (u) => n(u, this._element)
        : n;
    }
    _getPopperConfig() {
      const n = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        (this._inNavbar || "static" === this._config.display) &&
          (xt.setDataAttribute(this._menu, "popper", "static"),
          (n.modifiers = [{ name: "applyStyles", enabled: !1 }])),
        { ...n, ...ct(this._config.popperConfig, [n]) }
      );
    }
    _selectMenuItem({ key: n, target: u }) {
      const p = $.find(
        ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        this._menu
      ).filter((A) => vt(A));
      p.length && dn(p, u, n === yi, !p.includes(u)).focus();
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = m.getOrCreateInstance(this, n);
        if ("string" == typeof n) {
          if (typeof u[n] > "u") throw new TypeError(`No method named "${n}"`);
          u[n]();
        }
      });
    }
    static clearMenus(n) {
      if (2 === n.button || ("keyup" === n.type && "Tab" !== n.key)) return;
      const u = $.find(ar);
      for (const p of u) {
        const A = m.getInstance(p);
        if (!A || !1 === A._config.autoClose) continue;
        const D = n.composedPath(),
          N = D.includes(A._menu);
        if (
          D.includes(A._element) ||
          ("inside" === A._config.autoClose && !N) ||
          ("outside" === A._config.autoClose && N) ||
          (A._menu.contains(n.target) &&
            (("keyup" === n.type && "Tab" === n.key) ||
              /input|select|option|textarea|form/i.test(n.target.tagName)))
        )
          continue;
        const K = { relatedTarget: A._element };
        "click" === n.type && (K.clickEvent = n), A._completeHide(K);
      }
    }
    static dataApiKeydownHandler(n) {
      const u = /input|textarea/i.test(n.target.tagName),
        p = "Escape" === n.key,
        A = [er, yi].includes(n.key);
      if ((!A && !p) || (u && !p)) return;
      n.preventDefault();
      const D = this.matches(Ft)
          ? this
          : $.prev(this, Ft)[0] ||
            $.next(this, Ft)[0] ||
            $.findOne(Ft, n.delegateTarget.parentNode),
        N = m.getOrCreateInstance(D);
      if (A) return n.stopPropagation(), N.show(), void N._selectMenuItem(n);
      N._isShown() && (n.stopPropagation(), N.hide(), D.focus());
    }
  }
  C.on(document, $n, Ft, m.dataApiKeydownHandler),
    C.on(document, $n, nn, m.dataApiKeydownHandler),
    C.on(document, en, m.clearMenus),
    C.on(document, Ti, m.clearMenus),
    C.on(document, en, Ft, function (d) {
      d.preventDefault(), m.getOrCreateInstance(this).toggle();
    }),
    Y(m);
  const S = "backdrop",
    U = "show",
    q = `mousedown.bs.${S}`,
    nt = {
      className: "modal-backdrop",
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: "body",
    },
    et = {
      className: "string",
      clickCallback: "(function|null)",
      isAnimated: "boolean",
      isVisible: "boolean",
      rootElement: "(element|string)",
    };
  class At extends Ne {
    constructor(n) {
      super(),
        (this._config = this._getConfig(n)),
        (this._isAppended = !1),
        (this._element = null);
    }
    static get Default() {
      return nt;
    }
    static get DefaultType() {
      return et;
    }
    static get NAME() {
      return S;
    }
    show(n) {
      if (!this._config.isVisible) return void ct(n);
      this._append();
      this._getElement().classList.add(U),
        this._emulateAnimation(() => {
          ct(n);
        });
    }
    hide(n) {
      this._config.isVisible
        ? (this._getElement().classList.remove(U),
          this._emulateAnimation(() => {
            this.dispose(), ct(n);
          }))
        : ct(n);
    }
    dispose() {
      this._isAppended &&
        (C.off(this._element, q),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _getElement() {
      if (!this._element) {
        const n = document.createElement("div");
        (n.className = this._config.className),
          this._config.isAnimated && n.classList.add("fade"),
          (this._element = n);
      }
      return this._element;
    }
    _configAfterMerge(n) {
      return (n.rootElement = H(n.rootElement)), n;
    }
    _append() {
      if (this._isAppended) return;
      const n = this._getElement();
      this._config.rootElement.append(n),
        C.on(n, q, () => {
          ct(this._config.clickCallback);
        }),
        (this._isAppended = !0);
    }
    _emulateAnimation(n) {
      zn(n, this._getElement(), this._config.isAnimated);
    }
  }
  const $t = ".bs.focustrap",
    G = `focusin${$t}`,
    Z = `keydown.tab${$t}`,
    Ct = "backward",
    We = { autofocus: !0, trapElement: null },
    kt = { autofocus: "boolean", trapElement: "element" };
  class Bt extends Ne {
    constructor(n) {
      super(),
        (this._config = this._getConfig(n)),
        (this._isActive = !1),
        (this._lastTabNavDirection = null);
    }
    static get Default() {
      return We;
    }
    static get DefaultType() {
      return kt;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive ||
        (this._config.autofocus && this._config.trapElement.focus(),
        C.off(document, $t),
        C.on(document, G, (n) => this._handleFocusin(n)),
        C.on(document, Z, (n) => this._handleKeydown(n)),
        (this._isActive = !0));
    }
    deactivate() {
      this._isActive && ((this._isActive = !1), C.off(document, $t));
    }
    _handleFocusin(n) {
      const { trapElement: u } = this._config;
      if (n.target === document || n.target === u || u.contains(n.target))
        return;
      const p = $.focusableChildren(u);
      0 === p.length
        ? u.focus()
        : this._lastTabNavDirection === Ct
        ? p[p.length - 1].focus()
        : p[0].focus();
    }
    _handleKeydown(n) {
      "Tab" === n.key &&
        (this._lastTabNavDirection = n.shiftKey ? Ct : "forward");
    }
  }
  const Kt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    pt = ".sticky-top",
    Ee = "padding-right",
    Mt = "margin-right";
  class St {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const n = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - n);
    }
    hide() {
      const n = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, Ee, (u) => u + n),
        this._setElementAttributes(Kt, Ee, (u) => u + n),
        this._setElementAttributes(pt, Mt, (u) => u - n);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, Ee),
        this._resetElementAttributes(Kt, Ee),
        this._resetElementAttributes(pt, Mt);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"),
        (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(n, u, p) {
      const A = this.getWidth();
      this._applyManipulationCallback(n, (N) => {
        if (N !== this._element && window.innerWidth > N.clientWidth + A)
          return;
        this._saveInitialAttribute(N, u);
        const K = window.getComputedStyle(N).getPropertyValue(u);
        N.style.setProperty(u, `${p(Number.parseFloat(K))}px`);
      });
    }
    _saveInitialAttribute(n, u) {
      const p = n.style.getPropertyValue(u);
      p && xt.setDataAttribute(n, u, p);
    }
    _resetElementAttributes(n, u) {
      this._applyManipulationCallback(n, (A) => {
        const D = xt.getDataAttribute(A, u);
        null !== D
          ? (xt.removeDataAttribute(A, u), A.style.setProperty(u, D))
          : A.style.removeProperty(u);
      });
    }
    _applyManipulationCallback(n, u) {
      if (P(n)) u(n);
      else for (const p of $.find(n, this._element)) u(p);
    }
  }
  const _t = ".bs.modal",
    Nt = `hide${_t}`,
    ye = `hidePrevented${_t}`,
    Ci = `hidden${_t}`,
    Si = `show${_t}`,
    Ni = `shown${_t}`,
    ie = `resize${_t}`,
    Mn = `click.dismiss${_t}`,
    Qt = `mousedown.dismiss${_t}`,
    wi = `keydown.dismiss${_t}`,
    qe = `click${_t}.data-api`,
    Fe = "modal-open",
    Pn = "modal-static",
    jn = { backdrop: !0, focus: !0, keyboard: !0 },
    Di = {
      backdrop: "(boolean|string)",
      focus: "boolean",
      keyboard: "boolean",
    };
  class l extends lt {
    constructor(n, u) {
      super(n, u),
        (this._dialog = $.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        (this._isShown = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new St()),
        this._addEventListeners();
    }
    static get Default() {
      return jn;
    }
    static get DefaultType() {
      return Di;
    }
    static get NAME() {
      return "modal";
    }
    toggle(n) {
      return this._isShown ? this.hide() : this.show(n);
    }
    show(n) {
      this._isShown ||
        this._isTransitioning ||
        C.trigger(this._element, Si, { relatedTarget: n }).defaultPrevented ||
        ((this._isShown = !0),
        (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add(Fe),
        this._adjustDialog(),
        this._backdrop.show(() => this._showElement(n)));
    }
    hide() {
      !this._isShown ||
        this._isTransitioning ||
        C.trigger(this._element, Nt).defaultPrevented ||
        ((this._isShown = !1),
        (this._isTransitioning = !0),
        this._focustrap.deactivate(),
        this._element.classList.remove("show"),
        this._queueCallback(
          () => this._hideModal(),
          this._element,
          this._isAnimated()
        ));
    }
    dispose() {
      C.off(window, _t),
        C.off(this._dialog, _t),
        this._backdrop.dispose(),
        this._focustrap.deactivate(),
        super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new At({
        isVisible: !!this._config.backdrop,
        isAnimated: this._isAnimated(),
      });
    }
    _initializeFocusTrap() {
      return new Bt({ trapElement: this._element });
    }
    _showElement(n) {
      document.body.contains(this._element) ||
        document.body.append(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0);
      const u = $.findOne(".modal-body", this._dialog);
      u && (u.scrollTop = 0),
        this._element.classList.add("show"),
        this._queueCallback(
          () => {
            this._config.focus && this._focustrap.activate(),
              (this._isTransitioning = !1),
              C.trigger(this._element, Ni, { relatedTarget: n });
          },
          this._dialog,
          this._isAnimated()
        );
    }
    _addEventListeners() {
      C.on(this._element, wi, (n) => {
        if ("Escape" === n.key) {
          if (this._config.keyboard) return void this.hide();
          this._triggerBackdropTransition();
        }
      }),
        C.on(window, ie, () => {
          this._isShown && !this._isTransitioning && this._adjustDialog();
        }),
        C.on(this._element, Qt, (n) => {
          C.one(this._element, Mn, (u) => {
            if (this._element === n.target && this._element === u.target) {
              if ("static" === this._config.backdrop)
                return void this._triggerBackdropTransition();
              this._config.backdrop && this.hide();
            }
          });
        });
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove(Fe),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            C.trigger(this._element, Ci);
        });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (C.trigger(this._element, ye).defaultPrevented) return;
      const u =
          this._element.scrollHeight > document.documentElement.clientHeight,
        p = this._element.style.overflowY;
      "hidden" === p ||
        this._element.classList.contains(Pn) ||
        (u || (this._element.style.overflowY = "hidden"),
        this._element.classList.add(Pn),
        this._queueCallback(() => {
          this._element.classList.remove(Pn),
            this._queueCallback(() => {
              this._element.style.overflowY = p;
            }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const n =
          this._element.scrollHeight > document.documentElement.clientHeight,
        u = this._scrollBar.getWidth(),
        p = u > 0;
      if (p && !n) {
        const A = ut() ? "paddingLeft" : "paddingRight";
        this._element.style[A] = `${u}px`;
      }
      if (!p && n) {
        const A = ut() ? "paddingRight" : "paddingLeft";
        this._element.style[A] = `${u}px`;
      }
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(n, u) {
      return this.each(function () {
        const p = l.getOrCreateInstance(this, n);
        if ("string" == typeof n) {
          if (typeof p[n] > "u") throw new TypeError(`No method named "${n}"`);
          p[n](u);
        }
      });
    }
  }
  C.on(document, qe, '[data-bs-toggle="modal"]', function (d) {
    const n = $.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && d.preventDefault(),
      C.one(n, Si, (A) => {
        A.defaultPrevented ||
          C.one(n, Ci, () => {
            vt(this) && this.focus();
          });
      });
    const u = $.findOne(".modal.show");
    u && l.getInstance(u).hide(), l.getOrCreateInstance(n).toggle(this);
  }),
    Xe(l),
    Y(l);
  const y = ".bs.offcanvas",
    b = ".data-api",
    w = `load${y}${b}`,
    L = "show",
    x = "showing",
    F = "hiding",
    W = ".offcanvas.show",
    B = `show${y}`,
    k = `shown${y}`,
    J = `hide${y}`,
    ot = `hidePrevented${y}`,
    it = `hidden${y}`,
    mt = `resize${y}`,
    Pt = `click${y}${b}`,
    ve = `keydown.dismiss${y}`,
    $r = { backdrop: !0, keyboard: !0, scroll: !1 },
    kr = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      scroll: "boolean",
    };
  class re extends lt {
    constructor(n, u) {
      super(n, u),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        this._addEventListeners();
    }
    static get Default() {
      return $r;
    }
    static get DefaultType() {
      return kr;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(n) {
      return this._isShown ? this.hide() : this.show(n);
    }
    show(n) {
      this._isShown ||
        C.trigger(this._element, B, { relatedTarget: n }).defaultPrevented ||
        ((this._isShown = !0),
        this._backdrop.show(),
        this._config.scroll || new St().hide(),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add(x),
        this._queueCallback(
          () => {
            (!this._config.scroll || this._config.backdrop) &&
              this._focustrap.activate(),
              this._element.classList.add(L),
              this._element.classList.remove(x),
              C.trigger(this._element, k, { relatedTarget: n });
          },
          this._element,
          !0
        ));
    }
    hide() {
      this._isShown &&
        !C.trigger(this._element, J).defaultPrevented &&
        (this._focustrap.deactivate(),
        this._element.blur(),
        (this._isShown = !1),
        this._element.classList.add(F),
        this._backdrop.hide(),
        this._queueCallback(
          () => {
            this._element.classList.remove(L, F),
              this._element.removeAttribute("aria-modal"),
              this._element.removeAttribute("role"),
              this._config.scroll || new St().reset(),
              C.trigger(this._element, it);
          },
          this._element,
          !0
        ));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const u = !!this._config.backdrop;
      return new At({
        className: "offcanvas-backdrop",
        isVisible: u,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: u
          ? () => {
              "static" !== this._config.backdrop
                ? this.hide()
                : C.trigger(this._element, ot);
            }
          : null,
      });
    }
    _initializeFocusTrap() {
      return new Bt({ trapElement: this._element });
    }
    _addEventListeners() {
      C.on(this._element, ve, (n) => {
        if ("Escape" === n.key) {
          if (this._config.keyboard) return void this.hide();
          C.trigger(this._element, ot);
        }
      });
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = re.getOrCreateInstance(this, n);
        if ("string" == typeof n) {
          if (void 0 === u[n] || n.startsWith("_") || "constructor" === n)
            throw new TypeError(`No method named "${n}"`);
          u[n](this);
        }
      });
    }
  }
  C.on(document, Pt, '[data-bs-toggle="offcanvas"]', function (d) {
    const n = $.getElementFromSelector(this);
    if ((["A", "AREA"].includes(this.tagName) && d.preventDefault(), M(this)))
      return;
    C.one(n, it, () => {
      vt(this) && this.focus();
    });
    const u = $.findOne(W);
    u && u !== n && re.getInstance(u).hide(),
      re.getOrCreateInstance(n).toggle(this);
  }),
    C.on(window, w, () => {
      for (const d of $.find(W)) re.getOrCreateInstance(d).show();
    }),
    C.on(window, mt, () => {
      for (const d of $.find("[aria-modal][class*=show][class*=offcanvas-]"))
        "fixed" !== getComputedStyle(d).position &&
          re.getOrCreateInstance(d).hide();
    }),
    Xe(re),
    Y(re);
  const br = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    Mr = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    Pr = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
    Rr = (d, n) => {
      const u = d.nodeName.toLowerCase();
      return n.includes(u)
        ? !Mr.has(u) || !!Pr.test(d.nodeValue)
        : n.filter((p) => p instanceof RegExp).some((p) => p.test(u));
    },
    Vr = {
      allowList: br,
      content: {},
      extraClass: "",
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: "<div></div>",
    },
    Wr = {
      allowList: "object",
      content: "object",
      extraClass: "(string|function)",
      html: "boolean",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      template: "string",
    },
    qr = {
      entry: "(string|element|function|null)",
      selector: "(string|element)",
    };
  class Fr extends Ne {
    constructor(n) {
      super(), (this._config = this._getConfig(n));
    }
    static get Default() {
      return Vr;
    }
    static get DefaultType() {
      return Wr;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content)
        .map((n) => this._resolvePossibleFunction(n))
        .filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(n) {
      return (
        this._checkContent(n),
        (this._config.content = { ...this._config.content, ...n }),
        this
      );
    }
    toHtml() {
      const n = document.createElement("div");
      n.innerHTML = this._maybeSanitize(this._config.template);
      for (const [A, D] of Object.entries(this._config.content))
        this._setContent(n, D, A);
      const u = n.children[0],
        p = this._resolvePossibleFunction(this._config.extraClass);
      return p && u.classList.add(...p.split(" ")), u;
    }
    _typeCheckConfig(n) {
      super._typeCheckConfig(n), this._checkContent(n.content);
    }
    _checkContent(n) {
      for (const [u, p] of Object.entries(n))
        super._typeCheckConfig({ selector: u, entry: p }, qr);
    }
    _setContent(n, u, p) {
      const A = $.findOne(p, n);
      if (A) {
        if (!(u = this._resolvePossibleFunction(u))) return void A.remove();
        if (P(u)) return void this._putElementInTemplate(H(u), A);
        if (this._config.html)
          return void (A.innerHTML = this._maybeSanitize(u));
        A.textContent = u;
      }
    }
    _maybeSanitize(n) {
      return this._config.sanitize
        ? (function Hr(d, n, u) {
            if (!d.length) return d;
            if (u && "function" == typeof u) return u(d);
            const A = new window.DOMParser().parseFromString(d, "text/html"),
              D = [].concat(...A.body.querySelectorAll("*"));
            for (const N of D) {
              const K = N.nodeName.toLowerCase();
              if (!Object.keys(n).includes(K)) {
                N.remove();
                continue;
              }
              const Et = [].concat(...N.attributes),
                Rt = [].concat(n["*"] || [], n[K] || []);
              for (const rt of Et) Rr(rt, Rt) || N.removeAttribute(rt.nodeName);
            }
            return A.body.innerHTML;
          })(n, this._config.allowList, this._config.sanitizeFn)
        : n;
    }
    _resolvePossibleFunction(n) {
      return ct(n, [this]);
    }
    _putElementInTemplate(n, u) {
      if (this._config.html) return (u.innerHTML = ""), void u.append(n);
      u.textContent = n.textContent;
    }
  }
  const Kr = new Set(["sanitize", "allowList", "sanitizeFn"]),
    fr = "fade",
    xi = "show",
    Ar = "hide.bs.modal",
    Vn = "hover",
    dr = "focus",
    os = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: ut() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: ut() ? "right" : "left",
    },
    as = {
      allowList: br,
      animation: !0,
      boundary: "clippingParents",
      container: !1,
      customClass: "",
      delay: 0,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      html: !1,
      offset: [0, 6],
      placement: "top",
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: "",
      trigger: "hover focus",
    },
    us = {
      allowList: "object",
      animation: "boolean",
      boundary: "(string|element)",
      container: "(string|element|boolean)",
      customClass: "(string|function)",
      delay: "(number|object)",
      fallbackPlacements: "array",
      html: "boolean",
      offset: "(array|string|function)",
      placement: "(string|function)",
      popperConfig: "(null|object|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      selector: "(string|boolean)",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
    };
  class Be extends lt {
    constructor(n, u) {
      if (typeof tt > "u")
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(n, u),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._isHovered = null),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._templateFactory = null),
        (this._newContent = null),
        (this.tip = null),
        this._setListeners(),
        this._config.selector || this._fixTitle();
    }
    static get Default() {
      return as;
    }
    static get DefaultType() {
      return us;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (this._isEnabled) {
        if (
          ((this._activeTrigger.click = !this._activeTrigger.click),
          this._isShown())
        )
          return void this._leave();
        this._enter();
      }
    }
    dispose() {
      clearTimeout(this._timeout),
        C.off(this._element.closest(".modal"), Ar, this._hideModalHandler),
        this._element.getAttribute("data-bs-original-title") &&
          this._element.setAttribute(
            "title",
            this._element.getAttribute("data-bs-original-title")
          ),
        this._disposePopper(),
        super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const n = C.trigger(this._element, this.constructor.eventName("show")),
        p = (
          Un(this._element) || this._element.ownerDocument.documentElement
        ).contains(this._element);
      if (n.defaultPrevented || !p) return;
      this._disposePopper();
      const A = this._getTipElement();
      this._element.setAttribute("aria-describedby", A.getAttribute("id"));
      const { container: D } = this._config;
      if (
        (this._element.ownerDocument.documentElement.contains(this.tip) ||
          (D.append(A),
          C.trigger(this._element, this.constructor.eventName("inserted"))),
        (this._popper = this._createPopper(A)),
        A.classList.add(xi),
        "ontouchstart" in document.documentElement)
      )
        for (const K of [].concat(...document.body.children))
          C.on(K, "mouseover", Ce);
      this._queueCallback(
        () => {
          C.trigger(this._element, this.constructor.eventName("shown")),
            !1 === this._isHovered && this._leave(),
            (this._isHovered = !1);
        },
        this.tip,
        this._isAnimated()
      );
    }
    hide() {
      if (
        this._isShown() &&
        !C.trigger(this._element, this.constructor.eventName("hide"))
          .defaultPrevented
      ) {
        if (
          (this._getTipElement().classList.remove(xi),
          "ontouchstart" in document.documentElement)
        )
          for (const A of [].concat(...document.body.children))
            C.off(A, "mouseover", Ce);
        (this._activeTrigger.click = !1),
          (this._activeTrigger[dr] = !1),
          (this._activeTrigger[Vn] = !1),
          (this._isHovered = null),
          this._queueCallback(
            () => {
              this._isWithActiveTrigger() ||
                (this._isHovered || this._disposePopper(),
                this._element.removeAttribute("aria-describedby"),
                C.trigger(this._element, this.constructor.eventName("hidden")));
            },
            this.tip,
            this._isAnimated()
          );
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return !!this._getTitle();
    }
    _getTipElement() {
      return (
        this.tip ||
          (this.tip = this._createTipElement(
            this._newContent || this._getContentForTemplate()
          )),
        this.tip
      );
    }
    _createTipElement(n) {
      const u = this._getTemplateFactory(n).toHtml();
      if (!u) return null;
      u.classList.remove(fr, xi),
        u.classList.add(`bs-${this.constructor.NAME}-auto`);
      const p = ((d) => {
        do {
          d += Math.floor(1e6 * Math.random());
        } while (document.getElementById(d));
        return d;
      })(this.constructor.NAME).toString();
      return (
        u.setAttribute("id", p), this._isAnimated() && u.classList.add(fr), u
      );
    }
    setContent(n) {
      (this._newContent = n),
        this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(n) {
      return (
        this._templateFactory
          ? this._templateFactory.changeContent(n)
          : (this._templateFactory = new Fr({
              ...this._config,
              content: n,
              extraClass: this._resolvePossibleFunction(
                this._config.customClass
              ),
            })),
        this._templateFactory
      );
    }
    _getContentForTemplate() {
      return { ".tooltip-inner": this._getTitle() };
    }
    _getTitle() {
      return (
        this._resolvePossibleFunction(this._config.title) ||
        this._element.getAttribute("data-bs-original-title")
      );
    }
    _initializeOnDelegatedTarget(n) {
      return this.constructor.getOrCreateInstance(
        n.delegateTarget,
        this._getDelegateConfig()
      );
    }
    _isAnimated() {
      return (
        this._config.animation || (this.tip && this.tip.classList.contains(fr))
      );
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(xi);
    }
    _createPopper(n) {
      const u = ct(this._config.placement, [this, n, this._element]),
        p = os[u.toUpperCase()];
      return tt.createPopper(this._element, n, this._getPopperConfig(p));
    }
    _getOffset() {
      const { offset: n } = this._config;
      return "string" == typeof n
        ? n.split(",").map((u) => Number.parseInt(u, 10))
        : "function" == typeof n
        ? (u) => n(u, this._element)
        : n;
    }
    _resolvePossibleFunction(n) {
      return ct(n, [this._element]);
    }
    _getPopperConfig(n) {
      const u = {
        placement: n,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "preSetPlacement",
            enabled: !0,
            phase: "beforeMain",
            fn: (p) => {
              this._getTipElement().setAttribute(
                "data-popper-placement",
                p.state.placement
              );
            },
          },
        ],
      };
      return { ...u, ...ct(this._config.popperConfig, [u]) };
    }
    _setListeners() {
      const n = this._config.trigger.split(" ");
      for (const u of n)
        if ("click" === u)
          C.on(
            this._element,
            this.constructor.eventName("click"),
            this._config.selector,
            (p) => {
              this._initializeOnDelegatedTarget(p).toggle();
            }
          );
        else if ("manual" !== u) {
          const p = this.constructor.eventName(
              u === Vn ? "mouseenter" : "focusin"
            ),
            A = this.constructor.eventName(
              u === Vn ? "mouseleave" : "focusout"
            );
          C.on(this._element, p, this._config.selector, (D) => {
            const N = this._initializeOnDelegatedTarget(D);
            (N._activeTrigger["focusin" === D.type ? dr : Vn] = !0), N._enter();
          }),
            C.on(this._element, A, this._config.selector, (D) => {
              const N = this._initializeOnDelegatedTarget(D);
              (N._activeTrigger["focusout" === D.type ? dr : Vn] =
                N._element.contains(D.relatedTarget)),
                N._leave();
            });
        }
      (this._hideModalHandler = () => {
        this._element && this.hide();
      }),
        C.on(this._element.closest(".modal"), Ar, this._hideModalHandler);
    }
    _fixTitle() {
      const n = this._element.getAttribute("title");
      n &&
        (!this._element.getAttribute("aria-label") &&
          !this._element.textContent.trim() &&
          this._element.setAttribute("aria-label", n),
        this._element.setAttribute("data-bs-original-title", n),
        this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered
        ? (this._isHovered = !0)
        : ((this._isHovered = !0),
          this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() ||
        ((this._isHovered = !1),
        this._setTimeout(() => {
          this._isHovered || this.hide();
        }, this._config.delay.hide));
    }
    _setTimeout(n, u) {
      clearTimeout(this._timeout), (this._timeout = setTimeout(n, u));
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0);
    }
    _getConfig(n) {
      const u = xt.getDataAttributes(this._element);
      for (const p of Object.keys(u)) Kr.has(p) && delete u[p];
      return (
        (n = { ...u, ...("object" == typeof n && n ? n : {}) }),
        (n = this._mergeConfigObj(n)),
        (n = this._configAfterMerge(n)),
        this._typeCheckConfig(n),
        n
      );
    }
    _configAfterMerge(n) {
      return (
        (n.container = !1 === n.container ? document.body : H(n.container)),
        "number" == typeof n.delay &&
          (n.delay = { show: n.delay, hide: n.delay }),
        "number" == typeof n.title && (n.title = n.title.toString()),
        "number" == typeof n.content && (n.content = n.content.toString()),
        n
      );
    }
    _getDelegateConfig() {
      const n = {};
      for (const [u, p] of Object.entries(this._config))
        this.constructor.Default[u] !== p && (n[u] = p);
      return (n.selector = !1), (n.trigger = "manual"), n;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), (this._popper = null)),
        this.tip && (this.tip.remove(), (this.tip = null));
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = Be.getOrCreateInstance(this, n);
        if ("string" == typeof n) {
          if (typeof u[n] > "u") throw new TypeError(`No method named "${n}"`);
          u[n]();
        }
      });
    }
  }
  Y(Be);
  const ds = {
      ...Be.Default,
      content: "",
      offset: [0, 8],
      placement: "right",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: "click",
    },
    hs = { ...Be.DefaultType, content: "(null|string|element|function)" };
  class Oi extends Be {
    static get Default() {
      return ds;
    }
    static get DefaultType() {
      return hs;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return {
        ".popover-header": this._getTitle(),
        ".popover-body": this._getContent(),
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = Oi.getOrCreateInstance(this, n);
        if ("string" == typeof n) {
          if (typeof u[n] > "u") throw new TypeError(`No method named "${n}"`);
          u[n]();
        }
      });
    }
  }
  Y(Oi);
  const hr = ".bs.scrollspy",
    _s = `activate${hr}`,
    Cr = `click${hr}`,
    ms = `load${hr}.data-api`,
    un = "active",
    pr = "[href]",
    Sr = ".nav-link",
    bs = `${Sr}, .nav-item > ${Sr}, .list-group-item`,
    Cs = {
      offset: null,
      rootMargin: "0px 0px -25%",
      smoothScroll: !1,
      target: null,
      threshold: [0.1, 0.5, 1],
    },
    Ss = {
      offset: "(number|null)",
      rootMargin: "string",
      smoothScroll: "boolean",
      target: "element",
      threshold: "array",
    };
  class Wn extends lt {
    constructor(n, u) {
      super(n, u),
        (this._targetLinks = new Map()),
        (this._observableSections = new Map()),
        (this._rootElement =
          "visible" === getComputedStyle(this._element).overflowY
            ? null
            : this._element),
        (this._activeTarget = null),
        (this._observer = null),
        (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
        this.refresh();
    }
    static get Default() {
      return Cs;
    }
    static get DefaultType() {
      return Ss;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(),
        this._maybeEnableSmoothScroll(),
        this._observer
          ? this._observer.disconnect()
          : (this._observer = this._getNewObserver());
      for (const n of this._observableSections.values())
        this._observer.observe(n);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(n) {
      return (
        (n.target = H(n.target) || document.body),
        (n.rootMargin = n.offset ? `${n.offset}px 0px -30%` : n.rootMargin),
        "string" == typeof n.threshold &&
          (n.threshold = n.threshold
            .split(",")
            .map((u) => Number.parseFloat(u))),
        n
      );
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll &&
        (C.off(this._config.target, Cr),
        C.on(this._config.target, Cr, pr, (n) => {
          const u = this._observableSections.get(n.target.hash);
          if (u) {
            n.preventDefault();
            const p = this._rootElement || window,
              A = u.offsetTop - this._element.offsetTop;
            if (p.scrollTo)
              return void p.scrollTo({ top: A, behavior: "smooth" });
            p.scrollTop = A;
          }
        }));
    }
    _getNewObserver() {
      return new IntersectionObserver((u) => this._observerCallback(u), {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin,
      });
    }
    _observerCallback(n) {
      const u = (N) => this._targetLinks.get(`#${N.target.id}`),
        p = (N) => {
          (this._previousScrollData.visibleEntryTop = N.target.offsetTop),
            this._process(u(N));
        },
        A = (this._rootElement || document.documentElement).scrollTop,
        D = A >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = A;
      for (const N of n) {
        if (!N.isIntersecting) {
          (this._activeTarget = null), this._clearActiveClass(u(N));
          continue;
        }
        const K =
          N.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (D && K) {
          if ((p(N), !A)) return;
        } else !D && !K && p(N);
      }
    }
    _initializeTargetsAndObservables() {
      (this._targetLinks = new Map()), (this._observableSections = new Map());
      const n = $.find(pr, this._config.target);
      for (const u of n) {
        if (!u.hash || M(u)) continue;
        const p = $.findOne(decodeURI(u.hash), this._element);
        vt(p) &&
          (this._targetLinks.set(decodeURI(u.hash), u),
          this._observableSections.set(u.hash, p));
      }
    }
    _process(n) {
      this._activeTarget !== n &&
        (this._clearActiveClass(this._config.target),
        (this._activeTarget = n),
        n.classList.add(un),
        this._activateParents(n),
        C.trigger(this._element, _s, { relatedTarget: n }));
    }
    _activateParents(n) {
      if (n.classList.contains("dropdown-item"))
        $.findOne(".dropdown-toggle", n.closest(".dropdown")).classList.add(un);
      else
        for (const u of $.parents(n, ".nav, .list-group"))
          for (const p of $.prev(u, bs)) p.classList.add(un);
    }
    _clearActiveClass(n) {
      n.classList.remove(un);
      const u = $.find(`${pr}.${un}`, n);
      for (const p of u) p.classList.remove(un);
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = Wn.getOrCreateInstance(this, n);
        if ("string" == typeof n) {
          if (void 0 === u[n] || n.startsWith("_") || "constructor" === n)
            throw new TypeError(`No method named "${n}"`);
          u[n]();
        }
      });
    }
  }
  C.on(window, ms, () => {
    for (const d of $.find('[data-bs-spy="scroll"]')) Wn.getOrCreateInstance(d);
  }),
    Y(Wn);
  const Ke = ".bs.tab",
    ws = `hide${Ke}`,
    Ds = `hidden${Ke}`,
    xs = `show${Ke}`,
    Os = `shown${Ke}`,
    Ls = `click${Ke}`,
    Is = `keydown${Ke}`,
    $s = `load${Ke}`,
    ks = "ArrowLeft",
    Nr = "ArrowRight",
    Ms = "ArrowUp",
    wr = "ArrowDown",
    gr = "Home",
    Dr = "End",
    Ye = "active",
    _r = "show",
    Or = ".dropdown-toggle",
    mr = `:not(${Or})`,
    Lr =
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    Er = `.nav-link${mr}, .list-group-item${mr}, [role="tab"]${mr}, ${Lr}`,
    Ws = `.${Ye}[data-bs-toggle="tab"], .${Ye}[data-bs-toggle="pill"], .${Ye}[data-bs-toggle="list"]`;
  class Ue extends lt {
    constructor(n) {
      super(n),
        (this._parent = this._element.closest(
          '.list-group, .nav, [role="tablist"]'
        )),
        this._parent &&
          (this._setInitialAttributes(this._parent, this._getChildren()),
          C.on(this._element, Is, (u) => this._keydown(u)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const n = this._element;
      if (this._elemIsActive(n)) return;
      const u = this._getActiveElem(),
        p = u ? C.trigger(u, ws, { relatedTarget: n }) : null;
      C.trigger(n, xs, { relatedTarget: u }).defaultPrevented ||
        (p && p.defaultPrevented) ||
        (this._deactivate(u, n), this._activate(n, u));
    }
    _activate(n, u) {
      n &&
        (n.classList.add(Ye),
        this._activate($.getElementFromSelector(n)),
        this._queueCallback(
          () => {
            "tab" === n.getAttribute("role")
              ? (n.removeAttribute("tabindex"),
                n.setAttribute("aria-selected", !0),
                this._toggleDropDown(n, !0),
                C.trigger(n, Os, { relatedTarget: u }))
              : n.classList.add(_r);
          },
          n,
          n.classList.contains("fade")
        ));
    }
    _deactivate(n, u) {
      n &&
        (n.classList.remove(Ye),
        n.blur(),
        this._deactivate($.getElementFromSelector(n)),
        this._queueCallback(
          () => {
            "tab" === n.getAttribute("role")
              ? (n.setAttribute("aria-selected", !1),
                n.setAttribute("tabindex", "-1"),
                this._toggleDropDown(n, !1),
                C.trigger(n, Ds, { relatedTarget: u }))
              : n.classList.remove(_r);
          },
          n,
          n.classList.contains("fade")
        ));
    }
    _keydown(n) {
      if (![ks, Nr, Ms, wr, gr, Dr].includes(n.key)) return;
      n.stopPropagation(), n.preventDefault();
      const u = this._getChildren().filter((A) => !M(A));
      let p;
      if ([gr, Dr].includes(n.key)) p = u[n.key === gr ? 0 : u.length - 1];
      else {
        const A = [Nr, wr].includes(n.key);
        p = dn(u, n.target, A, !0);
      }
      p && (p.focus({ preventScroll: !0 }), Ue.getOrCreateInstance(p).show());
    }
    _getChildren() {
      return $.find(Er, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((n) => this._elemIsActive(n)) || null;
    }
    _setInitialAttributes(n, u) {
      this._setAttributeIfNotExists(n, "role", "tablist");
      for (const p of u) this._setInitialAttributesOnChild(p);
    }
    _setInitialAttributesOnChild(n) {
      n = this._getInnerElement(n);
      const u = this._elemIsActive(n),
        p = this._getOuterElement(n);
      n.setAttribute("aria-selected", u),
        p !== n && this._setAttributeIfNotExists(p, "role", "presentation"),
        u || n.setAttribute("tabindex", "-1"),
        this._setAttributeIfNotExists(n, "role", "tab"),
        this._setInitialAttributesOnTargetPanel(n);
    }
    _setInitialAttributesOnTargetPanel(n) {
      const u = $.getElementFromSelector(n);
      u &&
        (this._setAttributeIfNotExists(u, "role", "tabpanel"),
        n.id && this._setAttributeIfNotExists(u, "aria-labelledby", `${n.id}`));
    }
    _toggleDropDown(n, u) {
      const p = this._getOuterElement(n);
      if (!p.classList.contains("dropdown")) return;
      const A = (D, N) => {
        const K = $.findOne(D, p);
        K && K.classList.toggle(N, u);
      };
      A(Or, Ye), A(".dropdown-menu", _r), p.setAttribute("aria-expanded", u);
    }
    _setAttributeIfNotExists(n, u, p) {
      n.hasAttribute(u) || n.setAttribute(u, p);
    }
    _elemIsActive(n) {
      return n.classList.contains(Ye);
    }
    _getInnerElement(n) {
      return n.matches(Er) ? n : $.findOne(Er, n);
    }
    _getOuterElement(n) {
      return n.closest(".nav-item, .list-group-item") || n;
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = Ue.getOrCreateInstance(this);
        if ("string" == typeof n) {
          if (void 0 === u[n] || n.startsWith("_") || "constructor" === n)
            throw new TypeError(`No method named "${n}"`);
          u[n]();
        }
      });
    }
  }
  C.on(document, Ls, Lr, function (d) {
    ["A", "AREA"].includes(this.tagName) && d.preventDefault(),
      !M(this) && Ue.getOrCreateInstance(this).show();
  }),
    C.on(window, $s, () => {
      for (const d of $.find(Ws)) Ue.getOrCreateInstance(d);
    }),
    Y(Ue);
  const be = ".bs.toast",
    Fs = `mouseover${be}`,
    Bs = `mouseout${be}`,
    Ks = `focusin${be}`,
    Ys = `focusout${be}`,
    Us = `hide${be}`,
    zs = `hidden${be}`,
    Gs = `show${be}`,
    Xs = `shown${be}`,
    Li = "show",
    Ii = "showing",
    Js = { animation: "boolean", autohide: "boolean", delay: "number" },
    Zs = { animation: !0, autohide: !0, delay: 5e3 };
  class qn extends lt {
    constructor(n, u) {
      super(n, u),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get Default() {
      return Zs;
    }
    static get DefaultType() {
      return Js;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      C.trigger(this._element, Gs).defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade"),
        this._element.classList.remove("hide"),
        this._element.classList.add(Li, Ii),
        this._queueCallback(
          () => {
            this._element.classList.remove(Ii),
              C.trigger(this._element, Xs),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation
        ));
    }
    hide() {
      this.isShown() &&
        !C.trigger(this._element, Us).defaultPrevented &&
        (this._element.classList.add(Ii),
        this._queueCallback(
          () => {
            this._element.classList.add("hide"),
              this._element.classList.remove(Ii, Li),
              C.trigger(this._element, zs);
          },
          this._element,
          this._config.animation
        ));
    }
    dispose() {
      this._clearTimeout(),
        this.isShown() && this._element.classList.remove(Li),
        super.dispose();
    }
    isShown() {
      return this._element.classList.contains(Li);
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(n, u) {
      switch (n.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = u;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = u;
      }
      if (u) return void this._clearTimeout();
      const p = n.relatedTarget;
      this._element === p ||
        this._element.contains(p) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      C.on(this._element, Fs, (n) => this._onInteraction(n, !0)),
        C.on(this._element, Bs, (n) => this._onInteraction(n, !1)),
        C.on(this._element, Ks, (n) => this._onInteraction(n, !0)),
        C.on(this._element, Ys, (n) => this._onInteraction(n, !1));
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const u = qn.getOrCreateInstance(this, n);
        if ("string" == typeof n) {
          if (typeof u[n] > "u") throw new TypeError(`No method named "${n}"`);
          u[n](this);
        }
      });
    }
  }
  return (
    Xe(qn),
    Y(qn),
    {
      Alert: De,
      Button: Oe,
      Carousel: _e,
      Collapse: ne,
      Dropdown: m,
      Modal: l,
      Offcanvas: re,
      Popover: Oi,
      ScrollSpy: Wn,
      Tab: Ue,
      Toast: qn,
      Tooltip: Be,
    }
  );
}),
  (function (R, Ht) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = R.document
          ? Ht(R, !0)
          : function (tt) {
              if (!tt.document)
                throw new Error("jQuery requires a window with a document");
              return Ht(tt);
            })
      : Ht(R);
  })(typeof window < "u" ? window : this, function (R, Ht) {
    "use strict";
    var tt = [],
      jt = Object.getPrototypeOf,
      st = tt.slice,
      Fn = tt.flat
        ? function (t) {
            return tt.flat.call(t);
          }
        : function (t) {
            return tt.concat.apply([], t);
          },
      ze = tt.push,
      yt = tt.indexOf,
      Te = {},
      Bn = Te.toString,
      Ae = Te.hasOwnProperty,
      Kn = Ae.toString,
      Yn = Kn.call(Object),
      P = {},
      H = function (e) {
        return (
          "function" == typeof e &&
          "number" != typeof e.nodeType &&
          "function" != typeof e.item
        );
      },
      vt = function (e) {
        return null != e && e === e.window;
      },
      M = R.document,
      Un = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function Ce(t, e, i) {
      var r,
        o,
        a = (i = i || M).createElement("script");
      if (((a.text = t), e))
        for (r in Un)
          (o = e[r] || (e.getAttribute && e.getAttribute(r))) &&
            a.setAttribute(r, o);
      i.head.appendChild(a).parentNode.removeChild(a);
    }
    function wt(t) {
      return null == t
        ? t + ""
        : "object" == typeof t || "function" == typeof t
        ? Te[Bn.call(t)] || "object"
        : typeof t;
    }
    var fn = /HTML$/i,
      s = function (t, e) {
        return new s.fn.init(t, e);
      };
    function ut(t) {
      var e = !!t && "length" in t && t.length,
        i = wt(t);
      return (
        !H(t) &&
        !vt(t) &&
        ("array" === i ||
          0 === e ||
          ("number" == typeof e && e > 0 && e - 1 in t))
      );
    }
    function Y(t, e) {
      return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
    }
    (s.fn = s.prototype =
      {
        jquery: "3.7.1",
        constructor: s,
        length: 0,
        toArray: function () {
          return st.call(this);
        },
        get: function (t) {
          return null == t
            ? st.call(this)
            : t < 0
            ? this[t + this.length]
            : this[t];
        },
        pushStack: function (t) {
          var e = s.merge(this.constructor(), t);
          return (e.prevObject = this), e;
        },
        each: function (t) {
          return s.each(this, t);
        },
        map: function (t) {
          return this.pushStack(
            s.map(this, function (e, i) {
              return t.call(e, i, e);
            })
          );
        },
        slice: function () {
          return this.pushStack(st.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        even: function () {
          return this.pushStack(
            s.grep(this, function (t, e) {
              return (e + 1) % 2;
            })
          );
        },
        odd: function () {
          return this.pushStack(
            s.grep(this, function (t, e) {
              return e % 2;
            })
          );
        },
        eq: function (t) {
          var e = this.length,
            i = +t + (t < 0 ? e : 0);
          return this.pushStack(i >= 0 && i < e ? [this[i]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: ze,
        sort: tt.sort,
        splice: tt.splice,
      }),
      (s.extend = s.fn.extend =
        function () {
          var t,
            e,
            i,
            r,
            o,
            a,
            c = arguments[0] || {},
            h = 1,
            f = arguments.length,
            _ = !1;
          for (
            "boolean" == typeof c && ((_ = c), (c = arguments[h] || {}), h++),
              "object" != typeof c && !H(c) && (c = {}),
              h === f && ((c = this), h--);
            h < f;
            h++
          )
            if (null != (t = arguments[h]))
              for (e in t)
                (r = t[e]),
                  "__proto__" !== e &&
                    c !== r &&
                    (_ && r && (s.isPlainObject(r) || (o = Array.isArray(r)))
                      ? ((i = c[e]),
                        (a =
                          o && !Array.isArray(i)
                            ? []
                            : o || s.isPlainObject(i)
                            ? i
                            : {}),
                        (o = !1),
                        (c[e] = s.extend(_, a, r)))
                      : void 0 !== r && (c[e] = r));
          return c;
        }),
      s.extend({
        expando: "jQuery" + ("3.7.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (t) {
          throw new Error(t);
        },
        noop: function () {},
        isPlainObject: function (t) {
          var e, i;
          return !(
            !t ||
            "[object Object]" !== Bn.call(t) ||
            ((e = jt(t)) &&
              ("function" !=
                typeof (i = Ae.call(e, "constructor") && e.constructor) ||
                Kn.call(i) !== Yn))
          );
        },
        isEmptyObject: function (t) {
          var e;
          for (e in t) return !1;
          return !0;
        },
        globalEval: function (t, e, i) {
          Ce(t, { nonce: e && e.nonce }, i);
        },
        each: function (t, e) {
          var i,
            r = 0;
          if (ut(t))
            for (i = t.length; r < i && !1 !== e.call(t[r], r, t[r]); r++);
          else for (r in t) if (!1 === e.call(t[r], r, t[r])) break;
          return t;
        },
        text: function (t) {
          var e,
            i = "",
            r = 0,
            o = t.nodeType;
          if (!o) for (; (e = t[r++]); ) i += s.text(e);
          return 1 === o || 11 === o
            ? t.textContent
            : 9 === o
            ? t.documentElement.textContent
            : 3 === o || 4 === o
            ? t.nodeValue
            : i;
        },
        makeArray: function (t, e) {
          var i = e || [];
          return (
            null != t &&
              (ut(Object(t))
                ? s.merge(i, "string" == typeof t ? [t] : t)
                : ze.call(i, t)),
            i
          );
        },
        inArray: function (t, e, i) {
          return null == e ? -1 : yt.call(e, t, i);
        },
        isXMLDoc: function (t) {
          var i = t && (t.ownerDocument || t).documentElement;
          return !fn.test((t && t.namespaceURI) || (i && i.nodeName) || "HTML");
        },
        merge: function (t, e) {
          for (var i = +e.length, r = 0, o = t.length; r < i; r++)
            t[o++] = e[r];
          return (t.length = o), t;
        },
        grep: function (t, e, i) {
          for (var o = [], a = 0, c = t.length, h = !i; a < c; a++)
            !e(t[a], a) !== h && o.push(t[a]);
          return o;
        },
        map: function (t, e, i) {
          var r,
            o,
            a = 0,
            c = [];
          if (ut(t))
            for (r = t.length; a < r; a++)
              null != (o = e(t[a], a, i)) && c.push(o);
          else for (a in t) null != (o = e(t[a], a, i)) && c.push(o);
          return Fn(c);
        },
        guid: 1,
        support: P,
      }),
      "function" == typeof Symbol &&
        (s.fn[Symbol.iterator] = tt[Symbol.iterator]),
      s.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (t, e) {
          Te["[object " + e + "]"] = e.toLowerCase();
        }
      );
    var ct = tt.pop,
      zn = tt.sort,
      dn = tt.splice,
      Q = "[\\x20\\t\\r\\n\\f]",
      Se = new RegExp("^" + Q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Q + "+$", "g");
    s.contains = function (t, e) {
      var i = e && e.parentNode;
      return (
        t === i ||
        !(
          !i ||
          1 !== i.nodeType ||
          !(t.contains
            ? t.contains(i)
            : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i))
        )
      );
    };
    var ki = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function hn(t, e) {
      return e
        ? "\0" === t
          ? "\ufffd"
          : t.slice(0, -1) +
            "\\" +
            t.charCodeAt(t.length - 1).toString(16) +
            " "
        : "\\" + t;
    }
    s.escapeSelector = function (t) {
      return (t + "").replace(ki, hn);
    };
    var Dt = M,
      Ge = ze;
    !(function () {
      var t,
        e,
        i,
        r,
        o,
        c,
        h,
        f,
        _,
        v,
        a = Ge,
        T = s.expando,
        m = 0,
        S = 0,
        V = rn(),
        U = rn(),
        q = rn(),
        nt = rn(),
        et = function (l, g) {
          return l === g && (o = !0), 0;
        },
        At =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        It =
          "(?:\\\\[\\da-fA-F]{1,6}" +
          Q +
          "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        z =
          "\\[" +
          Q +
          "*(" +
          It +
          ")(?:" +
          Q +
          "*([*^$|!~]?=)" +
          Q +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          It +
          "))|)" +
          Q +
          "*\\]",
        $t =
          ":(" +
          It +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          z +
          ")*)|.*)\\)|)",
        G = new RegExp(Q + "+", "g"),
        Z = new RegExp("^" + Q + "*," + Q + "*"),
        Ve = new RegExp("^" + Q + "*([>+~]|" + Q + ")" + Q + "*"),
        kn = new RegExp(Q + "|>"),
        Ct = new RegExp($t),
        We = new RegExp("^" + It + "$"),
        kt = {
          ID: new RegExp("^#(" + It + ")"),
          CLASS: new RegExp("^\\.(" + It + ")"),
          TAG: new RegExp("^(" + It + "|[*])"),
          ATTR: new RegExp("^" + z),
          PSEUDO: new RegExp("^" + $t),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              Q +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              Q +
              "*(?:([+-]|)" +
              Q +
              "*(\\d+)|))" +
              Q +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + At + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              Q +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              Q +
              "*((?:-\\d)?\\d*)" +
              Q +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        Bt = /^(?:input|select|textarea|button)$/i,
        Kt = /^h\d$/i,
        pt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        Ee = /[+~]/,
        Mt = new RegExp(
          "\\\\[\\da-fA-F]{1,6}" + Q + "?|\\\\([^\\r\\n\\f])",
          "g"
        ),
        St = function (l, g) {
          var E = "0x" + l.slice(1) - 65536;
          return (
            g ||
            (E < 0
              ? String.fromCharCode(E + 65536)
              : String.fromCharCode((E >> 10) | 55296, (1023 & E) | 56320))
          );
        },
        cr = function () {
          Qt();
        },
        vr = sn(
          function (l) {
            return !0 === l.disabled && Y(l, "fieldset");
          },
          { dir: "parentNode", next: "legend" }
        );
      try {
        a.apply((tt = st.call(Dt.childNodes)), Dt.childNodes);
      } catch {
        a = {
          apply: function (g, E) {
            Ge.apply(g, st.call(E));
          },
          call: function (g) {
            Ge.apply(g, st.call(arguments, 1));
          },
        };
      }
      function X(l, g, E, y) {
        var b,
          w,
          O,
          L,
          x,
          F,
          j,
          W = g && g.ownerDocument,
          B = g ? g.nodeType : 9;
        if (
          ((E = E || []),
          "string" != typeof l || !l || (1 !== B && 9 !== B && 11 !== B))
        )
          return E;
        if (!y && (Qt(g), (g = g || c), f)) {
          if (11 !== B && (x = pt.exec(l)))
            if ((b = x[1])) {
              if (9 === B) {
                if (!(O = g.getElementById(b))) return E;
                if (O.id === b) return a.call(E, O), E;
              } else if (
                W &&
                (O = W.getElementById(b)) &&
                X.contains(g, O) &&
                O.id === b
              )
                return a.call(E, O), E;
            } else {
              if (x[2]) return a.apply(E, g.getElementsByTagName(l)), E;
              if ((b = x[3]) && g.getElementsByClassName)
                return a.apply(E, g.getElementsByClassName(b)), E;
            }
          if (!(nt[l + " "] || (_ && _.test(l)))) {
            if (((j = l), (W = g), 1 === B && (kn.test(l) || Ve.test(l)))) {
              for (
                ((W = (Ee.test(l) && Mn(g.parentNode)) || g) != g ||
                  !P.scope) &&
                  ((L = g.getAttribute("id"))
                    ? (L = s.escapeSelector(L))
                    : g.setAttribute("id", (L = T))),
                  w = (F = qe(l)).length;
                w--;

              )
                F[w] = (L ? "#" + L : ":scope") + " " + Fe(F[w]);
              j = F.join(",");
            }
            try {
              return a.apply(E, W.querySelectorAll(j)), E;
            } catch {
              nt(l, !0);
            } finally {
              L === T && g.removeAttribute("id");
            }
          }
        }
        return Di(l.replace(Se, "$1"), g, E, y);
      }
      function rn() {
        var l = [];
        return function g(E, y) {
          return (
            l.push(E + " ") > e.cacheLength && delete g[l.shift()],
            (g[E + " "] = y)
          );
        };
      }
      function Nt(l) {
        return (l[T] = !0), l;
      }
      function ye(l) {
        var g = c.createElement("fieldset");
        try {
          return !!l(g);
        } catch {
          return !1;
        } finally {
          g.parentNode && g.parentNode.removeChild(g), (g = null);
        }
      }
      function Ci(l) {
        return function (g) {
          return Y(g, "input") && g.type === l;
        };
      }
      function Si(l) {
        return function (g) {
          return (Y(g, "input") || Y(g, "button")) && g.type === l;
        };
      }
      function Ni(l) {
        return function (g) {
          return "form" in g
            ? g.parentNode && !1 === g.disabled
              ? "label" in g
                ? "label" in g.parentNode
                  ? g.parentNode.disabled === l
                  : g.disabled === l
                : g.isDisabled === l || (g.isDisabled !== !l && vr(g) === l)
              : g.disabled === l
            : "label" in g && g.disabled === l;
        };
      }
      function ie(l) {
        return Nt(function (g) {
          return (
            (g = +g),
            Nt(function (E, y) {
              for (var b, w = l([], E.length, g), O = w.length; O--; )
                E[(b = w[O])] && (E[b] = !(y[b] = E[b]));
            })
          );
        });
      }
      function Mn(l) {
        return l && typeof l.getElementsByTagName < "u" && l;
      }
      function Qt(l) {
        var g,
          E = l ? l.ownerDocument || l : Dt;
        return (
          E == c ||
            9 !== E.nodeType ||
            !E.documentElement ||
            ((h = (c = E).documentElement),
            (f = !s.isXMLDoc(c)),
            (v = h.matches || h.webkitMatchesSelector || h.msMatchesSelector),
            h.msMatchesSelector &&
              Dt != c &&
              (g = c.defaultView) &&
              g.top !== g &&
              g.addEventListener("unload", cr),
            (P.getById = ye(function (y) {
              return (
                (h.appendChild(y).id = s.expando),
                !c.getElementsByName || !c.getElementsByName(s.expando).length
              );
            })),
            (P.disconnectedMatch = ye(function (y) {
              return v.call(y, "*");
            })),
            (P.scope = ye(function () {
              return c.querySelectorAll(":scope");
            })),
            (P.cssHas = ye(function () {
              try {
                return c.querySelector(":has(*,:jqfake)"), !1;
              } catch {
                return !0;
              }
            })),
            P.getById
              ? ((e.filter.ID = function (y) {
                  var b = y.replace(Mt, St);
                  return function (w) {
                    return w.getAttribute("id") === b;
                  };
                }),
                (e.find.ID = function (y, b) {
                  if (typeof b.getElementById < "u" && f) {
                    var w = b.getElementById(y);
                    return w ? [w] : [];
                  }
                }))
              : ((e.filter.ID = function (y) {
                  var b = y.replace(Mt, St);
                  return function (w) {
                    var O =
                      typeof w.getAttributeNode < "u" &&
                      w.getAttributeNode("id");
                    return O && O.value === b;
                  };
                }),
                (e.find.ID = function (y, b) {
                  if (typeof b.getElementById < "u" && f) {
                    var w,
                      O,
                      L,
                      x = b.getElementById(y);
                    if (x) {
                      if ((w = x.getAttributeNode("id")) && w.value === y)
                        return [x];
                      for (L = b.getElementsByName(y), O = 0; (x = L[O++]); )
                        if ((w = x.getAttributeNode("id")) && w.value === y)
                          return [x];
                    }
                    return [];
                  }
                })),
            (e.find.TAG = function (y, b) {
              return typeof b.getElementsByTagName < "u"
                ? b.getElementsByTagName(y)
                : b.querySelectorAll(y);
            }),
            (e.find.CLASS = function (y, b) {
              if (typeof b.getElementsByClassName < "u" && f)
                return b.getElementsByClassName(y);
            }),
            (_ = []),
            ye(function (y) {
              var b;
              (h.appendChild(y).innerHTML =
                "<a id='" +
                T +
                "' href='' disabled='disabled'></a><select id='" +
                T +
                "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                y.querySelectorAll("[selected]").length ||
                  _.push("\\[" + Q + "*(?:value|" + At + ")"),
                y.querySelectorAll("[id~=" + T + "-]").length || _.push("~="),
                y.querySelectorAll("a#" + T + "+*").length ||
                  _.push(".#.+[+~]"),
                y.querySelectorAll(":checked").length || _.push(":checked"),
                (b = c.createElement("input")).setAttribute("type", "hidden"),
                y.appendChild(b).setAttribute("name", "D"),
                (h.appendChild(y).disabled = !0),
                2 !== y.querySelectorAll(":disabled").length &&
                  _.push(":enabled", ":disabled"),
                (b = c.createElement("input")).setAttribute("name", ""),
                y.appendChild(b),
                y.querySelectorAll("[name='']").length ||
                  _.push("\\[" + Q + "*name" + Q + "*=" + Q + "*(?:''|\"\")");
            }),
            P.cssHas || _.push(":has"),
            (_ = _.length && new RegExp(_.join("|"))),
            (et = function (y, b) {
              if (y === b) return (o = !0), 0;
              var w = !y.compareDocumentPosition - !b.compareDocumentPosition;
              return (
                w ||
                (1 &
                  (w =
                    (y.ownerDocument || y) == (b.ownerDocument || b)
                      ? y.compareDocumentPosition(b)
                      : 1) ||
                (!P.sortDetached && b.compareDocumentPosition(y) === w)
                  ? y === c || (y.ownerDocument == Dt && X.contains(Dt, y))
                    ? -1
                    : b === c || (b.ownerDocument == Dt && X.contains(Dt, b))
                    ? 1
                    : r
                    ? yt.call(r, y) - yt.call(r, b)
                    : 0
                  : 4 & w
                  ? -1
                  : 1)
              );
            })),
          c
        );
      }
      for (t in ((X.matches = function (l, g) {
        return X(l, null, null, g);
      }),
      (X.matchesSelector = function (l, g) {
        if ((Qt(l), f && !nt[g + " "] && (!_ || !_.test(g))))
          try {
            var E = v.call(l, g);
            if (
              E ||
              P.disconnectedMatch ||
              (l.document && 11 !== l.document.nodeType)
            )
              return E;
          } catch {
            nt(g, !0);
          }
        return X(g, c, null, [l]).length > 0;
      }),
      (X.contains = function (l, g) {
        return (l.ownerDocument || l) != c && Qt(l), s.contains(l, g);
      }),
      (X.attr = function (l, g) {
        (l.ownerDocument || l) != c && Qt(l);
        var E = e.attrHandle[g.toLowerCase()],
          y =
            E && Ae.call(e.attrHandle, g.toLowerCase()) ? E(l, g, !f) : void 0;
        return void 0 !== y ? y : l.getAttribute(g);
      }),
      (X.error = function (l) {
        throw new Error("Syntax error, unrecognized expression: " + l);
      }),
      (s.uniqueSort = function (l) {
        var g,
          E = [],
          y = 0,
          b = 0;
        if (
          ((o = !P.sortStable),
          (r = !P.sortStable && st.call(l, 0)),
          zn.call(l, et),
          o)
        ) {
          for (; (g = l[b++]); ) g === l[b] && (y = E.push(b));
          for (; y--; ) dn.call(l, E[y], 1);
        }
        return (r = null), l;
      }),
      (s.fn.uniqueSort = function () {
        return this.pushStack(s.uniqueSort(st.apply(this)));
      }),
      ((e = s.expr =
        {
          cacheLength: 50,
          createPseudo: Nt,
          match: kt,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (l) {
              return (
                (l[1] = l[1].replace(Mt, St)),
                (l[3] = (l[3] || l[4] || l[5] || "").replace(Mt, St)),
                "~=" === l[2] && (l[3] = " " + l[3] + " "),
                l.slice(0, 4)
              );
            },
            CHILD: function (l) {
              return (
                (l[1] = l[1].toLowerCase()),
                "nth" === l[1].slice(0, 3)
                  ? (l[3] || X.error(l[0]),
                    (l[4] = +(l[4]
                      ? l[5] + (l[6] || 1)
                      : 2 * ("even" === l[3] || "odd" === l[3]))),
                    (l[5] = +(l[7] + l[8] || "odd" === l[3])))
                  : l[3] && X.error(l[0]),
                l
              );
            },
            PSEUDO: function (l) {
              var g,
                E = !l[6] && l[2];
              return kt.CHILD.test(l[0])
                ? null
                : (l[3]
                    ? (l[2] = l[4] || l[5] || "")
                    : E &&
                      Ct.test(E) &&
                      (g = qe(E, !0)) &&
                      (g = E.indexOf(")", E.length - g) - E.length) &&
                      ((l[0] = l[0].slice(0, g)), (l[2] = E.slice(0, g))),
                  l.slice(0, 3));
            },
          },
          filter: {
            TAG: function (l) {
              var g = l.replace(Mt, St).toLowerCase();
              return "*" === l
                ? function () {
                    return !0;
                  }
                : function (E) {
                    return Y(E, g);
                  };
            },
            CLASS: function (l) {
              var g = V[l + " "];
              return (
                g ||
                ((g = new RegExp("(^|" + Q + ")" + l + "(" + Q + "|$)")) &&
                  V(l, function (E) {
                    return g.test(
                      ("string" == typeof E.className && E.className) ||
                        (typeof E.getAttribute < "u" &&
                          E.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (l, g, E) {
              return function (y) {
                var b = X.attr(y, l);
                return null == b
                  ? "!=" === g
                  : !g ||
                      ((b += ""),
                      "=" === g
                        ? b === E
                        : "!=" === g
                        ? b !== E
                        : "^=" === g
                        ? E && 0 === b.indexOf(E)
                        : "*=" === g
                        ? E && b.indexOf(E) > -1
                        : "$=" === g
                        ? E && b.slice(-E.length) === E
                        : "~=" === g
                        ? (" " + b.replace(G, " ") + " ").indexOf(E) > -1
                        : "|=" === g &&
                          (b === E || b.slice(0, E.length + 1) === E + "-"));
              };
            },
            CHILD: function (l, g, E, y, b) {
              var w = "nth" !== l.slice(0, 3),
                O = "last" !== l.slice(-4),
                L = "of-type" === g;
              return 1 === y && 0 === b
                ? function (x) {
                    return !!x.parentNode;
                  }
                : function (x, F, j) {
                    var W,
                      B,
                      k,
                      J,
                      ot,
                      it = w !== O ? "nextSibling" : "previousSibling",
                      mt = x.parentNode,
                      Pt = L && x.nodeName.toLowerCase(),
                      ve = !j && !L,
                      at = !1;
                    if (mt) {
                      if (w) {
                        for (; it; ) {
                          for (k = x; (k = k[it]); )
                            if (L ? Y(k, Pt) : 1 === k.nodeType) return !1;
                          ot = it = "only" === l && !ot && "nextSibling";
                        }
                        return !0;
                      }
                      if (
                        ((ot = [O ? mt.firstChild : mt.lastChild]), O && ve)
                      ) {
                        for (
                          at =
                            (J =
                              (W = (B = mt[T] || (mt[T] = {}))[l] || [])[0] ===
                                m && W[1]) && W[2],
                            k = J && mt.childNodes[J];
                          (k = (++J && k && k[it]) || (at = J = 0) || ot.pop());

                        )
                          if (1 === k.nodeType && ++at && k === x) {
                            B[l] = [m, J, at];
                            break;
                          }
                      } else if (
                        (ve &&
                          (at = J =
                            (W = (B = x[T] || (x[T] = {}))[l] || [])[0] === m &&
                            W[1]),
                        !1 === at)
                      )
                        for (
                          ;
                          (k =
                            (++J && k && k[it]) || (at = J = 0) || ot.pop()) &&
                          (!(L ? Y(k, Pt) : 1 === k.nodeType) ||
                            !++at ||
                            (ve && ((B = k[T] || (k[T] = {}))[l] = [m, at]),
                            k !== x));

                        );
                      return (at -= b) === y || (at % y == 0 && at / y >= 0);
                    }
                  };
            },
            PSEUDO: function (l, g) {
              var E,
                y =
                  e.pseudos[l] ||
                  e.setFilters[l.toLowerCase()] ||
                  X.error("unsupported pseudo: " + l);
              return y[T]
                ? y(g)
                : y.length > 1
                ? ((E = [l, l, "", g]),
                  e.setFilters.hasOwnProperty(l.toLowerCase())
                    ? Nt(function (b, w) {
                        for (var O, L = y(b, g), x = L.length; x--; )
                          b[(O = yt.call(b, L[x]))] = !(w[O] = L[x]);
                      })
                    : function (b) {
                        return y(b, 0, E);
                      })
                : y;
            },
          },
          pseudos: {
            not: Nt(function (l) {
              var g = [],
                E = [],
                y = jn(l.replace(Se, "$1"));
              return y[T]
                ? Nt(function (b, w, O, L) {
                    for (var x, F = y(b, null, L, []), j = b.length; j--; )
                      (x = F[j]) && (b[j] = !(w[j] = x));
                  })
                : function (b, w, O) {
                    return (
                      (g[0] = b), y(g, null, O, E), (g[0] = null), !E.pop()
                    );
                  };
            }),
            has: Nt(function (l) {
              return function (g) {
                return X(l, g).length > 0;
              };
            }),
            contains: Nt(function (l) {
              return (
                (l = l.replace(Mt, St)),
                function (g) {
                  return (g.textContent || s.text(g)).indexOf(l) > -1;
                }
              );
            }),
            lang: Nt(function (l) {
              return (
                We.test(l || "") || X.error("unsupported lang: " + l),
                (l = l.replace(Mt, St).toLowerCase()),
                function (g) {
                  var E;
                  do {
                    if (
                      (E = f
                        ? g.lang
                        : g.getAttribute("xml:lang") || g.getAttribute("lang"))
                    )
                      return (
                        (E = E.toLowerCase()) === l || 0 === E.indexOf(l + "-")
                      );
                  } while ((g = g.parentNode) && 1 === g.nodeType);
                  return !1;
                }
              );
            }),
            target: function (l) {
              var g = R.location && R.location.hash;
              return g && g.slice(1) === l.id;
            },
            root: function (l) {
              return l === h;
            },
            focus: function (l) {
              return (
                l ===
                  (function _t() {
                    try {
                      return c.activeElement;
                    } catch {}
                  })() &&
                c.hasFocus() &&
                !!(l.type || l.href || ~l.tabIndex)
              );
            },
            enabled: Ni(!1),
            disabled: Ni(!0),
            checked: function (l) {
              return (
                (Y(l, "input") && !!l.checked) ||
                (Y(l, "option") && !!l.selected)
              );
            },
            selected: function (l) {
              return !0 === l.selected;
            },
            empty: function (l) {
              for (l = l.firstChild; l; l = l.nextSibling)
                if (l.nodeType < 6) return !1;
              return !0;
            },
            parent: function (l) {
              return !e.pseudos.empty(l);
            },
            header: function (l) {
              return Kt.test(l.nodeName);
            },
            input: function (l) {
              return Bt.test(l.nodeName);
            },
            button: function (l) {
              return (Y(l, "input") && "button" === l.type) || Y(l, "button");
            },
            text: function (l) {
              var g;
              return (
                Y(l, "input") &&
                "text" === l.type &&
                (null == (g = l.getAttribute("type")) ||
                  "text" === g.toLowerCase())
              );
            },
            first: ie(function () {
              return [0];
            }),
            last: ie(function (l, g) {
              return [g - 1];
            }),
            eq: ie(function (l, g, E) {
              return [E < 0 ? E + g : E];
            }),
            even: ie(function (l, g) {
              for (var E = 0; E < g; E += 2) l.push(E);
              return l;
            }),
            odd: ie(function (l, g) {
              for (var E = 1; E < g; E += 2) l.push(E);
              return l;
            }),
            lt: ie(function (l, g, E) {
              var y;
              for (y = E < 0 ? E + g : E > g ? g : E; --y >= 0; ) l.push(y);
              return l;
            }),
            gt: ie(function (l, g, E) {
              for (var y = E < 0 ? E + g : E; ++y < g; ) l.push(y);
              return l;
            }),
          },
        }).pseudos.nth = e.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        e.pseudos[t] = Ci(t);
      for (t in { submit: !0, reset: !0 }) e.pseudos[t] = Si(t);
      function wi() {}
      function qe(l, g) {
        var E,
          y,
          b,
          w,
          O,
          L,
          x,
          F = U[l + " "];
        if (F) return g ? 0 : F.slice(0);
        for (O = l, L = [], x = e.preFilter; O; ) {
          for (w in ((!E || (y = Z.exec(O))) &&
            (y && (O = O.slice(y[0].length) || O), L.push((b = []))),
          (E = !1),
          (y = Ve.exec(O)) &&
            ((E = y.shift()),
            b.push({ value: E, type: y[0].replace(Se, " ") }),
            (O = O.slice(E.length))),
          e.filter))
            (y = kt[w].exec(O)) &&
              (!x[w] || (y = x[w](y))) &&
              ((E = y.shift()),
              b.push({ value: E, type: w, matches: y }),
              (O = O.slice(E.length)));
          if (!E) break;
        }
        return g ? O.length : O ? X.error(l) : U(l, L).slice(0);
      }
      function Fe(l) {
        for (var g = 0, E = l.length, y = ""; g < E; g++) y += l[g].value;
        return y;
      }
      function sn(l, g, E) {
        var y = g.dir,
          b = g.next,
          w = b || y,
          O = E && "parentNode" === w,
          L = S++;
        return g.first
          ? function (x, F, j) {
              for (; (x = x[y]); ) if (1 === x.nodeType || O) return l(x, F, j);
              return !1;
            }
          : function (x, F, j) {
              var W,
                B,
                k = [m, L];
              if (j) {
                for (; (x = x[y]); )
                  if ((1 === x.nodeType || O) && l(x, F, j)) return !0;
              } else
                for (; (x = x[y]); )
                  if (1 === x.nodeType || O)
                    if (((B = x[T] || (x[T] = {})), b && Y(x, b)))
                      x = x[y] || x;
                    else {
                      if ((W = B[w]) && W[0] === m && W[1] === L)
                        return (k[2] = W[2]);
                      if (((B[w] = k), (k[2] = l(x, F, j)))) return !0;
                    }
              return !1;
            };
      }
      function on(l) {
        return l.length > 1
          ? function (g, E, y) {
              for (var b = l.length; b--; ) if (!l[b](g, E, y)) return !1;
              return !0;
            }
          : l[0];
      }
      function an(l, g, E, y, b) {
        for (var w, O = [], L = 0, x = l.length, F = null != g; L < x; L++)
          (w = l[L]) && (!E || E(w, y, b)) && (O.push(w), F && g.push(L));
        return O;
      }
      function Rn(l, g, E, y, b, w) {
        return (
          y && !y[T] && (y = Rn(y)),
          b && !b[T] && (b = Rn(b, w)),
          Nt(function (O, L, x, F) {
            var j,
              W,
              B,
              k,
              J = [],
              ot = [],
              it = L.length,
              mt =
                O ||
                (function Pn(l, g, E) {
                  for (var y = 0, b = g.length; y < b; y++) X(l, g[y], E);
                  return E;
                })(g || "*", x.nodeType ? [x] : x, []),
              Pt = !l || (!O && g) ? mt : an(mt, J, l, x, F);
            if (
              (E
                ? E(Pt, (k = b || (O ? l : it || y) ? [] : L), x, F)
                : (k = Pt),
              y)
            )
              for (j = an(k, ot), y(j, [], x, F), W = j.length; W--; )
                (B = j[W]) && (k[ot[W]] = !(Pt[ot[W]] = B));
            if (O) {
              if (b || l) {
                if (b) {
                  for (j = [], W = k.length; W--; )
                    (B = k[W]) && j.push((Pt[W] = B));
                  b(null, (k = []), j, F);
                }
                for (W = k.length; W--; )
                  (B = k[W]) &&
                    (j = b ? yt.call(O, B) : J[W]) > -1 &&
                    (O[j] = !(L[j] = B));
              }
            } else (k = an(k === L ? k.splice(it, k.length) : k)), b ? b(null, L, k, F) : a.apply(L, k);
          })
        );
      }
      function Hn(l) {
        for (
          var g,
            E,
            y,
            b = l.length,
            w = e.relative[l[0].type],
            O = w || e.relative[" "],
            L = w ? 1 : 0,
            x = sn(
              function (W) {
                return W === g;
              },
              O,
              !0
            ),
            F = sn(
              function (W) {
                return yt.call(g, W) > -1;
              },
              O,
              !0
            ),
            j = [
              function (W, B, k) {
                var J =
                  (!w && (k || B != i)) ||
                  ((g = B).nodeType ? x(W, B, k) : F(W, B, k));
                return (g = null), J;
              },
            ];
          L < b;
          L++
        )
          if ((E = e.relative[l[L].type])) j = [sn(on(j), E)];
          else {
            if ((E = e.filter[l[L].type].apply(null, l[L].matches))[T]) {
              for (y = ++L; y < b && !e.relative[l[y].type]; y++);
              return Rn(
                L > 1 && on(j),
                L > 1 &&
                  Fe(
                    l
                      .slice(0, L - 1)
                      .concat({ value: " " === l[L - 2].type ? "*" : "" })
                  ).replace(Se, "$1"),
                E,
                L < y && Hn(l.slice(L, y)),
                y < b && Hn((l = l.slice(y))),
                y < b && Fe(l)
              );
            }
            j.push(E);
          }
        return on(j);
      }
      function jn(l, g) {
        var E,
          y = [],
          b = [],
          w = q[l + " "];
        if (!w) {
          for (g || (g = qe(l)), E = g.length; E--; )
            (w = Hn(g[E]))[T] ? y.push(w) : b.push(w);
          (w = q(
            l,
            (function lr(l, g) {
              var E = g.length > 0,
                y = l.length > 0,
                b = function (w, O, L, x, F) {
                  var j,
                    W,
                    B,
                    k = 0,
                    J = "0",
                    ot = w && [],
                    it = [],
                    mt = i,
                    Pt = w || (y && e.find.TAG("*", F)),
                    ve = (m += null == mt ? 1 : Math.random() || 0.1),
                    at = Pt.length;
                  for (
                    F && (i = O == c || O || F);
                    J !== at && null != (j = Pt[J]);
                    J++
                  ) {
                    if (y && j) {
                      for (
                        W = 0, !O && j.ownerDocument != c && (Qt(j), (L = !f));
                        (B = l[W++]);

                      )
                        if (B(j, O || c, L)) {
                          a.call(x, j);
                          break;
                        }
                      F && (m = ve);
                    }
                    E && ((j = !B && j) && k--, w && ot.push(j));
                  }
                  if (((k += J), E && J !== k)) {
                    for (W = 0; (B = g[W++]); ) B(ot, it, O, L);
                    if (w) {
                      if (k > 0)
                        for (; J--; ) ot[J] || it[J] || (it[J] = ct.call(x));
                      it = an(it);
                    }
                    a.apply(x, it),
                      F &&
                        !w &&
                        it.length > 0 &&
                        k + g.length > 1 &&
                        s.uniqueSort(x);
                  }
                  return F && ((m = ve), (i = mt)), ot;
                };
              return E ? Nt(b) : b;
            })(b, y)
          )),
            (w.selector = l);
        }
        return w;
      }
      function Di(l, g, E, y) {
        var b,
          w,
          O,
          L,
          x,
          F = "function" == typeof l && l,
          j = !y && qe((l = F.selector || l));
        if (((E = E || []), 1 === j.length)) {
          if (
            (w = j[0] = j[0].slice(0)).length > 2 &&
            "ID" === (O = w[0]).type &&
            9 === g.nodeType &&
            f &&
            e.relative[w[1].type]
          ) {
            if (!(g = (e.find.ID(O.matches[0].replace(Mt, St), g) || [])[0]))
              return E;
            F && (g = g.parentNode), (l = l.slice(w.shift().value.length));
          }
          for (
            b = kt.needsContext.test(l) ? 0 : w.length;
            b-- && !e.relative[(L = (O = w[b]).type)];

          )
            if (
              (x = e.find[L]) &&
              (y = x(
                O.matches[0].replace(Mt, St),
                (Ee.test(w[0].type) && Mn(g.parentNode)) || g
              ))
            ) {
              if ((w.splice(b, 1), !(l = y.length && Fe(w))))
                return a.apply(E, y), E;
              break;
            }
        }
        return (
          (F || jn(l, j))(
            y,
            g,
            !f,
            E,
            !g || (Ee.test(l) && Mn(g.parentNode)) || g
          ),
          E
        );
      }
      (wi.prototype = e.filters = e.pseudos),
        (e.setFilters = new wi()),
        (P.sortStable = T.split("").sort(et).join("") === T),
        Qt(),
        (P.sortDetached = ye(function (l) {
          return 1 & l.compareDocumentPosition(c.createElement("fieldset"));
        })),
        (s.find = X),
        (s.expr[":"] = s.expr.pseudos),
        (s.unique = s.uniqueSort),
        (X.compile = jn),
        (X.select = Di),
        (X.setDocument = Qt),
        (X.tokenize = qe),
        (X.escape = s.escapeSelector),
        (X.getText = s.text),
        (X.isXML = s.isXMLDoc),
        (X.selectors = s.expr),
        (X.support = s.support),
        (X.uniqueSort = s.uniqueSort);
    })();
    var se = function (t, e, i) {
        for (var r = [], o = void 0 !== i; (t = t[e]) && 9 !== t.nodeType; )
          if (1 === t.nodeType) {
            if (o && s(t).is(i)) break;
            r.push(t);
          }
        return r;
      },
      pn = function (t, e) {
        for (var i = []; t; t = t.nextSibling)
          1 === t.nodeType && t !== e && i.push(t);
        return i;
      },
      gn = s.expr.match.needsContext,
      Gn = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function _n(t, e, i) {
      return H(e)
        ? s.grep(t, function (r, o) {
            return !!e.call(r, o, r) !== i;
          })
        : e.nodeType
        ? s.grep(t, function (r) {
            return (r === e) !== i;
          })
        : "string" != typeof e
        ? s.grep(t, function (r) {
            return yt.call(e, r) > -1 !== i;
          })
        : s.filter(e, t, i);
    }
    (s.filter = function (t, e, i) {
      var r = e[0];
      return (
        i && (t = ":not(" + t + ")"),
        1 === e.length && 1 === r.nodeType
          ? s.find.matchesSelector(r, t)
            ? [r]
            : []
          : s.find.matches(
              t,
              s.grep(e, function (o) {
                return 1 === o.nodeType;
              })
            )
      );
    }),
      s.fn.extend({
        find: function (t) {
          var e,
            i,
            r = this.length,
            o = this;
          if ("string" != typeof t)
            return this.pushStack(
              s(t).filter(function () {
                for (e = 0; e < r; e++) if (s.contains(o[e], this)) return !0;
              })
            );
          for (i = this.pushStack([]), e = 0; e < r; e++) s.find(t, o[e], i);
          return r > 1 ? s.uniqueSort(i) : i;
        },
        filter: function (t) {
          return this.pushStack(_n(this, t || [], !1));
        },
        not: function (t) {
          return this.pushStack(_n(this, t || [], !0));
        },
        is: function (t) {
          return !!_n(
            this,
            "string" == typeof t && gn.test(t) ? s(t) : t || [],
            !1
          ).length;
        },
      });
    var mn,
      Xn = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      Qn = (s.fn.init = function (t, e, i) {
        var r, o;
        if (!t) return this;
        if (((i = i || mn), "string" == typeof t)) {
          if (
            !(r =
              "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3
                ? [null, t, null]
                : Xn.exec(t)) ||
            (!r[1] && e)
          )
            return !e || e.jquery
              ? (e || i).find(t)
              : this.constructor(e).find(t);
          if (r[1]) {
            if (
              (s.merge(
                this,
                s.parseHTML(
                  r[1],
                  (e = e instanceof s ? e[0] : e) && e.nodeType
                    ? e.ownerDocument || e
                    : M,
                  !0
                )
              ),
              Gn.test(r[1]) && s.isPlainObject(e))
            )
              for (r in e) H(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
            return this;
          }
          return (
            (o = M.getElementById(r[2])) && ((this[0] = o), (this.length = 1)),
            this
          );
        }
        return t.nodeType
          ? ((this[0] = t), (this.length = 1), this)
          : H(t)
          ? void 0 !== i.ready
            ? i.ready(t)
            : t(s)
          : s.makeArray(t, this);
      });
    (Qn.prototype = s.fn), (mn = s(M));
    var En = /^(?:parents|prev(?:Until|All))/,
      Mi = { children: !0, contents: !0, next: !0, prev: !0 };
    function yn(t, e) {
      for (; (t = t[e]) && 1 !== t.nodeType; );
      return t;
    }
    s.fn.extend({
      has: function (t) {
        var e = s(t, this),
          i = e.length;
        return this.filter(function () {
          for (var r = 0; r < i; r++) if (s.contains(this, e[r])) return !0;
        });
      },
      closest: function (t, e) {
        var i,
          r = 0,
          o = this.length,
          a = [],
          c = "string" != typeof t && s(t);
        if (!gn.test(t))
          for (; r < o; r++)
            for (i = this[r]; i && i !== e; i = i.parentNode)
              if (
                i.nodeType < 11 &&
                (c
                  ? c.index(i) > -1
                  : 1 === i.nodeType && s.find.matchesSelector(i, t))
              ) {
                a.push(i);
                break;
              }
        return this.pushStack(a.length > 1 ? s.uniqueSort(a) : a);
      },
      index: function (t) {
        return t
          ? "string" == typeof t
            ? yt.call(s(t), this[0])
            : yt.call(this, t.jquery ? t[0] : t)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (t, e) {
        return this.pushStack(s.uniqueSort(s.merge(this.get(), s(t, e))));
      },
      addBack: function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      },
    }),
      s.each(
        {
          parent: function (t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null;
          },
          parents: function (t) {
            return se(t, "parentNode");
          },
          parentsUntil: function (t, e, i) {
            return se(t, "parentNode", i);
          },
          next: function (t) {
            return yn(t, "nextSibling");
          },
          prev: function (t) {
            return yn(t, "previousSibling");
          },
          nextAll: function (t) {
            return se(t, "nextSibling");
          },
          prevAll: function (t) {
            return se(t, "previousSibling");
          },
          nextUntil: function (t, e, i) {
            return se(t, "nextSibling", i);
          },
          prevUntil: function (t, e, i) {
            return se(t, "previousSibling", i);
          },
          siblings: function (t) {
            return pn((t.parentNode || {}).firstChild, t);
          },
          children: function (t) {
            return pn(t.firstChild);
          },
          contents: function (t) {
            return null != t.contentDocument && jt(t.contentDocument)
              ? t.contentDocument
              : (Y(t, "template") && (t = t.content || t),
                s.merge([], t.childNodes));
          },
        },
        function (t, e) {
          s.fn[t] = function (i, r) {
            var o = s.map(this, e, i);
            return (
              "Until" !== t.slice(-5) && (r = i),
              r && "string" == typeof r && (o = s.filter(r, o)),
              this.length > 1 &&
                (Mi[t] || s.uniqueSort(o), En.test(t) && o.reverse()),
              this.pushStack(o)
            );
          };
        }
      );
    var C = /[^\x20\t\r\n\f]+/g;
    function Zt(t) {
      return t;
    }
    function oe(t) {
      throw t;
    }
    function xt(t, e, i, r) {
      var o;
      try {
        t && H((o = t.promise))
          ? o.call(t).done(e).fail(i)
          : t && H((o = t.then))
          ? o.call(t, e, i)
          : e.apply(void 0, [t].slice(r));
      } catch (a) {
        i.apply(void 0, [a]);
      }
    }
    (s.Callbacks = function (t) {
      t =
        "string" == typeof t
          ? (function vn(t) {
              var e = {};
              return (
                s.each(t.match(C) || [], function (i, r) {
                  e[r] = !0;
                }),
                e
              );
            })(t)
          : s.extend({}, t);
      var e,
        i,
        r,
        o,
        a = [],
        c = [],
        h = -1,
        f = function () {
          for (o = o || t.once, r = e = !0; c.length; h = -1)
            for (i = c.shift(); ++h < a.length; )
              !1 === a[h].apply(i[0], i[1]) &&
                t.stopOnFalse &&
                ((h = a.length), (i = !1));
          t.memory || (i = !1), (e = !1), o && (a = i ? [] : "");
        },
        _ = {
          add: function () {
            return (
              a &&
                (i && !e && ((h = a.length - 1), c.push(i)),
                (function v(T) {
                  s.each(T, function (m, S) {
                    H(S)
                      ? (!t.unique || !_.has(S)) && a.push(S)
                      : S && S.length && "string" !== wt(S) && v(S);
                  });
                })(arguments),
                i && !e && f()),
              this
            );
          },
          remove: function () {
            return (
              s.each(arguments, function (v, T) {
                for (var m; (m = s.inArray(T, a, m)) > -1; )
                  a.splice(m, 1), m <= h && h--;
              }),
              this
            );
          },
          has: function (v) {
            return v ? s.inArray(v, a) > -1 : a.length > 0;
          },
          empty: function () {
            return a && (a = []), this;
          },
          disable: function () {
            return (o = c = []), (a = i = ""), this;
          },
          disabled: function () {
            return !a;
          },
          lock: function () {
            return (o = c = []), !i && !e && (a = i = ""), this;
          },
          locked: function () {
            return !!o;
          },
          fireWith: function (v, T) {
            return (
              o ||
                ((T = [v, (T = T || []).slice ? T.slice() : T]),
                c.push(T),
                e || f()),
              this
            );
          },
          fire: function () {
            return _.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!r;
          },
        };
      return _;
    }),
      s.extend({
        Deferred: function (t) {
          var e = [
              [
                "notify",
                "progress",
                s.Callbacks("memory"),
                s.Callbacks("memory"),
                2,
              ],
              [
                "resolve",
                "done",
                s.Callbacks("once memory"),
                s.Callbacks("once memory"),
                0,
                "resolved",
              ],
              [
                "reject",
                "fail",
                s.Callbacks("once memory"),
                s.Callbacks("once memory"),
                1,
                "rejected",
              ],
            ],
            i = "pending",
            r = {
              state: function () {
                return i;
              },
              always: function () {
                return o.done(arguments).fail(arguments), this;
              },
              catch: function (a) {
                return r.then(null, a);
              },
              pipe: function () {
                var a = arguments;
                return s
                  .Deferred(function (c) {
                    s.each(e, function (h, f) {
                      var _ = H(a[f[4]]) && a[f[4]];
                      o[f[1]](function () {
                        var v = _ && _.apply(this, arguments);
                        v && H(v.promise)
                          ? v
                              .promise()
                              .progress(c.notify)
                              .done(c.resolve)
                              .fail(c.reject)
                          : c[f[0] + "With"](this, _ ? [v] : arguments);
                      });
                    }),
                      (a = null);
                  })
                  .promise();
              },
              then: function (a, c, h) {
                var f = 0;
                function _(v, T, m, S) {
                  return function () {
                    var V = this,
                      U = arguments,
                      q = function () {
                        var et, At;
                        if (!(v < f)) {
                          if ((et = m.apply(V, U)) === T.promise())
                            throw new TypeError("Thenable self-resolution");
                          H(
                            (At =
                              et &&
                              ("object" == typeof et ||
                                "function" == typeof et) &&
                              et.then)
                          )
                            ? S
                              ? At.call(et, _(f, T, Zt, S), _(f, T, oe, S))
                              : (f++,
                                At.call(
                                  et,
                                  _(f, T, Zt, S),
                                  _(f, T, oe, S),
                                  _(f, T, Zt, T.notifyWith)
                                ))
                            : (m !== Zt && ((V = void 0), (U = [et])),
                              (S || T.resolveWith)(V, U));
                        }
                      },
                      nt = S
                        ? q
                        : function () {
                            try {
                              q();
                            } catch (et) {
                              s.Deferred.exceptionHook &&
                                s.Deferred.exceptionHook(et, nt.error),
                                v + 1 >= f &&
                                  (m !== oe && ((V = void 0), (U = [et])),
                                  T.rejectWith(V, U));
                            }
                          };
                    v
                      ? nt()
                      : (s.Deferred.getErrorHook
                          ? (nt.error = s.Deferred.getErrorHook())
                          : s.Deferred.getStackHook &&
                            (nt.error = s.Deferred.getStackHook()),
                        R.setTimeout(nt));
                  };
                }
                return s
                  .Deferred(function (v) {
                    e[0][3].add(_(0, v, H(h) ? h : Zt, v.notifyWith)),
                      e[1][3].add(_(0, v, H(a) ? a : Zt)),
                      e[2][3].add(_(0, v, H(c) ? c : oe));
                  })
                  .promise();
              },
              promise: function (a) {
                return null != a ? s.extend(a, r) : r;
              },
            },
            o = {};
          return (
            s.each(e, function (a, c) {
              var h = c[2],
                f = c[5];
              (r[c[1]] = h.add),
                f &&
                  h.add(
                    function () {
                      i = f;
                    },
                    e[3 - a][2].disable,
                    e[3 - a][3].disable,
                    e[0][2].lock,
                    e[0][3].lock
                  ),
                h.add(c[3].fire),
                (o[c[0]] = function () {
                  return (
                    o[c[0] + "With"](this === o ? void 0 : this, arguments),
                    this
                  );
                }),
                (o[c[0] + "With"] = h.fireWith);
            }),
            r.promise(o),
            t && t.call(o, o),
            o
          );
        },
        when: function (t) {
          var e = arguments.length,
            i = e,
            r = Array(i),
            o = st.call(arguments),
            a = s.Deferred(),
            c = function (h) {
              return function (f) {
                (r[h] = this),
                  (o[h] = arguments.length > 1 ? st.call(arguments) : f),
                  --e || a.resolveWith(r, o);
              };
            };
          if (
            e <= 1 &&
            (xt(t, a.done(c(i)).resolve, a.reject, !e),
            "pending" === a.state() || H(o[i] && o[i].then))
          )
            return a.then();
          for (; i--; ) xt(o[i], c(i), a.reject);
          return a.promise();
        },
      });
    var Ne = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (s.Deferred.exceptionHook = function (t, e) {
      R.console &&
        R.console.warn &&
        t &&
        Ne.test(t.name) &&
        R.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e);
    }),
      (s.readyException = function (t) {
        R.setTimeout(function () {
          throw t;
        });
      });
    var bn = s.Deferred();
    function lt() {
      M.removeEventListener("DOMContentLoaded", lt),
        R.removeEventListener("load", lt),
        s.ready();
    }
    (s.fn.ready = function (t) {
      return (
        bn.then(t).catch(function (e) {
          s.readyException(e);
        }),
        this
      );
    }),
      s.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (t) {
          (!0 === t ? --s.readyWait : s.isReady) ||
            ((s.isReady = !0),
            !(!0 !== t && --s.readyWait > 0) && bn.resolveWith(M, [s]));
        },
      }),
      (s.ready.then = bn.then),
      "complete" === M.readyState ||
      ("loading" !== M.readyState && !M.documentElement.doScroll)
        ? R.setTimeout(s.ready)
        : (M.addEventListener("DOMContentLoaded", lt),
          R.addEventListener("load", lt));
    var bt = function (t, e, i, r, o, a, c) {
        var h = 0,
          f = t.length,
          _ = null == i;
        if ("object" === wt(i))
          for (h in ((o = !0), i)) bt(t, e, h, i[h], !0, a, c);
        else if (
          void 0 !== r &&
          ((o = !0),
          H(r) || (c = !0),
          _ &&
            (c
              ? (e.call(t, r), (e = null))
              : ((_ = e),
                (e = function (v, T, m) {
                  return _.call(s(v), m);
                }))),
          e)
        )
          for (; h < f; h++) e(t[h], i, c ? r : r.call(t[h], h, e(t[h], i)));
        return o ? t : _ ? e.call(t) : f ? e(t[0], i) : a;
      },
      $ = /^-ms-/,
      Xe = /-([a-z])/g;
    function Pi(t, e) {
      return e.toUpperCase();
    }
    function Vt(t) {
      return t.replace($, "ms-").replace(Xe, Pi);
    }
    var ae = function (t) {
      return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
    };
    function we() {
      this.expando = s.expando + we.uid++;
    }
    (we.uid = 1),
      (we.prototype = {
        cache: function (t) {
          var e = t[this.expando];
          return (
            e ||
              ((e = {}),
              ae(t) &&
                (t.nodeType
                  ? (t[this.expando] = e)
                  : Object.defineProperty(t, this.expando, {
                      value: e,
                      configurable: !0,
                    }))),
            e
          );
        },
        set: function (t, e, i) {
          var r,
            o = this.cache(t);
          if ("string" == typeof e) o[Vt(e)] = i;
          else for (r in e) o[Vt(r)] = e[r];
          return o;
        },
        get: function (t, e) {
          return void 0 === e
            ? this.cache(t)
            : t[this.expando] && t[this.expando][Vt(e)];
        },
        access: function (t, e, i) {
          return void 0 === e || (e && "string" == typeof e && void 0 === i)
            ? this.get(t, e)
            : (this.set(t, e, i), void 0 !== i ? i : e);
        },
        remove: function (t, e) {
          var i,
            r = t[this.expando];
          if (void 0 !== r) {
            if (void 0 !== e)
              for (
                i = (e = Array.isArray(e)
                  ? e.map(Vt)
                  : ((e = Vt(e)) in r)
                  ? [e]
                  : e.match(C) || []).length;
                i--;

              )
                delete r[e[i]];
            (void 0 === e || s.isEmptyObject(r)) &&
              (t.nodeType
                ? (t[this.expando] = void 0)
                : delete t[this.expando]);
          }
        },
        hasData: function (t) {
          var e = t[this.expando];
          return void 0 !== e && !s.isEmptyObject(e);
        },
      });
    var I = new we(),
      ft = new we(),
      Ri = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      De = /[A-Z]/g;
    function ji(t, e, i) {
      var r;
      if (void 0 === i && 1 === t.nodeType)
        if (
          ((r = "data-" + e.replace(De, "-$&").toLowerCase()),
          "string" == typeof (i = t.getAttribute(r)))
        ) {
          try {
            i = (function Hi(t) {
              return (
                "true" === t ||
                ("false" !== t &&
                  ("null" === t
                    ? null
                    : t === +t + ""
                    ? +t
                    : Ri.test(t)
                    ? JSON.parse(t)
                    : t))
              );
            })(i);
          } catch {}
          ft.set(t, e, i);
        } else i = void 0;
      return i;
    }
    s.extend({
      hasData: function (t) {
        return ft.hasData(t) || I.hasData(t);
      },
      data: function (t, e, i) {
        return ft.access(t, e, i);
      },
      removeData: function (t, e) {
        ft.remove(t, e);
      },
      _data: function (t, e, i) {
        return I.access(t, e, i);
      },
      _removeData: function (t, e) {
        I.remove(t, e);
      },
    }),
      s.fn.extend({
        data: function (t, e) {
          var i,
            r,
            o,
            a = this[0],
            c = a && a.attributes;
          if (void 0 === t) {
            if (
              this.length &&
              ((o = ft.get(a)), 1 === a.nodeType && !I.get(a, "hasDataAttrs"))
            ) {
              for (i = c.length; i--; )
                c[i] &&
                  0 === (r = c[i].name).indexOf("data-") &&
                  ((r = Vt(r.slice(5))), ji(a, r, o[r]));
              I.set(a, "hasDataAttrs", !0);
            }
            return o;
          }
          return "object" == typeof t
            ? this.each(function () {
                ft.set(this, t);
              })
            : bt(
                this,
                function (h) {
                  var f;
                  if (a && void 0 === h)
                    return void 0 !== (f = ft.get(a, t)) ||
                      void 0 !== (f = ji(a, t))
                      ? f
                      : void 0;
                  this.each(function () {
                    ft.set(this, t, h);
                  });
                },
                null,
                e,
                arguments.length > 1,
                null,
                !0
              );
        },
        removeData: function (t) {
          return this.each(function () {
            ft.remove(this, t);
          });
        },
      }),
      s.extend({
        queue: function (t, e, i) {
          var r;
          if (t)
            return (
              (r = I.get(t, (e = (e || "fx") + "queue"))),
              i &&
                (!r || Array.isArray(i)
                  ? (r = I.access(t, e, s.makeArray(i)))
                  : r.push(i)),
              r || []
            );
        },
        dequeue: function (t, e) {
          var i = s.queue(t, (e = e || "fx")),
            r = i.length,
            o = i.shift(),
            a = s._queueHooks(t, e);
          "inprogress" === o && ((o = i.shift()), r--),
            o &&
              ("fx" === e && i.unshift("inprogress"),
              delete a.stop,
              o.call(
                t,
                function () {
                  s.dequeue(t, e);
                },
                a
              )),
            !r && a && a.empty.fire();
        },
        _queueHooks: function (t, e) {
          var i = e + "queueHooks";
          return (
            I.get(t, i) ||
            I.access(t, i, {
              empty: s.Callbacks("once memory").add(function () {
                I.remove(t, [e + "queue", i]);
              }),
            })
          );
        },
      }),
      s.fn.extend({
        queue: function (t, e) {
          var i = 2;
          return (
            "string" != typeof t && ((e = t), (t = "fx"), i--),
            arguments.length < i
              ? s.queue(this[0], t)
              : void 0 === e
              ? this
              : this.each(function () {
                  var r = s.queue(this, t, e);
                  s._queueHooks(this, t),
                    "fx" === t && "inprogress" !== r[0] && s.dequeue(this, t);
                })
          );
        },
        dequeue: function (t) {
          return this.each(function () {
            s.dequeue(this, t);
          });
        },
        clearQueue: function (t) {
          return this.queue(t || "fx", []);
        },
        promise: function (t, e) {
          var i,
            r = 1,
            o = s.Deferred(),
            a = this,
            c = this.length,
            h = function () {
              --r || o.resolveWith(a, [a]);
            };
          for (
            "string" != typeof t && ((e = t), (t = void 0)), t = t || "fx";
            c--;

          )
            (i = I.get(a[c], t + "queueHooks")) &&
              i.empty &&
              (r++, i.empty.add(h));
          return h(), o.promise(e);
        },
      });
    var Jn = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      xe = new RegExp("^(?:([+-])=|)(" + Jn + ")([a-z%]*)$", "i"),
      Wt = ["Top", "Right", "Bottom", "Left"],
      Ut = M.documentElement,
      ue = function (t) {
        return s.contains(t.ownerDocument, t);
      },
      Oe = { composed: !0 };
    Ut.getRootNode &&
      (ue = function (t) {
        return (
          s.contains(t.ownerDocument, t) ||
          t.getRootNode(Oe) === t.ownerDocument
        );
      });
    var Qe = function (t, e) {
      return (
        "none" === (t = e || t).style.display ||
        ("" === t.style.display && ue(t) && "none" === s.css(t, "display"))
      );
    };
    function te(t, e, i, r) {
      var o,
        a,
        c = 20,
        h = r
          ? function () {
              return r.cur();
            }
          : function () {
              return s.css(t, e, "");
            },
        f = h(),
        _ = (i && i[3]) || (s.cssNumber[e] ? "" : "px"),
        v =
          t.nodeType &&
          (s.cssNumber[e] || ("px" !== _ && +f)) &&
          xe.exec(s.css(t, e));
      if (v && v[3] !== _) {
        for (_ = _ || v[3], v = +(f /= 2) || 1; c--; )
          s.style(t, e, v + _),
            (1 - a) * (1 - (a = h() / f || 0.5)) <= 0 && (c = 0),
            (v /= a);
        s.style(t, e, (v *= 2) + _), (i = i || []);
      }
      return (
        i &&
          ((v = +v || +f || 0),
          (o = i[1] ? v + (i[1] + 1) * i[2] : +i[2]),
          r && ((r.unit = _), (r.start = v), (r.end = o))),
        o
      );
    }
    var Zn = {};
    function Vi(t) {
      var e,
        i = t.ownerDocument,
        r = t.nodeName,
        o = Zn[r];
      return (
        o ||
        ((e = i.body.appendChild(i.createElement(r))),
        (o = s.css(e, "display")),
        e.parentNode.removeChild(e),
        "none" === o && (o = "block"),
        (Zn[r] = o),
        o)
      );
    }
    function ce(t, e) {
      for (var i, r, o = [], a = 0, c = t.length; a < c; a++)
        (r = t[a]).style &&
          ((i = r.style.display),
          e
            ? ("none" === i &&
                ((o[a] = I.get(r, "display") || null),
                o[a] || (r.style.display = "")),
              "" === r.style.display && Qe(r) && (o[a] = Vi(r)))
            : "none" !== i && ((o[a] = "none"), I.set(r, "display", i)));
      for (a = 0; a < c; a++) null != o[a] && (t[a].style.display = o[a]);
      return t;
    }
    s.fn.extend({
      show: function () {
        return ce(this, !0);
      },
      hide: function () {
        return ce(this);
      },
      toggle: function (t) {
        return "boolean" == typeof t
          ? t
            ? this.show()
            : this.hide()
          : this.each(function () {
              Qe(this) ? s(this).show() : s(this).hide();
            });
      },
    });
    var e,
      i,
      Le = /^(?:checkbox|radio)$/i,
      ti = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      ei = /^$|^module$|\/(?:java|ecma)script/i;
    (e = M.createDocumentFragment().appendChild(M.createElement("div"))),
      (i = M.createElement("input")).setAttribute("type", "radio"),
      i.setAttribute("checked", "checked"),
      i.setAttribute("name", "t"),
      e.appendChild(i),
      (P.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (e.innerHTML = "<textarea>x</textarea>"),
      (P.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue),
      (e.innerHTML = "<option></option>"),
      (P.option = !!e.lastChild);
    var gt = {
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
    function dt(t, e) {
      var i;
      return (
        (i =
          typeof t.getElementsByTagName < "u"
            ? t.getElementsByTagName(e || "*")
            : typeof t.querySelectorAll < "u"
            ? t.querySelectorAll(e || "*")
            : []),
        void 0 === e || (e && Y(t, e)) ? s.merge([t], i) : i
      );
    }
    function Tn(t, e) {
      for (var i = 0, r = t.length; i < r; i++)
        I.set(t[i], "globalEval", !e || I.get(e[i], "globalEval"));
    }
    (gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead),
      (gt.th = gt.td),
      P.option ||
        (gt.optgroup = gt.option =
          [1, "<select multiple='multiple'>", "</select>"]);
    var Wi = /<|&#?\w+;/;
    function ni(t, e, i, r, o) {
      for (
        var a,
          c,
          h,
          f,
          _,
          v,
          T = e.createDocumentFragment(),
          m = [],
          S = 0,
          V = t.length;
        S < V;
        S++
      )
        if ((a = t[S]) || 0 === a)
          if ("object" === wt(a)) s.merge(m, a.nodeType ? [a] : a);
          else if (Wi.test(a)) {
            for (
              c = c || T.appendChild(e.createElement("div")),
                h = (ti.exec(a) || ["", ""])[1].toLowerCase(),
                c.innerHTML =
                  (f = gt[h] || gt._default)[1] + s.htmlPrefilter(a) + f[2],
                v = f[0];
              v--;

            )
              c = c.lastChild;
            s.merge(m, c.childNodes), ((c = T.firstChild).textContent = "");
          } else m.push(e.createTextNode(a));
      for (T.textContent = "", S = 0; (a = m[S++]); )
        if (r && s.inArray(a, r) > -1) o && o.push(a);
        else if (
          ((_ = ue(a)), (c = dt(T.appendChild(a), "script")), _ && Tn(c), i)
        )
          for (v = 0; (a = c[v++]); ) ei.test(a.type || "") && i.push(a);
      return T;
    }
    var Ie = /^([^.]*)(?:\.(.+)|)/;
    function le() {
      return !0;
    }
    function $e() {
      return !1;
    }
    function Ot(t, e, i, r, o, a) {
      var c, h;
      if ("object" == typeof e) {
        for (h in ("string" != typeof i && ((r = r || i), (i = void 0)), e))
          Ot(t, h, i, r, e[h], a);
        return t;
      }
      if (
        (null == r && null == o
          ? ((o = i), (r = i = void 0))
          : null == o &&
            ("string" == typeof i
              ? ((o = r), (r = void 0))
              : ((o = r), (r = i), (i = void 0))),
        !1 === o)
      )
        o = $e;
      else if (!o) return t;
      return (
        1 === a &&
          ((c = o),
          (o = function (f) {
            return s().off(f), c.apply(this, arguments);
          }),
          (o.guid = c.guid || (c.guid = s.guid++))),
        t.each(function () {
          s.event.add(this, e, o, r, i);
        })
      );
    }
    function ke(t, e, i) {
      i
        ? (I.set(t, e, !1),
          s.event.add(t, e, {
            namespace: !1,
            handler: function (r) {
              var o,
                a = I.get(this, e);
              if (1 & r.isTrigger && this[e]) {
                if (a)
                  (s.event.special[e] || {}).delegateType &&
                    r.stopPropagation();
                else if (
                  ((a = st.call(arguments)),
                  I.set(this, e, a),
                  this[e](),
                  (o = I.get(this, e)),
                  I.set(this, e, !1),
                  a !== o)
                )
                  return r.stopImmediatePropagation(), r.preventDefault(), o;
              } else
                a &&
                  (I.set(this, e, s.event.trigger(a[0], a.slice(1), this)),
                  r.stopPropagation(),
                  (r.isImmediatePropagationStopped = le));
            },
          }))
        : void 0 === I.get(t, e) && s.event.add(t, e, le);
    }
    (s.event = {
      global: {},
      add: function (t, e, i, r, o) {
        var a,
          c,
          h,
          f,
          _,
          v,
          T,
          m,
          S,
          V,
          U,
          q = I.get(t);
        if (ae(t))
          for (
            i.handler && ((i = (a = i).handler), (o = a.selector)),
              o && s.find.matchesSelector(Ut, o),
              i.guid || (i.guid = s.guid++),
              (f = q.events) || (f = q.events = Object.create(null)),
              (c = q.handle) ||
                (c = q.handle =
                  function (nt) {
                    return typeof s < "u" && s.event.triggered !== nt.type
                      ? s.event.dispatch.apply(t, arguments)
                      : void 0;
                  }),
              _ = (e = (e || "").match(C) || [""]).length;
            _--;

          )
            (S = U = (h = Ie.exec(e[_]) || [])[1]),
              (V = (h[2] || "").split(".").sort()),
              S &&
                ((T = s.event.special[S] || {}),
                (T =
                  s.event.special[
                    (S = (o ? T.delegateType : T.bindType) || S)
                  ] || {}),
                (v = s.extend(
                  {
                    type: S,
                    origType: U,
                    data: r,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && s.expr.match.needsContext.test(o),
                    namespace: V.join("."),
                  },
                  a
                )),
                (m = f[S]) ||
                  (((m = f[S] = []).delegateCount = 0),
                  (!T.setup || !1 === T.setup.call(t, r, V, c)) &&
                    t.addEventListener &&
                    t.addEventListener(S, c)),
                T.add &&
                  (T.add.call(t, v),
                  v.handler.guid || (v.handler.guid = i.guid)),
                o ? m.splice(m.delegateCount++, 0, v) : m.push(v),
                (s.event.global[S] = !0));
      },
      remove: function (t, e, i, r, o) {
        var a,
          c,
          h,
          f,
          _,
          v,
          T,
          m,
          S,
          V,
          U,
          q = I.hasData(t) && I.get(t);
        if (q && (f = q.events)) {
          for (_ = (e = (e || "").match(C) || [""]).length; _--; )
            if (
              ((S = U = (h = Ie.exec(e[_]) || [])[1]),
              (V = (h[2] || "").split(".").sort()),
              S)
            ) {
              for (
                T = s.event.special[S] || {},
                  m = f[(S = (r ? T.delegateType : T.bindType) || S)] || [],
                  h =
                    h[2] &&
                    new RegExp("(^|\\.)" + V.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  c = a = m.length;
                a--;

              )
                (v = m[a]),
                  (o || U === v.origType) &&
                    (!i || i.guid === v.guid) &&
                    (!h || h.test(v.namespace)) &&
                    (!r || r === v.selector || ("**" === r && v.selector)) &&
                    (m.splice(a, 1),
                    v.selector && m.delegateCount--,
                    T.remove && T.remove.call(t, v));
              c &&
                !m.length &&
                ((!T.teardown || !1 === T.teardown.call(t, V, q.handle)) &&
                  s.removeEvent(t, S, q.handle),
                delete f[S]);
            } else for (S in f) s.event.remove(t, S + e[_], i, r, !0);
          s.isEmptyObject(f) && I.remove(t, "handle events");
        }
      },
      dispatch: function (t) {
        var e,
          i,
          r,
          o,
          a,
          c,
          h = new Array(arguments.length),
          f = s.event.fix(t),
          _ = (I.get(this, "events") || Object.create(null))[f.type] || [],
          v = s.event.special[f.type] || {};
        for (h[0] = f, e = 1; e < arguments.length; e++) h[e] = arguments[e];
        if (
          ((f.delegateTarget = this),
          !v.preDispatch || !1 !== v.preDispatch.call(this, f))
        ) {
          for (
            c = s.event.handlers.call(this, f, _), e = 0;
            (o = c[e++]) && !f.isPropagationStopped();

          )
            for (
              f.currentTarget = o.elem, i = 0;
              (a = o.handlers[i++]) && !f.isImmediatePropagationStopped();

            )
              (!f.rnamespace ||
                !1 === a.namespace ||
                f.rnamespace.test(a.namespace)) &&
                ((f.handleObj = a),
                (f.data = a.data),
                void 0 !==
                  (r = (
                    (s.event.special[a.origType] || {}).handle || a.handler
                  ).apply(o.elem, h)) &&
                  !1 === (f.result = r) &&
                  (f.preventDefault(), f.stopPropagation()));
          return v.postDispatch && v.postDispatch.call(this, f), f.result;
        }
      },
      handlers: function (t, e) {
        var i,
          r,
          o,
          a,
          c,
          h = [],
          f = e.delegateCount,
          _ = t.target;
        if (f && _.nodeType && !("click" === t.type && t.button >= 1))
          for (; _ !== this; _ = _.parentNode || this)
            if (1 === _.nodeType && ("click" !== t.type || !0 !== _.disabled)) {
              for (a = [], c = {}, i = 0; i < f; i++)
                void 0 === c[(o = (r = e[i]).selector + " ")] &&
                  (c[o] = r.needsContext
                    ? s(o, this).index(_) > -1
                    : s.find(o, this, null, [_]).length),
                  c[o] && a.push(r);
              a.length && h.push({ elem: _, handlers: a });
            }
        return (
          (_ = this),
          f < e.length && h.push({ elem: _, handlers: e.slice(f) }),
          h
        );
      },
      addProp: function (t, e) {
        Object.defineProperty(s.Event.prototype, t, {
          enumerable: !0,
          configurable: !0,
          get: H(e)
            ? function () {
                if (this.originalEvent) return e(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[t];
              },
          set: function (i) {
            Object.defineProperty(this, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            });
          },
        });
      },
      fix: function (t) {
        return t[s.expando] ? t : new s.Event(t);
      },
      special: {
        load: { noBubble: !0 },
        click: {
          setup: function (t) {
            var e = this || t;
            return (
              Le.test(e.type) && e.click && Y(e, "input") && ke(e, "click", !0),
              !1
            );
          },
          trigger: function (t) {
            var e = this || t;
            return (
              Le.test(e.type) && e.click && Y(e, "input") && ke(e, "click"), !0
            );
          },
          _default: function (t) {
            var e = t.target;
            return (
              (Le.test(e.type) &&
                e.click &&
                Y(e, "input") &&
                I.get(e, "click")) ||
              Y(e, "a")
            );
          },
        },
        beforeunload: {
          postDispatch: function (t) {
            void 0 !== t.result &&
              t.originalEvent &&
              (t.originalEvent.returnValue = t.result);
          },
        },
      },
    }),
      (s.removeEvent = function (t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i);
      }),
      (s.Event = function (t, e) {
        if (!(this instanceof s.Event)) return new s.Event(t, e);
        t && t.type
          ? ((this.originalEvent = t),
            (this.type = t.type),
            (this.isDefaultPrevented =
              t.defaultPrevented ||
              (void 0 === t.defaultPrevented && !1 === t.returnValue)
                ? le
                : $e),
            (this.target =
              t.target && 3 === t.target.nodeType
                ? t.target.parentNode
                : t.target),
            (this.currentTarget = t.currentTarget),
            (this.relatedTarget = t.relatedTarget))
          : (this.type = t),
          e && s.extend(this, e),
          (this.timeStamp = (t && t.timeStamp) || Date.now()),
          (this[s.expando] = !0);
      }),
      (s.Event.prototype = {
        constructor: s.Event,
        isDefaultPrevented: $e,
        isPropagationStopped: $e,
        isImmediatePropagationStopped: $e,
        isSimulated: !1,
        preventDefault: function () {
          var t = this.originalEvent;
          (this.isDefaultPrevented = le),
            t && !this.isSimulated && t.preventDefault();
        },
        stopPropagation: function () {
          var t = this.originalEvent;
          (this.isPropagationStopped = le),
            t && !this.isSimulated && t.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var t = this.originalEvent;
          (this.isImmediatePropagationStopped = le),
            t && !this.isSimulated && t.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      s.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          code: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: !0,
        },
        s.event.addProp
      ),
      s.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
        function i(r) {
          if (M.documentMode) {
            var o = I.get(this, "handle"),
              a = s.event.fix(r);
            (a.type = "focusin" === r.type ? "focus" : "blur"),
              (a.isSimulated = !0),
              o(r),
              a.target === a.currentTarget && o(a);
          } else s.event.simulate(e, r.target, s.event.fix(r));
        }
        (s.event.special[t] = {
          setup: function () {
            var r;
            if ((ke(this, t, !0), !M.documentMode)) return !1;
            (r = I.get(this, e)) || this.addEventListener(e, i),
              I.set(this, e, (r || 0) + 1);
          },
          trigger: function () {
            return ke(this, t), !0;
          },
          teardown: function () {
            var r;
            if (!M.documentMode) return !1;
            (r = I.get(this, e) - 1)
              ? I.set(this, e, r)
              : (this.removeEventListener(e, i), I.remove(this, e));
          },
          _default: function (r) {
            return I.get(r.target, t);
          },
          delegateType: e,
        }),
          (s.event.special[e] = {
            setup: function () {
              var r = this.ownerDocument || this.document || this,
                o = M.documentMode ? this : r,
                a = I.get(o, e);
              a ||
                (M.documentMode
                  ? this.addEventListener(e, i)
                  : r.addEventListener(t, i, !0)),
                I.set(o, e, (a || 0) + 1);
            },
            teardown: function () {
              var r = this.ownerDocument || this.document || this,
                o = M.documentMode ? this : r,
                a = I.get(o, e) - 1;
              a
                ? I.set(o, e, a)
                : (M.documentMode
                    ? this.removeEventListener(e, i)
                    : r.removeEventListener(t, i, !0),
                  I.remove(o, e));
            },
          });
      }),
      s.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (t, e) {
          s.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function (i) {
              var r,
                a = i.relatedTarget,
                c = i.handleObj;
              return (
                (!a || (a !== this && !s.contains(this, a))) &&
                  ((i.type = c.origType),
                  (r = c.handler.apply(this, arguments)),
                  (i.type = e)),
                r
              );
            },
          };
        }
      ),
      s.fn.extend({
        on: function (t, e, i, r) {
          return Ot(this, t, e, i, r);
        },
        one: function (t, e, i, r) {
          return Ot(this, t, e, i, r, 1);
        },
        off: function (t, e, i) {
          var r, o;
          if (t && t.preventDefault && t.handleObj)
            return (
              (r = t.handleObj),
              s(t.delegateTarget).off(
                r.namespace ? r.origType + "." + r.namespace : r.origType,
                r.selector,
                r.handler
              ),
              this
            );
          if ("object" == typeof t) {
            for (o in t) this.off(o, e, t[o]);
            return this;
          }
          return (
            (!1 === e || "function" == typeof e) && ((i = e), (e = void 0)),
            !1 === i && (i = $e),
            this.each(function () {
              s.event.remove(this, t, i, e);
            })
          );
        },
      });
    var qi = /<script|<style|<link/i,
      Fi = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Bi = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function fe(t, e) {
      return (
        (Y(t, "table") &&
          Y(11 !== e.nodeType ? e : e.firstChild, "tr") &&
          s(t).children("tbody")[0]) ||
        t
      );
    }
    function de(t) {
      return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
    }
    function he(t) {
      return (
        "true/" === (t.type || "").slice(0, 5)
          ? (t.type = t.type.slice(5))
          : t.removeAttribute("type"),
        t
      );
    }
    function Me(t, e) {
      var i, r, o, c, h, f;
      if (1 === e.nodeType) {
        if (I.hasData(t) && (f = I.get(t).events))
          for (o in (I.remove(e, "handle events"), f))
            for (i = 0, r = f[o].length; i < r; i++) s.event.add(e, o, f[o][i]);
        ft.hasData(t) &&
          ((c = ft.access(t)), (h = s.extend({}, c)), ft.set(e, h));
      }
    }
    function Ki(t, e) {
      var i = e.nodeName.toLowerCase();
      "input" === i && Le.test(t.type)
        ? (e.checked = t.checked)
        : ("input" === i || "textarea" === i) &&
          (e.defaultValue = t.defaultValue);
    }
    function zt(t, e, i, r) {
      e = Fn(e);
      var o,
        a,
        c,
        h,
        f,
        _,
        v = 0,
        T = t.length,
        m = T - 1,
        S = e[0],
        V = H(S);
      if (V || (T > 1 && "string" == typeof S && !P.checkClone && Fi.test(S)))
        return t.each(function (U) {
          var q = t.eq(U);
          V && (e[0] = S.call(this, U, q.html())), zt(q, e, i, r);
        });
      if (
        T &&
        ((a = (o = ni(e, t[0].ownerDocument, !1, t, r)).firstChild),
        1 === o.childNodes.length && (o = a),
        a || r)
      ) {
        for (h = (c = s.map(dt(o, "script"), de)).length; v < T; v++)
          (f = o),
            v !== m &&
              ((f = s.clone(f, !0, !0)), h && s.merge(c, dt(f, "script"))),
            i.call(t[v], f, v);
        if (h)
          for (
            _ = c[c.length - 1].ownerDocument, s.map(c, he), v = 0;
            v < h;
            v++
          )
            ei.test((f = c[v]).type || "") &&
              !I.access(f, "globalEval") &&
              s.contains(_, f) &&
              (f.src && "module" !== (f.type || "").toLowerCase()
                ? s._evalUrl &&
                  !f.noModule &&
                  s._evalUrl(
                    f.src,
                    { nonce: f.nonce || f.getAttribute("nonce") },
                    _
                  )
                : Ce(f.textContent.replace(Bi, ""), f, _));
      }
      return t;
    }
    function ii(t, e, i) {
      for (var r, o = e ? s.filter(e, t) : t, a = 0; null != (r = o[a]); a++)
        !i && 1 === r.nodeType && s.cleanData(dt(r)),
          r.parentNode &&
            (i && ue(r) && Tn(dt(r, "script")), r.parentNode.removeChild(r));
      return t;
    }
    s.extend({
      htmlPrefilter: function (t) {
        return t;
      },
      clone: function (t, e, i) {
        var r,
          o,
          a,
          c,
          h = t.cloneNode(!0),
          f = ue(t);
        if (
          !(
            P.noCloneChecked ||
            (1 !== t.nodeType && 11 !== t.nodeType) ||
            s.isXMLDoc(t)
          )
        )
          for (c = dt(h), r = 0, o = (a = dt(t)).length; r < o; r++)
            Ki(a[r], c[r]);
        if (e)
          if (i)
            for (
              a = a || dt(t), c = c || dt(h), r = 0, o = a.length;
              r < o;
              r++
            )
              Me(a[r], c[r]);
          else Me(t, h);
        return (
          (c = dt(h, "script")).length > 0 && Tn(c, !f && dt(t, "script")), h
        );
      },
      cleanData: function (t) {
        for (
          var e, i, r, o = s.event.special, a = 0;
          void 0 !== (i = t[a]);
          a++
        )
          if (ae(i)) {
            if ((e = i[I.expando])) {
              if (e.events)
                for (r in e.events)
                  o[r] ? s.event.remove(i, r) : s.removeEvent(i, r, e.handle);
              i[I.expando] = void 0;
            }
            i[ft.expando] && (i[ft.expando] = void 0);
          }
      },
    }),
      s.fn.extend({
        detach: function (t) {
          return ii(this, t, !0);
        },
        remove: function (t) {
          return ii(this, t);
        },
        text: function (t) {
          return bt(
            this,
            function (e) {
              return void 0 === e
                ? s.text(this)
                : this.empty().each(function () {
                    (1 === this.nodeType ||
                      11 === this.nodeType ||
                      9 === this.nodeType) &&
                      (this.textContent = e);
                  });
            },
            null,
            t,
            arguments.length
          );
        },
        append: function () {
          return zt(this, arguments, function (t) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              fe(this, t).appendChild(t);
          });
        },
        prepend: function () {
          return zt(this, arguments, function (t) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var e = fe(this, t);
              e.insertBefore(t, e.firstChild);
            }
          });
        },
        before: function () {
          return zt(this, arguments, function (t) {
            this.parentNode && this.parentNode.insertBefore(t, this);
          });
        },
        after: function () {
          return zt(this, arguments, function (t) {
            this.parentNode &&
              this.parentNode.insertBefore(t, this.nextSibling);
          });
        },
        empty: function () {
          for (var t, e = 0; null != (t = this[e]); e++)
            1 === t.nodeType && (s.cleanData(dt(t, !1)), (t.textContent = ""));
          return this;
        },
        clone: function (t, e) {
          return (
            (t = t ?? !1),
            (e = e ?? t),
            this.map(function () {
              return s.clone(this, t, e);
            })
          );
        },
        html: function (t) {
          return bt(
            this,
            function (e) {
              var i = this[0] || {},
                r = 0,
                o = this.length;
              if (void 0 === e && 1 === i.nodeType) return i.innerHTML;
              if (
                "string" == typeof e &&
                !qi.test(e) &&
                !gt[(ti.exec(e) || ["", ""])[1].toLowerCase()]
              ) {
                e = s.htmlPrefilter(e);
                try {
                  for (; r < o; r++)
                    1 === (i = this[r] || {}).nodeType &&
                      (s.cleanData(dt(i, !1)), (i.innerHTML = e));
                  i = 0;
                } catch {}
              }
              i && this.empty().append(e);
            },
            null,
            t,
            arguments.length
          );
        },
        replaceWith: function () {
          var t = [];
          return zt(
            this,
            arguments,
            function (e) {
              var i = this.parentNode;
              s.inArray(this, t) < 0 &&
                (s.cleanData(dt(this)), i && i.replaceChild(e, this));
            },
            t
          );
        },
      }),
      s.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (t, e) {
          s.fn[t] = function (i) {
            for (var r, o = [], a = s(i), c = a.length - 1, h = 0; h <= c; h++)
              (r = h === c ? this : this.clone(!0)),
                s(a[h])[e](r),
                ze.apply(o, r.get());
            return this.pushStack(o);
          };
        }
      );
    var An = new RegExp("^(" + Jn + ")(?!px)[a-z%]+$", "i"),
      Cn = /^--/,
      Je = function (t) {
        var e = t.ownerDocument.defaultView;
        return (!e || !e.opener) && (e = R), e.getComputedStyle(t);
      },
      ri = function (t, e, i) {
        var r,
          o,
          a = {};
        for (o in e) (a[o] = t.style[o]), (t.style[o] = e[o]);
        for (o in ((r = i.call(t)), e)) t.style[o] = a[o];
        return r;
      },
      Yi = new RegExp(Wt.join("|"), "i");
    function pe(t, e, i) {
      var r,
        o,
        a,
        c,
        h = Cn.test(e),
        f = t.style;
      return (
        (i = i || Je(t)) &&
          ((c = i.getPropertyValue(e) || i[e]),
          h && c && (c = c.replace(Se, "$1") || void 0),
          "" === c && !ue(t) && (c = s.style(t, e)),
          !P.pixelBoxStyles() &&
            An.test(c) &&
            Yi.test(e) &&
            ((r = f.width),
            (o = f.minWidth),
            (a = f.maxWidth),
            (f.minWidth = f.maxWidth = f.width = c),
            (c = i.width),
            (f.width = r),
            (f.minWidth = o),
            (f.maxWidth = a))),
        void 0 !== c ? c + "" : c
      );
    }
    function Pe(t, e) {
      return {
        get: function () {
          if (!t()) return (this.get = e).apply(this, arguments);
          delete this.get;
        },
      };
    }
    !(function () {
      function t() {
        if (_) {
          (f.style.cssText =
            "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
            (_.style.cssText =
              "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
            Ut.appendChild(f).appendChild(_);
          var v = R.getComputedStyle(_);
          (i = "1%" !== v.top),
            (h = 12 === e(v.marginLeft)),
            (_.style.right = "60%"),
            (a = 36 === e(v.right)),
            (r = 36 === e(v.width)),
            (_.style.position = "absolute"),
            (o = 12 === e(_.offsetWidth / 3)),
            Ut.removeChild(f),
            (_ = null);
        }
      }
      function e(v) {
        return Math.round(parseFloat(v));
      }
      var i,
        r,
        o,
        a,
        c,
        h,
        f = M.createElement("div"),
        _ = M.createElement("div");
      _.style &&
        ((_.style.backgroundClip = "content-box"),
        (_.cloneNode(!0).style.backgroundClip = ""),
        (P.clearCloneStyle = "content-box" === _.style.backgroundClip),
        s.extend(P, {
          boxSizingReliable: function () {
            return t(), r;
          },
          pixelBoxStyles: function () {
            return t(), a;
          },
          pixelPosition: function () {
            return t(), i;
          },
          reliableMarginLeft: function () {
            return t(), h;
          },
          scrollboxSize: function () {
            return t(), o;
          },
          reliableTrDimensions: function () {
            var v, T, m, S;
            return (
              null == c &&
                ((v = M.createElement("table")),
                (T = M.createElement("tr")),
                (m = M.createElement("div")),
                (v.style.cssText =
                  "position:absolute;left:-11111px;border-collapse:separate"),
                (T.style.cssText = "box-sizing:content-box;border:1px solid"),
                (T.style.height = "1px"),
                (m.style.height = "9px"),
                (m.style.display = "block"),
                Ut.appendChild(v).appendChild(T).appendChild(m),
                (S = R.getComputedStyle(T)),
                (c =
                  parseInt(S.height, 10) +
                    parseInt(S.borderTopWidth, 10) +
                    parseInt(S.borderBottomWidth, 10) ===
                  T.offsetHeight),
                Ut.removeChild(v)),
              c
            );
          },
        }));
    })();
    var si = ["Webkit", "Moz", "ms"],
      oi = M.createElement("div").style,
      ai = {};
    function Sn(t) {
      return (
        s.cssProps[t] ||
        ai[t] ||
        (t in oi
          ? t
          : (ai[t] =
              (function Ui(t) {
                for (
                  var e = t[0].toUpperCase() + t.slice(1), i = si.length;
                  i--;

                )
                  if ((t = si[i] + e) in oi) return t;
              })(t) || t))
      );
    }
    var ui = /^(none|table(?!-c[ea]).+)/,
      ci = { position: "absolute", visibility: "hidden", display: "block" },
      li = { letterSpacing: "0", fontWeight: "400" };
    function fi(t, e, i) {
      var r = xe.exec(e);
      return r ? Math.max(0, r[2] - (i || 0)) + (r[3] || "px") : e;
    }
    function Nn(t, e, i, r, o, a) {
      var c = "width" === e ? 1 : 0,
        h = 0,
        f = 0,
        _ = 0;
      if (i === (r ? "border" : "content")) return 0;
      for (; c < 4; c += 2)
        "margin" === i && (_ += s.css(t, i + Wt[c], !0, o)),
          r
            ? ("content" === i && (f -= s.css(t, "padding" + Wt[c], !0, o)),
              "margin" !== i &&
                (f -= s.css(t, "border" + Wt[c] + "Width", !0, o)))
            : ((f += s.css(t, "padding" + Wt[c], !0, o)),
              "padding" !== i
                ? (f += s.css(t, "border" + Wt[c] + "Width", !0, o))
                : (h += s.css(t, "border" + Wt[c] + "Width", !0, o)));
      return (
        !r &&
          a >= 0 &&
          (f +=
            Math.max(
              0,
              Math.ceil(
                t["offset" + e[0].toUpperCase() + e.slice(1)] - a - f - h - 0.5
              )
            ) || 0),
        f + _
      );
    }
    function di(t, e, i) {
      var r = Je(t),
        a =
          (!P.boxSizingReliable() || i) &&
          "border-box" === s.css(t, "boxSizing", !1, r),
        c = a,
        h = pe(t, e, r),
        f = "offset" + e[0].toUpperCase() + e.slice(1);
      if (An.test(h)) {
        if (!i) return h;
        h = "auto";
      }
      return (
        ((!P.boxSizingReliable() && a) ||
          (!P.reliableTrDimensions() && Y(t, "tr")) ||
          "auto" === h ||
          (!parseFloat(h) && "inline" === s.css(t, "display", !1, r))) &&
          t.getClientRects().length &&
          ((a = "border-box" === s.css(t, "boxSizing", !1, r)),
          (c = f in t) && (h = t[f])),
        (h = parseFloat(h) || 0) +
          Nn(t, e, i || (a ? "border" : "content"), c, r, h) +
          "px"
      );
    }
    function ht(t, e, i, r, o) {
      return new ht.prototype.init(t, e, i, r, o);
    }
    s.extend({
      cssHooks: {
        opacity: {
          get: function (t, e) {
            if (e) {
              var i = pe(t, "opacity");
              return "" === i ? "1" : i;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageSlice: !0,
        columnCount: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        scale: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
      },
      cssProps: {},
      style: function (t, e, i, r) {
        if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
          var o,
            a,
            c,
            h = Vt(e),
            f = Cn.test(e),
            _ = t.style;
          if (
            (f || (e = Sn(h)),
            (c = s.cssHooks[e] || s.cssHooks[h]),
            void 0 === i)
          )
            return c && "get" in c && void 0 !== (o = c.get(t, !1, r))
              ? o
              : _[e];
          if (
            ("string" == (a = typeof i) &&
              (o = xe.exec(i)) &&
              o[1] &&
              ((i = te(t, e, o)), (a = "number")),
            null == i || i != i)
          )
            return;
          "number" === a &&
            !f &&
            (i += (o && o[3]) || (s.cssNumber[h] ? "" : "px")),
            !P.clearCloneStyle &&
              "" === i &&
              0 === e.indexOf("background") &&
              (_[e] = "inherit"),
            (!c || !("set" in c) || void 0 !== (i = c.set(t, i, r))) &&
              (f ? _.setProperty(e, i) : (_[e] = i));
        }
      },
      css: function (t, e, i, r) {
        var o,
          a,
          c,
          h = Vt(e);
        return (
          Cn.test(e) || (e = Sn(h)),
          (c = s.cssHooks[e] || s.cssHooks[h]) &&
            "get" in c &&
            (o = c.get(t, !0, i)),
          void 0 === o && (o = pe(t, e, r)),
          "normal" === o && e in li && (o = li[e]),
          "" === i || i
            ? ((a = parseFloat(o)), !0 === i || isFinite(a) ? a || 0 : o)
            : o
        );
      },
    }),
      s.each(["height", "width"], function (t, e) {
        s.cssHooks[e] = {
          get: function (i, r, o) {
            if (r)
              return !ui.test(s.css(i, "display")) ||
                (i.getClientRects().length && i.getBoundingClientRect().width)
                ? di(i, e, o)
                : ri(i, ci, function () {
                    return di(i, e, o);
                  });
          },
          set: function (i, r, o) {
            var a,
              c = Je(i),
              h = !P.scrollboxSize() && "absolute" === c.position,
              _ = (h || o) && "border-box" === s.css(i, "boxSizing", !1, c),
              v = o ? Nn(i, e, o, _, c) : 0;
            return (
              _ &&
                h &&
                (v -= Math.ceil(
                  i["offset" + e[0].toUpperCase() + e.slice(1)] -
                    parseFloat(c[e]) -
                    Nn(i, e, "border", !1, c) -
                    0.5
                )),
              v &&
                (a = xe.exec(r)) &&
                "px" !== (a[3] || "px") &&
                ((i.style[e] = r), (r = s.css(i, e))),
              fi(0, r, v)
            );
          },
        };
      }),
      (s.cssHooks.marginLeft = Pe(P.reliableMarginLeft, function (t, e) {
        if (e)
          return (
            (parseFloat(pe(t, "marginLeft")) ||
              t.getBoundingClientRect().left -
                ri(t, { marginLeft: 0 }, function () {
                  return t.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      s.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
        (s.cssHooks[t + e] = {
          expand: function (i) {
            for (
              var r = 0, o = {}, a = "string" == typeof i ? i.split(" ") : [i];
              r < 4;
              r++
            )
              o[t + Wt[r] + e] = a[r] || a[r - 2] || a[0];
            return o;
          },
        }),
          "margin" !== t && (s.cssHooks[t + e].set = fi);
      }),
      s.fn.extend({
        css: function (t, e) {
          return bt(
            this,
            function (i, r, o) {
              var a,
                c,
                h = {},
                f = 0;
              if (Array.isArray(r)) {
                for (a = Je(i), c = r.length; f < c; f++)
                  h[r[f]] = s.css(i, r[f], !1, a);
                return h;
              }
              return void 0 !== o ? s.style(i, r, o) : s.css(i, r);
            },
            t,
            e,
            arguments.length > 1
          );
        },
      }),
      (s.Tween = ht),
      (ht.prototype = {
        constructor: ht,
        init: function (t, e, i, r, o, a) {
          (this.elem = t),
            (this.prop = i),
            (this.easing = o || s.easing._default),
            (this.options = e),
            (this.start = this.now = this.cur()),
            (this.end = r),
            (this.unit = a || (s.cssNumber[i] ? "" : "px"));
        },
        cur: function () {
          var t = ht.propHooks[this.prop];
          return t && t.get ? t.get(this) : ht.propHooks._default.get(this);
        },
        run: function (t) {
          var e,
            i = ht.propHooks[this.prop];
          return (
            (this.pos = e =
              this.options.duration
                ? s.easing[this.easing](
                    t,
                    this.options.duration * t,
                    0,
                    1,
                    this.options.duration
                  )
                : t),
            (this.now = (this.end - this.start) * e + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            i && i.set ? i.set(this) : ht.propHooks._default.set(this),
            this
          );
        },
      }),
      (ht.prototype.init.prototype = ht.prototype),
      (ht.propHooks = {
        _default: {
          get: function (t) {
            var e;
            return 1 !== t.elem.nodeType ||
              (null != t.elem[t.prop] && null == t.elem.style[t.prop])
              ? t.elem[t.prop]
              : (e = s.css(t.elem, t.prop, "")) && "auto" !== e
              ? e
              : 0;
          },
          set: function (t) {
            s.fx.step[t.prop]
              ? s.fx.step[t.prop](t)
              : 1 !== t.elem.nodeType ||
                (!s.cssHooks[t.prop] && null == t.elem.style[Sn(t.prop)])
              ? (t.elem[t.prop] = t.now)
              : s.style(t.elem, t.prop, t.now + t.unit);
          },
        },
      }),
      (ht.propHooks.scrollTop = ht.propHooks.scrollLeft =
        {
          set: function (t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
          },
        }),
      (s.easing = {
        linear: function (t) {
          return t;
        },
        swing: function (t) {
          return 0.5 - Math.cos(t * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (s.fx = ht.prototype.init),
      (s.fx.step = {});
    var ge,
      Ze,
      zi = /^(?:toggle|show|hide)$/,
      _e = /queueHooks$/;
    function wn() {
      Ze &&
        (!1 === M.hidden && R.requestAnimationFrame
          ? R.requestAnimationFrame(wn)
          : R.setTimeout(wn, s.fx.interval),
        s.fx.tick());
    }
    function Gi() {
      return (
        R.setTimeout(function () {
          ge = void 0;
        }),
        (ge = Date.now())
      );
    }
    function Gt(t, e) {
      var i,
        r = 0,
        o = { height: t };
      for (e = e ? 1 : 0; r < 4; r += 2 - e)
        o["margin" + (i = Wt[r])] = o["padding" + i] = t;
      return e && (o.opacity = o.width = t), o;
    }
    function hi(t, e, i) {
      for (
        var r,
          o = (Tt.tweeners[e] || []).concat(Tt.tweeners["*"]),
          a = 0,
          c = o.length;
        a < c;
        a++
      )
        if ((r = o[a].call(i, e, t))) return r;
    }
    function Tt(t, e, i) {
      var r,
        o,
        a = 0,
        c = Tt.prefilters.length,
        h = s.Deferred().always(function () {
          delete f.elem;
        }),
        f = function () {
          if (o) return !1;
          for (
            var T = ge || Gi(),
              m = Math.max(0, _.startTime + _.duration - T),
              V = 1 - (m / _.duration || 0),
              U = 0,
              q = _.tweens.length;
            U < q;
            U++
          )
            _.tweens[U].run(V);
          return (
            h.notifyWith(t, [_, V, m]),
            V < 1 && q
              ? m
              : (q || h.notifyWith(t, [_, 1, 0]), h.resolveWith(t, [_]), !1)
          );
        },
        _ = h.promise({
          elem: t,
          props: s.extend({}, e),
          opts: s.extend(
            !0,
            { specialEasing: {}, easing: s.easing._default },
            i
          ),
          originalProperties: e,
          originalOptions: i,
          startTime: ge || Gi(),
          duration: i.duration,
          tweens: [],
          createTween: function (T, m) {
            var S = s.Tween(
              t,
              _.opts,
              T,
              m,
              _.opts.specialEasing[T] || _.opts.easing
            );
            return _.tweens.push(S), S;
          },
          stop: function (T) {
            var m = 0,
              S = T ? _.tweens.length : 0;
            if (o) return this;
            for (o = !0; m < S; m++) _.tweens[m].run(1);
            return (
              T
                ? (h.notifyWith(t, [_, 1, 0]), h.resolveWith(t, [_, T]))
                : h.rejectWith(t, [_, T]),
              this
            );
          },
        }),
        v = _.props;
      for (
        (function Qi(t, e) {
          var i, r, o, a, c;
          for (i in t)
            if (
              ((o = e[(r = Vt(i))]),
              (a = t[i]),
              Array.isArray(a) && ((o = a[1]), (a = t[i] = a[0])),
              i !== r && ((t[r] = a), delete t[i]),
              (c = s.cssHooks[r]) && ("expand" in c))
            )
              for (i in ((a = c.expand(a)), delete t[r], a))
                (i in t) || ((t[i] = a[i]), (e[i] = o));
            else e[r] = o;
        })(v, _.opts.specialEasing);
        a < c;
        a++
      )
        if ((r = Tt.prefilters[a].call(_, t, v, _.opts)))
          return (
            H(r.stop) &&
              (s._queueHooks(_.elem, _.opts.queue).stop = r.stop.bind(r)),
            r
          );
      return (
        s.map(v, hi, _),
        H(_.opts.start) && _.opts.start.call(t, _),
        _.progress(_.opts.progress)
          .done(_.opts.done, _.opts.complete)
          .fail(_.opts.fail)
          .always(_.opts.always),
        s.fx.timer(s.extend(f, { elem: t, anim: _, queue: _.opts.queue })),
        _
      );
    }
    (s.Animation = s.extend(Tt, {
      tweeners: {
        "*": [
          function (t, e) {
            var i = this.createTween(t, e);
            return te(i.elem, t, xe.exec(e), i), i;
          },
        ],
      },
      tweener: function (t, e) {
        H(t) ? ((e = t), (t = ["*"])) : (t = t.match(C));
        for (var i, r = 0, o = t.length; r < o; r++)
          (Tt.tweeners[(i = t[r])] = Tt.tweeners[i] || []).unshift(e);
      },
      prefilters: [
        function Xi(t, e, i) {
          var r,
            o,
            a,
            c,
            h,
            f,
            _,
            v,
            T = "width" in e || "height" in e,
            m = this,
            S = {},
            V = t.style,
            U = t.nodeType && Qe(t),
            q = I.get(t, "fxshow");
          for (r in (i.queue ||
            (null == (c = s._queueHooks(t, "fx")).unqueued &&
              ((c.unqueued = 0),
              (h = c.empty.fire),
              (c.empty.fire = function () {
                c.unqueued || h();
              })),
            c.unqueued++,
            m.always(function () {
              m.always(function () {
                c.unqueued--, s.queue(t, "fx").length || c.empty.fire();
              });
            })),
          e))
            if (zi.test((o = e[r]))) {
              if (
                (delete e[r],
                (a = a || "toggle" === o),
                o === (U ? "hide" : "show"))
              ) {
                if ("show" !== o || !q || void 0 === q[r]) continue;
                U = !0;
              }
              S[r] = (q && q[r]) || s.style(t, r);
            }
          if ((f = !s.isEmptyObject(e)) || !s.isEmptyObject(S))
            for (r in (T &&
              1 === t.nodeType &&
              ((i.overflow = [V.overflow, V.overflowX, V.overflowY]),
              null == (_ = q && q.display) && (_ = I.get(t, "display")),
              "none" === (v = s.css(t, "display")) &&
                (_
                  ? (v = _)
                  : (ce([t], !0),
                    (_ = t.style.display || _),
                    (v = s.css(t, "display")),
                    ce([t]))),
              ("inline" === v || ("inline-block" === v && null != _)) &&
                "none" === s.css(t, "float") &&
                (f ||
                  (m.done(function () {
                    V.display = _;
                  }),
                  null == _ && (_ = "none" === (v = V.display) ? "" : v)),
                (V.display = "inline-block"))),
            i.overflow &&
              ((V.overflow = "hidden"),
              m.always(function () {
                (V.overflow = i.overflow[0]),
                  (V.overflowX = i.overflow[1]),
                  (V.overflowY = i.overflow[2]);
              })),
            (f = !1),
            S))
              f ||
                (q
                  ? "hidden" in q && (U = q.hidden)
                  : (q = I.access(t, "fxshow", { display: _ })),
                a && (q.hidden = !U),
                U && ce([t], !0),
                m.done(function () {
                  for (r in (U || ce([t]), I.remove(t, "fxshow"), S))
                    s.style(t, r, S[r]);
                })),
                (f = hi(U ? q[r] : 0, r, m)),
                r in q ||
                  ((q[r] = f.start), U && ((f.end = f.start), (f.start = 0)));
        },
      ],
      prefilter: function (t, e) {
        e ? Tt.prefilters.unshift(t) : Tt.prefilters.push(t);
      },
    })),
      (s.speed = function (t, e, i) {
        var r =
          t && "object" == typeof t
            ? s.extend({}, t)
            : {
                complete: i || (!i && e) || (H(t) && t),
                duration: t,
                easing: (i && e) || (e && !H(e) && e),
              };
        return (
          s.fx.off
            ? (r.duration = 0)
            : "number" != typeof r.duration &&
              (r.duration =
                r.duration in s.fx.speeds
                  ? s.fx.speeds[r.duration]
                  : s.fx.speeds._default),
          (null == r.queue || !0 === r.queue) && (r.queue = "fx"),
          (r.old = r.complete),
          (r.complete = function () {
            H(r.old) && r.old.call(this), r.queue && s.dequeue(this, r.queue);
          }),
          r
        );
      }),
      s.fn.extend({
        fadeTo: function (t, e, i, r) {
          return this.filter(Qe)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: e }, t, i, r);
        },
        animate: function (t, e, i, r) {
          var o = s.isEmptyObject(t),
            a = s.speed(e, i, r),
            c = function () {
              var h = Tt(this, s.extend({}, t), a);
              (o || I.get(this, "finish")) && h.stop(!0);
            };
          return (
            (c.finish = c),
            o || !1 === a.queue ? this.each(c) : this.queue(a.queue, c)
          );
        },
        stop: function (t, e, i) {
          var r = function (o) {
            var a = o.stop;
            delete o.stop, a(i);
          };
          return (
            "string" != typeof t && ((i = e), (e = t), (t = void 0)),
            e && this.queue(t || "fx", []),
            this.each(function () {
              var o = !0,
                a = null != t && t + "queueHooks",
                c = s.timers,
                h = I.get(this);
              if (a) h[a] && h[a].stop && r(h[a]);
              else for (a in h) h[a] && h[a].stop && _e.test(a) && r(h[a]);
              for (a = c.length; a--; )
                c[a].elem === this &&
                  (null == t || c[a].queue === t) &&
                  (c[a].anim.stop(i), (o = !1), c.splice(a, 1));
              (o || !i) && s.dequeue(this, t);
            })
          );
        },
        finish: function (t) {
          return (
            !1 !== t && (t = t || "fx"),
            this.each(function () {
              var e,
                i = I.get(this),
                r = i[t + "queue"],
                o = i[t + "queueHooks"],
                a = s.timers,
                c = r ? r.length : 0;
              for (
                i.finish = !0,
                  s.queue(this, t, []),
                  o && o.stop && o.stop.call(this, !0),
                  e = a.length;
                e--;

              )
                a[e].elem === this &&
                  a[e].queue === t &&
                  (a[e].anim.stop(!0), a.splice(e, 1));
              for (e = 0; e < c; e++)
                r[e] && r[e].finish && r[e].finish.call(this);
              delete i.finish;
            })
          );
        },
      }),
      s.each(["toggle", "show", "hide"], function (t, e) {
        var i = s.fn[e];
        s.fn[e] = function (r, o, a) {
          return null == r || "boolean" == typeof r
            ? i.apply(this, arguments)
            : this.animate(Gt(e, !0), r, o, a);
        };
      }),
      s.each(
        {
          slideDown: Gt("show"),
          slideUp: Gt("hide"),
          slideToggle: Gt("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (t, e) {
          s.fn[t] = function (i, r, o) {
            return this.animate(e, i, r, o);
          };
        }
      ),
      (s.timers = []),
      (s.fx.tick = function () {
        var t,
          e = 0,
          i = s.timers;
        for (ge = Date.now(); e < i.length; e++)
          !(t = i[e])() && i[e] === t && i.splice(e--, 1);
        i.length || s.fx.stop(), (ge = void 0);
      }),
      (s.fx.timer = function (t) {
        s.timers.push(t), s.fx.start();
      }),
      (s.fx.interval = 13),
      (s.fx.start = function () {
        Ze || ((Ze = !0), wn());
      }),
      (s.fx.stop = function () {
        Ze = null;
      }),
      (s.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (s.fn.delay = function (t, e) {
        return (
          (t = (s.fx && s.fx.speeds[t]) || t),
          this.queue((e = e || "fx"), function (i, r) {
            var o = R.setTimeout(i, t);
            r.stop = function () {
              R.clearTimeout(o);
            };
          })
        );
      }),
      (function () {
        var t = M.createElement("input"),
          i = M.createElement("select").appendChild(M.createElement("option"));
        (t.type = "checkbox"),
          (P.checkOn = "" !== t.value),
          (P.optSelected = i.selected),
          ((t = M.createElement("input")).value = "t"),
          (t.type = "radio"),
          (P.radioValue = "t" === t.value);
      })();
    var pi,
      Re = s.expr.attrHandle;
    s.fn.extend({
      attr: function (t, e) {
        return bt(this, s.attr, t, e, arguments.length > 1);
      },
      removeAttr: function (t) {
        return this.each(function () {
          s.removeAttr(this, t);
        });
      },
    }),
      s.extend({
        attr: function (t, e, i) {
          var r,
            o,
            a = t.nodeType;
          if (3 !== a && 8 !== a && 2 !== a)
            return typeof t.getAttribute > "u"
              ? s.prop(t, e, i)
              : ((1 !== a || !s.isXMLDoc(t)) &&
                  (o =
                    s.attrHooks[e.toLowerCase()] ||
                    (s.expr.match.bool.test(e) ? pi : void 0)),
                void 0 !== i
                  ? null === i
                    ? void s.removeAttr(t, e)
                    : o && "set" in o && void 0 !== (r = o.set(t, i, e))
                    ? r
                    : (t.setAttribute(e, i + ""), i)
                  : o && "get" in o && null !== (r = o.get(t, e))
                  ? r
                  : (r = s.find.attr(t, e)) ?? void 0);
        },
        attrHooks: {
          type: {
            set: function (t, e) {
              if (!P.radioValue && "radio" === e && Y(t, "input")) {
                var i = t.value;
                return t.setAttribute("type", e), i && (t.value = i), e;
              }
            },
          },
        },
        removeAttr: function (t, e) {
          var i,
            r = 0,
            o = e && e.match(C);
          if (o && 1 === t.nodeType)
            for (; (i = o[r++]); ) t.removeAttribute(i);
        },
      }),
      (pi = {
        set: function (t, e, i) {
          return !1 === e ? s.removeAttr(t, i) : t.setAttribute(i, i), i;
        },
      }),
      s.each(s.expr.match.bool.source.match(/\w+/g), function (t, e) {
        var i = Re[e] || s.find.attr;
        Re[e] = function (r, o, a) {
          var c,
            h,
            f = o.toLowerCase();
          return (
            a ||
              ((h = Re[f]),
              (Re[f] = c),
              (c = null != i(r, o, a) ? f : null),
              (Re[f] = h)),
            c
          );
        };
      });
    var Dn = /^(?:input|select|textarea|button)$/i,
      me = /^(?:a|area)$/i;
    function Lt(t) {
      return (t.match(C) || []).join(" ");
    }
    function ee(t) {
      return (t.getAttribute && t.getAttribute("class")) || "";
    }
    function xn(t) {
      return Array.isArray(t) ? t : ("string" == typeof t && t.match(C)) || [];
    }
    s.fn.extend({
      prop: function (t, e) {
        return bt(this, s.prop, t, e, arguments.length > 1);
      },
      removeProp: function (t) {
        return this.each(function () {
          delete this[s.propFix[t] || t];
        });
      },
    }),
      s.extend({
        prop: function (t, e, i) {
          var r,
            o,
            a = t.nodeType;
          if (3 !== a && 8 !== a && 2 !== a)
            return (
              (1 !== a || !s.isXMLDoc(t)) &&
                (o = s.propHooks[(e = s.propFix[e] || e)]),
              void 0 !== i
                ? o && "set" in o && void 0 !== (r = o.set(t, i, e))
                  ? r
                  : (t[e] = i)
                : o && "get" in o && null !== (r = o.get(t, e))
                ? r
                : t[e]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (t) {
              var e = s.find.attr(t, "tabindex");
              return e
                ? parseInt(e, 10)
                : Dn.test(t.nodeName) || (me.test(t.nodeName) && t.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      P.optSelected ||
        (s.propHooks.selected = {
          get: function (t) {
            return null;
          },
          set: function (t) {},
        }),
      s.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          s.propFix[this.toLowerCase()] = this;
        }
      ),
      s.fn.extend({
        addClass: function (t) {
          var e, i, r, o, a, c;
          return H(t)
            ? this.each(function (h) {
                s(this).addClass(t.call(this, h, ee(this)));
              })
            : (e = xn(t)).length
            ? this.each(function () {
                if (
                  ((r = ee(this)),
                  (i = 1 === this.nodeType && " " + Lt(r) + " "))
                ) {
                  for (a = 0; a < e.length; a++)
                    i.indexOf(" " + (o = e[a]) + " ") < 0 && (i += o + " ");
                  (c = Lt(i)), r !== c && this.setAttribute("class", c);
                }
              })
            : this;
        },
        removeClass: function (t) {
          var e, i, r, o, a, c;
          return H(t)
            ? this.each(function (h) {
                s(this).removeClass(t.call(this, h, ee(this)));
              })
            : arguments.length
            ? (e = xn(t)).length
              ? this.each(function () {
                  if (
                    ((r = ee(this)),
                    (i = 1 === this.nodeType && " " + Lt(r) + " "))
                  ) {
                    for (a = 0; a < e.length; a++)
                      for (o = e[a]; i.indexOf(" " + o + " ") > -1; )
                        i = i.replace(" " + o + " ", " ");
                    (c = Lt(i)), r !== c && this.setAttribute("class", c);
                  }
                })
              : this
            : this.attr("class", "");
        },
        toggleClass: function (t, e) {
          var i,
            r,
            o,
            a,
            c = typeof t,
            h = "string" === c || Array.isArray(t);
          return H(t)
            ? this.each(function (f) {
                s(this).toggleClass(t.call(this, f, ee(this), e), e);
              })
            : "boolean" == typeof e && h
            ? e
              ? this.addClass(t)
              : this.removeClass(t)
            : ((i = xn(t)),
              this.each(function () {
                if (h)
                  for (a = s(this), o = 0; o < i.length; o++)
                    a.hasClass((r = i[o])) ? a.removeClass(r) : a.addClass(r);
                else
                  (void 0 === t || "boolean" === c) &&
                    ((r = ee(this)) && I.set(this, "__className__", r),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        r || !1 === t ? "" : I.get(this, "__className__") || ""
                      ));
              }));
        },
        hasClass: function (t) {
          var e,
            i,
            r = 0;
          for (e = " " + t + " "; (i = this[r++]); )
            if (1 === i.nodeType && (" " + Lt(ee(i)) + " ").indexOf(e) > -1)
              return !0;
          return !1;
        },
      });
    var Ji = /\r/g;
    s.fn.extend({
      val: function (t) {
        var e,
          i,
          r,
          o = this[0];
        return arguments.length
          ? ((r = H(t)),
            this.each(function (a) {
              var c;
              1 === this.nodeType &&
                (null == (c = r ? t.call(this, a, s(this).val()) : t)
                  ? (c = "")
                  : "number" == typeof c
                  ? (c += "")
                  : Array.isArray(c) &&
                    (c = s.map(c, function (h) {
                      return null == h ? "" : h + "";
                    })),
                (!(e =
                  s.valHooks[this.type] ||
                  s.valHooks[this.nodeName.toLowerCase()]) ||
                  !("set" in e) ||
                  void 0 === e.set(this, c, "value")) &&
                  (this.value = c));
            }))
          : o
          ? (e = s.valHooks[o.type] || s.valHooks[o.nodeName.toLowerCase()]) &&
            "get" in e &&
            void 0 !== (i = e.get(o, "value"))
            ? i
            : "string" == typeof (i = o.value)
            ? i.replace(Ji, "")
            : i ?? ""
          : void 0;
      },
    }),
      s.extend({
        valHooks: {
          option: {
            get: function (t) {
              return s.find.attr(t, "value") ?? Lt(s.text(t));
            },
          },
          select: {
            get: function (t) {
              var e,
                i,
                r,
                o = t.options,
                a = t.selectedIndex,
                c = "select-one" === t.type,
                h = c ? null : [],
                f = c ? a + 1 : o.length;
              for (r = a < 0 ? f : c ? a : 0; r < f; r++)
                if (
                  ((i = o[r]).selected || r === a) &&
                  !i.disabled &&
                  (!i.parentNode.disabled || !Y(i.parentNode, "optgroup"))
                ) {
                  if (((e = s(i).val()), c)) return e;
                  h.push(e);
                }
              return h;
            },
            set: function (t, e) {
              for (
                var i, r, o = t.options, a = s.makeArray(e), c = o.length;
                c--;

              )
                ((r = o[c]).selected =
                  s.inArray(s.valHooks.option.get(r), a) > -1) && (i = !0);
              return i || (t.selectedIndex = -1), a;
            },
          },
        },
      }),
      s.each(["radio", "checkbox"], function () {
        (s.valHooks[this] = {
          set: function (t, e) {
            if (Array.isArray(e))
              return (t.checked = s.inArray(s(t).val(), e) > -1);
          },
        }),
          P.checkOn ||
            (s.valHooks[this].get = function (t) {
              return null === t.getAttribute("value") ? "on" : t.value;
            });
      });
    var He = R.location,
      gi = { guid: Date.now() },
      On = /\?/;
    s.parseXML = function (t) {
      var e, i;
      if (!t || "string" != typeof t) return null;
      try {
        e = new R.DOMParser().parseFromString(t, "text/xml");
      } catch {}
      return (
        (i = e && e.getElementsByTagName("parsererror")[0]),
        (!e || i) &&
          s.error(
            "Invalid XML: " +
              (i
                ? s
                    .map(i.childNodes, function (r) {
                      return r.textContent;
                    })
                    .join("\n")
                : t)
          ),
        e
      );
    };
    var tn = /^(?:focusinfocus|focusoutblur)$/,
      _i = function (t) {
        t.stopPropagation();
      };
    s.extend(s.event, {
      trigger: function (t, e, i, r) {
        var o,
          a,
          c,
          h,
          f,
          _,
          v,
          T,
          m = [i || M],
          S = Ae.call(t, "type") ? t.type : t,
          V = Ae.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((a = T = c = i = i || M),
          3 !== i.nodeType &&
            8 !== i.nodeType &&
            !tn.test(S + s.event.triggered) &&
            (S.indexOf(".") > -1 &&
              ((V = S.split(".")), (S = V.shift()), V.sort()),
            (f = S.indexOf(":") < 0 && "on" + S),
            ((t = t[s.expando]
              ? t
              : new s.Event(S, "object" == typeof t && t)).isTrigger = r
              ? 2
              : 3),
            (t.namespace = V.join(".")),
            (t.rnamespace = t.namespace
              ? new RegExp("(^|\\.)" + V.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = void 0),
            t.target || (t.target = i),
            (e = null == e ? [t] : s.makeArray(e, [t])),
            (v = s.event.special[S] || {}),
            r || !v.trigger || !1 !== v.trigger.apply(i, e)))
        ) {
          if (!r && !v.noBubble && !vt(i)) {
            for (
              tn.test((h = v.delegateType || S) + S) || (a = a.parentNode);
              a;
              a = a.parentNode
            )
              m.push(a), (c = a);
            c === (i.ownerDocument || M) &&
              m.push(c.defaultView || c.parentWindow || R);
          }
          for (o = 0; (a = m[o++]) && !t.isPropagationStopped(); )
            (T = a),
              (t.type = o > 1 ? h : v.bindType || S),
              (_ =
                (I.get(a, "events") || Object.create(null))[t.type] &&
                I.get(a, "handle")) && _.apply(a, e),
              (_ = f && a[f]) &&
                _.apply &&
                ae(a) &&
                ((t.result = _.apply(a, e)),
                !1 === t.result && t.preventDefault());
          return (
            (t.type = S),
            !r &&
              !t.isDefaultPrevented() &&
              (!v._default || !1 === v._default.apply(m.pop(), e)) &&
              ae(i) &&
              f &&
              H(i[S]) &&
              !vt(i) &&
              ((c = i[f]) && (i[f] = null),
              (s.event.triggered = S),
              t.isPropagationStopped() && T.addEventListener(S, _i),
              i[S](),
              t.isPropagationStopped() && T.removeEventListener(S, _i),
              (s.event.triggered = void 0),
              c && (i[f] = c)),
            t.result
          );
        }
      },
      simulate: function (t, e, i) {
        var r = s.extend(new s.Event(), i, { type: t, isSimulated: !0 });
        s.event.trigger(r, null, e);
      },
    }),
      s.fn.extend({
        trigger: function (t, e) {
          return this.each(function () {
            s.event.trigger(t, e, this);
          });
        },
        triggerHandler: function (t, e) {
          var i = this[0];
          if (i) return s.event.trigger(t, e, i, !0);
        },
      });
    var Zi = /\[\]$/,
      ne = /\r?\n/g,
      mi = /^(?:submit|button|image|reset|file)$/i,
      yr = /^(?:input|select|textarea|keygen)/i;
    function qt(t, e, i, r) {
      var o;
      if (Array.isArray(e))
        s.each(e, function (a, c) {
          i || Zi.test(t)
            ? r(t, c)
            : qt(
                t + "[" + ("object" == typeof c && null != c ? a : "") + "]",
                c,
                i,
                r
              );
        });
      else if (i || "object" !== wt(e)) r(t, e);
      else for (o in e) qt(t + "[" + o + "]", e[o], i, r);
    }
    (s.param = function (t, e) {
      var i,
        r = [],
        o = function (a, c) {
          var h = H(c) ? c() : c;
          r[r.length] =
            encodeURIComponent(a) + "=" + encodeURIComponent(h ?? "");
        };
      if (null == t) return "";
      if (Array.isArray(t) || (t.jquery && !s.isPlainObject(t)))
        s.each(t, function () {
          o(this.name, this.value);
        });
      else for (i in t) qt(i, t[i], e, o);
      return r.join("&");
    }),
      s.fn.extend({
        serialize: function () {
          return s.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var t = s.prop(this, "elements");
            return t ? s.makeArray(t) : this;
          })
            .filter(function () {
              var t = this.type;
              return (
                this.name &&
                !s(this).is(":disabled") &&
                yr.test(this.nodeName) &&
                !mi.test(t) &&
                (this.checked || !Le.test(t))
              );
            })
            .map(function (t, e) {
              var i = s(this).val();
              return null == i
                ? null
                : Array.isArray(i)
                ? s.map(i, function (r) {
                    return { name: e.name, value: r.replace(ne, "\r\n") };
                  })
                : { name: e.name, value: i.replace(ne, "\r\n") };
            })
            .get();
        },
      });
    var Ln = /%20/g,
      tr = /#.*$/,
      Ei = /([?&])_=[^&]*/,
      er = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      nr = /^(?:GET|HEAD)$/,
      ir = /^\/\//,
      vi = {},
      In = {},
      bi = "*/".concat("*"),
      en = M.createElement("a");
    function $n(t) {
      return function (e, i) {
        "string" != typeof e && ((i = e), (e = "*"));
        var r,
          o = 0,
          a = e.toLowerCase().match(C) || [];
        if (H(i))
          for (; (r = a[o++]); )
            "+" === r[0]
              ? ((r = r.slice(1) || "*"), (t[r] = t[r] || []).unshift(i))
              : (t[r] = t[r] || []).push(i);
      };
    }
    function Ti(t, e, i, r) {
      var o = {},
        a = t === In;
      function c(h) {
        var f;
        return (
          (o[h] = !0),
          s.each(t[h] || [], function (_, v) {
            var T = v(e, i, r);
            return "string" != typeof T || a || o[T]
              ? a
                ? !(f = T)
                : void 0
              : (e.dataTypes.unshift(T), c(T), !1);
          }),
          f
        );
      }
      return c(e.dataTypes[0]) || (!o["*"] && c("*"));
    }
    function Xt(t, e) {
      var i,
        r,
        o = s.ajaxSettings.flatOptions || {};
      for (i in e) void 0 !== e[i] && ((o[i] ? t : r || (r = {}))[i] = e[i]);
      return r && s.extend(!0, t, r), t;
    }
    (en.href = He.href),
      s.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: He.href,
          type: "GET",
          isLocal:
            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
              He.protocol
            ),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": bi,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": s.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (t, e) {
          return e ? Xt(Xt(t, s.ajaxSettings), e) : Xt(s.ajaxSettings, t);
        },
        ajaxPrefilter: $n(vi),
        ajaxTransport: $n(In),
        ajax: function (t, e) {
          "object" == typeof t && ((e = t), (t = void 0));
          var i,
            r,
            o,
            a,
            c,
            h,
            f,
            _,
            v,
            T,
            m = s.ajaxSetup({}, (e = e || {})),
            S = m.context || m,
            V = m.context && (S.nodeType || S.jquery) ? s(S) : s.event,
            U = s.Deferred(),
            q = s.Callbacks("once memory"),
            nt = m.statusCode || {},
            et = {},
            At = {},
            It = "canceled",
            z = {
              readyState: 0,
              getResponseHeader: function (G) {
                var Z;
                if (f) {
                  if (!a)
                    for (a = {}; (Z = er.exec(o)); )
                      a[Z[1].toLowerCase() + " "] = (
                        a[Z[1].toLowerCase() + " "] || []
                      ).concat(Z[2]);
                  Z = a[G.toLowerCase() + " "];
                }
                return null == Z ? null : Z.join(", ");
              },
              getAllResponseHeaders: function () {
                return f ? o : null;
              },
              setRequestHeader: function (G, Z) {
                return (
                  null == f &&
                    ((G = At[G.toLowerCase()] = At[G.toLowerCase()] || G),
                    (et[G] = Z)),
                  this
                );
              },
              overrideMimeType: function (G) {
                return null == f && (m.mimeType = G), this;
              },
              statusCode: function (G) {
                var Z;
                if (G)
                  if (f) z.always(G[z.status]);
                  else for (Z in G) nt[Z] = [nt[Z], G[Z]];
                return this;
              },
              abort: function (G) {
                var Z = G || It;
                return i && i.abort(Z), $t(0, Z), this;
              },
            };
          if (
            (U.promise(z),
            (m.url = ((t || m.url || He.href) + "").replace(
              ir,
              He.protocol + "//"
            )),
            (m.type = e.method || e.type || m.method || m.type),
            (m.dataTypes = (m.dataType || "*").toLowerCase().match(C) || [""]),
            null == m.crossDomain)
          ) {
            h = M.createElement("a");
            try {
              (h.href = m.url),
                (h.href = h.href),
                (m.crossDomain =
                  en.protocol + "//" + en.host != h.protocol + "//" + h.host);
            } catch {
              m.crossDomain = !0;
            }
          }
          if (
            (m.data &&
              m.processData &&
              "string" != typeof m.data &&
              (m.data = s.param(m.data, m.traditional)),
            Ti(vi, m, e, z),
            f)
          )
            return z;
          for (v in ((_ = s.event && m.global) &&
            0 == s.active++ &&
            s.event.trigger("ajaxStart"),
          (m.type = m.type.toUpperCase()),
          (m.hasContent = !nr.test(m.type)),
          (r = m.url.replace(tr, "")),
          m.hasContent
            ? m.data &&
              m.processData &&
              0 ===
                (m.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              (m.data = m.data.replace(Ln, "+"))
            : ((T = m.url.slice(r.length)),
              m.data &&
                (m.processData || "string" == typeof m.data) &&
                ((r += (On.test(r) ? "&" : "?") + m.data), delete m.data),
              !1 === m.cache &&
                ((r = r.replace(Ei, "$1")),
                (T = (On.test(r) ? "&" : "?") + "_=" + gi.guid++ + T)),
              (m.url = r + T)),
          m.ifModified &&
            (s.lastModified[r] &&
              z.setRequestHeader("If-Modified-Since", s.lastModified[r]),
            s.etag[r] && z.setRequestHeader("If-None-Match", s.etag[r])),
          ((m.data && m.hasContent && !1 !== m.contentType) || e.contentType) &&
            z.setRequestHeader("Content-Type", m.contentType),
          z.setRequestHeader(
            "Accept",
            m.dataTypes[0] && m.accepts[m.dataTypes[0]]
              ? m.accepts[m.dataTypes[0]] +
                  ("*" !== m.dataTypes[0] ? ", " + bi + "; q=0.01" : "")
              : m.accepts["*"]
          ),
          m.headers))
            z.setRequestHeader(v, m.headers[v]);
          if (m.beforeSend && (!1 === m.beforeSend.call(S, z, m) || f))
            return z.abort();
          if (
            ((It = "abort"),
            q.add(m.complete),
            z.done(m.success),
            z.fail(m.error),
            (i = Ti(In, m, e, z)))
          ) {
            if (((z.readyState = 1), _ && V.trigger("ajaxSend", [z, m]), f))
              return z;
            m.async &&
              m.timeout > 0 &&
              (c = R.setTimeout(function () {
                z.abort("timeout");
              }, m.timeout));
            try {
              (f = !1), i.send(et, $t);
            } catch (G) {
              if (f) throw G;
              $t(-1, G);
            }
          } else $t(-1, "No Transport");
          function $t(G, Z, Ve, kn) {
            var Ct,
              We,
              kt,
              Bt,
              Kt,
              pt = Z;
            f ||
              ((f = !0),
              c && R.clearTimeout(c),
              (i = void 0),
              (o = kn || ""),
              (z.readyState = G > 0 ? 4 : 0),
              (Ct = (G >= 200 && G < 300) || 304 === G),
              Ve &&
                (Bt = (function rr(t, e, i) {
                  for (
                    var r, o, a, c, h = t.contents, f = t.dataTypes;
                    "*" === f[0];

                  )
                    f.shift(),
                      void 0 === r &&
                        (r = t.mimeType || e.getResponseHeader("Content-Type"));
                  if (r)
                    for (o in h)
                      if (h[o] && h[o].test(r)) {
                        f.unshift(o);
                        break;
                      }
                  if (f[0] in i) a = f[0];
                  else {
                    for (o in i) {
                      if (!f[0] || t.converters[o + " " + f[0]]) {
                        a = o;
                        break;
                      }
                      c || (c = o);
                    }
                    a = a || c;
                  }
                  if (a) return a !== f[0] && f.unshift(a), i[a];
                })(m, z, Ve)),
              !Ct &&
                s.inArray("script", m.dataTypes) > -1 &&
                s.inArray("json", m.dataTypes) < 0 &&
                (m.converters["text script"] = function () {}),
              (Bt = (function sr(t, e, i, r) {
                var o,
                  a,
                  c,
                  h,
                  f,
                  _ = {},
                  v = t.dataTypes.slice();
                if (v[1])
                  for (c in t.converters) _[c.toLowerCase()] = t.converters[c];
                for (a = v.shift(); a; )
                  if (
                    (t.responseFields[a] && (i[t.responseFields[a]] = e),
                    !f &&
                      r &&
                      t.dataFilter &&
                      (e = t.dataFilter(e, t.dataType)),
                    (f = a),
                    (a = v.shift()))
                  )
                    if ("*" === a) a = f;
                    else if ("*" !== f && f !== a) {
                      if (!(c = _[f + " " + a] || _["* " + a]))
                        for (o in _)
                          if (
                            (h = o.split(" "))[1] === a &&
                            (c = _[f + " " + h[0]] || _["* " + h[0]])
                          ) {
                            !0 === c
                              ? (c = _[o])
                              : !0 !== _[o] && ((a = h[0]), v.unshift(h[1]));
                            break;
                          }
                      if (!0 !== c)
                        if (c && t.throws) e = c(e);
                        else
                          try {
                            e = c(e);
                          } catch (T) {
                            return {
                              state: "parsererror",
                              error: c
                                ? T
                                : "No conversion from " + f + " to " + a,
                            };
                          }
                    }
                return { state: "success", data: e };
              })(m, Bt, z, Ct)),
              Ct
                ? (m.ifModified &&
                    ((Kt = z.getResponseHeader("Last-Modified")) &&
                      (s.lastModified[r] = Kt),
                    (Kt = z.getResponseHeader("etag")) && (s.etag[r] = Kt)),
                  204 === G || "HEAD" === m.type
                    ? (pt = "nocontent")
                    : 304 === G
                    ? (pt = "notmodified")
                    : ((pt = Bt.state),
                      (We = Bt.data),
                      (Ct = !(kt = Bt.error))))
                : ((kt = pt), (G || !pt) && ((pt = "error"), G < 0 && (G = 0))),
              (z.status = G),
              (z.statusText = (Z || pt) + ""),
              Ct ? U.resolveWith(S, [We, pt, z]) : U.rejectWith(S, [z, pt, kt]),
              z.statusCode(nt),
              (nt = void 0),
              _ &&
                V.trigger(Ct ? "ajaxSuccess" : "ajaxError", [
                  z,
                  m,
                  Ct ? We : kt,
                ]),
              q.fireWith(S, [z, pt]),
              _ &&
                (V.trigger("ajaxComplete", [z, m]),
                --s.active || s.event.trigger("ajaxStop")));
          }
          return z;
        },
        getJSON: function (t, e, i) {
          return s.get(t, e, i, "json");
        },
        getScript: function (t, e) {
          return s.get(t, void 0, e, "script");
        },
      }),
      s.each(["get", "post"], function (t, e) {
        s[e] = function (i, r, o, a) {
          return (
            H(r) && ((a = a || o), (o = r), (r = void 0)),
            s.ajax(
              s.extend(
                { url: i, type: e, dataType: a, data: r, success: o },
                s.isPlainObject(i) && i
              )
            )
          );
        };
      }),
      s.ajaxPrefilter(function (t) {
        var e;
        for (e in t.headers)
          "content-type" === e.toLowerCase() &&
            (t.contentType = t.headers[e] || "");
      }),
      (s._evalUrl = function (t, e, i) {
        return s.ajax({
          url: t,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          converters: { "text script": function () {} },
          dataFilter: function (r) {
            s.globalEval(r, e, i);
          },
        });
      }),
      s.fn.extend({
        wrapAll: function (t) {
          var e;
          return (
            this[0] &&
              (H(t) && (t = t.call(this[0])),
              (e = s(t, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && e.insertBefore(this[0]),
              e
                .map(function () {
                  for (var i = this; i.firstElementChild; )
                    i = i.firstElementChild;
                  return i;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (t) {
          return H(t)
            ? this.each(function (e) {
                s(this).wrapInner(t.call(this, e));
              })
            : this.each(function () {
                var e = s(this),
                  i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t);
              });
        },
        wrap: function (t) {
          var e = H(t);
          return this.each(function (i) {
            s(this).wrapAll(e ? t.call(this, i) : t);
          });
        },
        unwrap: function (t) {
          return (
            this.parent(t)
              .not("body")
              .each(function () {
                s(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (s.expr.pseudos.hidden = function (t) {
        return !s.expr.pseudos.visible(t);
      }),
      (s.expr.pseudos.visible = function (t) {
        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
      }),
      (s.ajaxSettings.xhr = function () {
        try {
          return new R.XMLHttpRequest();
        } catch {}
      });
    var or = { 0: 200, 1223: 204 },
      je = s.ajaxSettings.xhr();
    (P.cors = !!je && "withCredentials" in je),
      (P.ajax = je = !!je),
      s.ajaxTransport(function (t) {
        var e, i;
        if (P.cors || (je && !t.crossDomain))
          return {
            send: function (r, o) {
              var a,
                c = t.xhr();
              if (
                (c.open(t.type, t.url, t.async, t.username, t.password),
                t.xhrFields)
              )
                for (a in t.xhrFields) c[a] = t.xhrFields[a];
              for (a in (t.mimeType &&
                c.overrideMimeType &&
                c.overrideMimeType(t.mimeType),
              !t.crossDomain &&
                !r["X-Requested-With"] &&
                (r["X-Requested-With"] = "XMLHttpRequest"),
              r))
                c.setRequestHeader(a, r[a]);
              (e = function (h) {
                return function () {
                  e &&
                    ((e =
                      i =
                      c.onload =
                      c.onerror =
                      c.onabort =
                      c.ontimeout =
                      c.onreadystatechange =
                        null),
                    "abort" === h
                      ? c.abort()
                      : "error" === h
                      ? "number" != typeof c.status
                        ? o(0, "error")
                        : o(c.status, c.statusText)
                      : o(
                          or[c.status] || c.status,
                          c.statusText,
                          "text" !== (c.responseType || "text") ||
                            "string" != typeof c.responseText
                            ? { binary: c.response }
                            : { text: c.responseText },
                          c.getAllResponseHeaders()
                        ));
                };
              }),
                (c.onload = e()),
                (i = c.onerror = c.ontimeout = e("error")),
                void 0 !== c.onabort
                  ? (c.onabort = i)
                  : (c.onreadystatechange = function () {
                      4 === c.readyState &&
                        R.setTimeout(function () {
                          e && i();
                        });
                    }),
                (e = e("abort"));
              try {
                c.send((t.hasContent && t.data) || null);
              } catch (h) {
                if (e) throw h;
              }
            },
            abort: function () {
              e && e();
            },
          };
      }),
      s.ajaxPrefilter(function (t) {
        t.crossDomain && (t.contents.script = !1);
      }),
      s.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (t) {
            return s.globalEval(t), t;
          },
        },
      }),
      s.ajaxPrefilter("script", function (t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
      }),
      s.ajaxTransport("script", function (t) {
        var e, i;
        if (t.crossDomain || t.scriptAttrs)
          return {
            send: function (r, o) {
              (e = s("<script>")
                .attr(t.scriptAttrs || {})
                .prop({ charset: t.scriptCharset, src: t.url })
                .on(
                  "load error",
                  (i = function (a) {
                    e.remove(),
                      (i = null),
                      a && o("error" === a.type ? 404 : 200, a.type);
                  })
                )),
                M.head.appendChild(e[0]);
            },
            abort: function () {
              i && i();
            },
          };
      });
    var t,
      Ai = [],
      Ft = /(=)\?(?=&|$)|\?\?/;
    s.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var t = Ai.pop() || s.expando + "_" + gi.guid++;
        return (this[t] = !0), t;
      },
    }),
      s.ajaxPrefilter("json jsonp", function (t, e, i) {
        var r,
          o,
          a,
          c =
            !1 !== t.jsonp &&
            (Ft.test(t.url)
              ? "url"
              : "string" == typeof t.data &&
                0 ===
                  (t.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                Ft.test(t.data) &&
                "data");
        if (c || "jsonp" === t.dataTypes[0])
          return (
            (r = t.jsonpCallback =
              H(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
            c
              ? (t[c] = t[c].replace(Ft, "$1" + r))
              : !1 !== t.jsonp &&
                (t.url += (On.test(t.url) ? "&" : "?") + t.jsonp + "=" + r),
            (t.converters["script json"] = function () {
              return a || s.error(r + " was not called"), a[0];
            }),
            (t.dataTypes[0] = "json"),
            (o = R[r]),
            (R[r] = function () {
              a = arguments;
            }),
            i.always(function () {
              void 0 === o ? s(R).removeProp(r) : (R[r] = o),
                t[r] && ((t.jsonpCallback = e.jsonpCallback), Ai.push(r)),
                a && H(o) && o(a[0]),
                (a = o = void 0);
            }),
            "script"
          );
      }),
      (P.createHTMLDocument =
        (((t = M.implementation.createHTMLDocument("").body).innerHTML =
          "<form></form><form></form>"),
        2 === t.childNodes.length)),
      (s.parseHTML = function (t, e, i) {
        return "string" != typeof t
          ? []
          : ("boolean" == typeof e && ((i = e), (e = !1)),
            e ||
              (P.createHTMLDocument
                ? (((r = (e =
                    M.implementation.createHTMLDocument("")).createElement(
                    "base"
                  )).href = M.location.href),
                  e.head.appendChild(r))
                : (e = M)),
            (a = !i && []),
            (o = Gn.exec(t))
              ? [e.createElement(o[1])]
              : ((o = ni([t], e, a)),
                a && a.length && s(a).remove(),
                s.merge([], o.childNodes)));
        var r, o, a;
      }),
      (s.fn.load = function (t, e, i) {
        var r,
          o,
          a,
          c = this,
          h = t.indexOf(" ");
        return (
          h > -1 && ((r = Lt(t.slice(h))), (t = t.slice(0, h))),
          H(e)
            ? ((i = e), (e = void 0))
            : e && "object" == typeof e && (o = "POST"),
          c.length > 0 &&
            s
              .ajax({ url: t, type: o || "GET", dataType: "html", data: e })
              .done(function (f) {
                (a = arguments),
                  c.html(r ? s("<div>").append(s.parseHTML(f)).find(r) : f);
              })
              .always(
                i &&
                  function (f, _) {
                    c.each(function () {
                      i.apply(this, a || [f.responseText, _, f]);
                    });
                  }
              ),
          this
        );
      }),
      (s.expr.pseudos.animated = function (t) {
        return s.grep(s.timers, function (e) {
          return t === e.elem;
        }).length;
      }),
      (s.offset = {
        setOffset: function (t, e, i) {
          var r,
            o,
            a,
            c,
            h,
            f,
            v = s.css(t, "position"),
            T = s(t),
            m = {};
          "static" === v && (t.style.position = "relative"),
            (h = T.offset()),
            (a = s.css(t, "top")),
            (f = s.css(t, "left")),
            ("absolute" === v || "fixed" === v) && (a + f).indexOf("auto") > -1
              ? ((c = (r = T.position()).top), (o = r.left))
              : ((c = parseFloat(a) || 0), (o = parseFloat(f) || 0)),
            H(e) && (e = e.call(t, i, s.extend({}, h))),
            null != e.top && (m.top = e.top - h.top + c),
            null != e.left && (m.left = e.left - h.left + o),
            "using" in e ? e.using.call(t, m) : T.css(m);
        },
      }),
      s.fn.extend({
        offset: function (t) {
          if (arguments.length)
            return void 0 === t
              ? this
              : this.each(function (o) {
                  s.offset.setOffset(this, t, o);
                });
          var e,
            i,
            r = this[0];
          return r
            ? r.getClientRects().length
              ? {
                  top:
                    (e = r.getBoundingClientRect()).top +
                    (i = r.ownerDocument.defaultView).pageYOffset,
                  left: e.left + i.pageXOffset,
                }
              : { top: 0, left: 0 }
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var t,
              e,
              i,
              r = this[0],
              o = { top: 0, left: 0 };
            if ("fixed" === s.css(r, "position")) e = r.getBoundingClientRect();
            else {
              for (
                e = this.offset(),
                  i = r.ownerDocument,
                  t = r.offsetParent || i.documentElement;
                t &&
                (t === i.body || t === i.documentElement) &&
                "static" === s.css(t, "position");

              )
                t = t.parentNode;
              t &&
                t !== r &&
                1 === t.nodeType &&
                (((o = s(t).offset()).top += s.css(t, "borderTopWidth", !0)),
                (o.left += s.css(t, "borderLeftWidth", !0)));
            }
            return {
              top: e.top - o.top - s.css(r, "marginTop", !0),
              left: e.left - o.left - s.css(r, "marginLeft", !0),
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var t = this.offsetParent;
              t && "static" === s.css(t, "position");

            )
              t = t.offsetParent;
            return t || Ut;
          });
        },
      }),
      s.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (t, e) {
          var i = "pageYOffset" === e;
          s.fn[t] = function (r) {
            return bt(
              this,
              function (o, a, c) {
                var h;
                if (
                  (vt(o) ? (h = o) : 9 === o.nodeType && (h = o.defaultView),
                  void 0 === c)
                )
                  return h ? h[e] : o[a];
                h
                  ? h.scrollTo(i ? h.pageXOffset : c, i ? c : h.pageYOffset)
                  : (o[a] = c);
              },
              t,
              r,
              arguments.length
            );
          };
        }
      ),
      s.each(["top", "left"], function (t, e) {
        s.cssHooks[e] = Pe(P.pixelPosition, function (i, r) {
          if (r)
            return (r = pe(i, e)), An.test(r) ? s(i).position()[e] + "px" : r;
        });
      }),
      s.each({ Height: "height", Width: "width" }, function (t, e) {
        s.each(
          { padding: "inner" + t, content: e, "": "outer" + t },
          function (i, r) {
            s.fn[r] = function (o, a) {
              var c = arguments.length && (i || "boolean" != typeof o),
                h = i || (!0 === o || !0 === a ? "margin" : "border");
              return bt(
                this,
                function (f, _, v) {
                  var T;
                  return vt(f)
                    ? 0 === r.indexOf("outer")
                      ? f["inner" + t]
                      : f.document.documentElement["client" + t]
                    : 9 === f.nodeType
                    ? ((T = f.documentElement),
                      Math.max(
                        f.body["scroll" + t],
                        T["scroll" + t],
                        f.body["offset" + t],
                        T["offset" + t],
                        T["client" + t]
                      ))
                    : void 0 === v
                    ? s.css(f, _, h)
                    : s.style(f, _, v, h);
                },
                e,
                c ? o : void 0,
                c
              );
            };
          }
        );
      }),
      s.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (t, e) {
          s.fn[e] = function (i) {
            return this.on(e, i);
          };
        }
      ),
      s.fn.extend({
        bind: function (t, e, i) {
          return this.on(t, null, e, i);
        },
        unbind: function (t, e) {
          return this.off(t, null, e);
        },
        delegate: function (t, e, i, r) {
          return this.on(e, t, i, r);
        },
        undelegate: function (t, e, i) {
          return 1 === arguments.length
            ? this.off(t, "**")
            : this.off(e, t || "**", i);
        },
        hover: function (t, e) {
          return this.on("mouseenter", t).on("mouseleave", e || t);
        },
      }),
      s.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (t, e) {
          s.fn[e] = function (i, r) {
            return arguments.length > 0
              ? this.on(e, null, i, r)
              : this.trigger(e);
          };
        }
      );
    var ar = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    (s.proxy = function (t, e) {
      var i, r, o;
      if (("string" == typeof e && ((i = t[e]), (e = t), (t = i)), H(t)))
        return (
          (r = st.call(arguments, 2)),
          (o = function () {
            return t.apply(e || this, r.concat(st.call(arguments)));
          }),
          (o.guid = t.guid = t.guid || s.guid++),
          o
        );
    }),
      (s.holdReady = function (t) {
        t ? s.readyWait++ : s.ready(!0);
      }),
      (s.isArray = Array.isArray),
      (s.parseJSON = JSON.parse),
      (s.nodeName = Y),
      (s.isFunction = H),
      (s.isWindow = vt),
      (s.camelCase = Vt),
      (s.type = wt),
      (s.now = Date.now),
      (s.isNumeric = function (t) {
        var e = s.type(t);
        return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
      }),
      (s.trim = function (t) {
        return null == t ? "" : (t + "").replace(ar, "$1");
      }),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return s;
        });
    var nn = R.jQuery,
      ur = R.$;
    return (
      (s.noConflict = function (t) {
        return (
          R.$ === s && (R.$ = ur), t && R.jQuery === s && (R.jQuery = nn), s
        );
      }),
      typeof Ht > "u" && (R.jQuery = R.$ = s),
      s
    );
  });
