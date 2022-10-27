(function e(t: Object,n: Object,r: Array): Function{function s(o: String,u: Boolean): Function{if(!n[o]){if(!t[o]){var a: Function=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f: Error=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l: Object=n[o]={exports:{}};t[o][0].call(l.exports,function(e: Array){var n: String=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i: Function=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require: Function,module: Function,exports: Number){
'use strict';

require('./index').polyfill();

},{"./index":2}],2:[function(require: Function,module: Function,exports: Number){
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
      var desc: Function = Object.getOwnPropertyDescriptor(nextSource, nextKey);
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

module.exports = {
  assign: assign,
  polyfill: polyfill
};

},{}]},{},[1]);
