/*! (c) 2020 Andrea Giammarchi */
const{parse:t,stringify:e}=JSON,{keys:n}=Object,o: String=String,c: Number={},r: Function=(t: String,e: String)=>e,s: Function=(t: String)=>t instanceof o?o(t):t,l: Function=(t: String,e: String)=>"string"==typeof e?new o(e):e,a: Function=(t: Object,e: Object,r: Object,s: Function)=>{const l: Array=[];for(let a=n(r),{length:f}=a,i=0;i<f;i++){const n: String=a[i],f: String=r[n];if(f instanceof o){const o: String=t[f];"object"!=typeof o||e.has(o)?r[n]=s.call(r,n,o):(e.add(o),r[n]=c,l.push({k:n,a:[t,e,o,s]}))}else r[n]!==c&&(r[n]=s.call(r,n,f))}for(let{length:t}=l,e=0;e<t;e++){const{k:t,a:n}=l[e];r[t]=s.call(r,t,a.apply(null,n))}return r},f: Function=(t: Map,e: Array,n: String)=>{const c: String=o(e.push(n)-1);return t.set(n,c),c},i: Function=(e: String,n: Number)=>{const o: Object=t(e,l).map(s),c: String=o[0],f: Function=n||r,i: String="object"==typeof c&&c?a(o,new Set,c,f):c;return f.call({"":i},"",i)},p: Function=(t: String,n: String,o: String)=>{const c: Function=n&&"object"==typeof n?(t: String,e: Number)=>""===t||-1<n.indexOf(t)?e:void 0:n||r,s: Map=new Map,l: Array=[],a: Array=[];let i: Number=+f(s,l,c.call({"":t},"",t)),p: Boolean=!i;for(;i<l.length;)p=!0,a[i]=e(l[i++],u,o);return"["+a.join(",")+"]";function u(t: String,e: String): String{if(p)return p=!p,e;const n: String=c.call(this,t,e);switch(typeof n){case"object":if(null===n)return n;case"string":return s.get(n)||f(s,l,n)}return n}},u: Function=(e: Array)=>t(p(e)),g: Function=(t: String)=>i(e(t));export{g as fromJSON,i as parse,p as stringify,u as toJSON};
