// Generated by LiveScript 1.6.0
// prelude.ls 1.2.1
// Copyright (c) George Zahariev
// Released under the MIT License
// https://raw.githubusercontent.com/gkz/prelude-ls/master/LICENSE
require=function(){function l(u,o,a){function f(t,n){if(!o[t]){if(!u[t]){var r="function"==typeof require&&require;if(!n&&r)return r(t,!0);if(c)return c(t,!0);var e=new Error("Cannot find module '"+t+"'");throw (e.code="MODULE_NOT_FOUND", e)}var i=o[t]={exports:{}};u[t][0].call(i.exports,function(n){var r=u[t][1][n];return f(r||n)},i,i.exports,l,u,o,a)}return o[t].exports}for(var c="function"==typeof require&&require,n=0;n<a.length;n++)f(a[n]);return f}return l}()({1:[function(n,r,t){
// Generated by LiveScript 1.6.0
var e,i,u,o,a,f,c={}.toString;e=l(function(n,r){return n.apply(null,r)});i=function(n){return l(n)};u=l(function(n,r,t){return n(t,r)});o=function(r){return function(n){return function(){return r(n(n)).apply(null,arguments)}}(function(n){return function(){return r(n(n)).apply(null,arguments)}})};a=l(function(n,r,t,e){return n(r(t),r(e))});f=function(o){var a;a={};return function(){var i,n,r,t,e,u;n=[];for(r=0,t=arguments.length;r<t;++r){n.push(arguments[r])}i=n;e=function(){var n,r,t,e=[];for(n=0,t=(r=i).length;n<t;++n){u=r[n];e.push(u+c.call(u).slice(8,-1))}return e}().join("");return a[e]=e in a?a[e]:o.apply(null,i)}};r.exports={curry:i,flip:u,fix:o,apply:e,over:a,memoize:f};function l(t,e){var i,u=function(r){return t.length>1?function(){var n=r?r.concat():[];i=e?i||this:this;return n.push.apply(n,arguments)<t.length&&arguments.length?u.call(i,n):t.apply(i,n)}:t};return u()}},{}],2:[function(n,r,t){
// Generated by LiveScript 1.6.0
var e,i,u,o,a,f,c,l,s,h,p,v,g,d,m,y,j,x,b,M,z,k,w,L,W,q,B,I,A,T,O,N,S,C,F,P,U,E,Z,_,D,R,V,G,H,J,K,Q,X,Y,$,nn,rn,tn,en,un,on,an,fn,cn,ln,sn,hn,pn,vn,gn,dn,mn,yn,jn,xn={}.toString;e=bn(function(n,r){var t,e,i;for(t=0,e=r.length;t<e;++t){i=r[t];n(i)}return r});i=bn(function(n,r){var t,e,i,u=[];for(t=0,e=r.length;t<e;++t){i=r[t];u.push(n(i))}return u});u=function(n){var r,t,e,i=[];for(r=0,t=n.length;r<t;++r){e=n[r];if(e){i.push(e)}}return i};o=bn(function(n,r){var t,e,i,u=[];for(t=0,e=r.length;t<e;++t){i=r[t];if(n(i)){u.push(i)}}return u});a=bn(function(n,r){var t,e,i,u=[];for(t=0,e=r.length;t<e;++t){i=r[t];if(!n(i)){u.push(i)}}return u});f=bn(function(n,r){var t,e;t=dn(n,r);e=r.slice();if(t!=null){e.splice(t,1)}return e});c=bn(function(n,r){var t,e,i,u,o;t=[];e=[];for(i=0,u=r.length;i<u;++i){o=r[i];(n(o)?t:e).push(o)}return[t,e]});l=bn(function(n,r){var t,e,i;for(t=0,e=r.length;t<e;++t){i=r[t];if(n(i)){return i}}});s=h=function(n){return n[0]};p=function(n){if(!n.length){return}return n.slice(1)};v=function(n){return n[n.length-1]};g=function(n){if(!n.length){return}return n.slice(0,-1)};d=function(n){return!n.length};m=function(n){return n.concat().reverse()};y=function(n){var r,t,e,i;r=[];for(t=0,e=n.length;t<e;++t){i=n[t];if(!Mn(i,r)){r.push(i)}}return r};j=bn(function(n,r){var t,e,i,u,o,a=[];t=[];for(e=0,i=r.length;e<i;++e){u=r[e];o=n(u);if(Mn(o,t)){continue}t.push(o);a.push(u)}return a});x=b=bn(function(n,r,t){var e,i,u;for(e=0,i=t.length;e<i;++e){u=t[e];r=n(r,u)}return r});M=z=bn(function(n,r){return x(n,r[0],r.slice(1))});k=bn(function(n,r,t){var e,i;for(e=t.length-1;e>=0;--e){i=t[e];r=n(i,r)}return r});w=bn(function(n,r){return k(n,r[r.length-1],r.slice(0,-1))});L=bn(function(n,r){var t,e,i;t=[];e=r;while((i=n(e))!=null){t.push(i[0]);e=i[1]}return t});W=function(n){return[].concat.apply([],n)};q=bn(function(i,u){var o;return[].concat.apply([],function(){var n,r,t,e=[];for(n=0,t=(r=u).length;n<t;++n){o=r[n];e.push(i(o))}return e}())});B=function(i){var u;return[].concat.apply([],function(){var n,r,t,e=[];for(n=0,t=(r=i).length;n<t;++n){u=r[n];if(xn.call(u).slice(8,-1)==="Array"){e.push(B(u))}else{e.push(u)}}return e}())};I=function(n){var r,t,e,i,u,o,a,f,c,l;t=[];for(e=1,i=arguments.length;e<i;++e){t.push(arguments[e])}r=t;u=[];n:for(e=0,o=n.length;e<o;++e){a=n[e];for(f=0,c=r.length;f<c;++f){l=r[f];if(Mn(a,l)){continue n}}u.push(a)}return u};A=function(n){var r,t,e,i,u,o,a,f,c,l;t=[];for(e=1,i=arguments.length;e<i;++e){t.push(arguments[e])}r=t;u=[];n:for(e=0,o=n.length;e<o;++e){a=n[e];for(f=0,c=r.length;f<c;++f){l=r[f];if(!Mn(a,l)){continue n}}u.push(a)}return u};T=function(){var n,r,t,e,i,u,o,a,f,c;r=[];for(t=0,e=arguments.length;t<e;++t){r.push(arguments[t])}n=r;i=[];for(t=0,u=n.length;t<u;++t){o=n[t];for(a=0,f=o.length;a<f;++a){c=o[a];if(!Mn(c,i)){i.push(c)}}}return i};O=bn(function(n,r){var t,e,i,u,o;t={};for(e=0,i=r.length;e<i;++e){u=r[e];o=n(u);if(o in t){t[o]+=1}else{t[o]=1}}return t});N=bn(function(n,r){var t,e,i,u,o;t={};for(e=0,i=r.length;e<i;++e){u=r[e];o=n(u);if(o in t){t[o].push(u)}else{t[o]=[u]}}return t});S=function(n){var r,t,e;for(r=0,t=n.length;r<t;++r){e=n[r];if(!e){return false}}return true};C=function(n){var r,t,e;for(r=0,t=n.length;r<t;++r){e=n[r];if(e){return true}}return false};F=bn(function(n,r){var t,e,i;for(t=0,e=r.length;t<e;++t){i=r[t];if(n(i)){return true}}return false});P=bn(function(n,r){var t,e,i;for(t=0,e=r.length;t<e;++t){i=r[t];if(!n(i)){return false}}return true});U=function(n){return n.concat().sort(function(n,r){if(n>r){return 1}else if(n<r){return-1}else{return 0}})};E=bn(function(n,r){return r.concat().sort(n)});Z=bn(function(t,n){return n.concat().sort(function(n,r){if(t(n)>t(r)){return 1}else if(t(n)<t(r)){return-1}else{return 0}})});_=function(n){var r,t,e,i;r=0;for(t=0,e=n.length;t<e;++t){i=n[t];r+=i}return r};D=function(n){var r,t,e,i;r=1;for(t=0,e=n.length;t<e;++t){i=n[t];r*=i}return r};R=V=function(n){var r,t,e,i;r=0;for(t=0,e=n.length;t<e;++t){i=n[t];r+=i}return r/n.length};G=function(n){var r,t,e,i,u;r=n[0];for(t=0,i=(e=n.slice(1)).length;t<i;++t){u=e[t];if(u>r){r=u}}return r};H=function(n){var r,t,e,i,u;r=n[0];for(t=0,i=(e=n.slice(1)).length;t<i;++t){u=e[t];if(u<r){r=u}}return r};J=bn(function(n,r){var t,e,i,u,o;t=r[0];for(e=0,u=(i=r.slice(1)).length;e<u;++e){o=i[e];if(n(o)>n(t)){t=o}}return t});K=bn(function(n,r){var t,e,i,u,o;t=r[0];for(e=0,u=(i=r.slice(1)).length;e<u;++e){o=i[e];if(n(o)<n(t)){t=o}}return t});Q=X=bn(function(i,n,u){var o,a;o=n;return[n].concat(function(){var n,r,t,e=[];for(n=0,t=(r=u).length;n<t;++n){a=r[n];e.push(o=i(o,a))}return e}())});Y=$=bn(function(n,r){if(!r.length){return}return Q(n,r[0],r.slice(1))});nn=bn(function(n,r,t){t=t.concat().reverse();return Q(n,r,t).reverse()});rn=bn(function(n,r){if(!r.length){return}r=r.concat().reverse();return Q(n,r[0],r.slice(1)).reverse()});tn=bn(function(n,r,t){return t.slice(n,r)});en=bn(function(n,r){if(n<=0){return r.slice(0,0)}else{return r.slice(0,n)}});un=bn(function(n,r){if(n<=0){return r}else{return r.slice(n)}});on=bn(function(n,r){return[en(n,r),un(n,r)]});an=bn(function(n,r){var t,e;t=r.length;if(!t){return r}e=0;while(e<t&&n(r[e])){e+=1}return r.slice(0,e)});fn=bn(function(n,r){var t,e;t=r.length;if(!t){return r}e=0;while(e<t&&n(r[e])){e+=1}return r.slice(e)});cn=bn(function(n,r){return[an(n,r),fn(n,r)]});ln=bn(function(n,r){return cn(zn(n,kn),r)});sn=bn(function(n,r){var t,e,i,u,o,a;t=[];e=r.length;for(i=0,u=n.length;i<u;++i){o=i;a=n[i];if(o===e){break}t.push([a,r[o]])}return t});hn=bn(function(n,r,t){var e,i,u,o,a,f;e=[];i=t.length;for(u=0,o=r.length;u<o;++u){a=u;f=r[u];if(a===i){break}e.push(n(f,t[a]))}return e});pn=function(){var n,r,t,e,i,u,o,a,f,c,l,s=[];r=[];for(t=0,e=arguments.length;t<e;++t){r.push(arguments[t])}n=r;i=undefined;for(t=0,u=n.length;t<u;++t){o=n[t];i<=(a=o.length)||(i=a)}for(t=0;t<i;++t){f=t;c=[];for(l=0,u=n.length;l<u;++l){o=n[l];c.push(o[f])}s.push(c)}return s};vn=function(n){var i,r,t,e,u,o,a,f,c,l=[];r=[];for(t=1,e=arguments.length;t<e;++t){r.push(arguments[t])}i=r;u=undefined;for(t=0,o=i.length;t<o;++t){a=i[t];u<=(f=a.length)||(u=f)}for(t=0;t<u;++t){c=t;l.push(n.apply(null,s()))}return l;function s(){var n,r,t,e=[];for(n=0,t=(r=i).length;n<t;++n){a=r[n];e.push(a[c])}return e}};gn=bn(function(n,r){if(n<0){return r[r.length+n]}else{return r[n]}});dn=bn(function(n,r){var t,e,i,u;for(t=0,e=r.length;t<e;++t){i=t;u=r[t];if(u===n){return i}}});mn=bn(function(n,r){var t,e,i,u,o=[];for(t=0,e=r.length;t<e;++t){i=t;u=r[t];if(u===n){o.push(i)}}return o});yn=bn(function(n,r){var t,e,i,u;for(t=0,e=r.length;t<e;++t){i=t;u=r[t];if(n(u)){return i}}});jn=bn(function(n,r){var t,e,i,u,o=[];for(t=0,e=r.length;t<e;++t){i=t;u=r[t];if(n(u)){o.push(i)}}return o});r.exports={each:e,map:i,filter:o,compact:u,reject:a,remove:f,partition:c,find:l,head:s,first:h,tail:p,last:v,initial:g,empty:d,reverse:m,difference:I,intersection:A,union:T,countBy:O,groupBy:N,fold:x,fold1:M,foldl:b,foldl1:z,foldr:k,foldr1:w,unfoldr:L,andList:S,orList:C,any:F,all:P,unique:y,uniqueBy:j,sort:U,sortWith:E,sortBy:Z,sum:_,product:D,mean:R,average:V,concat:W,concatMap:q,flatten:B,maximum:G,minimum:H,maximumBy:J,minimumBy:K,scan:Q,scan1:Y,scanl:X,scanl1:$,scanr:nn,scanr1:rn,slice:tn,take:en,drop:un,splitAt:on,takeWhile:an,dropWhile:fn,span:cn,breakList:ln,zip:sn,zipWith:hn,zipAll:pn,zipAllWith:vn,at:gn,elemIndex:dn,elemIndices:mn,findIndex:yn,findIndices:jn};function bn(t,e){var i,u=function(r){return t.length>1?function(){var n=r?r.concat():[];i=e?i||this:this;return n.push.apply(n,arguments)<t.length&&arguments.length?u.call(i,n):t.apply(i,n)}:t};return u()}function Mn(n,r){var t=-1,e=r.length>>>0;while(++t<e)if(n===r[t])return true;return false}function zn(){var t=arguments;return function(){var n,r;r=t[0].apply(this,arguments);for(n=1;n<t.length;++n){r=t[n](r)}return r}}function kn(n){return!n}},{}],3:[function(n,r,t){
// Generated by LiveScript 1.6.0
var e,i,u,o,a,f,c,l,s,h,p,v,g,d,m,y,j,x,b,M,z,k,w,L,W,q,B,I,A,T,O,N;e=S(function(n,r){return n>r?n:r});i=S(function(n,r){return n<r?n:r});u=function(n){return-n};o=Math.abs;a=function(n){if(n<0){return-1}else if(n>0){return 1}else{return 0}};f=S(function(n,r){return~~(n/r)});c=S(function(n,r){return n%r});l=S(function(n,r){return Math.floor(n/r)});s=S(function(n,r){var t;return(n%(t=r)+t)%t});h=function(n){return 1/n};p=Math.PI;v=p*2;g=Math.exp;d=Math.sqrt;m=Math.log;y=S(function(n,r){return Math.pow(n,r)});j=Math.sin;x=Math.tan;b=Math.cos;M=Math.asin;z=Math.acos;k=Math.atan;w=S(function(n,r){return Math.atan2(n,r)});L=function(n){return~~n};W=Math.round;q=Math.ceil;B=Math.floor;I=function(n){return n!==n};A=function(n){return n%2===0};T=function(n){return n%2!==0};O=S(function(n,r){var t;n=Math.abs(n);r=Math.abs(r);while(r!==0){t=n%r;n=r;r=t}return n});N=S(function(n,r){return Math.abs(Math.floor(n/O(n,r)*r))});r.exports={max:e,min:i,negate:u,abs:o,signum:a,quot:f,rem:c,div:l,mod:s,recip:h,pi:p,tau:v,exp:g,sqrt:d,ln:m,pow:y,sin:j,tan:x,cos:b,acos:z,asin:M,atan:k,atan2:w,truncate:L,round:W,ceiling:q,floor:B,isItNaN:I,even:A,odd:T,gcd:O,lcm:N};function S(t,e){var i,u=function(r){return t.length>1?function(){var n=r?r.concat():[];i=e?i||this:this;return n.push.apply(n,arguments)<t.length&&arguments.length?u.call(i,n):t.apply(i,n)}:t};return u()}},{}],4:[function(n,r,t){
// Generated by LiveScript 1.6.0
var e,i,u,o,a,f,c,l,s,h,p,v,g,d;e=function(n){var r,t,e=[];for(r in n){t=n[r];e.push(t)}return e};i=function(n){var r,t=[];for(r in n){t.push(r)}return t};u=function(n){var r,t,e,i={};for(r=0,t=n.length;r<t;++r){e=n[r];i[e[0]]=e[1]}return i};o=function(n){var r,t,e=[];for(r in n){t=n[r];e.push([r,t])}return e};a=m(function(n,r){var t,e,i,u,o={};for(t=0,e=n.length;t<e;++t){i=t;u=n[t];o[u]=r[i]}return o});f=function(n){var r,t,e,i;r=[];t=[];for(e in n){i=n[e];r.push(e);t.push(i)}return[r,t]};c=function(n){var r;for(r in n){return false}return true};l=m(function(n,r){var t,e;for(t in r){e=r[t];n(e)}return r});s=m(function(n,r){var t,e,i={};for(t in r){e=r[t];i[t]=n(e)}return i});h=function(n){var r,t,e={};for(r in n){t=n[r];if(t){e[r]=t}}return e};p=m(function(n,r){var t,e,i={};for(t in r){e=r[t];if(n(e)){i[t]=e}}return i});v=m(function(n,r){var t,e,i={};for(t in r){e=r[t];if(!n(e)){i[t]=e}}return i});g=m(function(n,r){var t,e,i,u;t={};e={};for(i in r){u=r[i];(n(u)?t:e)[i]=u}return[t,e]});d=m(function(n,r){var t,e;for(t in r){e=r[t];if(n(e)){return e}}});r.exports={values:e,keys:i,pairsToObj:u,objToPairs:o,listsToObj:a,objToLists:f,empty:c,each:l,map:s,filter:p,compact:h,reject:v,partition:g,find:d};function m(t,e){var i,u=function(r){return t.length>1?function(){var n=r?r.concat():[];i=e?i||this:this;return n.push.apply(n,arguments)<t.length&&arguments.length?u.call(i,n):t.apply(i,n)}:t};return u()}},{}],5:[function(n,r,t){
// Generated by LiveScript 1.6.0
var e,i,u,o,a,f,c,l,s,h,p,v,g;e=d(function(n,r){return r.split(n)});i=d(function(n,r){return r.join(n)});u=function(n){if(!n.length){return[]}return n.split("\n")};o=function(n){return n.join("\n")};a=function(n){if(!n.length){return[]}return n.split(/[ ]+/)};f=function(n){return n.join(" ")};c=function(n){return n.split("")};l=function(n){return n.join("")};s=function(n){return n.split("").reverse().join("")};h=d(function(n,r){var t,e;t="";for(e=0;e<n;++e){t+=r}return t});p=function(n){return n.charAt(0).toUpperCase()+n.slice(1)};v=function(n){return n.replace(/[-_]+(.)?/g,function(n,r){return(r!=null?r:"").toUpperCase()})};g=function(n){return n.replace(/([^-A-Z])([A-Z]+)/g,function(n,r,t){return r+"-"+(t.length>1?t:t.toLowerCase())}).replace(/^([A-Z]+)/,function(n,r){if(r.length>1){return r+"-"}else{return r.toLowerCase()}})};r.exports={split:e,join:i,lines:u,unlines:o,words:a,unwords:f,chars:c,unchars:l,reverse:s,repeat:h,capitalize:p,camelize:v,dasherize:g};function d(t,e){var i,u=function(r){return t.length>1?function(){var n=r?r.concat():[];i=e?i||this:this;return n.push.apply(n,arguments)<t.length&&arguments.length?u.call(i,n):t.apply(i,n)}:t};return u()}},{}],"prelude-ls":[function(n,r,t){
// Generated by LiveScript 1.6.0
var e,i,u,o,a,f,c,l,s,h={}.toString;e=n("./Func.js");i=n("./List.js");u=n("./Obj.js");o=n("./Str.js");a=n("./Num.js");f=function(n){return n};c=p(function(n,r){return h.call(r).slice(8,-1)===n});l=p(function(n,r){var t,e=[];for(t=0;t<n;++t){e.push(r)}return e});o.empty=i.empty;o.slice=i.slice;o.take=i.take;o.drop=i.drop;o.splitAt=i.splitAt;o.takeWhile=i.takeWhile;o.dropWhile=i.dropWhile;o.span=i.span;o.breakStr=i.breakList;s={Func:e,List:i,Obj:u,Str:o,Num:a,id:f,isType:c,replicate:l};s.each=i.each;s.map=i.map;s.filter=i.filter;s.compact=i.compact;s.reject=i.reject;s.partition=i.partition;s.find=i.find;s.head=i.head;s.first=i.first;s.tail=i.tail;s.last=i.last;s.initial=i.initial;s.empty=i.empty;s.reverse=i.reverse;s.difference=i.difference;s.intersection=i.intersection;s.union=i.union;s.countBy=i.countBy;s.groupBy=i.groupBy;s.fold=i.fold;s.foldl=i.foldl;s.fold1=i.fold1;s.foldl1=i.foldl1;s.foldr=i.foldr;s.foldr1=i.foldr1;s.unfoldr=i.unfoldr;s.andList=i.andList;s.orList=i.orList;s.any=i.any;s.all=i.all;s.unique=i.unique;s.uniqueBy=i.uniqueBy;s.sort=i.sort;s.sortWith=i.sortWith;s.sortBy=i.sortBy;s.sum=i.sum;s.product=i.product;s.mean=i.mean;s.average=i.average;s.concat=i.concat;s.concatMap=i.concatMap;s.flatten=i.flatten;s.maximum=i.maximum;s.minimum=i.minimum;s.maximumBy=i.maximumBy;s.minimumBy=i.minimumBy;s.scan=i.scan;s.scanl=i.scanl;s.scan1=i.scan1;s.scanl1=i.scanl1;s.scanr=i.scanr;s.scanr1=i.scanr1;s.slice=i.slice;s.take=i.take;s.drop=i.drop;s.splitAt=i.splitAt;s.takeWhile=i.takeWhile;s.dropWhile=i.dropWhile;s.span=i.span;s.breakList=i.breakList;s.zip=i.zip;s.zipWith=i.zipWith;s.zipAll=i.zipAll;s.zipAllWith=i.zipAllWith;s.at=i.at;s.elemIndex=i.elemIndex;s.elemIndices=i.elemIndices;s.findIndex=i.findIndex;s.findIndices=i.findIndices;s.apply=e.apply;s.curry=e.curry;s.flip=e.flip;s.fix=e.fix;s.over=e.over;s.split=o.split;s.join=o.join;s.lines=o.lines;s.unlines=o.unlines;s.words=o.words;s.unwords=o.unwords;s.chars=o.chars;s.unchars=o.unchars;s.repeat=o.repeat;s.capitalize=o.capitalize;s.camelize=o.camelize;s.dasherize=o.dasherize;s.values=u.values;s.keys=u.keys;s.pairsToObj=u.pairsToObj;s.objToPairs=u.objToPairs;s.listsToObj=u.listsToObj;s.objToLists=u.objToLists;s.max=a.max;s.min=a.min;s.negate=a.negate;s.abs=a.abs;s.signum=a.signum;s.quot=a.quot;s.rem=a.rem;s.div=a.div;s.mod=a.mod;s.recip=a.recip;s.pi=a.pi;s.tau=a.tau;s.exp=a.exp;s.sqrt=a.sqrt;s.ln=a.ln;s.pow=a.pow;s.sin=a.sin;s.tan=a.tan;s.cos=a.cos;s.acos=a.acos;s.asin=a.asin;s.atan=a.atan;s.atan2=a.atan2;s.truncate=a.truncate;s.round=a.round;s.ceiling=a.ceiling;s.floor=a.floor;s.isItNaN=a.isItNaN;s.even=a.even;s.odd=a.odd;s.gcd=a.gcd;s.lcm=a.lcm;s.VERSION="1.2.1";r.exports=s;function p(t,e){var i,u=function(r){return t.length>1?function(){var n=r?r.concat():[];i=e?i||this:this;return n.push.apply(n,arguments)<t.length&&arguments.length?u.call(i,n):t.apply(i,n)}:t};return u()}},{"./Func.js":1,"./List.js":2,"./Num.js":3,"./Obj.js":4,"./Str.js":5}]},{},[]);