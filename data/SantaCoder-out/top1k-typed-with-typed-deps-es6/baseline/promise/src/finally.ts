'use strict';

import Promise from './core.js';

export default Promise;
Promise.prototype.finally = function (f: any) {
  return this.then(function (value: string) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err: Error) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};