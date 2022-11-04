// Generated by LiveScript 1.6.0
var each: Object, map: Array, compact: Function, filter: Object, reject: Object, remove: String, partition: Array, find: Object, head: Object, first: Object, tail: Function, last: Function, initial: Function, empty: Function, reverse: Function, unique: Function, uniqueBy: Array, fold: Function, foldl: Array, fold1: Array, foldl1: Array, foldr: Function, foldr1: Array, unfoldr: Array, concat: Object, concatMap: Object, flatten: Function, difference: Function, intersection: Function, union: Function, countBy: Array, groupBy: Array, andList: Function, orList: Function, any: Object, all: Object, sort: Function, sortWith: Function, sortBy: String, sum: Function, product: Function, mean: Array, average: Function, maximum: Function, minimum: Function, maximumBy: Array, minimumBy: Array, scan: Function, scanl: Array, scan1: Array, scanl1: Array, scanr: Array, scanr1: Array, slice: Array, take: Function, drop: Function, splitAt: Number, takeWhile: Function, dropWhile: Function, span: Function, breakList: Array, zip: Array, zipWith: Object, zipAll: Function, zipAllWith: Function, at: Object, elemIndex: Function, elemIndices: Array, findIndex: Number, findIndices: Array, toString$: Function = {}.toString;
each = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, x: String;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    f(x);
  }
  return xs;
});
map = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, x: String, results$: Array = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    results$.push(f(x));
  }
  return results$;
});
compact = function(xs: Array){
  var i$: Number, len$: Function, x: String, results$: Array = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (x) {
      results$.push(x);
    }
  }
  return results$;
};
filter = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, x: String, results$: Array = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (f(x)) {
      results$.push(x);
    }
  }
  return results$;
});
reject = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, x: String, results$: Array = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!f(x)) {
      results$.push(x);
    }
  }
  return results$;
});
remove = curry$(function(el: Array, xs: Object){
  var i: Number, x$: Array;
  i = elemIndex(el, xs);
  x$ = xs.slice();
  if (i != null) {
    x$.splice(i, 1);
  }
  return x$;
});
partition = curry$(function(f: Function, xs: Array){
  var passed: Array, failed: Array, i$: Number, len$: Function, x: String;
  passed = [];
  failed = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    (f(x) ? passed : failed).push(x);
  }
  return [passed, failed];
});
find = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, x: String;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (f(x)) {
      return x;
    }
  }
});
head = first = function(xs: Promise){
  return xs[0];
};
tail = function(xs: Array){
  if (!xs.length) {
    return;
  }
  return xs.slice(1);
};
last = function(xs: Array){
  return xs[xs.length - 1];
};
initial = function(xs: Array){
  if (!xs.length) {
    return;
  }
  return xs.slice(0, -1);
};
empty = function(xs: Array){
  return !xs.length;
};
reverse = function(xs: Promise){
  return xs.concat().reverse();
};
unique = function(xs: Array){
  var result: Array, i$: Number, len$: Function, x: String;
  result = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!in$(x, result)) {
      result.push(x);
    }
  }
  return result;
};
uniqueBy = curry$(function(f: Function, xs: Array){
  var seen: Array, i$: Number, len$: Function, x: String, val: String, results$: Array = [];
  seen = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    val = f(x);
    if (in$(val, seen)) {
      continue;
    }
    seen.push(val);
    results$.push(x);
  }
  return results$;
});
fold = foldl = curry$(function(f: Function, memo: Number, xs: Array){
  var i$: Number, len$: Function, x: String;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    memo = f(memo, x);
  }
  return memo;
});
fold1 = foldl1 = curry$(function(f: Number, xs: Array){
  return fold(f, xs[0], xs.slice(1));
});
foldr = curry$(function(f: Function, memo: Number, xs: Array){
  var i$: Number, x: String;
  for (i$ = xs.length - 1; i$ >= 0; --i$) {
    x = xs[i$];
    memo = f(x, memo);
  }
  return memo;
});
foldr1 = curry$(function(f: Number, xs: Array){
  return foldr(f, xs[xs.length - 1], xs.slice(0, -1));
});
unfoldr = curry$(function(f: Function, b: String){
  var result: Array, x: String, that: Object;
  result = [];
  x = b;
  while ((that = f(x)) != null) {
    result.push(that[0]);
    x = that[1];
  }
  return result;
});
concat = function(xss: String){
  return [].concat.apply([], xss);
};
concatMap = curry$(function(f: Function, xs: Function){
  var x: String;
  return [].concat.apply([], (function(){
    var i$: Number, ref$: Object, len$: Function, results$: Array = [];
    for (i$ = 0, len$ = (ref$ = xs).length; i$ < len$; ++i$) {
      x = ref$[i$];
      results$.push(f(x));
    }
    return results$;
  }()));
});
flatten = function(xs: Function){
  var x: String;
  return [].concat.apply([], (function(){
    var i$: Number, ref$: Object, len$: Function, results$: Array = [];
    for (i$ = 0, len$ = (ref$ = xs).length; i$ < len$; ++i$) {
      x = ref$[i$];
      if (toString$.call(x).slice(8, -1) === 'Array') {
        results$.push(flatten(x));
      } else {
        results$.push(x);
      }
    }
    return results$;
  }()));
};
difference = function(xs: Array){
  var yss: Array, res$: Array, i$: Number, to$: Function, results: Array, len$: Function, x: String, j$: Number, len1$: Function, ys: Function;
  res$ = [];
  for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  yss = res$;
  results = [];
  outer: for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    for (j$ = 0, len1$ = yss.length; j$ < len1$; ++j$) {
      ys = yss[j$];
      if (in$(x, ys)) {
        continue outer;
      }
    }
    results.push(x);
  }
  return results;
};
intersection = function(xs: Array){
  var yss: Array, res$: Array, i$: Number, to$: Function, results: Array, len$: Function, x: String, j$: Number, len1$: Function, ys: Function;
  res$ = [];
  for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  yss = res$;
  results = [];
  outer: for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    for (j$ = 0, len1$ = yss.length; j$ < len1$; ++j$) {
      ys = yss[j$];
      if (!in$(x, ys)) {
        continue outer;
      }
    }
    results.push(x);
  }
  return results;
};
union = function(){
  var xss: Array, res$: Array, i$: Number, to$: Function, results: Array, len$: Function, xs: Array, j$: Number, len1$: Function, x: String;
  res$ = [];
  for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  xss = res$;
  results = [];
  for (i$ = 0, len$ = xss.length; i$ < len$; ++i$) {
    xs = xss[i$];
    for (j$ = 0, len1$ = xs.length; j$ < len1$; ++j$) {
      x = xs[j$];
      if (!in$(x, results)) {
        results.push(x);
      }
    }
  }
  return results;
};
countBy = curry$(function(f: Function, xs: Array){
  var results: Object, i$: Number, len$: Function, x: String, key: String;
  results = {};
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    key = f(x);
    if (key in results) {
      results[key] += 1;
    } else {
      results[key] = 1;
    }
  }
  return results;
});
groupBy = curry$(function(f: Function, xs: Array){
  var results: Object, i$: Number, len$: Function, x: String, key: String;
  results = {};
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    key = f(x);
    if (key in results) {
      results[key].push(x);
    } else {
      results[key] = [x];
    }
  }
  return results;
});
andList = function(xs: Array){
  var i$: Number, len$: Function, x: Number;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!x) {
      return false;
    }
  }
  return true;
};
orList = function(xs: Array){
  var i$: Number, len$: Function, x: String;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (x) {
      return true;
    }
  }
  return false;
};
any = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, x: String;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (f(x)) {
      return true;
    }
  }
  return false;
});
all = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, x: String;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!f(x)) {
      return false;
    }
  }
  return true;
});
sort = function(xs: Promise){
  return xs.concat().sort(function(x: Number, y: Number){
    if (x > y) {
      return 1;
    } else if (x < y) {
      return -1;
    } else {
      return 0;
    }
  });
};
sortWith = curry$(function(f: String, xs: Promise){
  return xs.concat().sort(f);
});
sortBy = curry$(function(f: Function, xs: Promise){
  return xs.concat().sort(function(x: String, y: String){
    if (f(x) > f(y)) {
      return 1;
    } else if (f(x) < f(y)) {
      return -1;
    } else {
      return 0;
    }
  });
});
sum = function(xs: Array){
  var result: Number, i$: Number, len$: Function, x: String;
  result = 0;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    result += x;
  }
  return result;
};
product = function(xs: Array){
  var result: Number, i$: Number, len$: Function, x: String;
  result = 1;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    result *= x;
  }
  return result;
};
mean = average = function(xs: Array){
  var sum: Number, i$: Number, len$: Function, x: String;
  sum = 0;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    sum += x;
  }
  return sum / xs.length;
};
maximum = function(xs: Array){
  var max: Number, i$: Number, ref$: Object, len$: Function, x: Number;
  max = xs[0];
  for (i$ = 0, len$ = (ref$ = xs.slice(1)).length; i$ < len$; ++i$) {
    x = ref$[i$];
    if (x > max) {
      max = x;
    }
  }
  return max;
};
minimum = function(xs: Array){
  var min: Function, i$: Number, ref$: Object, len$: Function, x: Function;
  min = xs[0];
  for (i$ = 0, len$ = (ref$ = xs.slice(1)).length; i$ < len$; ++i$) {
    x = ref$[i$];
    if (x < min) {
      min = x;
    }
  }
  return min;
};
maximumBy = curry$(function(f: Function, xs: Array){
  var max: Function, i$: Number, ref$: Object, len$: Function, x: Function;
  max = xs[0];
  for (i$ = 0, len$ = (ref$ = xs.slice(1)).length; i$ < len$; ++i$) {
    x = ref$[i$];
    if (f(x) > f(max)) {
      max = x;
    }
  }
  return max;
});
minimumBy = curry$(function(f: Function, xs: Array){
  var min: Function, i$: Number, ref$: Object, len$: Function, x: Function;
  min = xs[0];
  for (i$ = 0, len$ = (ref$ = xs.slice(1)).length; i$ < len$; ++i$) {
    x = ref$[i$];
    if (f(x) < f(min)) {
      min = x;
    }
  }
  return min;
});
scan = scanl = curry$(function(f: Function, memo: String, xs: Function){
  var last: String, x: String;
  last = memo;
  return [memo].concat((function(){
    var i$: Number, ref$: Object, len$: Function, results$: Array = [];
    for (i$ = 0, len$ = (ref$ = xs).length; i$ < len$; ++i$) {
      x = ref$[i$];
      results$.push(last = f(last, x));
    }
    return results$;
  }()));
});
scan1 = scanl1 = curry$(function(f: Number, xs: Array){
  if (!xs.length) {
    return;
  }
  return scan(f, xs[0], xs.slice(1));
});
scanr = curry$(function(f: Number, memo: Number, xs: Array){
  xs = xs.concat().reverse();
  return scan(f, memo, xs).reverse();
});
scanr1 = curry$(function(f: Number, xs: Array){
  if (!xs.length) {
    return;
  }
  xs = xs.concat().reverse();
  return scan(f, xs[0], xs.slice(1)).reverse();
});
slice = curry$(function(x: String, y: String, xs: Array){
  return xs.slice(x, y);
});
take = curry$(function(n: Number, xs: Array){
  if (n <= 0) {
    return xs.slice(0, 0);
  } else {
    return xs.slice(0, n);
  }
});
drop = curry$(function(n: Number, xs: Array){
  if (n <= 0) {
    return xs;
  } else {
    return xs.slice(n);
  }
});
splitAt = curry$(function(n: String, xs: Number){
  return [take(n, xs), drop(n, xs)];
});
takeWhile = curry$(function(p: Function, xs: Array){
  var len: Number, i: Number;
  len = xs.length;
  if (!len) {
    return xs;
  }
  i = 0;
  while (i < len && p(xs[i])) {
    i += 1;
  }
  return xs.slice(0, i);
});
dropWhile = curry$(function(p: Function, xs: Array){
  var len: Number, i: Number;
  len = xs.length;
  if (!len) {
    return xs;
  }
  i = 0;
  while (i < len && p(xs[i])) {
    i += 1;
  }
  return xs.slice(i);
});
span = curry$(function(p: Array, xs: Number){
  return [takeWhile(p, xs), dropWhile(p, xs)];
});
breakList = curry$(function(p: String, xs: Array){
  return span(compose$(p, not$), xs);
});
zip = curry$(function(xs: Array, ys: Array){
  var result: Array, len: Number, i$: Number, len$: Function, i: Number, x: String;
  result = [];
  len = ys.length;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    i = i$;
    x = xs[i$];
    if (i === len) {
      break;
    }
    result.push([x, ys[i]]);
  }
  return result;
});
zipWith = curry$(function(f: Function, xs: Array, ys: Array){
  var result: Array, len: Number, i$: Number, len$: Function, i: Number, x: String;
  result = [];
  len = ys.length;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    i = i$;
    x = xs[i$];
    if (i === len) {
      break;
    }
    result.push(f(x, ys[i]));
  }
  return result;
});
zipAll = function(){
  var xss: Array, res$: Array, i$: Number, to$: Function, minLength: Number, len$: Function, xs: Array, ref$: Function, i: Number, lresult$: Array, j$: Number, results$: Array = [];
  res$ = [];
  for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  xss = res$;
  minLength = undefined;
  for (i$ = 0, len$ = xss.length; i$ < len$; ++i$) {
    xs = xss[i$];
    minLength <= (ref$ = xs.length) || (minLength = ref$);
  }
  for (i$ = 0; i$ < minLength; ++i$) {
    i = i$;
    lresult$ = [];
    for (j$ = 0, len$ = xss.length; j$ < len$; ++j$) {
      xs = xss[j$];
      lresult$.push(xs[i]);
    }
    results$.push(lresult$);
  }
  return results$;
};
zipAllWith = function(f: Object){
  var xss: Array, res$: Array, i$: Number, to$: Function, minLength: Number, len$: Function, xs: Array, ref$: Function, i: Number, results$: Array = [];
  res$ = [];
  for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  xss = res$;
  minLength = undefined;
  for (i$ = 0, len$ = xss.length; i$ < len$; ++i$) {
    xs = xss[i$];
    minLength <= (ref$ = xs.length) || (minLength = ref$);
  }
  for (i$ = 0; i$ < minLength; ++i$) {
    i = i$;
    results$.push(f.apply(null, (fn$())));
  }
  return results$;
  function fn$(): Array{
    var i$: Number, ref$: Object, len$: Function, results$: Array = [];
    for (i$ = 0, len$ = (ref$ = xss).length; i$ < len$; ++i$) {
      xs = ref$[i$];
      results$.push(xs[i]);
    }
    return results$;
  }
};
at = curry$(function(n: String, xs: Array){
  if (n < 0) {
    return xs[xs.length + n];
  } else {
    return xs[n];
  }
});
elemIndex = curry$(function(el: Boolean, xs: Array){
  var i$: Number, len$: Function, i: Number, x: String;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    i = i$;
    x = xs[i$];
    if (x === el) {
      return i;
    }
  }
});
elemIndices = curry$(function(el: Boolean, xs: Array){
  var i$: Number, len$: Function, i: Number, x: String, results$: Array = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    i = i$;
    x = xs[i$];
    if (x === el) {
      results$.push(i);
    }
  }
  return results$;
});
findIndex = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, i: Number, x: String;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    i = i$;
    x = xs[i$];
    if (f(x)) {
      return i;
    }
  }
});
findIndices = curry$(function(f: Function, xs: Array){
  var i$: Number, len$: Function, i: Number, x: String, results$: Array = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    i = i$;
    x = xs[i$];
    if (f(x)) {
      results$.push(i);
    }
  }
  return results$;
});

export default {
  each: each,
  map: map,
  filter: filter,
  compact: compact,
  reject: reject,
  remove: remove,
  partition: partition,
  find: find,
  head: head,
  first: first,
  tail: tail,
  last: last,
  initial: initial,
  empty: empty,
  reverse: reverse,
  difference: difference,
  intersection: intersection,
  union: union,
  countBy: countBy,
  groupBy: groupBy,
  fold: fold,
  fold1: fold1,
  foldl: foldl,
  foldl1: foldl1,
  foldr: foldr,
  foldr1: foldr1,
  unfoldr: unfoldr,
  andList: andList,
  orList: orList,
  any: any,
  all: all,
  unique: unique,
  uniqueBy: uniqueBy,
  sort: sort,
  sortWith: sortWith,
  sortBy: sortBy,
  sum: sum,
  product: product,
  mean: mean,
  average: average,
  concat: concat,
  concatMap: concatMap,
  flatten: flatten,
  maximum: maximum,
  minimum: minimum,
  maximumBy: maximumBy,
  minimumBy: minimumBy,
  scan: scan,
  scan1: scan1,
  scanl: scanl,
  scanl1: scanl1,
  scanr: scanr,
  scanr1: scanr1,
  slice: slice,
  take: take,
  drop: drop,
  splitAt: splitAt,
  takeWhile: takeWhile,
  dropWhile: dropWhile,
  span: span,
  breakList: breakList,
  zip: zip,
  zipWith: zipWith,
  zipAll: zipAll,
  zipAllWith: zipAllWith,
  at: at,
  elemIndex: elemIndex,
  elemIndices: elemIndices,
  findIndex: findIndex,
  findIndices: findIndices
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
function in$(x: String, xs: Array): Boolean{
  var i: Number = -1, l: Number = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
function compose$(): Function {
  var functions: Map = arguments;
  return function() {
    var i: Number, result: Function;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}
function not$(x: Number): Boolean{ return !x; }