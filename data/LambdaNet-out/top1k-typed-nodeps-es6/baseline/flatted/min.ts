self.Flatted=function(n: Number){"use strict";function t(n: String): Boolean{return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n: String){return typeof n}:function(n: Object){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},t(n)
/*! (c) 2020 Andrea Giammarchi */}var r: Function=JSON.parse,e: Object=JSON.stringify,o: Function=Object.keys,u: Function=String,f: String="string",i: Map={},c: String="object",a: Function=function(n: String,t: String){return t},l: Function=function(n: String){return n instanceof u?u(n):n},s: Function=function(n: Number,r: String){return t(r)===f?new u(r):r},y: Function=function n(r: Object,e: Map,f: Object,a: Function): Object{for(var l=[],s=o(f),y=s.length,p=0;p<y;p++){var v: String=s[p],S: String=f[v];if(S instanceof u){var b: String=r[S];t(b)!==c||e.has(b)?f[v]=a.call(f,v,b):(e.add(b),f[v]=i,l.push({k:v,a:[r,e,b,a]}))}else f[v]!==i&&(f[v]=a.call(f,v,S))}for(var m=l.length,g=0;g<m;g++){var h: Object=l[g],O: Array=h.k,d: Array=h.a;f[O]=a.call(f,O,n.apply(null,d))}return f},p: Function=function(n: Map,t: Array,r: String){var e: String=u(t.push(r)-1);return n.set(r,e),e},v: Function=function(n: String,e: Array){var o: Object=r(n,s).map(l),u: String=o[0],f: Function=e||a,i: String=t(u)===c&&u?y(o,new Set,u,f):u;return f.call({"":i},"",i)},S: Function=function(n: String,r: String,o: String){for(var u=r&&t(r)===c?function(n: String,t: Number){return""===n||-1<r.indexOf(n)?t:void 0}:r||a,i=new Map,l=[],s=[],y=+p(i,l,u.call({"":n},"",n)),v=!y;y<l.length;)v=!0,s[y]=e(l[y++],S,o);return"["+s.join(",")+"]";function S(n: String,r: String): String{if(v)return v=!v,r;var e: String=u.call(this,n,r);switch(t(e)){case c:if(null===e)return e;case f:return i.get(e)||p(i,l,e)}return e}};return n.fromJSON=function(n: Number){return v(e(n))},n.parse=v,n.stringify=S,n.toJSON=function(n: Number){return r(S(n))},n}({});