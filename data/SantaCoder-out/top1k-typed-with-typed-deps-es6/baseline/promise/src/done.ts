'use strict';

import Promise from './core.js';

export default Promise;
Promise.prototype.done = function (onFulfilled: Function, onRejected: Function) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err: any) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};