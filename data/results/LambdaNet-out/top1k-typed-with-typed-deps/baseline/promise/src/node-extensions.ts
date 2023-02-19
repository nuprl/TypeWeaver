'use strict';

// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise: any[] = require('./core.js');
var asap: Function = require('asap');

module.exports = Promise;

/* Static Functions */

Promise.denodeify = function (fn: string, argumentCount: string) {
  if (
    typeof argumentCount === 'number' && argumentCount !== Infinity
  ) {
    return denodeifyWithCount(fn, argumentCount);
  } else {
    return denodeifyWithoutCount(fn);
  }
};

var callbackFn: string = (
  'function (err, res) {' +
  'if (err) { rj(err); } else { rs(res); }' +
  '}'
);
function denodeifyWithCount(fn: string, argumentCount: number): boolean {
  var args: any[] = [];
  for (var i = 0; i < argumentCount; i++) {
    args.push('a' + i);
  }
  var body: string = [
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
function denodeifyWithoutCount(fn: any[]): boolean {
  var fnLength: number = Math.max(fn.length - 1, 3);
  var args: any[] = [];
  for (var i = 0; i < fnLength; i++) {
    args.push('a' + i);
  }
  var body: string = [
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
    args.concat(['extra']).map(function (_: string, index: string) {
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
    var args: any[] = Array.prototype.slice.call(arguments);
    var callback: string =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx: any[] = this;
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

Promise.prototype.nodeify = function (callback: Function, ctx: string) {
  if (typeof callback != 'function') return this;

  this.then(function (value: string) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err: string) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
};
