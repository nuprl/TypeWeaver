'use strict';

import Promise from './core.js';

export default Promise;
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
