/*! (c) 2020 Andrea Giammarchi */
const{parse:t,stringify:e}=JSON,{keys:n}=Object,o=String,c={},r=(t: any,e: any)=>e,s=(t: any)=>t instanceof o?o(t):t,l=(t: any,e: any)=>"string"==typeof e?new o(e):e,a=(t: any,e: any,r: any,s: any)=>{const l: any[]=[];for(let a=n(r),{length:f}=a,i=0;i<f;i++){const n: any=a[i],f=r[n];if(f instanceof o){const o: any=t[f];"object"!=typeof o||e.has(o)?r[n]=s.call(r,n,o):(e.add(o),r[n]=c,l.push({k:n,a:[t,e,o,s]}))}else r[n]!==c&&(r[n]=s.call(r,n,f))}for(let{length:t}=l,e=0;e<t;e++){const{k:t,a:n}=l[e];r[t]=s.call(r,t,a.apply(null,n))}return r},f=(t: any,e: any,n: number)=>{const c: any=o(e.push(n)-1);return t.set(n,c),c},i=(e: any,n: number)=>{const o: any=t(e,l).map(s),c=o[0],f=n||r,i="object"==typeof c&&c?a(o,new Set,c,f):c;return f.call({"":i},"",i)},p=(t: any,n: number,o: any)=>{const c: any=n&&"object"==typeof n?(t: any,e: any)=>""===t||-1<n.indexOf(t)?e:void 0:n||r,s=new Map,l=[],a=[];let i: number=+f(s,l,c.call({"":t},"",t)),p=!i;for(;i<l.length;)p=!0,a[i]=e(l[i++],u,o);return"["+a.join(",")+"]";function u(t: any,e: any): any{if(p)return p=!p,e;const n: any=c.call(this,t,e);switch(typeof n){case"object":if(null===n)return n;case"string":return s.get(n)||f(s,l,n)}return n}},u=(e: any)=>t(p(e)),g=(t: any)=>i(e(t));export{g as fromJSON,i as parse,p as stringify,u as toJSON};