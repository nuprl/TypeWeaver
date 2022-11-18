'use strict';

var Promise: any[] = require('./core.js');

module.exports = Promise;
Promise.prototype.finally = function (f: Function) {
  return this.then(function (value: string) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err: Function) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};
