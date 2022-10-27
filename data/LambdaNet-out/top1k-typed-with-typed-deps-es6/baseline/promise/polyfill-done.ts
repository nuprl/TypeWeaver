// should work in any browser without browserify

if (typeof Promise.prototype.done !== 'function') {
  Promise.prototype.done = function (onFulfilled: Number, onRejected: Number) {
    var self: Promise = arguments.length ? this.then.apply(this, arguments) : this
    self.then(null, function (err: Function) {
      setTimeout(function () {
        throw err
      }, 0)
    })
  }
}