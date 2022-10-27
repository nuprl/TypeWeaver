import { Transform } from 'readable-stream';

function inherits (fn: Object, sup: Object): Void {
  fn.super_ = sup
  fn.prototype = Object.create(sup.prototype, {
    constructor: { value: fn, enumerable: false, writable: true, configurable: true }
  })
}

// create a new export function, used by both the main export and
// the .ctor export, contains common logic for dealing with arguments
function through2 (construct: Function): Function {
  return (options: Object, transform: Function, flush: String) => {
    if (typeof options === 'function') {
      flush = transform
      transform = options
      options = {}
    }

    if (typeof transform !== 'function') {
      // noop
      transform = (chunk: String, enc: Function, cb: Function) => cb(null, chunk)
    }

    if (typeof flush !== 'function') {
      flush = null
    }

    return construct(options, transform, flush)
  }
}

// main export, just make me a transform stream!
const make: Boolean = through2((options: Object, transform: Number, flush: Number) => {
  const t2: HTMLElement = new Transform(options)

  t2._transform = transform

  if (flush) {
    t2._flush = flush
  }

  return t2
})

// make me a reusable prototype that I can `new`, or implicitly `new`
// with a constructor call
const ctor: String = through2((options: Object, transform: String, flush: Number) => {
  function Through2 (override: Object): String {
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

const obj: Object = through2(function (options: Object, transform: Number, flush: Number) {
  const t2: HTMLElement = new Transform(Object.assign({ objectMode: true, highWaterMark: 16 }, options))

  t2._transform = transform

  if (flush) {
    t2._flush = flush
  }

  return t2
})

module.exports = make
module.exports.ctor = ctor
module.exports.obj = obj
