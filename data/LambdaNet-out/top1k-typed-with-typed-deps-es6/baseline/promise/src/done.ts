'use strict';

import Promise from './core.js';

export default Promise;
Promise.prototype.done = function (onFulfilled: number, onRejected: number) {
  var self: Promise = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err: Function) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};
