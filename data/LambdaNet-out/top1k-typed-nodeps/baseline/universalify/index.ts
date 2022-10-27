'use strict'

exports.fromCallback = function (fn: Function) {
  return Object.defineProperty(function (...args) {
    if (typeof args[args.length - 1] === 'function') fn.apply(this, args)
    else {
      return new Promise((resolve: Function, reject: Function) => {
        fn.call(
          this,
          ...args,
          (err: String, res: Array) => (err != null) ? reject(err) : resolve(res)
        )
      })
    }
  }, 'name', { value: fn.name })
}

exports.fromPromise = function (fn: Object) {
  return Object.defineProperty(function (...args) {
    const cb: Function = args[args.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, args)
    else fn.apply(this, args.slice(0, -1)).then((r: Number) => cb(null, r), cb)
  }, 'name', { value: fn.name })
}
