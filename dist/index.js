var u = Object.defineProperty;
var m = (r) => u(r, "__esModule", { value: !0 });
var R = (r, e) => {
  m(r);
  for (var o in e) u(r, o, { get: e[o], enumerable: !0 });
};
R(exports, { SETTINGS: () => d, transform: () => k });
var d = { DEBUG: !1 };
function a(r, e) {
  for (; /\s/.test(r[e]); ) e++;
  if (r[e] === "/" && r[e + 1] === "*") {
    for (e += 2; !(r[e] === "*" && r[e + 1] === "/"); ) e++;
    e += 2;
  }
  for (; /\s/.test(r[e]); ) e++;
  return e;
}
function h(r, ...e) {
  d.DEBUG && console.log("[Debug] " + r, ...e);
}
function c(r, e, o) {
  if ((h(o), r[e] === void 0)) throw new Error(o + " failed");
}
function w(r, e) {
  let o = "",
    n = { selectors: [], declarations: [], type: "rule" };
  c(r, e, "Waiting for EOL"), (e = a(r, e));
  let s = ",";
  for (
    ;
    c(r, e, "Waiting for comma"),
      ([o, e] = y(r, e, ["{", ","])),
      n.selectors.push(o),
      (e = a(r, e)),
      (s = r[e]),
      s !== "{";

  )
    e++;
  for (e++; r[e] !== "}"; ) {
    c(r, e, "Waiting for closing brace");
    let l = { type: "declaration", property: "", value: "" };
    e = a(r, e);
    let f = e;
    o = "";
    let t = !1;
    for (; r[e] !== ":"; )
      if (
        (c(
          r,
          e,
          "Waiting for colon " +
            (n.declarations.length > 0
              ? "after " +
                JSON.stringify(
                  n.declarations[n.declarations.length - 1],
                  null,
                  2
                )
              : "after first declaration")
        ),
        r[e] === "{")
      ) {
        let [g, i] = w(r, f);
        n.declarations.push(g), (e = i), (t = !0);
        break;
      } else (o += r[e]), e++;
    if (t) {
      e = a(r, e);
      continue;
    }
    e++,
      (l.property = o.trim()),
      (e = a(r, e)),
      ([o, e] = y(r, e, [";"])),
      e++,
      (l.value = o.trim()),
      n.declarations.push(l),
      h("Found declaration", l),
      (e = a(r, e));
  }
  return e++, h("Found rule", n), [n, e];
}
function W(r, e = 0) {
  let o = [];
  for (; e < r.length; ) {
    e = a(r, e);
    let [n, s] = w(r, e);
    o.push(n), (e = a(r, s));
  }
  return o;
}
function y(r, e, o) {
  let n = "";
  for (e = a(r, e); !o.includes(r[e]); ) {
    if ((c(r, e, "Waiting for " + JSON.stringify(o)), r[e] === "'"))
      for (n += r[e], e++; r[e] !== "'"; )
        c(r, e, "Waiting for closing single quote"), (n += r[e]), e++;
    else if (r[e] === '"')
      for (n += r[e], e++; r[e] !== '"'; )
        c(r, e, "Waiting for closing double quote"), (n += r[e]), e++;
    else if (r[e] === "[")
      for (n += r[e], e++; r[e] !== "]"; )
        c(r, e, "Waiting for closing bracket"), (n += r[e]), e++;
    (n += r[e]), e++;
  }
  return [n.trim(), e];
}
function D(...r) {
  return r.reduce(
    (e, o) =>
      e.map((n) => o.map((s) => n.concat(s))).reduce((n, s) => n.concat(s), []),
    [[]]
  );
}
function E(r) {
  r.forEach(function (o, n) {
    o.declarations.forEach(function (l, f) {
      l.type === "rule" &&
        !o.selectors[0].startsWith("@") &&
        (r.splice(n + 1, 0, {
          ...l,
          selectors: D(o.selectors, l.selectors).map((t) => t.join(" ")),
        }),
        o.declarations.splice(f, 1));
    });
  });
}
function b(r, e = "") {
  let o = [];
  return (
    r.forEach(function (s) {
      let l = [
        e +
          s.selectors.join(`,
`) +
          " {",
      ];
      s.declarations.forEach(function (t) {
        if (t.type === "rule") {
          let g = b([t], e + "  ");
          l.push(g);
        } else l.push(e + "  " + t.property + ": " + t.value + ";");
      }),
        l.push(e + "}"),
        o.push(
          l.join(`
`)
        );
    }),
    o.join(`

`)
  );
}
function k(r) {
  let e = W(r);
  return E(e), b(e);
}
0 && (module.exports = { SETTINGS, transform });
//# sourceMappingURL=index.js.map
