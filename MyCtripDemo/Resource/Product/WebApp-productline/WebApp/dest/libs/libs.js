//     (c) 2010-2014 Thomas Fuchs

//     Zepto.js may be freely distributed under the MIT license.

// > http://underscorejs.org
// > (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
// > Underscore may be freely distributed under the MIT license.

//     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.

//     Backbone may be freely distributed under the MIT license.

var Zepto = function() {
	function O(e) {
		return e == null ? String(e) : T[N.call(e)] || "object"
	}

	function M(e) {
		return O(e) == "function"
	}

	function _(e) {
		return e != null && e == e.window
	}

	function D(e) {
		return e != null && e.nodeType == e.DOCUMENT_NODE
	}

	function P(e) {
		return O(e) == "object"
	}

	function H(e) {
		return P(e) && !_(e) && e.__proto__ == Object.prototype
	}

	function B(e) {
		return e instanceof Array
	}

	function j(e) {
		return typeof e.length == "number"
	}

	function F(e) {
		return o.call(e, function(e) {
			return e != null
		})
	}

	function I(e) {
		return e.length > 0 ? n.fn.concat.apply([], e) : e
	}

	function q(e) {
		return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
	}

	function R(e) {
		return e in f ? f[e] : f[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
	}

	function U(e, t) {
		return typeof t == "number" && !c[q(e)] ? t + "px" : t
	}

	function z(e) {
		var t, n;
		return a[e] || (t = u.createElement(e), u.body.appendChild(t), n = l(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), a[e] = n), a[e]
	}

	function W(e) {
		return "children" in e ? s.call(e.children) : n.map(e.childNodes, function(e) {
			if (e.nodeType == 1) return e
		})
	}

	function X(n, r, i) {
		for (t in r) i && (H(r[t]) || B(r[t])) ? (H(r[t]) && !H(n[t]) && (n[t] = {}), B(r[t]) && !B(n[t]) && (n[t] = []), X(n[t], r[t], i)) : r[t] !== e && (n[t] = r[t])
	}

	function V(t, r) {
		return r === e ? n(t) : n(t).filter(r)
	}

	function $(e, t, n, r) {
		return M(t) ? t.call(e, n, r) : t
	}

	function J(e, t, n) {
		n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
	}

	function K(t, n) {
		var r = t.className,
			i = r && r.baseVal !== e;
		if (n === e) return i ? r.baseVal : r;
		i ? r.baseVal = n : t.className = n
	}

	function Q(e) {
		var t;
		try {
			return e ? e == "true" || (e == "false" ? !1 : e == "null" ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? n.parseJSON(e) : e : t) : e
		} catch (r) {
			return e
		}
	}

	function G(e, t) {
		t(e);
		for (var n in e.childNodes) G(e.childNodes[n], t)
	}
	var e, t, n, r, i = [],
		s = i.slice,
		o = i.filter,
		u = window.document,
		a = {},
		f = {},
		l = u.defaultView.getComputedStyle,
		c = {
			"column-count": 1,
			columns: 1,
			"font-weight": 1,
			"line-height": 1,
			opacity: 1,
			"z-index": 1,
			zoom: 1
		},
		h = /^\s*<(\w+|!)[^>]*>/,
		p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		d = /^(?:body|html)$/i,
		v = ["val", "css", "html", "text", "data", "width", "height", "offset"],
		m = ["after", "prepend", "before", "append"],
		g = u.createElement("table"),
		y = u.createElement("tr"),
		b = {
			tr: u.createElement("tbody"),
			tbody: g,
			thead: g,
			tfoot: g,
			td: y,
			th: y,
			"*": u.createElement("div")
		},
		w = /complete|loaded|interactive/,
		E = /^\.([\w-]+)$/,
		S = /^#([\w-]*)$/,
		x = /^[\w-]+$/,
		T = {},
		N = T.toString,
		C = {},
		k, L, A = u.createElement("div");
	return C.matches = function(e, t) {
		if (!e || e.nodeType !== 1) return !1;
		var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
		if (n) return n.call(e, t);
		var r, i = e.parentNode,
			s = !i;
		return s && (i = A).appendChild(e), r = ~C.qsa(i, t).indexOf(e), s && A.removeChild(e), r
	}, k = function(e) {
		return e.replace(/-+(.)?/g, function(e, t) {
			return t ? t.toUpperCase() : ""
		})
	}, L = function(e) {
		return o.call(e, function(t, n) {
			return e.indexOf(t) == n
		})
	}, C.fragment = function(t, r, i) {
		t.replace && (t = t.replace(p, "<$1></$2>")), r === e && (r = h.test(t) && RegExp.$1), r in b || (r = "*");
		var o, u, a = b[r];
		return a.innerHTML = "" + t, u = n.each(s.call(a.childNodes), function() {
			a.removeChild(this)
		}), H(i) && (o = n(u), n.each(i, function(e, t) {
			v.indexOf(e) > -1 ? o[e](t) : o.attr(e, t)
		})), u
	}, C.Z = function(e, t) {
		return e = e || [], e.__proto__ = n.fn, e.selector = t || "", e
	}, C.isZ = function(e) {
		return e instanceof C.Z
	}, C.init = function(t, r) {
		if (!t) return C.Z();
		if (M(t)) return n(u).ready(t);
		if (C.isZ(t)) return t;
		var i;
		if (B(t)) i = F(t);
		else if (P(t)) i = [H(t) ? n.extend({}, t) : t], t = null;
		else if (h.test(t)) i = C.fragment(t.trim(), RegExp.$1, r), t = null;
		else {
			if (r !== e) return n(r).find(t);
			i = C.qsa(u, t)
		}
		return C.Z(i, t)
	}, n = function(e, t) {
		return C.init(e, t)
	}, n.extend = function(e) {
		var t, n = s.call(arguments, 1);
		return typeof e == "boolean" && (t = e, e = n.shift()), n.forEach(function(n) {
			X(e, n, t)
		}), e
	}, C.qsa = function(e, t) {
		var n;
		return D(e) && S.test(t) ? (n = e.getElementById(RegExp.$1)) ? [n] : [] : e.nodeType !== 1 && e.nodeType !== 9 ? [] : s.call(E.test(t) ? e.getElementsByClassName(RegExp.$1) : x.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t))
	}, n.contains = function(e, t) {
		return e !== t && e.contains(t)
	}, n.type = O, n.isFunction = M, n.isWindow = _, n.isArray = B, n.isPlainObject = H, n.isEmptyObject = function(e) {
		var t;
		for (t in e) return !1;
		return !0
	}, n.inArray = function(e, t, n) {
		return i.indexOf.call(t, e, n)
	}, n.camelCase = k, n.trim = function(e) {
		return e.trim()
	}, n.uuid = 0, n.support = {}, n.expr = {}, n.map = function(e, t) {
		var n, r = [],
			i, s;
		if (j(e))
			for (i = 0; i < e.length; i++) n = t(e[i], i), n != null && r.push(n);
		else
			for (s in e) n = t(e[s], s), n != null && r.push(n);
		return I(r)
	}, n.each = function(e, t) {
		var n, r;
		if (j(e)) {
			for (n = 0; n < e.length; n++)
				if (t.call(e[n], n, e[n]) === !1) return e
		} else
			for (r in e)
				if (t.call(e[r], r, e[r]) === !1) return e; return e
	}, n.grep = function(e, t) {
		return o.call(e, t)
	}, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		T["[object " + t + "]"] = t.toLowerCase()
	}), n.fn = {
		forEach: i.forEach,
		reduce: i.reduce,
		push: i.push,
		sort: i.sort,
		indexOf: i.indexOf,
		concat: i.concat,
		map: function(e) {
			return n(n.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		slice: function() {
			return n(s.apply(this, arguments))
		},
		ready: function(e) {
			return w.test(u.readyState) ? e(n) : u.addEventListener("DOMContentLoaded", function() {
				e(n)
			}, !1), this
		},
		get: function(t) {
			return t === e ? s.call(this) : this[t >= 0 ? t : t + this.length]
		},
		toArray: function() {
			return this.get()
		},
		size: function() {
			return this.length
		},
		remove: function() {
			return this.each(function() {
				this.parentNode != null && this.parentNode.removeChild(this)
			})
		},
		each: function(e) {
			return i.every.call(this, function(t, n) {
				return e.call(t, n, t) !== !1
			}), this
		},
		filter: function(e) {
			return M(e) ? this.not(this.not(e)) : n(o.call(this, function(t) {
				return C.matches(t, e)
			}))
		},
		add: function(e, t) {
			return n(L(this.concat(n(e, t))))
		},
		is: function(e) {
			return this.length > 0 && C.matches(this[0], e)
		},
		not: function(t) {
			var r = [];
			if (M(t) && t.call !== e) this.each(function(e) {
				t.call(this, e) || r.push(this)
			});
			else {
				var i = typeof t == "string" ? this.filter(t) : j(t) && M(t.item) ? s.call(t) : n(t);
				this.forEach(function(e) {
					i.indexOf(e) < 0 && r.push(e)
				})
			}
			return n(r)
		},
		has: function(e) {
			return this.filter(function() {
				return P(e) ? n.contains(this, e) : n(this).find(e).size()
			})
		},
		eq: function(e) {
			return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
		},
		first: function() {
			var e = this[0];
			return e && !P(e) ? e : n(e)
		},
		last: function() {
			var e = this[this.length - 1];
			return e && !P(e) ? e : n(e)
		},
		find: function(e) {
			var t, r = this;
			return typeof e == "object" ? t = n(e).filter(function() {
				var e = this;
				return i.some.call(r, function(t) {
					return n.contains(t, e)
				})
			}) : this.length == 1 ? t = n(C.qsa(this[0], e)) : t = this.map(function() {
				return C.qsa(this, e)
			}), t
		},
		closest: function(e, t) {
			var r = this[0],
				i = !1;
			typeof e == "object" && (i = n(e));
			while (r && !(i ? i.indexOf(r) >= 0 : C.matches(r, e))) r = r !== t && !D(r) && r.parentNode;
			return n(r)
		},
		parents: function(e) {
			var t = [],
				r = this;
			while (r.length > 0) r = n.map(r, function(e) {
				if ((e = e.parentNode) && !D(e) && t.indexOf(e) < 0) return t.push(e), e
			});
			return V(t, e)
		},
		parent: function(e) {
			return V(L(this.pluck("parentNode")), e)
		},
		children: function(e) {
			return V(this.map(function() {
				return W(this)
			}), e)
		},
		contents: function() {
			return this.map(function() {
				return s.call(this.childNodes)
			})
		},
		siblings: function(e) {
			return V(this.map(function(e, t) {
				return o.call(W(t.parentNode), function(e) {
					return e !== t
				})
			}), e)
		},
		empty: function() {
			return this.each(function() {
				this.innerHTML = ""
			})
		},
		pluck: function(e) {
			return n.map(this, function(t) {
				return t[e]
			})
		},
		show: function() {
			return this.each(function() {
				this.style.display == "none" && (this.style.display = null), l(this, "").getPropertyValue("display") == "none" && (this.style.display = z(this.nodeName))
			})
		},
		replaceWith: function(e) {
			return this.before(e).remove()
		},
		wrap: function(e) {
			var t = M(e);
			if (this[0] && !t) var r = n(e).get(0),
				i = r.parentNode || this.length > 1;
			return this.each(function(s) {
				n(this).wrapAll(t ? e.call(this, s) : i ? r.cloneNode(!0) : r)
			})
		},
		wrapAll: function(e) {
			if (this[0]) {
				n(this[0]).before(e = n(e));
				var t;
				while ((t = e.children()).length) e = t.first();
				n(e).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			var t = M(e);
			return this.each(function(r) {
				var i = n(this),
					s = i.contents(),
					o = t ? e.call(this, r) : e;
				s.length ? s.wrapAll(o) : i.append(o)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				n(this).replaceWith(n(this).children())
			}), this
		},
		clone: function() {
			return this.map(function() {
				return this.cloneNode(!0)
			})
		},
		hide: function() {
			return this.css("display", "none")
		},
		toggle: function(t) {
			return this.each(function() {
				var r = n(this);
				(t === e ? r.css("display") == "none" : t) ? r.show() : r.hide()
			})
		},
		prev: function(e) {
			return n(this.pluck("previousElementSibling")).filter(e || "*")
		},
		next: function(e) {
			return n(this.pluck("nextElementSibling")).filter(e || "*")
		},
		html: function(t) {
			return t === e ? this.length > 0 ? this[0].innerHTML : null : this.each(function(e) {
				var r = this.innerHTML;
				n(this).empty().append($(this, t, e, r))
			})
		},
		text: function(t) {
			return t === e ? this.length > 0 ? this[0].textContent : null : this.each(function() {
				this.textContent = t
			})
		},
		attr: function(n, r) {
			var i;
			return typeof n == "string" && r === e ? this.length == 0 || this[0].nodeType !== 1 ? e : n == "value" && this[0].nodeName == "INPUT" ? this.val() : !(i = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : i : this.each(function(e) {
				if (this.nodeType !== 1) return;
				if (P(n))
					for (t in n) J(this, t, n[t]);
				else J(this, n, $(this, r, e, this.getAttribute(n)))
			})
		},
		removeAttr: function(e) {
			return this.each(function() {
				this.nodeType === 1 && J(this, e)
			})
		},
		prop: function(t, n) {
			return n === e ? this[0] && this[0][t] : this.each(function(e) {
				this[t] = $(this, n, e, this[t])
			})
		},
		data: function(t, n) {
			var r = this.attr("data-" + q(t), n);
			return r !== null ? Q(r) : e
		},
		val: function(t) {
			return t === e ? this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function(e) {
				return this.selected
			}).pluck("value") : this[0].value) : this.each(function(e) {
				this.value = $(this, t, e, this.value)
			})
		},
		offset: function(e) {
			if (e) return this.each(function(t) {
				var r = n(this),
					i = $(this, e, t, r.offset()),
					s = r.offsetParent().offset(),
					o = {
						top: i.top - s.top,
						left: i.left - s.left
					};
				r.css("position") == "static" && (o.position = "relative"), r.css(o)
			});
			if (this.length == 0) return null;
			var t = this[0].getBoundingClientRect();
			return {
				left: t.left + window.pageXOffset,
				top: t.top + window.pageYOffset,
				width: Math.round(t.width),
				height: Math.round(t.height)
			}
		},
		css: function(e, n) {
			if (arguments.length < 2 && typeof e == "string") return this[0] && (this[0].style[k(e)] || l(this[0], "").getPropertyValue(e));
			var r = "";
			if (O(e) == "string")!n && n !== 0 ? this.each(function() {
				this.style.removeProperty(q(e))
			}) : r = q(e) + ":" + U(e, n);
			else
				for (t in e)!e[t] && e[t] !== 0 ? this.each(function() {
					this.style.removeProperty(q(t))
				}) : r += q(t) + ":" + U(t, e[t]) + ";";
			return this.each(function() {
				this.style.cssText += ";" + r
			})
		},
		index: function(e) {
			return e ? this.indexOf(n(e)[0]) : this.parent().children().indexOf(this[0])
		},
		hasClass: function(e) {
			return i.some.call(this, function(e) {
				return this.test(K(e))
			}, R(e))
		},
		addClass: function(e) {
			return this.each(function(t) {
				r = [];
				var i = K(this),
					s = $(this, e, t, i);
				s.split(/\s+/g).forEach(function(e) {
					n(this).hasClass(e) || r.push(e)
				}, this), r.length && K(this, i + (i ? " " : "") + r.join(" "))
			})
		},
		removeClass: function(t) {
			return this.each(function(n) {
				if (t === e) return K(this, "");
				r = K(this), $(this, t, n, r).split(/\s+/g).forEach(function(e) {
					r = r.replace(R(e), " ")
				}), K(this, r.trim())
			})
		},
		toggleClass: function(t, r) {
			return this.each(function(i) {
				var s = n(this),
					o = $(this, t, i, K(this));
				o.split(/\s+/g).forEach(function(t) {
					(r === e ? !s.hasClass(t) : r) ? s.addClass(t) : s.removeClass(t)
				})
			})
		},
		scrollTop: function() {
			if (!this.length) return;
			return "scrollTop" in this[0] ? this[0].scrollTop : this[0].scrollY
		},
		position: function() {
			if (!this.length) return;
			var e = this[0],
				t = this.offsetParent(),
				r = this.offset(),
				i = d.test(t[0].nodeName) ? {
					top: 0,
					left: 0
				} : t.offset();
			return r.top -= parseFloat(n(e).css("margin-top")) || 0, r.left -= parseFloat(n(e).css("margin-left")) || 0, i.top += parseFloat(n(t[0]).css("border-top-width")) || 0, i.left += parseFloat(n(t[0]).css("border-left-width")) || 0, {
				top: r.top - i.top,
				left: r.left - i.left
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var e = this.offsetParent || u.body;
				while (e && !d.test(e.nodeName) && n(e).css("position") == "static") e = e.offsetParent;
				return e
			})
		}
	}, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function(t) {
		n.fn[t] = function(r) {
			var i, s = this[0],
				o = t.replace(/./, function(e) {
					return e[0].toUpperCase()
				});
			return r === e ? _(s) ? s["inner" + o] : D(s) ? s.documentElement["offset" + o] : (i = this.offset()) && i[t] : this.each(function(e) {
				s = n(this), s.css(t, $(this, r, e, s[t]()))
			})
		}
	}), m.forEach(function(e, t) {
		var r = t % 2;
		n.fn[e] = function() {
			var e, i = n.map(arguments, function(t) {
					return e = O(t), e == "object" || e == "array" || t == null ? t : C.fragment(t)
				}),
				s, o = this.length > 1;
			return i.length < 1 ? this : this.each(function(e, u) {
				s = r ? u : u.parentNode, u = t == 0 ? u.nextSibling : t == 1 ? u.firstChild : t == 2 ? u : null, i.forEach(function(e) {
					if (o) e = e.cloneNode(!0);
					else if (!s) return n(e).remove();
					G(s.insertBefore(e, u), function(e) {
						e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && !e.src && window.eval.call(window, e.innerHTML)
					})
				})
			})
		}, n.fn[r ? e + "To" : "insert" + (t ? "Before" : "After")] = function(t) {
			return n(t)[e](this), this
		}
	}), C.Z.prototype = n.fn, C.uniq = L, C.deserializeValue = Q, n.zepto = C, n
}();
window.Zepto = Zepto, window.$ === undefined && (window.$ = Zepto),
function(e) {
	function t(e) {
		var t = this.os = {},
			n = this.browser = {},
			r = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
			i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
			s = e.match(/(iPad).*OS\s([\d_]+)/),
			o = e.match(/(iPod)(.*OS\s([\d_]+))?/),
			u = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
			a = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			f = a && e.match(/TouchPad/),
			l = e.match(/Kindle\/([\d.]+)/),
			c = e.match(/Silk\/([\d._]+)/),
			h = e.match(/(BlackBerry).*Version\/([\d.]+)/),
			p = e.match(/(BB10).*Version\/([\d.]+)/),
			d = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
			v = e.match(/PlayBook/),
			m = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
			g = e.match(/Firefox\/([\d.]+)/),
			y = e.match(/MSIE\s([\d.]+)/),
			b = r && e.match(/Mobile\//) && !m,
			w = e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !m;
		if (n.webkit = !!r) n.version = r[1];
		i && (t.android = !0, t.version = i[2]), u && !o && (t.ios = t.iphone = !0, t.version = u[2].replace(/_/g, ".")), s && (t.ios = t.ipad = !0, t.version = s[2].replace(/_/g, ".")), o && (t.ios = t.ipod = !0, t.version = o[3] ? o[3].replace(/_/g, ".") : null), a && (t.webos = !0, t.version = a[2]), f && (t.touchpad = !0), h && (t.blackberry = !0, t.version = h[2]), p && (t.bb10 = !0, t.version = p[2]), d && (t.rimtabletos = !0, t.version = d[2]), v && (n.playbook = !0), l && (t.kindle = !0, t.version = l[1]), c && (n.silk = !0, n.version = c[1]), !c && t.android && e.match(/Kindle Fire/) && (n.silk = !0), m && (n.chrome = !0, n.version = m[1]), g && (n.firefox = !0, n.version = g[1]), y && (n.ie = !0, n.version = y[1]), b && (e.match(/Safari/) || !!t.ios) && (n.safari = !0), w && (n.webview = !0), t.tablet = !!(s || v || i && !e.match(/Mobile/) || g && e.match(/Tablet/) || y && !e.match(/Phone/) && e.match(/Touch/)), t.phone = !!(!t.tablet && !t.ipod && (i || u || a || h || p || m && e.match(/Android/) || m && e.match(/CriOS\/([\d.]+)/) || g && e.match(/Mobile/) || y && e.match(/Touch/)))
	}
	t.call(e, navigator.userAgent), e.__detect = t
}(Zepto),
function(e) {
	function c(e) {
		return e._zid || (e._zid = t++)
	}

	function h(e, t, n, r) {
		t = p(t);
		if (t.ns) var i = d(t.ns);
		return (o[c(e)] || []).filter(function(e) {
			return e && (!t.e || e.e == t.e) && (!t.ns || i.test(e.ns)) && (!n || c(e.fn) === c(n)) && (!r || e.sel == r)
		})
	}

	function p(e) {
		var t = ("" + e).split(".");
		return {
			e: t[0],
			ns: t.slice(1).sort().join(" ")
		}
	}

	function d(e) {
		return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
	}

	function v(e, t) {
		return e.del && !a && e.e in f || !!t
	}

	function m(e) {
		return l[e] || a && f[e] || e
	}

	function g(t, r, i, s, u, a, f) {
		var h = c(t),
			d = o[h] || (o[h] = []);
		r.split(/\s/).forEach(function(r) {
			if (r == "ready") return e(document).ready(i);
			var o = p(r);
			o.fn = i, o.sel = u, o.e in l && (i = function(t) {
				var n = t.relatedTarget;
				if (!n || n !== this && !e.contains(this, n)) return o.fn.apply(this, arguments)
			}), o.del = a;
			var c = a || i;
			o.proxy = function(e) {
				e = x(e);
				if (e.isImmediatePropagationStopped()) return;
				e.data = s;
				var r = c.apply(t, e._args == n ? [e] : [e].concat(e._args));
				return r === !1 && (e.preventDefault(), e.stopPropagation()), r
			}, o.i = d.length, d.push(o), "addEventListener" in t && t.addEventListener(m(o.e), o.proxy, v(o, f))
		})
	}

	function y(e, t, n, r, i) {
		var s = c(e);
		(t || "").split(/\s/).forEach(function(t) {
			h(e, t, n, r).forEach(function(t) {
				delete o[s][t.i], "removeEventListener" in e && e.removeEventListener(m(t.e), t.proxy, v(t, i))
			})
		})
	}

	function x(t, r) {
		if (r || !t.isDefaultPrevented) {
			r || (r = t), e.each(S, function(e, n) {
				var i = r[e];
				t[e] = function() {
					return this[n] = b, i && i.apply(r, arguments)
				}, t[n] = w
			});
			if (r.defaultPrevented !== n ? r.defaultPrevented : "returnValue" in r ? r.returnValue === !1 : r.getPreventDefault && r.getPreventDefault()) t.isDefaultPrevented = b
		}
		return t
	}

	function T(e) {
		var t, r = {
			originalEvent: e
		};
		for (t in e)!E.test(t) && e[t] !== n && (r[t] = e[t]);
		return x(r, e)
	}
	var t = 1,
		n, r = Array.prototype.slice,
		i = e.isFunction,
		s = function(e) {
			return typeof e == "string"
		},
		o = {},
		u = {},
		a = "onfocusin" in window,
		f = {
			focus: "focusin",
			blur: "focusout"
		},
		l = {
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		};
	u.click = u.mousedown = u.mouseup = u.mousemove = "MouseEvents", e.event = {
		add: g,
		remove: y
	}, e.proxy = function(t, n) {
		if (i(t)) {
			var r = function() {
				return t.apply(n, arguments)
			};
			return r._zid = c(t), r
		}
		if (s(n)) return e.proxy(t[n], t);
		throw new TypeError("expected function")
	}, e.fn.bind = function(e, t, n) {
		return this.on(e, t, n)
	}, e.fn.unbind = function(e, t) {
		return this.off(e, t)
	}, e.fn.one = function(e, t, n, r) {
		return this.on(e, t, n, r, 1)
	};
	var b = function() {
			return !0
		},
		w = function() {
			return !1
		},
		E = /^([A-Z]|returnValue$|layer[XY]$)/,
		S = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		};
	e.fn.delegate = function(e, t, n) {
		return this.on(t, e, n)
	}, e.fn.undelegate = function(e, t, n) {
		return this.off(t, e, n)
	}, e.fn.live = function(t, n) {
		return e(document.body).delegate(this.selector, t, n), this
	}, e.fn.die = function(t, n) {
		return e(document.body).undelegate(this.selector, t, n), this
	}, e.fn.on = function(t, o, u, a, f) {
		var l, c, h = this;
		if (t && !s(t)) return e.each(t, function(e, t) {
			h.on(e, o, u, t, f)
		}), h;
		!s(o) && !i(a) && a !== !1 && (a = u, u = o, o = n);
		if (i(u) || u === !1) a = u, u = n;
		return a === !1 && (a = w), h.each(function(n, i) {
			f && (l = function(e) {
				return y(i, e.type, a), a.apply(this, arguments)
			}), o && (c = function(t) {
				var n, s = e(t.target).closest(o, i).get(0);
				if (s && s !== i) return n = e.extend(T(t), {
					currentTarget: s,
					liveFired: i
				}), (l || a).apply(s, [n].concat(r.call(arguments, 1)))
			}), g(i, t, a, u, o, c || l)
		})
	}, e.fn.off = function(t, r, o) {
		var u = this;
		return t && !s(t) ? (e.each(t, function(e, t) {
			u.off(e, r, t)
		}), u) : (!s(r) && !i(o) && o !== !1 && (o = r, r = n), o === !1 && (o = w), u.each(function() {
			y(this, t, o, r)
		}))
	}, e.fn.trigger = function(t, n) {
		return t = s(t) || e.isPlainObject(t) ? e.Event(t) : x(t), t._args = n, this.each(function() {
			"dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
		})
	}, e.fn.triggerHandler = function(t, n) {
		var r, i;
		return this.each(function(o, u) {
			r = T(s(t) ? e.Event(t) : t), r._args = n, r.target = u, e.each(h(u, t.type || t), function(e, t) {
				i = t.proxy(r);
				if (r.isImmediatePropagationStopped()) return !1
			})
		}), i
	}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
		e.fn[t] = function(e) {
			return e ? this.bind(t, e) : this.trigger(t)
		}
	}), ["focus", "blur"].forEach(function(t) {
		e.fn[t] = function(e) {
			return e ? this.bind(t, e) : this.each(function() {
				try {
					this[t]()
				} catch (e) {}
			}), this
		}
	}), e.Event = function(e, t) {
		s(e) || (t = e, e = t.type);
		var n = document.createEvent(u[e] || "Events"),
			r = !0;
		if (t)
			for (var i in t) i == "bubbles" ? r = !!t[i] : n[i] = t[i];
		return n.initEvent(e, r, !0), x(n)
	}
}(Zepto),
function($) {
	function triggerAndReturn(e, t, n) {
		var r = $.Event(t);
		return $(e).trigger(r, n), !r.isDefaultPrevented()
	}

	function triggerGlobal(e, t, n, r) {
		if (e.global) return triggerAndReturn(t || document, n, r)
	}

	function ajaxStart(e) {
		e.global && $.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
	}

	function ajaxStop(e) {
		e.global && !--$.active && triggerGlobal(e, null, "ajaxStop")
	}

	function ajaxBeforeSend(e, t) {
		var n = t.context;
		if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1) return !1;
		triggerGlobal(t, n, "ajaxSend", [e, t])
	}

	function ajaxSuccess(e, t, n, r) {
		var i = n.context,
			s = "success";
		n.success.call(i, e, s, t), r && r.resolveWith(i, [e, s, t]), triggerGlobal(n, i, "ajaxSuccess", [t, n, e]), ajaxComplete(s, t, n)
	}

	function ajaxError(e, t, n, r, i) {
		var s = r.context;
		r.error.call(s, n, t, e), i && i.rejectWith(s, [n, t, e]), triggerGlobal(r, s, "ajaxError", [n, r, e || t]), ajaxComplete(t, n, r)
	}

	function ajaxComplete(e, t, n) {
		var r = n.context;
		n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
	}

	function empty() {}

	function mimeToDataType(e) {
		return e && (e = e.split(";", 2)[0]), e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
	}

	function appendQuery(e, t) {
		return t == "" ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
	}

	function serializeData(e) {
		e.processData && e.data && $.type(e.data) != "string" && (e.data = $.param(e.data, e.traditional)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data), e.data = undefined)
	}

	function parseArguments(e, t, n, r) {
		return $.isFunction(t) && (r = n, n = t, t = undefined), $.isFunction(n) || (r = n, n = undefined), {
			url: e,
			data: t,
			success: n,
			dataType: r
		}
	}

	function serialize(e, t, n, r) {
		var i, s = $.isArray(t),
			o = $.isPlainObject(t);
		$.each(t, function(t, u) {
			i = $.type(u), r && (t = n ? r : r + "[" + (o || i == "object" || i == "array" ? t : "") + "]"), !r && s ? e.add(u.name, u.value) : i == "array" || !n && i == "object" ? serialize(e, u, n, t) : e.add(t, u)
		})
	}
	var jsonpID = 0,
		document = window.document,
		key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		scriptTypeRE = /^(?:text|application)\/javascript/i,
		xmlTypeRE = /^(?:text|application)\/xml/i,
		jsonType = "application/json",
		htmlType = "text/html",
		blankRE = /^\s*$/;
	$.active = 0, $.ajaxJSONP = function(e, t) {
		if ("type" in e) {
			var n = e.jsonpCallback,
				r = ($.isFunction(n) ? n() : n) || "jsonp" + ++jsonpID,
				i = document.createElement("script"),
				s = window[r],
				o, u = function(e) {
					$(i).triggerHandler("error", e || "abort")
				},
				a = {
					abort: u
				},
				f;
			return t && t.promise(a), $(i).on("load error", function(n, u) {
				clearTimeout(f), $(i).off().remove(), n.type == "error" || !o ? ajaxError(null, u || "error", a, e, t) : ajaxSuccess(o[0], a, e, t), window[r] = s, o && $.isFunction(s) && s(o[0]), s = o = undefined
			}), ajaxBeforeSend(a, e) === !1 ? (u("abort"), a) : (window[r] = function() {
				o = arguments
			}, i.src = e.url.replace(/\?(.+)=\?/, "?$1=" + r), document.head.appendChild(i), e.timeout > 0 && (f = setTimeout(function() {
				u("timeout")
			}, e.timeout)), a)
		}
		return $.ajax(e)
	}, $.ajaxSettings = {
		type: "GET",
		beforeSend: empty,
		success: empty,
		error: empty,
		complete: empty,
		context: null,
		global: !0,
		xhr: function() {
			return new window.XMLHttpRequest
		},
		accepts: {
			script: "text/javascript, application/javascript, application/x-javascript",
			json: jsonType,
			xml: "application/xml, text/xml",
			html: htmlType,
			text: "text/plain"
		},
		crossDomain: !1,
		timeout: 0,
		processData: !0,
		cache: !0
	}, $.ajax = function(options) {
		var settings = $.extend({}, options || {}),
			deferred = $.Deferred && $.Deferred();
		for (key in $.ajaxSettings) settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
		ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings), settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now()));
		var dataType = settings.dataType,
			hasPlaceholder = /\?.+=\?/.test(settings.url);
		if (dataType == "jsonp" || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
		var mime = settings.accepts[dataType],
			headers = {},
			setHeader = function(e, t) {
				headers[e.toLowerCase()] = [e, t]
			},
			protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
			xhr = settings.xhr(),
			nativeSetHeader = xhr.setRequestHeader,
			abortTimeout;
		deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*");
		if (mime = settings.mimeType || mime) mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime);
		(settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
		if (settings.headers)
			for (name in settings.headers) setHeader(name, settings.headers[name]);
		xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
				var result, error = !1;
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
					dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), result = xhr.responseText;
					try {
						dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result))
					} catch (e) {
						error = e
					}
					error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred)
				} else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
			}
		};
		if (ajaxBeforeSend(xhr, settings) === !1) return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
		if (settings.xhrFields)
			for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
		var async = "async" in settings ? settings.async : !0;
		xhr.open(settings.type, settings.url, async, settings.username, settings.password);
		for (name in headers) nativeSetHeader.apply(xhr, headers[name]);
		return settings.timeout > 0 && (abortTimeout = setTimeout(function() {
			xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred)
		}, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr
	}, $.get = function() {
		return $.ajax(parseArguments.apply(null, arguments))
	}, $.post = function() {
		var e = parseArguments.apply(null, arguments);
		return e.type = "POST", $.ajax(e)
	}, $.getJSON = function() {
		var e = parseArguments.apply(null, arguments);
		return e.dataType = "json", $.ajax(e)
	}, $.fn.load = function(e, t, n) {
		if (!this.length) return this;
		var r = this,
			i = e.split(/\s/),
			s, o = parseArguments(e, t, n),
			u = o.success;
		return i.length > 1 && (o.url = i[0], s = i[1]), o.success = function(e) {
			r.html(s ? $("<div>").html(e.replace(rscript, "")).find(s) : e), u && u.apply(r, arguments)
		}, $.ajax(o), this
	};
	var escape = encodeURIComponent;
	$.param = function(e, t) {
		var n = [];
		return n.add = function(e, t) {
			this.push(escape(e) + "=" + escape(t))
		}, serialize(n, e, t), n.join("&").replace(/%20/g, "+")
	}
}(Zepto),
function(e) {
	e.fn.serializeArray = function() {
		var t = [],
			n;
		return e([].slice.call(this.get(0).elements)).each(function() {
			n = e(this);
			var r = n.attr("type");
			this.nodeName.toLowerCase() != "fieldset" && !this.disabled && r != "submit" && r != "reset" && r != "button" && (r != "radio" && r != "checkbox" || this.checked) && t.push({
				name: n.attr("name"),
				value: n.val()
			})
		}), t
	}, e.fn.serialize = function() {
		var e = [];
		return this.serializeArray().forEach(function(t) {
			e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
		}), e.join("&")
	}, e.fn.submit = function(t) {
		if (t) this.bind("submit", t);
		else if (this.length) {
			var n = e.Event("submit");
			this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
		}
		return this
	}
}(Zepto),
function(e, t) {
	function w(e) {
		return e.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
	}

	function E(e) {
		return r ? r + e : e.toLowerCase()
	}
	var n = "",
		r, i, s, o = {
			Webkit: "webkit",
			Moz: "",
			O: "o"
		},
		u = window.document,
		a = u.createElement("div"),
		f = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
		l, c, h, p, d, v, m, g, y, b = {};
	e.each(o, function(e, i) {
		if (a.style[e + "TransitionProperty"] !== t) return n = "-" + e.toLowerCase() + "-", r = i, !1
	}), l = n + "transform", b[c = n + "transition-property"] = b[h = n + "transition-duration"] = b[d = n + "transition-delay"] = b[p = n + "transition-timing-function"] = b[v = n + "animation-name"] = b[m = n + "animation-duration"] = b[y = n + "animation-delay"] = b[g = n + "animation-timing-function"] = "", e.fx = {
		off: r === t && a.style.transitionProperty === t,
		speeds: {
			_default: 400,
			fast: 200,
			slow: 600
		},
		cssPrefix: n,
		transitionEnd: E("TransitionEnd"),
		animationEnd: E("AnimationEnd")
	}, e.fn.animate = function(n, r, i, s, o) {
		return e.isFunction(r) && (s = r, i = t, r = t), e.isFunction(i) && (s = i, i = t), e.isPlainObject(r) && (i = r.easing, s = r.complete, o = r.delay, r = r.duration), r && (r = (typeof r == "number" ? r : e.fx.speeds[r] || e.fx.speeds._default) / 1e3), o && (o = parseFloat(o) / 1e3), this.anim(n, r, i, s, o)
	}, e.fn.anim = function(n, r, i, s, o) {
		var u, a = {},
			E, S = "",
			x = this,
			T, N = e.fx.transitionEnd,
			C = !1;
		r === t && (r = e.fx.speeds._default / 1e3), o === t && (o = 0), e.fx.off && (r = 0);
		if (typeof n == "string") a[v] = n, a[m] = r + "s", a[y] = o + "s", a[g] = i || "linear", N = e.fx.animationEnd;
		else {
			E = [];
			for (u in n) f.test(u) ? S += u + "(" + n[u] + ") " : (a[u] = n[u], E.push(w(u)));
			S && (a[l] = S, E.push(l)), r > 0 && typeof n == "object" && (a[c] = E.join(", "), a[h] = r + "s", a[d] = o + "s", a[p] = i || "linear")
		}
		return T = function(t) {
			if (typeof t != "undefined") {
				if (t.target !== t.currentTarget) return;
				e(t.target).unbind(N, T)
			} else e(this).unbind(N, T);
			C = !0, e(this).css(b), s && s.call(this)
		}, r > 0 && (this.bind(N, T), setTimeout(function() {
			if (C) return;
			T.call(x)
		}, r * 1e3 + 25)), this.size() && this.get(0).clientLeft, this.css(a), r <= 0 && setTimeout(function() {
			x.each(function() {
				T.call(this)
			})
		}, 0), this
	}, a = null
}(Zepto), define("$", function() {}),
function() {
	var e = this,
		t = e._,
		n = {},
		r = Array.prototype,
		i = Object.prototype,
		s = Function.prototype,
		o = r.push,
		u = r.slice,
		a = r.concat,
		f = i.toString,
		l = i.hasOwnProperty,
		c = r.forEach,
		h = r.map,
		p = r.reduce,
		d = r.reduceRight,
		v = r.filter,
		m = r.every,
		g = r.some,
		y = r.indexOf,
		b = r.lastIndexOf,
		w = Array.isArray,
		E = Object.keys,
		S = s.bind,
		x = function(e) {
			if (e instanceof x) return e;
			if (!(this instanceof x)) return new x(e);
			this._wrapped = e
		};
	typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.4.4";
	var T = x.each = x.forEach = function(e, t, r) {
		if (e == null) return;
		if (c && e.forEach === c) e.forEach(t, r);
		else if (e.length === +e.length) {
			for (var i = 0, s = e.length; i < s; i++)
				if (t.call(r, e[i], i, e) === n) return
		} else
			for (var o in e)
				if (x.has(e, o) && t.call(r, e[o], o, e) === n) return
	};
	x.map = x.collect = function(e, t, n) {
		var r = [];
		return e == null ? r : h && e.map === h ? e.map(t, n) : (T(e, function(e, i, s) {
			r[r.length] = t.call(n, e, i, s)
		}), r)
	};
	var N = "Reduce of empty array with no initial value";
	x.reduce = x.foldl = x.inject = function(e, t, n, r) {
		var i = arguments.length > 2;
		e == null && (e = []);
		if (p && e.reduce === p) return r && (t = x.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
		T(e, function(e, s, o) {
			i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
		});
		if (!i) throw new TypeError(N);
		return n
	}, x.reduceRight = x.foldr = function(e, t, n, r) {
		var i = arguments.length > 2;
		e == null && (e = []);
		if (d && e.reduceRight === d) return r && (t = x.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
		var s = e.length;
		if (s !== +s) {
			var o = x.keys(e);
			s = o.length
		}
		T(e, function(u, a, f) {
			a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
		});
		if (!i) throw new TypeError(N);
		return n
	}, x.find = x.detect = function(e, t, n) {
		var r;
		return C(e, function(e, i, s) {
			if (t.call(n, e, i, s)) return r = e, !0
		}), r
	}, x.filter = x.select = function(e, t, n) {
		var r = [];
		return e == null ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function(e, i, s) {
			t.call(n, e, i, s) && (r[r.length] = e)
		}), r)
	}, x.reject = function(e, t, n) {
		return x.filter(e, function(e, r, i) {
			return !t.call(n, e, r, i)
		}, n)
	}, x.every = x.all = function(e, t, r) {
		t || (t = x.identity);
		var i = !0;
		return e == null ? i : m && e.every === m ? e.every(t, r) : (T(e, function(e, s, o) {
			if (!(i = i && t.call(r, e, s, o))) return n
		}), !!i)
	};
	var C = x.some = x.any = function(e, t, r) {
		t || (t = x.identity);
		var i = !1;
		return e == null ? i : g && e.some === g ? e.some(t, r) : (T(e, function(e, s, o) {
			if (i || (i = t.call(r, e, s, o))) return n
		}), !!i)
	};
	x.contains = x.include = function(e, t) {
		return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function(e) {
			return e === t
		})
	}, x.invoke = function(e, t) {
		var n = u.call(arguments, 2),
			r = x.isFunction(t);
		return x.map(e, function(e) {
			return (r ? t : e[t]).apply(e, n)
		})
	}, x.pluck = function(e, t) {
		return x.map(e, function(e) {
			return e[t]
		})
	}, x.where = function(e, t, n) {
		return x.isEmpty(t) ? n ? null : [] : x[n ? "find" : "filter"](e, function(e) {
			for (var n in t)
				if (t[n] !== e[n]) return !1;
			return !0
		})
	}, x.findWhere = function(e, t) {
		return x.where(e, t, !0)
	}, x.max = function(e, t, n) {
		if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
		if (!t && x.isEmpty(e)) return -Infinity;
		var r = {
			computed: -Infinity,
			value: -Infinity
		};
		return T(e, function(e, i, s) {
			var o = t ? t.call(n, e, i, s) : e;
			o >= r.computed && (r = {
				value: e,
				computed: o
			})
		}), r.value
	}, x.min = function(e, t, n) {
		if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
		if (!t && x.isEmpty(e)) return Infinity;
		var r = {
			computed: Infinity,
			value: Infinity
		};
		return T(e, function(e, i, s) {
			var o = t ? t.call(n, e, i, s) : e;
			o < r.computed && (r = {
				value: e,
				computed: o
			})
		}), r.value
	}, x.shuffle = function(e) {
		var t, n = 0,
			r = [];
		return T(e, function(e) {
			t = x.random(n++), r[n - 1] = r[t], r[t] = e
		}), r
	};
	var k = function(e) {
		return x.isFunction(e) ? e : function(t) {
			return t[e]
		}
	};
	x.sortBy = function(e, t, n) {
		var r = k(t);
		return x.pluck(x.map(e, function(e, t, i) {
			return {
				value: e,
				index: t,
				criteria: r.call(n, e, t, i)
			}
		}).sort(function(e, t) {
			var n = e.criteria,
				r = t.criteria;
			if (n !== r) {
				if (n > r || n === void 0) return 1;
				if (n < r || r === void 0) return -1
			}
			return e.index < t.index ? -1 : 1
		}), "value")
	};
	var L = function(e, t, n, r) {
		var i = {},
			s = k(t || x.identity);
		return T(e, function(t, o) {
			var u = s.call(n, t, o, e);
			r(i, u, t)
		}), i
	};
	x.groupBy = function(e, t, n) {
		return L(e, t, n, function(e, t, n) {
			(x.has(e, t) ? e[t] : e[t] = []).push(n)
		})
	}, x.countBy = function(e, t, n) {
		return L(e, t, n, function(e, t) {
			x.has(e, t) || (e[t] = 0), e[t]++
		})
	}, x.sortedIndex = function(e, t, n, r) {
		n = n == null ? x.identity : k(n);
		var i = n.call(r, t),
			s = 0,
			o = e.length;
		while (s < o) {
			var u = s + o >>> 1;
			n.call(r, e[u]) < i ? s = u + 1 : o = u
		}
		return s
	}, x.toArray = function(e) {
		return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
	}, x.size = function(e) {
		return e == null ? 0 : e.length === +e.length ? e.length : x.keys(e).length
	}, x.first = x.head = x.take = function(e, t, n) {
		return e == null ? void 0 : t != null && !n ? u.call(e, 0, t) : e[0]
	}, x.initial = function(e, t, n) {
		return u.call(e, 0, e.length - (t == null || n ? 1 : t))
	}, x.last = function(e, t, n) {
		return e == null ? void 0 : t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
	}, x.rest = x.tail = x.drop = function(e, t, n) {
		return u.call(e, t == null || n ? 1 : t)
	}, x.compact = function(e) {
		return x.filter(e, x.identity)
	};
	var A = function(e, t, n) {
		return T(e, function(e) {
			x.isArray(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
		}), n
	};
	x.flatten = function(e, t) {
		return A(e, t, [])
	}, x.without = function(e) {
		return x.difference(e, u.call(arguments, 1))
	}, x.uniq = x.unique = function(e, t, n, r) {
		x.isFunction(t) && (r = n, n = t, t = !1);
		var i = n ? x.map(e, n, r) : e,
			s = [],
			o = [];
		return T(i, function(n, r) {
			if (t ? !r || o[o.length - 1] !== n : !x.contains(o, n)) o.push(n), s.push(e[r])
		}), s
	}, x.union = function() {
		return x.uniq(a.apply(r, arguments))
	}, x.intersection = function(e) {
		var t = u.call(arguments, 1);
		return x.filter(x.uniq(e), function(e) {
			return x.every(t, function(t) {
				return x.indexOf(t, e) >= 0
			})
		})
	}, x.difference = function(e) {
		var t = a.apply(r, u.call(arguments, 1));
		return x.filter(e, function(e) {
			return !x.contains(t, e)
		})
	}, x.zip = function() {
		var e = u.call(arguments),
			t = x.max(x.pluck(e, "length")),
			n = new Array(t);
		for (var r = 0; r < t; r++) n[r] = x.pluck(e, "" + r);
		return n
	}, x.object = function(e, t) {
		if (e == null) return {};
		var n = {};
		for (var r = 0, i = e.length; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
		return n
	}, x.indexOf = function(e, t, n) {
		if (e == null) return -1;
		var r = 0,
			i = e.length;
		if (n) {
			if (typeof n != "number") return r = x.sortedIndex(e, t), e[r] === t ? r : -1;
			r = n < 0 ? Math.max(0, i + n) : n
		}
		if (y && e.indexOf === y) return e.indexOf(t, n);
		for (; r < i; r++)
			if (e[r] === t) return r;
		return -1
	}, x.lastIndexOf = function(e, t, n) {
		if (e == null) return -1;
		var r = n != null;
		if (b && e.lastIndexOf === b) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
		var i = r ? n : e.length;
		while (i--)
			if (e[i] === t) return i;
		return -1
	}, x.range = function(e, t, n) {
		arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
		var r = Math.max(Math.ceil((t - e) / n), 0),
			i = 0,
			s = new Array(r);
		while (i < r) s[i++] = e, e += n;
		return s
	}, x.bind = function(e, t) {
		if (e.bind === S && S) return S.apply(e, u.call(arguments, 1));
		var n = u.call(arguments, 2);
		return function() {
			return e.apply(t, n.concat(u.call(arguments)))
		}
	}, x.partial = function(e) {
		var t = u.call(arguments, 1);
		return function() {
			return e.apply(this, t.concat(u.call(arguments)))
		}
	}, x.bindAll = function(e) {
		var t = u.call(arguments, 1);
		return t.length === 0 && (t = x.functions(e)), T(t, function(t) {
			e[t] = x.bind(e[t], e)
		}), e
	}, x.memoize = function(e, t) {
		var n = {};
		return t || (t = x.identity),
			function() {
				var r = t.apply(this, arguments);
				return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
			}
	}, x.delay = function(e, t) {
		var n = u.call(arguments, 2);
		return setTimeout(function() {
			return e.apply(null, n)
		}, t)
	}, x.defer = function(e) {
		return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
	}, x.throttle = function(e, t) {
		var n, r, i, s, o = 0,
			u = function() {
				o = new Date, i = null, s = e.apply(n, r)
			};
		return function() {
			var a = new Date,
				f = t - (a - o);
			return n = this, r = arguments, f <= 0 ? (clearTimeout(i), i = null, o = a, s = e.apply(n, r)) : i || (i = setTimeout(u, f)), s
		}
	}, x.debounce = function(e, t, n) {
		var r, i;
		return function() {
			var s = this,
				o = arguments,
				u = function() {
					r = null, n || (i = e.apply(s, o))
				},
				a = n && !r;
			return clearTimeout(r), r = setTimeout(u, t), a && (i = e.apply(s, o)), i
		}
	}, x.once = function(e) {
		var t = !1,
			n;
		return function() {
			return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
		}
	}, x.wrap = function(e, t) {
		return function() {
			var n = [e];
			return o.apply(n, arguments), t.apply(this, n)
		}
	}, x.compose = function() {
		var e = arguments;
		return function() {
			var t = arguments;
			for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
			return t[0]
		}
	}, x.after = function(e, t) {
		return e <= 0 ? t() : function() {
			if (--e < 1) return t.apply(this, arguments)
		}
	}, x.keys = E || function(e) {
		if (e !== Object(e)) throw new TypeError("Invalid object");
		var t = [];
		for (var n in e) x.has(e, n) && (t[t.length] = n);
		return t
	}, x.values = function(e) {
		var t = [];
		for (var n in e) x.has(e, n) && t.push(e[n]);
		return t
	}, x.pairs = function(e) {
		var t = [];
		for (var n in e) x.has(e, n) && t.push([n, e[n]]);
		return t
	}, x.invert = function(e) {
		var t = {};
		for (var n in e) x.has(e, n) && (t[e[n]] = n);
		return t
	}, x.functions = x.methods = function(e) {
		var t = [];
		for (var n in e) x.isFunction(e[n]) && t.push(n);
		return t.sort()
	}, x.extend = function(e) {
		return T(u.call(arguments, 1), function(t) {
			if (t)
				for (var n in t) e[n] = t[n]
		}), e
	}, x.pick = function(e) {
		var t = {},
			n = a.apply(r, u.call(arguments, 1));
		return T(n, function(n) {
			n in e && (t[n] = e[n])
		}), t
	}, x.omit = function(e) {
		var t = {},
			n = a.apply(r, u.call(arguments, 1));
		for (var i in e) x.contains(n, i) || (t[i] = e[i]);
		return t
	}, x.defaults = function(e) {
		return T(u.call(arguments, 1), function(t) {
			if (t)
				for (var n in t) e[n] == null && (e[n] = t[n])
		}), e
	}, x.clone = function(e) {
		return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
	}, x.tap = function(e, t) {
		return t(e), e
	};
	var O = function(e, t, n, r) {
		if (e === t) return e !== 0 || 1 / e == 1 / t;
		if (e == null || t == null) return e === t;
		e instanceof x && (e = e._wrapped), t instanceof x && (t = t._wrapped);
		var i = f.call(e);
		if (i != f.call(t)) return !1;
		switch (i) {
			case "[object String]":
				return e == String(t);
			case "[object Number]":
				return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
			case "[object Date]":
			case "[object Boolean]":
				return +e == +t;
			case "[object RegExp]":
				return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
		}
		if (typeof e != "object" || typeof t != "object") return !1;
		var s = n.length;
		while (s--)
			if (n[s] == e) return r[s] == t;
		n.push(e), r.push(t);
		var o = 0,
			u = !0;
		if (i == "[object Array]") {
			o = e.length, u = o == t.length;
			if (u)
				while (o--)
					if (!(u = O(e[o], t[o], n, r))) break
		} else {
			var a = e.constructor,
				l = t.constructor;
			if (a !== l && !(x.isFunction(a) && a instanceof a && x.isFunction(l) && l instanceof l)) return !1;
			for (var c in e)
				if (x.has(e, c)) {
					o++;
					if (!(u = x.has(t, c) && O(e[c], t[c], n, r))) break
				}
			if (u) {
				for (c in t)
					if (x.has(t, c) && !(o--)) break;
				u = !o
			}
		}
		return n.pop(), r.pop(), u
	};
	x.isEqual = function(e, t) {
		return O(e, t, [], [])
	}, x.isEmpty = function(e) {
		if (e == null) return !0;
		if (x.isArray(e) || x.isString(e)) return e.length === 0;
		for (var t in e)
			if (x.has(e, t)) return !1;
		return !0
	}, x.isElement = function(e) {
		return !!e && e.nodeType === 1
	}, x.isArray = w || function(e) {
		return f.call(e) == "[object Array]"
	}, x.isObject = function(e) {
		return e === Object(e)
	}, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
		x["is" + e] = function(t) {
			return f.call(t) == "[object " + e + "]"
		}
	}), x.isArguments(arguments) || (x.isArguments = function(e) {
		return !!e && !!x.has(e, "callee")
	}), typeof / . / != "function" && (x.isFunction = function(e) {
		return typeof e == "function"
	}), x.isFinite = function(e) {
		return isFinite(e) && !isNaN(parseFloat(e))
	}, x.isNaN = function(e) {
		return x.isNumber(e) && e != +e
	}, x.isBoolean = function(e) {
		return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
	}, x.isNull = function(e) {
		return e === null
	}, x.isUndefined = function(e) {
		return e === void 0
	}, x.has = function(e, t) {
		return l.call(e, t)
	}, x.noConflict = function() {
		return e._ = t, this
	}, x.identity = function(e) {
		return e
	}, x.times = function(e, t, n) {
		var r = Array(e);
		for (var i = 0; i < e; i++) r[i] = t.call(n, i);
		return r
	}, x.random = function(e, t) {
		return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
	};
	var M = {
		escape: {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"/": "&#x2F;"
		}
	};
	M.unescape = x.invert(M.escape);
	var _ = {
		escape: new RegExp("[" + x.keys(M.escape).join("") + "]", "g"),
		unescape: new RegExp("(" + x.keys(M.unescape).join("|") + ")", "g")
	};
	x.each(["escape", "unescape"], function(e) {
		x[e] = function(t) {
			return t == null ? "" : ("" + t).replace(_[e], function(t) {
				return M[e][t]
			})
		}
	}), x.result = function(e, t) {
		if (e == null) return null;
		var n = e[t];
		return x.isFunction(n) ? n.call(e) : n
	}, x.mixin = function(e) {
		T(x.functions(e), function(t) {
			var n = x[t] = e[t];
			x.prototype[t] = function() {
				var e = [this._wrapped];
				return o.apply(e, arguments), j.call(this, n.apply(x, e))
			}
		})
	};
	var D = 0;
	x.uniqueId = function(e) {
		var t = ++D + "";
		return e ? e + t : t
	}, x.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var P = /(.)^/,
		H = {
			"'": "'",
			"\\": "\\",
			"\r": "r",
			"\n": "n",
			"	": "t",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	x.template = function(e, t, n) {
		var r;
		n = x.defaults({}, n, x.templateSettings);
		var i = new RegExp([(n.escape || P).source, (n.interpolate || P).source, (n.evaluate || P).source].join("|") + "|$", "g"),
			s = 0,
			o = "__p+='";
		e.replace(i, function(t, n, r, i, u) {
			return o += e.slice(s, u).replace(B, function(e) {
				return "\\" + H[e]
			}), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = u + t.length, t
		}), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
		try {
			r = new Function(n.variable || "obj", "_", o)
		} catch (u) {
			throw u.source = o, u
		}
		if (t) return r(t, x);
		var a = function(e) {
			return r.call(this, e, x)
		};
		return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", a
	}, x.chain = function(e) {
		return x(e).chain()
	};
	var j = function(e) {
		return this._chain ? x(e).chain() : e
	};
	x.mixin(x), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
		var t = r[e];
		x.prototype[e] = function() {
			var n = this._wrapped;
			return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], j.call(this, n)
		}
	}), T(["concat", "join", "slice"], function(e) {
		var t = r[e];
		x.prototype[e] = function() {
			return j.call(this, t.apply(this._wrapped, arguments))
		}
	}), x.extend(x.prototype, {
		chain: function() {
			return this._chain = !0, this
		},
		value: function() {
			return this._wrapped
		}
	})
}.call(this), define("_", function() {}),
function() {
	var e = this,
		t = e.Backbone,
		n = [],
		r = n.push,
		i = n.slice,
		s = n.splice,
		o;
	typeof exports != "undefined" ? o = exports : o = e.Backbone = {}, o.VERSION = "1.0.0";
	var u = e._;
	!u && typeof require != "undefined" && (u = require("underscore")), o.$ = e.jQuery || e.Zepto || e.ender || e.$, o.noConflict = function() {
		return e.Backbone = t, this
	}, o.emulateHTTP = !1, o.emulateJSON = !1;
	var a = o.Events = {
			on: function(e, t, n) {
				if (!l(this, "on", e, [t, n]) || !t) return this;
				this._events || (this._events = {});
				var r = this._events[e] || (this._events[e] = []);
				return r.push({
					callback: t,
					context: n,
					ctx: n || this
				}), this
			},
			once: function(e, t, n) {
				if (!l(this, "once", e, [t, n]) || !t) return this;
				var r = this,
					i = u.once(function() {
						r.off(e, i), t.apply(this, arguments)
					});
				return i._callback = t, this.on(e, i, n)
			},
			off: function(e, t, n) {
				var r, i, s, o, a, f, c, h;
				if (!this._events || !l(this, "off", e, [t, n])) return this;
				if (!e && !t && !n) return this._events = {}, this;
				o = e ? [e] : u.keys(this._events);
				for (a = 0, f = o.length; a < f; a++) {
					e = o[a];
					if (s = this._events[e]) {
						this._events[e] = r = [];
						if (t || n)
							for (c = 0, h = s.length; c < h; c++) i = s[c], (t && t !== i.callback && t !== i.callback._callback || n && n !== i.context) && r.push(i);
						r.length || delete this._events[e]
					}
				}
				return this
			},
			trigger: function(e) {
				if (!this._events) return this;
				var t = i.call(arguments, 1);
				if (!l(this, "trigger", e, t)) return this;
				var n = this._events[e],
					r = this._events.all;
				return n && c(n, t), r && c(r, arguments), this
			},
			stopListening: function(e, t, n) {
				var r = this._listeners;
				if (!r) return this;
				var i = !t && !n;
				typeof t == "object" && (n = this), e && ((r = {})[e._listenerId] = e);
				for (var s in r) r[s].off(t, n, this), i && delete this._listeners[s];
				return this
			}
		},
		f = /\s+/,
		l = function(e, t, n, r) {
			if (!n) return !0;
			if (typeof n == "object") {
				for (var i in n) e[t].apply(e, [i, n[i]].concat(r));
				return !1
			}
			if (f.test(n)) {
				var s = n.split(f);
				for (var o = 0, u = s.length; o < u; o++) e[t].apply(e, [s[o]].concat(r));
				return !1
			}
			return !0
		},
		c = function(e, t) {
			var n, r = -1,
				i = e.length,
				s = t[0],
				o = t[1],
				u = t[2];
			switch (t.length) {
				case 0:
					while (++r < i)(n = e[r]).callback.call(n.ctx);
					return;
				case 1:
					while (++r < i)(n = e[r]).callback.call(n.ctx, s);
					return;
				case 2:
					while (++r < i)(n = e[r]).callback.call(n.ctx, s, o);
					return;
				case 3:
					while (++r < i)(n = e[r]).callback.call(n.ctx, s, o, u);
					return;
				default:
					while (++r < i)(n = e[r]).callback.apply(n.ctx, t)
			}
		},
		h = {
			listenTo: "on",
			listenToOnce: "once"
		};
	u.each(h, function(e, t) {
		a[t] = function(t, n, r) {
			var i = this._listeners || (this._listeners = {}),
				s = t._listenerId || (t._listenerId = u.uniqueId("l"));
			return i[s] = t, typeof n == "object" && (r = this), t[e](n, r, this), this
		}
	}), a.bind = a.on, a.unbind = a.off, u.extend(o, a);
	var p = o.View = function(e) {
			this.cid = u.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
		},
		d = /^(\S+)\s*(.*)$/,
		v = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
	u.extend(p.prototype, a, {
		tagName: "div",
		$: function(e) {
			return this.$el.find(e)
		},
		initialize: function() {},
		render: function() {
			return this
		},
		remove: function() {
			return this.$el.remove(), this.stopListening(), this
		},
		setElement: function(e, t) {
			return this.$el && this.undelegateEvents(), this.$el = e instanceof o.$ ? e : o.$(e), this.el = this.$el[0], t !== !1 && this.delegateEvents(), this
		},
		delegateEvents: function(e) {
			if (!e && !(e = u.result(this, "events"))) return this;
			this.undelegateEvents();
			for (var t in e) {
				var n = e[t];
				u.isFunction(n) || (n = this[e[t]]);
				if (!n) continue;
				var r = t.match(d),
					i = r[1],
					s = r[2];
				n = u.bind(n, this), i += ".delegateEvents" + this.cid, s === "" ? this.$el.on(i, n) : this.$el.on(i, s, n)
			}
			return this
		},
		undelegateEvents: function() {
			return this.$el.off(".delegateEvents" + this.cid), this
		},
		_configure: function(e) {
			this.options && (e = u.extend({}, u.result(this, "options"), e)), u.extend(this, u.pick(e, v)), this.options = e
		},
		_ensureElement: function() {
			if (!this.el) {
				var e = u.extend({}, u.result(this, "attributes"));
				this.id && (e.id = u.result(this, "id")), this.className && (e["class"] = u.result(this, "className"));
				var t = o.$("<" + u.result(this, "tagName") + ">").attr(e);
				this.setElement(t, !1)
			} else this.setElement(u.result(this, "el"), !1)
		}
	});
	var m = function(e, t) {
		var n = this,
			r;
		e && u.has(e, "constructor") ? r = e.constructor : r = function() {
			return n.apply(this, arguments)
		}, u.extend(r, n, t);
		var i = function() {
			this.constructor = r
		};
		return i.prototype = n.prototype, r.prototype = new i, e && u.extend(r.prototype, e), r.__super__ = n.prototype, r
	};
	p.extend = m
}.call(this), define("B", function() {}), require.config({
	baseUrl: "/webapp/",
	shim: {
		$: {
			exports: "zepto"
		},
		_: {
			exports: "_"
		},
		B: {
			deps: ["_", "$"],
			exports: "Backbone"
		},
		common: {
			deps: ["libs"]
		}
	},
	paths: {
		$: "res/libs/zepto",
		_: "res/libs/underscore",
		B: "res/libs/backbone",
		libs: "libs_r",
		common: "app/common"
	}
}), require(["$", "_", "B"], function() {}), define("libs", function() {}),
function(e) {
	function v(e) {
		if (e.targetTouches.length > 1) return !0;
		if (h) {
			var i = window.getSelection();
			if (i.rangeCount && !i.isCollapsed) return !0;
			if (e.targetTouches[0].identifier === p) return event.preventDefault(), !1;
			p = e.targetTouches[0].identifier
		}
		return t = !0, n = e.timeStamp, s = e.target, o = e.targetTouches[0].pageX, u = e.targetTouches[0].pageY, e.timeStamp - r < 200 && e.preventDefault(), !0
	}

	function m(e) {
		if (!t) return !0;
		a = e.changedTouches[0].pageX, f = e.changedTouches[0].pageY;
		if (Math.abs(a - o) > l || Math.abs(f - u) > l) s = null, t = !1;
		return !0
	}

	function g(o) {
		if (!t) return !0;
		if (o.timeStamp - r < 200) return i = !0, !0;
		r = o.timeStamp, t = !1;
		var u = s.tagName.toLowerCase();
		if (u == "label") {
			var a = x(s);
			if (a) {
				var f = e(a);
				f.attr("type") == "checkbox" || f.attr("type") == "radio" ? f.attr("checked") ? f.removeAttr("checked") : f.attr("checked", "checked") : e(a).focus();
				if (c) return !1;
				s = a
			}
		} else if (S(s)) return o.timeStamp - n > 100 ? (s = null, !1) : (d && s.blur(), s.focus(), u !== "select" && (s = null, o.preventDefault()), !1);
		return n = 0, E(s) || (o.preventDefault(), T(s, o)), !1
	}

	function y(e) {
		t = !1, s = null
	}

	function b(e) {
		return s ? e.touchEvent ? !0 : e.cancelable ? !E(s) || i ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0 : !0
	}

	function w(e) {
		if (t) return t = !1, s = null, !0;
		if (e.target.type === "submit" && e.detail === 0) return !0;
		var n = b(e);
		return n || (s = null), n
	}

	function E(e) {
		switch (e.nodeName.toLowerCase()) {
			case "button":
			case "select":
			case "textarea":
				if (e.disabled) return !0;
				break;
			case "input":
				if (h && e.type === "file" || e.disabled) return !0;
				break;
			case "video":
				return !0
		}
		return /\bneedclick\b/.test(e.className)
	}

	function S(e) {
		switch (e.nodeName.toLowerCase()) {
			case "textarea":
			case "select":
				return !0;
			case "input":
				switch (e.type) {
					case "button":
					case "checkbox":
					case "file":
					case "image":
					case "radio":
					case "submit":
						return !1
				}
				return !e.disabled && !e.readOnly;
			default:
				return /\bneedfocus\b/.test(e.className)
		}
	}

	function x(e) {
		return e.control !== undefined ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
	}

	function T(e, t) {
		var n, r;
		document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent("click", !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.touchEvent = !0, e.dispatchEvent(n)
	}

	function N() {
		return navigator.userAgent.indexOf("MQQBrowser") > 0 ? !1 : typeof window.ontouchstart == "undefined" ? !1 : !0
	}
	var t = !1,
		n = 0,
		r = 0,
		i = !1,
		s = null,
		o = 0,
		u = 0,
		a = 0,
		f = 0,
		l = 4,
		c = navigator.userAgent.indexOf("Android") > 0,
		h = /iP(ad|hone|od)/.test(navigator.userAgent),
		p = 0,
		d = h && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
	e.needFocus = S, e.bindFastClick = function() {
		if (!N()) return !0;
		e(document).ready(function() {
			c && (document.addEventListener("mouseover", b, !0), document.addEventListener("mousedown", b, !0), document.addEventListener("mouseup", b, !0)), document.addEventListener("click", w, !0), e(document).on("touchstart", v).on("touchmove", m).on("touchend", g).on("touchcancel", y)
		})
	}, e.unbindFastClick = function() {
		if (!N()) return !0;
		c && (document.removeEventListener("mouseover", b, !0), document.removeEventListener("mousedown", b, !0), document.removeEventListener("mouseup", b, !0)), document.removeEventListener("click", w, !0), e(document).off("touchstart", v).off("touchmove", m).off("touchend", g).off("touchcancel", y)
	}
}(Zepto), define("F", function() {});