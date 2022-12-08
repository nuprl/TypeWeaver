(function e(t: any,n: any,r: any): any{function s(o: any,u: any): any{if(!n[o]){if(!t[o]){var a: any=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f: any=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l: any=n[o]={exports:{}};t[o][0].call(l.exports,function(e: any){var n: any=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i: number=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports: any){
'use strict';

require('./index').polyfill();

},{"./index":2}],2:[function(require,module,exports: any){
  /**
   * Code refactored from Mozilla Developer Network:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   */

  'use strict';

  function assign(target: any, firstSource: any): void {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert first argument to object');
    }

    var to: any = Object(target);
    for (var i = 1; i < arguments.length; i++) {
      var nextSource: any = arguments[i];
      if (nextSource === undefined || nextSource === null) {
        continue;
      }

      var keysArray: string[] = Object.keys(Object(nextSource));
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
        var nextKey: string = keysArray[nextIndex];
        var desc: PropertyDescriptor = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  }

  function polyfill(): void {
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
},{}]},{},[1]);
