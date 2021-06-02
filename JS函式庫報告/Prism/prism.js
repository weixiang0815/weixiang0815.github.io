/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+c+cpp+java+python&plugins=show-language+command-line+normalize-whitespace+toolbar+copy-to-clipboard */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function(u) {
        var c = /\blang(?:uage)?-([\w-]+)\b/i,
            n = 0,
            e = {},
            M = {
                manual: u.Prism && u.Prism.manual,
                disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) { return n instanceof W ? new W(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ") },
                    type: function(e) { return Object.prototype.toString.call(e).slice(8, -1) },
                    objId: function(e) { return e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id },
                    clone: function t(e, r) {
                        var a, n;
                        switch (r = r || {}, M.util.type(e)) {
                            case "Object":
                                if (n = M.util.objId(e), r[n]) return r[n];
                                for (var i in a = {}, r[n] = a, e) e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                                return a;
                            case "Array":
                                return n = M.util.objId(e), r[n] ? r[n] : (a = [], r[n] = a, e.forEach(function(e, n) { a[n] = t(e, r) }), a);
                            default:
                                return e
                        }
                    },
                    getLanguage: function(e) { for (; e && !c.test(e.className);) e = e.parentElement; return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none" },
                    currentScript: function() {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try { throw new Error } catch (e) {
                            var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
                            if (n) {
                                var t = document.getElementsByTagName("script");
                                for (var r in t)
                                    if (t[r].src == n) return t[r]
                            }
                            return null
                        }
                    },
                    isActive: function(e, n, t) {
                        for (var r = "no-" + n; e;) {
                            var a = e.classList;
                            if (a.contains(n)) return !0;
                            if (a.contains(r)) return !1;
                            e = e.parentElement
                        }
                        return !!t
                    }
                },
                languages: {
                    plain: e,
                    plaintext: e,
                    text: e,
                    txt: e,
                    extend: function(e, n) { var t = M.util.clone(M.languages[e]); for (var r in n) t[r] = n[r]; return t },
                    insertBefore: function(t, e, n, r) {
                        var a = (r = r || M.languages)[t],
                            i = {};
                        for (var l in a)
                            if (a.hasOwnProperty(l)) {
                                if (l == e)
                                    for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                                n.hasOwnProperty(l) || (i[l] = a[l])
                            }
                        var s = r[t];
                        return r[t] = i, M.languages.DFS(M.languages, function(e, n) { n === s && e != t && (this[e] = i) }), i
                    },
                    DFS: function e(n, t, r, a) {
                        a = a || {};
                        var i = M.util.objId;
                        for (var l in n)
                            if (n.hasOwnProperty(l)) {
                                t.call(n, l, n[l], r || l);
                                var o = n[l],
                                    s = M.util.type(o);
                                "Object" !== s || a[i(o)] ? "Array" !== s || a[i(o)] || (a[i(o)] = !0, e(o, t, l, a)) : (a[i(o)] = !0, e(o, t, null, a))
                            }
                    }
                },
                plugins: {},
                highlightAll: function(e, n) { M.highlightAllUnder(document, e, n) },
                highlightAllUnder: function(e, n, t) {
                    var r = { callback: t, container: e, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
                    M.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), M.hooks.run("before-all-elements-highlight", r);
                    for (var a, i = 0; a = r.elements[i++];) M.highlightElement(a, !0 === n, r.callback)
                },
                highlightElement: function(e, n, t) {
                    var r = M.util.getLanguage(e),
                        a = M.languages[r];
                    e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
                    var i = e.parentElement;
                    i && "pre" === i.nodeName.toLowerCase() && (i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r);
                    var l = { element: e, language: r, grammar: a, code: e.textContent };

                    function o(e) { l.highlightedCode = e, M.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, M.hooks.run("after-highlight", l), M.hooks.run("complete", l), t && t.call(l.element) }
                    if (M.hooks.run("before-sanity-check", l), (i = l.element.parentElement) && "pre" === i.nodeName.toLowerCase() && !i.hasAttribute("tabindex") && i.setAttribute("tabindex", "0"), !l.code) return M.hooks.run("complete", l), void(t && t.call(l.element));
                    if (M.hooks.run("before-highlight", l), l.grammar)
                        if (n && u.Worker) {
                            var s = new Worker(M.filename);
                            s.onmessage = function(e) { o(e.data) }, s.postMessage(JSON.stringify({ language: l.language, code: l.code, immediateClose: !0 }))
                        } else o(M.highlight(l.code, l.grammar, l.language));
                    else o(M.util.encode(l.code))
                },
                highlight: function(e, n, t) { var r = { code: e, grammar: n, language: t }; return M.hooks.run("before-tokenize", r), r.tokens = M.tokenize(r.code, r.grammar), M.hooks.run("after-tokenize", r), W.stringify(M.util.encode(r.tokens), r.language) },
                tokenize: function(e, n) {
                    var t = n.rest;
                    if (t) {
                        for (var r in t) n[r] = t[r];
                        delete n.rest
                    }
                    var a = new i;
                    return I(a, a.head, e),
                        function e(n, t, r, a, i, l) {
                            for (var o in r)
                                if (r.hasOwnProperty(o) && r[o]) {
                                    var s = r[o];
                                    s = Array.isArray(s) ? s : [s];
                                    for (var u = 0; u < s.length; ++u) {
                                        if (l && l.cause == o + "," + u) return;
                                        var c = s[u],
                                            g = c.inside,
                                            f = !!c.lookbehind,
                                            h = !!c.greedy,
                                            d = c.alias;
                                        if (h && !c.pattern.global) {
                                            var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                                            c.pattern = RegExp(c.pattern.source, p + "g")
                                        }
                                        for (var v = c.pattern || c, m = a.next, y = i; m !== t.tail && !(l && y >= l.reach); y += m.value.length, m = m.next) {
                                            var b = m.value;
                                            if (t.length > n.length) return;
                                            if (!(b instanceof W)) {
                                                var k, x = 1;
                                                if (h) {
                                                    if (!(k = z(v, y, n, f))) break;
                                                    var w = k.index,
                                                        A = k.index + k[0].length,
                                                        P = y;
                                                    for (P += m.value.length; P <= w;) m = m.next, P += m.value.length;
                                                    if (P -= m.value.length, y = P, m.value instanceof W) continue;
                                                    for (var E = m; E !== t.tail && (P < A || "string" == typeof E.value); E = E.next) x++, P += E.value.length;
                                                    x--, b = n.slice(y, P), k.index -= y
                                                } else if (!(k = z(v, 0, b, f))) continue;
                                                var w = k.index,
                                                    S = k[0],
                                                    O = b.slice(0, w),
                                                    L = b.slice(w + S.length),
                                                    N = y + b.length;
                                                l && N > l.reach && (l.reach = N);
                                                var j = m.prev;
                                                O && (j = I(t, j, O), y += O.length), q(t, j, x);
                                                var C = new W(o, g ? M.tokenize(S, g) : S, d, S);
                                                if (m = I(t, j, C), L && I(t, m, L), 1 < x) {
                                                    var _ = { cause: o + "," + u, reach: N };
                                                    e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach)
                                                }
                                            }
                                        }
                                    }
                                }
                        }(e, a, n, a.head, 0),
                        function(e) {
                            var n = [],
                                t = e.head.next;
                            for (; t !== e.tail;) n.push(t.value), t = t.next;
                            return n
                        }(a)
                },
                hooks: {
                    all: {},
                    add: function(e, n) {
                        var t = M.hooks.all;
                        t[e] = t[e] || [], t[e].push(n)
                    },
                    run: function(e, n) {
                        var t = M.hooks.all[e];
                        if (t && t.length)
                            for (var r, a = 0; r = t[a++];) r(n)
                    }
                },
                Token: W
            };

        function W(e, n, t, r) { this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length }

        function z(e, n, t, r) {
            e.lastIndex = n;
            var a = e.exec(t);
            if (a && r && a[1]) {
                var i = a[1].length;
                a.index += i, a[0] = a[0].slice(i)
            }
            return a
        }

        function i() {
            var e = { value: null, prev: null, next: null },
                n = { value: null, prev: e, next: null };
            e.next = n, this.head = e, this.tail = n, this.length = 0
        }

        function I(e, n, t) {
            var r = n.next,
                a = { value: t, prev: n, next: r };
            return n.next = a, r.prev = a, e.length++, a
        }

        function q(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
            (n.next = r).prev = n, e.length -= a
        }
        if (u.Prism = M, W.stringify = function n(e, t) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) { var r = ""; return e.forEach(function(e) { r += n(e, t) }), r }
                var a = { type: e.type, content: n(e.content, t), tag: "span", classes: ["token", e.type], attributes: {}, language: t },
                    i = e.alias;
                i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run("wrap", a);
                var l = "";
                for (var o in a.attributes) l += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
                return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + l + ">" + a.content + "</" + a.tag + ">"
            }, !u.document) return u.addEventListener && (M.disableWorkerMessageHandler || u.addEventListener("message", function(e) {
            var n = JSON.parse(e.data),
                t = n.language,
                r = n.code,
                a = n.immediateClose;
            u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close()
        }, !1)), M;
        var t = M.util.currentScript();

        function r() { M.manual || M.highlightAll() }
        if (t && (M.filename = t.src, t.hasAttribute("data-manual") && (M.manual = !0)), !M.manual) { var a = document.readyState; "loading" === a || "interactive" === a && t && t.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16) }
        return M
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = { comment: /<!--[\s\S]*?-->/, prolog: /<\?[\s\S]+?\?>/, doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i, greedy: !0, inside: { "internal-subset": { pattern: /(\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 }, punctuation: /^<!|>$|[[\]]/, "doctype-tag": /^DOCTYPE/, name: /[^\s<>'"]+/ } }, cdata: /<!\[CDATA\[[\s\S]*?]]>/i, tag: { pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/, greedy: !0, inside: { tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "special-attr": [], "attr-value": { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: { punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i] }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function(a) { "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&")) }), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function(a, e) {
        var s = {};
        s["language-" + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var t = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
        t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
        var n = {};
        n[a] = { pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() { return a }), "i"), lookbehind: !0, greedy: !0, inside: t }, Prism.languages.insertBefore("markup", "cdata", n)
    }
}), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", { value: function(a, e) { Prism.languages.markup.tag.inside["special-attr"].push({ pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"), lookbehind: !0, inside: { "attr-name": /^[^\s=]+/, "attr-value": { pattern: /=[\s\S]+/, inside: { value: { pattern: /(=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [e, "language-" + e], inside: Prism.languages[e] }, punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } } } }) } }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
! function(s) {
    var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    s.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/, inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: !0, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 } } }, url: { pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"), greedy: !0, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e.source + "$"), alias: "url" } } }, selector: RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"), string: { pattern: e, greedy: !0 }, property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, important: /!important\b/i, function: /[-a-z0-9]+(?=\()/i, punctuation: /[(){};:,]/ }, s.languages.css.atrule.inside.rest = s.languages.css;
    var t = s.languages.markup;
    t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"))
}(Prism);
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, boolean: /\b(?:true|false)\b/, function: /\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.javascript = Prism.languages.extend("clike", { "class-name": [Prism.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/, lookbehind: !0 }], keyword: [{ pattern: /((?:^|})\s*)catch\b/, lookbehind: !0 }, { pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: !0 }], function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/, operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/ }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/, lookbehind: !0, greedy: !0, inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: "language-regex", inside: Prism.languages.regex }, "regex-flags": /[a-z]+$/, "regex-delimiter": /^\/|\/$/ } }, "function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, inside: Prism.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: !0, inside: Prism.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ }), Prism.languages.insertBefore("javascript", "string", { hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" }, "template-string": { pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/, greedy: !0, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/, lookbehind: !0, inside: { "interpolation-punctuation": { pattern: /^\${|}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } } }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;
Prism.languages.c = Prism.languages.extend("clike", { comment: { pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 }, "class-name": { pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/, lookbehind: !0 }, keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/, function: /[a-z_]\w*(?=\s*\()/i, number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i, operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/ }), Prism.languages.insertBefore("c", "string", { macro: { pattern: /(^\s*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im, lookbehind: !0, greedy: !0, alias: "property", inside: { string: [{ pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 }, Prism.languages.c.string], comment: Prism.languages.c.comment, "macro-name": [{ pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 }, { pattern: /(^#\s*define\s+)\w+\b(?=\()/i, lookbehind: !0, alias: "function" }], directive: { pattern: /^(#\s*)[a-z]+/, lookbehind: !0, alias: "keyword" }, "directive-hash": /^#/, punctuation: /##|\\(?=[\r\n])/, expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c } } }, constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/ }), delete Prism.languages.c.boolean;
! function(e) {
    var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
        n = "\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b".replace(/<keyword>/g, function() { return t.source });
    e.languages.cpp = e.languages.extend("c", { "class-name": [{ pattern: RegExp("(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(/<keyword>/g, function() { return t.source })), lookbehind: !0 }, /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/], keyword: t, number: { pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i, greedy: !0 }, operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/, boolean: /\b(?:true|false)\b/ }), e.languages.insertBefore("cpp", "string", { module: { pattern: RegExp('(\\b(?:module|import)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' + "<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>".replace(/<mod-name>/g, function() { return n }) + ")"), lookbehind: !0, greedy: !0, inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ } }, "raw-string": { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: "string", greedy: !0 } }), e.languages.insertBefore("cpp", "keyword", { "generic-function": { pattern: /\b[a-z_]\w*\s*<(?:[^<>]|<(?:[^<>])*>)*>(?=\s*\()/i, inside: { function: /^\w+/, generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: e.languages.cpp } } } }), e.languages.insertBefore("cpp", "operator", { "double-colon": { pattern: /::/, alias: "punctuation" } }), e.languages.insertBefore("cpp", "class-name", { "base-clause": { pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/, lookbehind: !0, greedy: !0, inside: e.languages.extend("cpp", {}) } }), e.languages.insertBefore("inside", "double-colon", { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i }, e.languages.cpp["base-clause"])
}(Prism);
! function(e) {
    var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
        n = "(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*",
        a = { pattern: RegExp(n + "[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"), lookbehind: !0, inside: { namespace: { pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/, inside: { punctuation: /\./ } }, punctuation: /\./ } };
    e.languages.java = e.languages.extend("clike", { "class-name": [a, { pattern: RegExp(n + "[A-Z]\\w*(?=\\s+\\w+\\s*[;,=())])"), lookbehind: !0, inside: a.inside }], keyword: t, function: [e.languages.clike.function, { pattern: /(\:\:\s*)[a-z_]\w*/, lookbehind: !0 }], number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i, operator: { pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m, lookbehind: !0 } }), e.languages.insertBefore("java", "string", { "triple-quoted-string": { pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/, greedy: !0, alias: "string" } }), e.languages.insertBefore("java", "class-name", { annotation: { pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/, lookbehind: !0, alias: "punctuation" }, generics: { pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/, inside: { "class-name": a, keyword: t, punctuation: /[<>(),.:]/, operator: /[?&|]/ } }, namespace: { pattern: RegExp("(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(/<keyword>/g, function() { return t.source })), lookbehind: !0, inside: { punctuation: /\./ } } })
}(Prism);
Prism.languages.python = { comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 }, "string-interpolation": { pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i, greedy: !0, inside: { interpolation: { pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/, lookbehind: !0, inside: { "format-spec": { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 }, "conversion-option": { pattern: /![sra](?=[:}]$)/, alias: "punctuation" }, rest: null } }, string: /[\s\S]+/ } }, "triple-quoted-string": { pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i, greedy: !0, alias: "string" }, string: { pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 }, function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 }, "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 }, decorator: { pattern: /(^\s*)@\w+(?:\.\w+)*/im, lookbehind: !0, alias: ["annotation", "punctuation"], inside: { punctuation: /\./ } }, keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/, builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/, boolean: /\b(?:True|False|None)\b/, number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i, operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/, punctuation: /[{}[\];(),.:]/ }, Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python, Prism.languages.py = Prism.languages.python;
! function() {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var i = [],
            l = {},
            d = function() {};
        Prism.plugins.toolbar = {};
        var e = Prism.plugins.toolbar.registerButton = function(e, n) {
                var t;
                t = "function" == typeof n ? n : function(e) { var t; return "function" == typeof n.onClick ? ((t = document.createElement("button")).type = "button", t.addEventListener("click", function() { n.onClick.call(this, e) })) : "string" == typeof n.url ? (t = document.createElement("a")).href = n.url : t = document.createElement("span"), n.className && t.classList.add(n.className), t.textContent = n.text, t }, e in l ? console.warn('There is a button with the key "' + e + '" registered already.') : i.push(l[e] = t)
            },
            t = Prism.plugins.toolbar.hook = function(a) {
                var e = a.element.parentNode;
                if (e && /pre/i.test(e.nodeName) && !e.parentNode.classList.contains("code-toolbar")) {
                    var t = document.createElement("div");
                    t.classList.add("code-toolbar"), e.parentNode.insertBefore(t, e), t.appendChild(e);
                    var r = document.createElement("div");
                    r.classList.add("toolbar");
                    var n = i,
                        o = function(e) {
                            for (; e;) {
                                var t = e.getAttribute("data-toolbar-order");
                                if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                                e = e.parentElement
                            }
                        }(a.element);
                    o && (n = o.map(function(e) { return l[e] || d })), n.forEach(function(e) {
                        var t = e(a);
                        if (t) {
                            var n = document.createElement("div");
                            n.classList.add("toolbar-item"), n.appendChild(t), r.appendChild(n)
                        }
                    }), t.appendChild(r)
                }
            };
        e("label", function(e) { var t = e.element.parentNode; if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) { var n, a, r = t.getAttribute("data-label"); try { a = document.querySelector("template#" + r) } catch (e) {} return a ? n = a.content : (t.hasAttribute("data-url") ? (n = document.createElement("a")).href = t.getAttribute("data-url") : n = document.createElement("span"), n.textContent = r), n } }), Prism.hooks.add("complete", t)
    }
}();
! function() {
    if ("undefined" != typeof Prism && "undefined" != typeof document)
        if (Prism.plugins.toolbar) {
            var i = { none: "Plain text", plain: "Plain text", plaintext: "Plain text", text: "Plain text", txt: "Plain text", html: "HTML", xml: "XML", svg: "SVG", mathml: "MathML", ssml: "SSML", rss: "RSS", css: "CSS", clike: "C-like", js: "JavaScript", abap: "ABAP", abnf: "ABNF", al: "AL", antlr4: "ANTLR4", g4: "ANTLR4", apacheconf: "Apache Configuration", apl: "APL", aql: "AQL", arff: "ARFF", asciidoc: "AsciiDoc", adoc: "AsciiDoc", aspnet: "ASP.NET (C#)", asm6502: "6502 Assembly", autohotkey: "AutoHotkey", autoit: "AutoIt", basic: "BASIC", bbcode: "BBcode", bnf: "BNF", rbnf: "RBNF", bsl: "BSL (1C:Enterprise)", oscript: "OneScript", csharp: "C#", cs: "C#", dotnet: "C#", cpp: "C++", cfscript: "CFScript", cfc: "CFScript", cil: "CIL", cmake: "CMake", cobol: "COBOL", coffee: "CoffeeScript", conc: "Concurnas", csp: "Content-Security-Policy", "css-extras": "CSS Extras", csv: "CSV", dataweave: "DataWeave", dax: "DAX", django: "Django/Jinja2", jinja2: "Django/Jinja2", "dns-zone-file": "DNS zone file", "dns-zone": "DNS zone file", dockerfile: "Docker", dot: "DOT (Graphviz)", gv: "DOT (Graphviz)", ebnf: "EBNF", editorconfig: "EditorConfig", ejs: "EJS", etlua: "Embedded Lua templating", erb: "ERB", "excel-formula": "Excel Formula", xlsx: "Excel Formula", xls: "Excel Formula", fsharp: "F#", "firestore-security-rules": "Firestore security rules", ftl: "FreeMarker Template Language", gml: "GameMaker Language", gamemakerlanguage: "GameMaker Language", gcode: "G-code", gdscript: "GDScript", gedcom: "GEDCOM", glsl: "GLSL", graphql: "GraphQL", hbs: "Handlebars", hs: "Haskell", hcl: "HCL", hlsl: "HLSL", http: "HTTP", hpkp: "HTTP Public-Key-Pins", hsts: "HTTP Strict-Transport-Security", ichigojam: "IchigoJam", "icu-message-format": "ICU Message Format", idr: "Idris", ignore: ".ignore", gitignore: ".gitignore", hgignore: ".hgignore", npmignore: ".npmignore", inform7: "Inform 7", javadoc: "JavaDoc", javadoclike: "JavaDoc-like", javastacktrace: "Java stack trace", jq: "JQ", jsdoc: "JSDoc", "js-extras": "JS Extras", json: "JSON", webmanifest: "Web App Manifest", json5: "JSON5", jsonp: "JSONP", jsstacktrace: "JS stack trace", "js-templates": "JS Templates", kts: "Kotlin Script", kt: "Kotlin", kumir: "KuMir (КуМир)", kum: "KuMir (КуМир)", latex: "LaTeX", tex: "TeX", context: "ConTeXt", lilypond: "LilyPond", ly: "LilyPond", emacs: "Lisp", elisp: "Lisp", "emacs-lisp": "Lisp", llvm: "LLVM IR", log: "Log file", lolcode: "LOLCODE", md: "Markdown", "markup-templating": "Markup templating", matlab: "MATLAB", mel: "MEL", mongodb: "MongoDB", moon: "MoonScript", n1ql: "N1QL", n4js: "N4JS", n4jsd: "N4JS", "nand2tetris-hdl": "Nand To Tetris HDL", naniscript: "Naninovel Script", nani: "Naninovel Script", nasm: "NASM", neon: "NEON", nginx: "nginx", nsis: "NSIS", objectivec: "Objective-C", objc: "Objective-C", ocaml: "OCaml", opencl: "OpenCL", openqasm: "OpenQasm", qasm: "OpenQasm", parigp: "PARI/GP", objectpascal: "Object Pascal", psl: "PATROL Scripting Language", pcaxis: "PC-Axis", px: "PC-Axis", peoplecode: "PeopleCode", pcode: "PeopleCode", php: "PHP", phpdoc: "PHPDoc", "php-extras": "PHP Extras", plsql: "PL/SQL", powerquery: "PowerQuery", pq: "PowerQuery", mscript: "PowerQuery", powershell: "PowerShell", promql: "PromQL", properties: ".properties", protobuf: "Protocol Buffers", purebasic: "PureBasic", pbfasm: "PureBasic", purs: "PureScript", py: "Python", qsharp: "Q#", qs: "Q#", q: "Q (kdb+ database)", qml: "QML", rkt: "Racket", jsx: "React JSX", tsx: "React TSX", renpy: "Ren'py", rpy: "Ren'py", rest: "reST (reStructuredText)", robotframework: "Robot Framework", robot: "Robot Framework", rb: "Ruby", sas: "SAS", sass: "Sass (Sass)", scss: "Sass (Scss)", "shell-session": "Shell session", "sh-session": "Shell session", shellsession: "Shell session", sml: "SML", smlnj: "SML/NJ", solidity: "Solidity (Ethereum)", sol: "Solidity (Ethereum)", "solution-file": "Solution file", sln: "Solution file", soy: "Soy (Closure Template)", sparql: "SPARQL", rq: "SPARQL", "splunk-spl": "Splunk SPL", sqf: "SQF: Status Quo Function (Arma 3)", sql: "SQL", iecst: "Structured Text (IEC 61131-3)", "t4-templating": "T4 templating", "t4-cs": "T4 Text Templates (C#)", t4: "T4 Text Templates (C#)", "t4-vb": "T4 Text Templates (VB)", tap: "TAP", tt2: "Template Toolkit 2", toml: "TOML", trig: "TriG", ts: "TypeScript", tsconfig: "TSConfig", uscript: "UnrealScript", uc: "UnrealScript", uri: "URI", url: "URL", vbnet: "VB.Net", vhdl: "VHDL", vim: "vim", "visual-basic": "Visual Basic", vba: "VBA", vb: "Visual Basic", wasm: "WebAssembly", wiki: "Wiki markup", xeoracube: "XeoraCube", "xml-doc": "XML doc (.net)", xojo: "Xojo (REALbasic)", xquery: "XQuery", yaml: "YAML", yml: "YAML", yang: "YANG" };
            Prism.plugins.toolbar.registerButton("show-language", function(e) { var a = e.element.parentNode; if (a && /pre/i.test(a.nodeName)) { var t, s = a.getAttribute("data-language") || i[e.language] || ((t = e.language) ? (t.substring(0, 1).toUpperCase() + t.substring(1)).replace(/s(?=cript)/, "S") : t); if (s) { var o = document.createElement("span"); return o.textContent = s, o } } })
        } else console.warn("Show Languages plugin loaded before Toolbar plugin.")
}();
! function() {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var d = /(?:^|\s)command-line(?:\s|$)/,
            f = "command-line-prompt",
            m = "".startsWith ? function(e, t) { return e.startsWith(t) } : function(e, t) { return 0 === e.indexOf(t) };
        Prism.hooks.add("before-highlight", function(e) {
            var t = h(e);
            if (!t.complete && e.code) {
                var n = e.element.parentElement;
                if (n && /pre/i.test(n.nodeName) && (d.test(n.className) || d.test(e.element.className))) {
                    var a = e.element.querySelector("." + f);
                    a && a.remove();
                    var s = e.code.split("\n");
                    t.numberOfLines = s.length;
                    var o = t.outputLines = [],
                        r = n.getAttribute("data-output"),
                        i = n.getAttribute("data-filter-output");
                    if (null !== r) r.split(",").forEach(function(e) {
                        var t = e.split("-"),
                            n = parseInt(t[0], 10),
                            a = 2 === t.length ? parseInt(t[1], 10) : n;
                        if (!isNaN(n) && !isNaN(a)) { n < 1 && (n = 1), a > s.length && (a = s.length), a--; for (var r = --n; r <= a; r++) o[r] = s[r], s[r] = "" }
                    });
                    else if (i)
                        for (var l = 0; l < s.length; l++) m(s[l], i) && (o[l] = s[l].slice(i.length), s[l] = "");
                    e.code = s.join("\n")
                } else t.complete = !0
            } else t.complete = !0
        }), Prism.hooks.add("before-insert", function(e) {
            var t = h(e);
            if (!t.complete) {
                for (var n = e.highlightedCode.split("\n"), a = t.outputLines || [], r = 0, s = a.length; r < s; r++) a.hasOwnProperty(r) && (n[r] = a[r]);
                e.highlightedCode = n.join("\n")
            }
        }), Prism.hooks.add("complete", function(e) {
            if (function(e) { return "command-line" in (e.vars = e.vars || {}) }(e)) {
                var t = h(e);
                if (!t.complete) {
                    var n, a = e.element.parentElement;
                    d.test(e.element.className) && (e.element.className = e.element.className.replace(d, " ")), d.test(a.className) || (a.className += " command-line");
                    var r = t.numberOfLines || 0,
                        s = c("data-prompt", "");
                    if ("" !== s) n = p('<span data-prompt="' + s + '"></span>', r);
                    else n = p('<span data-user="' + c("data-user", "user") + '" data-host="' + c("data-host", "localhost") + '"></span>', r);
                    var o = document.createElement("span");
                    o.className = f, o.innerHTML = n;
                    for (var i = t.outputLines || [], l = 0, m = i.length; l < m; l++)
                        if (i.hasOwnProperty(l)) {
                            var u = o.children[l];
                            u.removeAttribute("data-user"), u.removeAttribute("data-host"), u.removeAttribute("data-prompt")
                        }
                    e.element.insertBefore(o, e.element.firstChild), t.complete = !0
                }
            }

            function c(e, t) { return (a.getAttribute(e) || t).replace(/"/g, "&quot") }
        })
    }

    function p(e, t) { for (var n = "", a = 0; a < t; a++) n += e; return n }

    function h(e) { var t = e.vars = e.vars || {}; return t["command-line"] = t["command-line"] || {} }
}();
! function() {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var i = Object.assign || function(e, n) { for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]); return e };
        e.prototype = {
            setDefaults: function(e) { this.defaults = i(this.defaults, e) },
            normalize: function(e, n) { for (var t in n = i(this.defaults, n)) { var r = t.replace(/-(\w)/g, function(e, n) { return n.toUpperCase() }); "normalize" !== t && "setDefaults" !== r && n[t] && this[r] && (e = this[r].call(this, e, n[t])) } return e },
            leftTrim: function(e) { return e.replace(/^\s+/, "") },
            rightTrim: function(e) { return e.replace(/\s+$/, "") },
            tabsToSpaces: function(e, n) { return n = 0 | n || 4, e.replace(/\t/g, new Array(++n).join(" ")) },
            spacesToTabs: function(e, n) { return n = 0 | n || 4, e.replace(RegExp(" {" + n + "}", "g"), "\t") },
            removeTrailing: function(e) { return e.replace(/\s*?$/gm, "") },
            removeInitialLineFeed: function(e) { return e.replace(/^(?:\r?\n|\r)/, "") },
            removeIndent: function(e) { var n = e.match(/^[^\S\n\r]*(?=\S)/gm); return n && n[0].length ? (n.sort(function(e, n) { return e.length - n.length }), n[0].length ? e.replace(RegExp("^" + n[0], "gm"), "") : e) : e },
            indent: function(e, n) { return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++n).join("\t") + "$&") },
            breakLines: function(e, n) {
                n = !0 === n ? 80 : 0 | n || 80;
                for (var t = e.split("\n"), r = 0; r < t.length; ++r)
                    if (!(s(t[r]) <= n)) {
                        for (var i = t[r].split(/(\s+)/g), o = 0, a = 0; a < i.length; ++a) {
                            var l = s(i[a]);
                            n < (o += l) && (i[a] = "\n" + i[a], o = l)
                        }
                        t[r] = i.join("")
                    }
                return t.join("\n")
            }
        }, "undefined" != typeof module && module.exports && (module.exports = e), "undefined" != typeof Prism && (Prism.plugins.NormalizeWhitespace = new e({ "remove-trailing": !0, "remove-indent": !0, "left-trim": !0, "right-trim": !0 }), Prism.hooks.add("before-sanity-check", function(e) {
            var n = Prism.plugins.NormalizeWhitespace;
            if ((!e.settings || !1 !== e.settings["whitespace-normalization"]) && Prism.util.isActive(e.element, "whitespace-normalization", !0))
                if (e.element && e.element.parentNode || !e.code) {
                    var t = e.element.parentNode;
                    if (e.code && t && "pre" === t.nodeName.toLowerCase()) {
                        for (var r = t.childNodes, i = "", o = "", a = !1, l = 0; l < r.length; ++l) {
                            var s = r[l];
                            s == e.element ? a = !0 : "#text" === s.nodeName && (a ? o += s.nodeValue : i += s.nodeValue, t.removeChild(s), --l)
                        }
                        if (e.element.children.length && Prism.plugins.KeepMarkup) {
                            var c = i + e.element.innerHTML + o;
                            e.element.innerHTML = n.normalize(c, e.settings), e.code = e.element.textContent
                        } else e.code = i + e.code + o, e.code = n.normalize(e.code, e.settings)
                    }
                } else e.code = n.normalize(e.code, e.settings)
        }))
    }

    function e(e) { this.defaults = i({}, e) }

    function s(e) { for (var n = 0, t = 0; t < e.length; ++t) e.charCodeAt(t) == "\t".charCodeAt(0) && (n += 3); return e.length + n }
}();
! function() {
    function u(t, e) { t.addEventListener("click", function() {! function(t) { navigator.clipboard ? navigator.clipboard.writeText(t.getText()).then(t.success, function() { o(t) }) : o(t) }(e) }) }

    function o(e) {
        var t = document.createElement("textarea");
        t.value = e.getText(), t.style.top = "0", t.style.left = "0", t.style.position = "fixed", document.body.appendChild(t), t.focus(), t.select();
        try {
            var o = document.execCommand("copy");
            setTimeout(function() { o ? e.success() : e.error() }, 1)
        } catch (t) { setTimeout(function() { e.error(t) }, 1) }
        document.body.removeChild(t)
    }
    "undefined" != typeof Prism && "undefined" != typeof document && (Prism.plugins.toolbar ? Prism.plugins.toolbar.registerButton("copy-to-clipboard", function(t) {
        var e = t.element,
            o = function(t) {
                var e = { copy: "Copy", "copy-error": "Press Ctrl+C to copy", "copy-success": "Copied!", "copy-timeout": 5e3 };
                for (var o in e) {
                    for (var n = "data-prismjs-" + o, c = t; c && !c.hasAttribute(n);) c = c.parentElement;
                    c && (e[o] = c.getAttribute(n))
                }
                return e
            }(e),
            n = document.createElement("button");
        n.className = "copy-to-clipboard-button", n.setAttribute("type", "button");
        var c = document.createElement("span");
        return n.appendChild(c), i("copy"), u(n, { getText: function() { return e.textContent }, success: function() { i("copy-success"), r() }, error: function() { i("copy-error"), setTimeout(function() {! function(t) { window.getSelection().selectAllChildren(t) }(e) }, 1), r() } }), n;

        function r() { setTimeout(function() { i("copy") }, o["copy-timeout"]) }

        function i(t) { c.textContent = o[t], n.setAttribute("data-copy-state", t) }
    }) : console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."))
}();