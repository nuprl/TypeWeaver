'use strict';

var Promise: PromiseConstructor = require('./core.js');

module.exports = Promise;
Promise.prototype.finally = function (f: string) {
  return this.then(function (value: any) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err: any) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};
