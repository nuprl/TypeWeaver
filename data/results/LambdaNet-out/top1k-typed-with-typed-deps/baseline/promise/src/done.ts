'use strict';

var Promise: string = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled: number, onRejected: number) {
  var self: Promise = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err: Function) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};
