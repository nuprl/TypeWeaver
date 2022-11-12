// Generated by LiveScript 1.6.0
var apply: Function, curry: Function, flip: Array, fix: Function, over: Object, memoize: Function, toString$: Function = {}.toString;
apply = curry$(function(f: Object, list: Object){
  return f.apply(null, list);
});
curry = function(f: Function){
  return curry$(f);
};
flip = curry$(function(f: Function, x: String, y: Number){
  return f(y, x);
});
fix = function(f: Function){
  return function(g: Function){
    return function(){
      return f(g(g)).apply(null, arguments);
    };
  }(function(g: Function){
    return function(){
      return f(g(g)).apply(null, arguments);
    };
  });
};
over = curry$(function(f: Function, g: Function, x: String, y: Number){
  return f(g(x), g(y));
});
memoize = function(f: Object){
  var memo: Object;
  memo = {};
  return function(){
    var args: Array, res$: Array, i$: Number, to$: Function, key: String, arg: String;
    res$ = [];
    for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    args = res$;
    key = (function(){
      var i$: Number, ref$: Object, len$: Boolean, results$: Array = [];
      for (i$ = 0, len$ = (ref$ = args).length; i$ < len$; ++i$) {
        arg = ref$[i$];
        results$.push(arg + toString$.call(arg).slice(8, -1));
      }
      return results$;
    }()).join('');
    return memo[key] = key in memo
      ? memo[key]
      : f.apply(null, args);
  };
};
module.exports = {
  curry: curry,
  flip: flip,
  fix: fix,
  apply: apply,
  over: over,
  memoize: memoize
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