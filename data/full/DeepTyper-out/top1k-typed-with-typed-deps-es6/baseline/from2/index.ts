import { Readable } from 'readable-stream';
import inherits from 'inherits';

export default from2;

from2.ctor = ctor
from2.obj = obj

var Proto: any = ctor()

function toFunction(list: any): void {
  list = list.slice()
  return function (_: any, cb: any) {
    var err: any = null
    var item: any = list.length ? list.shift() : null
    if (item instanceof Error) {
      err = item
      item = null
    }

    cb(err, item)
  }
}

function from2(opts: any, read: any): any {
  if (typeof opts !== 'object' || Array.isArray(opts)) {
    read = opts
    opts = {}
  }

  var rs: any = new Proto(opts)
  rs._from = Array.isArray(read) ? toFunction(read) : (read || noop)
  return rs
}

function ctor(opts: any, read: any): void {
  if (typeof opts === 'function') {
    read = opts
    opts = {}
  }

  opts = defaults(opts)

  inherits(Class, Readable)
  function Class(override: any): any {
    if (!(this instanceof Class)) return new Class(override)
    this._reading = false
    this._callback = check
    this.destroyed = false
    Readable.call(this, override || opts)

    var self: any = this
    var hwm: any = this._readableState.highWaterMark

    function check(err: any, data: any): any {
      if (self.destroyed) return
      if (err) return self.destroy(err)
      if (data === null) return self.push(null)
      self._reading = false
      if (self.push(data)) self._read(hwm)
    }
  }

  Class.prototype._from = read || noop
  Class.prototype._read = function(size: any) {
    if (this._reading || this.destroyed) return
    this._reading = true
    this._from(size, this._callback)
  }

  Class.prototype.destroy = function(err: any) {
    if (this.destroyed) return
    this.destroyed = true

    var self: any = this
    process.nextTick(function() {
      if (err) self.emit('error', err)
      self.emit('close')
    })
  }

  return Class
}

function obj(opts: any, read: any): any {
  if (typeof opts === 'function' || Array.isArray(opts)) {
    read = opts
    opts = {}
  }

  opts = defaults(opts)
  opts.objectMode = true
  opts.highWaterMark = 16

  return from2(opts, read)
}

function noop (): void {}

function defaults(opts: any): any {
  opts = opts || {}
  return opts
}
