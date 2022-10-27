// Generated by LiveScript 1.6.0
var max: Number, min: String, negate: Function, abs: Number, signum: Function, quot: Array, rem: Array, div: Array, mod: Array, recip: Function, pi: Number, tau: Number, exp: Array, sqrt: Array, ln: String, pow: String, sin: String, tan: String, cos: String, asin: Array, acos: Array, atan: String, atan2: Array, truncate: Function, round: Array, ceiling: Array, floor: Number, isItNaN: Boolean, even: Function, odd: Function, gcd: Function, lcm: Array;
max = curry$(function(x$: Number, y$: Number){
  return x$ > y$ ? x$ : y$;
});
min = curry$(function(x$: String, y$: Number){
  return x$ < y$ ? x$ : y$;
});
negate = function(x: Number){
  return -x;
};
abs = Math.abs;
signum = function(x: Number){
  if (x < 0) {
    return -1;
  } else if (x > 0) {
    return 1;
  } else {
    return 0;
  }
};
quot = curry$(function(x: Number, y: Number){
  return ~~(x / y);
});
rem = curry$(function(x$: String, y$: Number){
  return x$ % y$;
});
div = curry$(function(x: Number, y: Number){
  return Math.floor(x / y);
});
mod = curry$(function(x$: String, y$: Number){
  var ref$: Number;
  return ((x$) % (ref$ = y$) + ref$) % ref$;
});
recip = (function(it: Number){
  return 1 / it;
});
pi = Math.PI;
tau = pi * 2;
exp = Math.exp;
sqrt = Math.sqrt;
ln = Math.log;
pow = curry$(function(x$: Number, y$: Number){
  return Math.pow(x$, y$);
});
sin = Math.sin;
tan = Math.tan;
cos = Math.cos;
asin = Math.asin;
acos = Math.acos;
atan = Math.atan;
atan2 = curry$(function(x: Number, y: Number){
  return Math.atan2(x, y);
});
truncate = function(x: String){
  return ~~x;
};
round = Math.round;
ceiling = Math.ceil;
floor = Math.floor;
isItNaN = function(x: String){
  return x !== x;
};
even = function(x: String){
  return x % 2 === 0;
};
odd = function(x: String){
  return x % 2 !== 0;
};
gcd = curry$(function(x: Number, y: Number){
  var z: Number;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y !== 0) {
    z = x % y;
    x = y;
    y = z;
  }
  return x;
});
lcm = curry$(function(x: Number, y: Number){
  return Math.abs(Math.floor(x / gcd(x, y) * y));
});

export default {
  max: max,
  min: min,
  negate: negate,
  abs: abs,
  signum: signum,
  quot: quot,
  rem: rem,
  div: div,
  mod: mod,
  recip: recip,
  pi: pi,
  tau: tau,
  exp: exp,
  sqrt: sqrt,
  ln: ln,
  pow: pow,
  sin: sin,
  tan: tan,
  cos: cos,
  acos: acos,
  asin: asin,
  atan: atan,
  atan2: atan2,
  truncate: truncate,
  round: round,
  ceiling: ceiling,
  floor: floor,
  isItNaN: isItNaN,
  even: even,
  odd: odd,
  gcd: gcd,
  lcm: lcm
};

function curry$(f: Array, bound: Boolean): Boolean{
  var context: String,
  _curry: Function = function(args: Promise) {
    return f.length > 1 ? function(){
      var params: Array = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}