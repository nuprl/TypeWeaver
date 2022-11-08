// should work in any browser without browserify

if (typeof Promise.prototype.done !== 'function') {
  Promise.prototype.done = function (onFulfilled: Function,  onRejected: Function) {
    var self = arguments.length ? this.then.apply(this, arguments) : this
    self.then(null, function (err: Error) {
      setTimeout(function () {
        throw err
      }, 0)
    })
  }
}