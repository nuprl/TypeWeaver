self.Flatted=function(n: number){"use strict";function t(n: string): boolean{return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n: string){return typeof n}:function(n: object){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},t(n)
/*! (c) 2020 Andrea Giammarchi */}var r: Function=JSON.parse,e: object=JSON.stringify,o: Function=Object.keys,u: Function=String,f: string="string",i: Map={},c: string="object",a: Function=function(n: string,t: string){return t},l: Function=function(n: string){return n instanceof u?u(n):n},s: Function=function(n: number,r: string){return t(r)===f?new u(r):r},y: Function=function n(r: object,e: Map,f: object,a: Function): object{for(var l=[],s=o(f),y=s.length,p=0;p<y;p++){var v: string=s[p],S: string=f[v];if(S instanceof u){var b: string=r[S];t(b)!==c||e.has(b)?f[v]=a.call(f,v,b):(e.add(b),f[v]=i,l.push({k:v,a:[r,e,b,a]}))}else f[v]!==i&&(f[v]=a.call(f,v,S))}for(var m=l.length,g=0;g<m;g++){var h: object=l[g],O: any[]=h.k,d: any[]=h.a;f[O]=a.call(f,O,n.apply(null,d))}return f},p: Function=function(n: Map,t: any[],r: string){var e: string=u(t.push(r)-1);return n.set(r,e),e},v: Function=function(n: string,e: string){var o: object=r(n,s).map(l),u: string=o[0],f: Function=e||a,i: string=t(u)===c&&u?y(o,new Set,u,f):u;return f.call({"":i},"",i)},S: Function=function(n: string,r: string,o: string){for(var u=r&&t(r)===c?function(n: string,t: number){return""===n||-1<r.indexOf(n)?t:void 0}:r||a,i=new Map,l=[],s=[],y=+p(i,l,u.call({"":n},"",n)),v=!y;y<l.length;)v=!0,s[y]=e(l[y++],S,o);return"["+s.join(",")+"]";function S(n: string,r: string): string{if(v)return v=!v,r;var e: string=u.call(this,n,r);switch(t(e)){case c:if(null===e)return e;case f:return i.get(e)||p(i,l,e)}return e}};return n.fromJSON=function(n: number){return v(e(n))},n.parse=v,n.stringify=S,n.toJSON=function(n: number){return r(S(n))},n}({});