self.Flatted=function(t: Object){"use strict";
/*! (c) 2020 Andrea Giammarchi */const{parse:e,stringify:n}=JSON,{keys:r}=Object,s: String=String,o: String="string",c: Number={},l: String="object",a: Function=(t: String,e: String)=>e,f: Function=(t: String)=>t instanceof s?s(t):t,i: Function=(t: String,e: String)=>typeof e===o?new s(e):e,u: Function=(t: Object,e: Map,n: Object,o: Function)=>{const a: Array=[];for(let f=r(n),{length:i}=f,u=0;u<i;u++){const r: String=f[u],i: String=n[r];if(i instanceof s){const s: String=t[i];typeof s!==l||e.has(s)?n[r]=o.call(n,r,s):(e.add(s),n[r]=c,a.push({k:r,a:[t,e,s,o]}))}else n[r]!==c&&(n[r]=o.call(n,r,i))}for(let{length:t}=a,e=0;e<t;e++){const{k:t,a:r}=a[e];n[t]=o.call(n,t,u.apply(null,r))}return n},p: Function=(t: Map,e: Array,n: String)=>{const r: String=s(e.push(n)-1);return t.set(n,r),r},y: Function=(t: String,n: Number)=>{const r: Object=e(t,i).map(f),s: String=r[0],o: Function=n||a,c: String=typeof s===l&&s?u(r,new Set,s,o):s;return o.call({"":c},"",c)},g: Function=(t: String,e: String,r: String)=>{const s: Function=e&&typeof e===l?(t: String,n: Number)=>""===t||-1<e.indexOf(t)?n:void 0:e||a,c: Map=new Map,f: Array=[],i: Array=[];let u: Number=+p(c,f,s.call({"":t},"",t)),y: Boolean=!u;for(;u<f.length;)y=!0,i[u]=n(f[u++],g,r);return"["+i.join(",")+"]";function g(t: String,e: String): String{if(y)return y=!y,e;const n: String=s.call(this,t,e);switch(typeof n){case l:if(null===n)return n;case o:return c.get(n)||p(c,f,n)}return n}};return t.fromJSON=(t: String)=>y(n(t)),t.parse=y,t.stringify=g,t.toJSON=(t: String)=>e(g(t)),t}({});
