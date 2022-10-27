'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise: Object = require('./core.js');

module.exports = Promise;

/* Static Functions */

var TRUE: Array = valuePromise(true);
var FALSE: Array = valuePromise(false);
var NULL: Array = valuePromise(null);
var UNDEFINED: Array = valuePromise(undefined);
var ZERO: Array = valuePromise(0);
var EMPTYSTRING: Array = valuePromise('');

function valuePromise(value: String): String {
  var p: HTMLElement = new Promise(Promise._noop);
  p._state = 1;
  p._value = value;
  return p;
}
Promise.resolve = function (value: Array) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then: Function = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

var iterableToArray: Function = function (iterable: String) {
  if (typeof Array.from === 'function') {
    // ES2015+, iterables exist
    iterableToArray = Array.from;
    return Array.from(iterable);
  }

  // ES5, only arrays and array-likes exist
  iterableToArray = function (x: String) { return Array.prototype.slice.call(x); };
  return Array.prototype.slice.call(iterable);
}

Promise.all = function (arr: Array) {
  var args: Array = iterableToArray(arr);

  return new Promise(function (resolve: Function, reject: Function) {
    if (args.length === 0) return resolve([]);
    var remaining: Number = args.length;
    function res(i: String, val: Object): String {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._state === 3) {
            val = val._value;
          }
          if (val._state === 1) return res(i, val._value);
          if (val._state === 2) reject(val._value);
          val.then(function (val: String) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then: Function = val.then;
          if (typeof then === 'function') {
            var p: Promise = new Promise(then.bind(val));
            p.then(function (val: String) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

function onSettledFulfill(value: String): Object {
  return { status: 'fulfilled', value: value };
}
function onSettledReject(reason: String): Object {
  return { status: 'rejected', reason: reason };
}
function mapAllSettled(item: Array): Promise {
  if(item && (typeof item === 'object' || typeof item === 'function')){
    if(item instanceof Promise && item.then === Promise.prototype.then){
      return item.then(onSettledFulfill, onSettledReject);
    }
    var then: Function = item.then;
    if (typeof then === 'function') {
      return new Promise(then.bind(item)).then(onSettledFulfill, onSettledReject)
    }
  }

  return onSettledFulfill(item);
}
Promise.allSettled = function (iterable: String) {
  return Promise.all(iterableToArray(iterable).map(mapAllSettled));
};

Promise.reject = function (value: Number) {
  return new Promise(function (resolve: Function, reject: Function) {
    reject(value);
  });
};

Promise.race = function (values: Array) {
  return new Promise(function (resolve: Function, reject: String) {
    iterableToArray(values).forEach(function(value: String){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected: String) {
  return this.then(null, onRejected);
};
