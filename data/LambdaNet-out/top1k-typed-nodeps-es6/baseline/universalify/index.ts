'use strict'

export const fromCallback: Function = function (fn: Function) {
  return Object.defineProperty(function (...args) {
    if (typeof args[args.length - 1] === 'function') fn.apply(this, args)
    else {
      return new Promise((resolve: Function, reject: Function) => {
        fn.call(
          this,
          ...args,
          (err: string, res: any[]) => (err != null) ? reject(err) : resolve(res)
        )
      })
    }
  }, 'name', { value: fn.name })
};

export const fromPromise: Function = function (fn: object) {
  return Object.defineProperty(function (...args) {
    const cb: Function = args[args.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, args)
    else fn.apply(this, args.slice(0, -1)).then((r: number) => cb(null, r), cb)
  }, 'name', { value: fn.name })
};
