'use strict'

export const fromCallback: boolean = function (fn: any) {
  return Object.defineProperty(function (...args) {
    if (typeof args[args.length - 1] === 'function') fn.apply(this, args)
    else {
      return new Promise((resolve: void, reject: void) => {
        fn.call(
          this,
          ...args,
          (err: any, res: any) => (err != null) ? reject(err) : resolve(res)
        )
      })
    }
  }, 'name', { value: fn.name })
};

export const fromPromise: boolean = function (fn: any) {
  return Object.defineProperty(function (...args) {
    const cb: any = args[args.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, args)
    else fn.apply(this, args.slice(0, -1)).then((r: any) => cb(null, r), cb)
  }, 'name', { value: fn.name })
};
