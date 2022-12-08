const { Transform } = require('readable-stream')

function inherits (fn: any, sup: any): void {
  fn.super_ = sup
  fn.prototype = Object.create(sup.prototype, {
    constructor: { value: fn, enumerable: false, writable: true, configurable: true }
  })
}

// create a new export function, used by both the main export and
// the .ctor export, contains common logic for dealing with arguments
function through2 (construct: any): any {
  return (options: any, transform: any, flush: any) => {
    if (typeof options === 'function') {
      flush = transform
      transform = options
      options = {}
    }

    if (typeof transform !== 'function') {
      // noop
      transform = (chunk: any, enc: any, cb: any) => cb(null, chunk)
    }

    if (typeof flush !== 'function') {
      flush = null
    }

    return construct(options, transform, flush)
  }
}

// main export, just make me a transform stream!
const make: any = through2((options: any, transform: any, flush: any) => {
  const t2: any = new Transform(options)

  t2._transform = transform

  if (flush) {
    t2._flush = flush
  }

  return t2
})

// make me a reusable prototype that I can `new`, or implicitly `new`
// with a constructor call
const ctor: any = through2((options: any, transform: any, flush: any) => {
  function Through2 (override: any): any {
    if (!(this instanceof Through2)) {
      return new Through2(override)
    }

    this.options = Object.assign({}, options, override)

    Transform.call(this, this.options)

    this._transform = transform
    if (flush) {
      this._flush = flush
    }
  }

  inherits(Through2, Transform)

  return Through2
})

const obj: any = through2(function (options: any, transform: any, flush: any) {
  const t2: any = new Transform(Object.assign({ objectMode: true, highWaterMark: 16 }, options))

  t2._transform = transform

  if (flush) {
    t2._flush = flush
  }

  return t2
})

module.exports = make
module.exports.ctor = ctor
module.exports.obj = obj
