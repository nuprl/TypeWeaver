'use strict';

import Promise from './core.js';

export default Promise;
Promise.prototype.finally = function (f: any) {
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