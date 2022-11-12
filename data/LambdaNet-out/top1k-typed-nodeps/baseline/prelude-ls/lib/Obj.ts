// Generated by LiveScript 1.6.0
var values: Function, keys: Function, pairsToObj: Function, objToPairs: Function, listsToObj: Array, objToLists: Function, empty: Function, each: Object, map: Array, compact: Function, filter: Object, reject: Object, partition: Array, find: Object;
values = function(object: Object){
  var i$: String, x: String, results$: Array = [];
  for (i$ in object) {
    x = object[i$];
    results$.push(x);
  }
  return results$;
};
keys = function(object: Object){
  var x: String, results$: Array = [];
  for (x in object) {
    results$.push(x);
  }
  return results$;
};
pairsToObj = function(object: Array){
  var i$: Number, len$: Boolean, x: Object, resultObj$: Object = {};
  for (i$ = 0, len$ = object.length; i$ < len$; ++i$) {
    x = object[i$];
    resultObj$[x[0]] = x[1];
  }
  return resultObj$;
};
objToPairs = function(object: Object){
  var key: String, value: String, results$: Array = [];
  for (key in object) {
    value = object[key];
    results$.push([key, value]);
  }
  return results$;
};
listsToObj = curry$(function(keys: Array, values: Object){
  var i$: Number, len$: Boolean, i: Number, key: String, resultObj$: Object = {};
  for (i$ = 0, len$ = keys.length; i$ < len$; ++i$) {
    i = i$;
    key = keys[i$];
    resultObj$[key] = values[i];
  }
  return resultObj$;
});
objToLists = function(object: Object){
  var keys: Array, values: Array, key: String, value: String;
  keys = [];
  values = [];
  for (key in object) {
    value = object[key];
    keys.push(key);
    values.push(value);
  }
  return [keys, values];
};
empty = function(object: Object){
  var x: String;
  for (x in object) {
    return false;
  }
  return true;
};
each = curry$(function(f: Function, object: Object){
  var i$: String, x: String;
  for (i$ in object) {
    x = object[i$];
    f(x);
  }
  return object;
});
map = curry$(function(f: Function, object: Object){
  var k: Function, x: String, resultObj$: Object = {};
  for (k in object) {
    x = object[k];
    resultObj$[k] = f(x);
  }
  return resultObj$;
});
compact = function(object: Object){
  var k: Function, x: Function, resultObj$: Object = {};
  for (k in object) {
    x = object[k];
    if (x) {
      resultObj$[k] = x;
    }
  }
  return resultObj$;
};
filter = curry$(function(f: Function, object: Object){
  var k: Function, x: String, resultObj$: Object = {};
  for (k in object) {
    x = object[k];
    if (f(x)) {
      resultObj$[k] = x;
    }
  }
  return resultObj$;
});
reject = curry$(function(f: Function, object: Object){
  var k: Function, x: String, resultObj$: Object = {};
  for (k in object) {
    x = object[k];
    if (!f(x)) {
      resultObj$[k] = x;
    }
  }
  return resultObj$;
});
partition = curry$(function(f: Function, object: Object){
  var passed: Object, failed: Object, k: Function, x: String;
  passed = {};
  failed = {};
  for (k in object) {
    x = object[k];
    (f(x) ? passed : failed)[k] = x;
  }
  return [passed, failed];
});
find = curry$(function(f: Function, object: Object){
  var i$: String, x: String;
  for (i$ in object) {
    x = object[i$];
    if (f(x)) {
      return x;
    }
  }
});
module.exports = {
  values: values,
  keys: keys,
  pairsToObj: pairsToObj,
  objToPairs: objToPairs,
  listsToObj: listsToObj,
  objToLists: objToLists,
  empty: empty,
  each: each,
  map: map,
  filter: filter,
  compact: compact,
  reject: reject,
  partition: partition,
  find: find
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