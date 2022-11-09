'use strict';

// This file contains then/promise specific extensions that are only useful
// for node.js interop

import Promise from './core.js';

import asap from 'asap';

export default Promise;

/* Static Functions */

Promise.denodeify = function (fn: String, argumentCount: String) {
  if (
    typeof argumentCount === 'number' && argumentCount !== Infinity
  ) {
    return denodeifyWithCount(fn, argumentCount);
  } else {
    return denodeifyWithoutCount(fn);
  }
};

var callbackFn: String = (
  'function (err, res) {' +
  'if (err) { rj(err); } else { rs(res); }' +
  '}'
);
function denodeifyWithCount(fn: String, argumentCount: Number): Boolean {
  var args: Array = [];
  for (var i = 0; i < argumentCount; i++) {
    args.push('a' + i);
  }
  var body: String = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'return new Promise(function (rs, rj) {',
    'var res = fn.call(',
    ['self'].concat(args).concat([callbackFn]).join(','),
    ');',
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');
  return Function(['Promise', 'fn'], body)(Promise, fn);
}
function denodeifyWithoutCount(fn: Array): Boolean {
  var fnLength: Number = Math.max(fn.length - 1, 3);
  var args: Array = [];
  for (var i = 0; i < fnLength; i++) {
    args.push('a' + i);
  }
  var body: String = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'var args;',
    'var argLength = arguments.length;',
    'if (arguments.length > ' + fnLength + ') {',
    'args = new Array(arguments.length + 1);',
    'for (var i = 0; i < arguments.length; i++) {',
    'args[i] = arguments[i];',
    '}',
    '}',
    'return new Promise(function (rs, rj) {',
    'var cb = ' + callbackFn + ';',
    'var res;',
    'switch (argLength) {',
    args.concat(['extra']).map(function (_: String, index: String) {
      return (
        'case ' + (index) + ':' +
        'res = fn.call(' + ['self'].concat(args.slice(0, index)).concat('cb').join(',') + ');' +
        'break;'
      );
    }).join(''),
    'default:',
    'args[argLength] = cb;',
    'res = fn.apply(self, args);',
    '}',
    
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');

  return Function(
    ['Promise', 'fn'],
    body
  )(Promise, fn);
}

Promise.nodeify = function (fn: Function) {
  return function () {
    var args: Array = Array.prototype.slice.call(arguments);
    var callback: String =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx: Array = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap(function () {
          callback.call(ctx, ex);
        })
      }
    }
  }
};

Promise.prototype.nodeify = function (callback: Function, ctx: String) {
  if (typeof callback != 'function') return this;

  this.then(function (value: String) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err: Function) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
};
