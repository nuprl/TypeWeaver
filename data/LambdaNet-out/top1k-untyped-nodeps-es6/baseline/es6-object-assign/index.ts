/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

'use strict';

function assign(target: Number, firstSource: Function): Object {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to: Object = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource: Object = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray: Array = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey: String = keysArray[nextIndex];
      var desc: String = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill(): Void {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

export default {
  assign: assign,
  polyfill: polyfill
};
