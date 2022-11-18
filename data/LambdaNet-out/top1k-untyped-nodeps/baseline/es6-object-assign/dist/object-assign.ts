(function(f: Function){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g: any[];if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ObjectAssign = f()}})(function(){var define: Function,module: string,exports: string;return (function e(t: object,n: object,r: any[]): Function{function s(o: string,u: boolean): Function{if(!n[o]){if(!t[o]){var a: Function=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f: Error=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l: object=n[o]={exports:{}};t[o][0].call(l.exports,function(e: any[]){var n: string=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i: Function=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require: Function,module: Function,exports: number){
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

'use strict';

function assign(target: number, firstSource: Function): object {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to: object = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource: object = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray: any[] = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey: string = keysArray[nextIndex];
      var desc: string = Object.getOwnPropertyDescriptor(nextSource, nextKey);
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

},{}]},{},[1])(1)
});