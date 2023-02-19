'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

import Promise from './core.js';

export default Promise;

/* Static Functions */

var TRUE: any[] = valuePromise(true);
var FALSE: any[] = valuePromise(false);
var NULL: any[] = valuePromise(null);
var UNDEFINED: any[] = valuePromise(undefined);
var ZERO: any[] = valuePromise(0);
var EMPTYSTRING: any[] = valuePromise('');

function valuePromise(value: string): string {
  var p: HTMLElement = new Promise(Promise._noop);
  p._state = 1;
  p._value = value;
  return p;
}
Promise.resolve = function (value: any[]) {
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

var iterableToArray: Function = function (iterable: string) {
  if (typeof Array.from === 'function') {
    // ES2015+, iterables exist
    iterableToArray = Array.from;
    return Array.from(iterable);
  }

  // ES5, only arrays and array-likes exist
  iterableToArray = function (x: string) { return Array.prototype.slice.call(x); };
  return Array.prototype.slice.call(iterable);
}

Promise.all = function (arr: any[]) {
  var args: any[] = iterableToArray(arr);

  return new Promise(function (resolve: Function, reject: Function) {
    if (args.length === 0) return resolve([]);
    var remaining: number = args.length;
    function res(i: string, val: object): string {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._state === 3) {
            val = val._value;
          }
          if (val._state === 1) return res(i, val._value);
          if (val._state === 2) reject(val._value);
          val.then(function (val: string) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then: Function = val.then;
          if (typeof then === 'function') {
            var p: Promise = new Promise(then.bind(val));
            p.then(function (val: string) {
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

function onSettledFulfill(value: string): object {
  return { status: 'fulfilled', value: value };
}
function onSettledReject(reason: string): object {
  return { status: 'rejected', reason: reason };
}
function mapAllSettled(item: any[]): Promise {
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
Promise.allSettled = function (iterable: string) {
  return Promise.all(iterableToArray(iterable).map(mapAllSettled));
};

Promise.reject = function (value: number) {
  return new Promise(function (resolve: Function, reject: Function) {
    reject(value);
  });
};

Promise.race = function (values: any[]) {
  return new Promise(function (resolve: Function, reject: string) {
    iterableToArray(values).forEach(function(value: string){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected: string) {
  return this.then(null, onRejected);
};
