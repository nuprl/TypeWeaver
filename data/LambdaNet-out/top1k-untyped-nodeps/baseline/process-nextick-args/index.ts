'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn: Function, arg1: String, arg2: String, arg3: String): Boolean {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len: Number = arguments.length;
  var args: Array, i: Number;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne(): Void {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo(): Void {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree(): Void {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick(): Void {
      fn.apply(null, args);
    });
  }
}

