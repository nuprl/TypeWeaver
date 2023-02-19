'use strict';

var Promise: PromiseConstructor = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled: any, onRejected: any) {
  var self: any = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err: any) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};
