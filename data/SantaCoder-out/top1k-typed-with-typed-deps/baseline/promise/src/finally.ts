'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype.finally = function (f: any) {
  return this.then(function (value: string) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err: any) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};