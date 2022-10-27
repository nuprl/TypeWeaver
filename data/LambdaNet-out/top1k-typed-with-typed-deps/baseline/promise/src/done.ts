'use strict';

var Promise: String = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled: Number, onRejected: Number) {
  var self: Promise = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err: Function) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};
