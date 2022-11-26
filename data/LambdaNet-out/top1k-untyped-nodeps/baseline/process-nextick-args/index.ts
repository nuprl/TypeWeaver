'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn: Function, arg1: string, arg2: string, arg3: string): boolean {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len: number = arguments.length;
  var args: any[], i: number;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne(): void {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo(): void {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree(): void {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick(): void {
      fn.apply(null, args);
    });
  }
}

