'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype.finally = function (f: Function) {
  return this.then(function (value: any) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err: Error) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};