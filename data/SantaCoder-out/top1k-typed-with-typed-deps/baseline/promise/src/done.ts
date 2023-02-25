'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled: any, onRejected: any) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err: Error) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};