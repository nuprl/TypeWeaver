var stream: any = require('readable-stream')
var eos: any = require('end-of-stream')
var inherits: any = require('inherits')
var shift: any = require('stream-shift')

var SIGNAL_FLUSH: any = (Buffer.from && Buffer.from !== Uint8Array.from)
  ? Buffer.from([0])
  : new Buffer([0])

var onuncork: void = function(self: any, fn: any) {
  if (self._corked) self.once('uncork', fn)
  else fn()
}

var autoDestroy: void = function (self: any, err: any) {
  if (self._autoDestroy) self.destroy(err)
}

var destroyer: void = function(self: any, end: any) {
  return function(err: any) {
    if (err) autoDestroy(self, err.message === 'premature close' ? null : err)
    else if (end && !self._ended) self.end()
  }
}

var end: any = function(ws: any, fn: any) {
  if (!ws) return fn()
  if (ws._writableState && ws._writableState.finished) return fn()
  if (ws._writableState) return ws.end(fn)
  ws.end()
  fn()
}

var noop: void = function() {}

var toStreams2: any = function(rs: any) {
  return new (stream.Readable)({objectMode:true, highWaterMark:16}).wrap(rs)
}

var Duplexify: void = function(writable: any, readable: any, opts: any) {
  if (!(this instanceof Duplexify)) return new Duplexify(writable, readable, opts)
  stream.Duplex.call(this, opts)

  this._writable = null
  this._readable = null
  this._readable2 = null

  this._autoDestroy = !opts || opts.autoDestroy !== false
  this._forwardDestroy = !opts || opts.destroy !== false
  this._forwardEnd = !opts || opts.end !== false
  this._corked = 1 // start corked
  this._ondrain = null
  this._drained = false
  this._forwarding = false
  this._unwrite = null
  this._unread = null
  this._ended = false

  this.destroyed = false

  if (writable) this.setWritable(writable)
  if (readable) this.setReadable(readable)
}

inherits(Duplexify, stream.Duplex)

Duplexify.obj = function(writable: any, readable: any, opts: any) {
  if (!opts) opts = {}
  opts.objectMode = true
  opts.highWaterMark = 16
  return new Duplexify(writable, readable, opts)
}

Duplexify.prototype.cork = function() {
  if (++this._corked === 1) this.emit('cork')
}

Duplexify.prototype.uncork = function() {
  if (this._corked && --this._corked === 0) this.emit('uncork')
}

Duplexify.prototype.setWritable = function(writable: any) {
  if (this._unwrite) this._unwrite()

  if (this.destroyed) {
    if (writable && writable.destroy) writable.destroy()
    return
  }

  if (writable === null || writable === false) {
    this.end()
    return
  }

  var self: any = this
  var unend: boolean = eos(writable, {writable:true, readable:false}, destroyer(this, this._forwardEnd))

  var ondrain: void = function() {
    var ondrain: any = self._ondrain
    self._ondrain = null
    if (ondrain) ondrain()
  }

  var clear: void = function() {
    self._writable.removeListener('drain', ondrain)
    unend()
  }

  if (this._unwrite) process.nextTick(ondrain) // force a drain on stream reset to avoid livelocks

  this._writable = writable
  this._writable.on('drain', ondrain)
  this._unwrite = clear

  this.uncork() // always uncork setWritable
}

Duplexify.prototype.setReadable = function(readable: any) {
  if (this._unread) this._unread()

  if (this.destroyed) {
    if (readable && readable.destroy) readable.destroy()
    return
  }

  if (readable === null || readable === false) {
    this.push(null)
    this.resume()
    return
  }

  var self: this = this
  var unend: any = eos(readable, {writable:false, readable:true}, destroyer(this))

  var onreadable: void = function() {
    self._forward()
  }

  var onend: void = function() {
    self.push(null)
  }

  var clear: void = function() {
    self._readable2.removeListener('readable', onreadable)
    self._readable2.removeListener('end', onend)
    unend()
  }

  this._drained = true
  this._readable = readable
  this._readable2 = readable._readableState ? readable : toStreams2(readable)
  this._readable2.on('readable', onreadable)
  this._readable2.on('end', onend)
  this._unread = clear

  this._forward()
}

Duplexify.prototype._read = function() {
  this._drained = true
  this._forward()
}

Duplexify.prototype._forward = function() {
  if (this._forwarding || !this._readable2 || !this._drained) return
  this._forwarding = true

  var data: any

  while (this._drained && (data = shift(this._readable2)) !== null) {
    if (this.destroyed) continue
    this._drained = this.push(data)
  }

  this._forwarding = false
}

Duplexify.prototype.destroy = function(err: any, cb: any) {
  if (!cb) cb = noop
  if (this.destroyed) return cb(null)
  this.destroyed = true

  var self: any = this
  process.nextTick(function() {
    self._destroy(err)
    cb(null)
  })
}

Duplexify.prototype._destroy = function(err: any) {
  if (err) {
    var ondrain: any = this._ondrain
    this._ondrain = null
    if (ondrain) ondrain(err)
    else this.emit('error', err)
  }

  if (this._forwardDestroy) {
    if (this._readable && this._readable.destroy) this._readable.destroy()
    if (this._writable && this._writable.destroy) this._writable.destroy()
  }

  this.emit('close')
}

Duplexify.prototype._write = function(data: any, enc: any, cb: any) {
  if (this.destroyed) return
  if (this._corked) return onuncork(this, this._write.bind(this, data, enc, cb))
  if (data === SIGNAL_FLUSH) return this._finish(cb)
  if (!this._writable) return cb()

  if (this._writable.write(data) === false) this._ondrain = cb
  else if (!this.destroyed) cb()
}

Duplexify.prototype._finish = function(cb: any) {
  var self: any = this
  this.emit('preend')
  onuncork(this, function() {
    end(self._forwardEnd && self._writable, function() {
      // haxx to not emit prefinish twice
      if (self._writableState.prefinished === false) self._writableState.prefinished = true
      self.emit('prefinish')
      onuncork(self, cb)
    })
  })
}

Duplexify.prototype.end = function(data: any, enc: any, cb: any) {
  if (typeof data === 'function') return this.end(null, null, data)
  if (typeof enc === 'function') return this.end(data, null, enc)
  this._ended = true
  if (data) this.write(data)
  if (!this._writableState.ending && !this._writableState.destroyed) this.write(SIGNAL_FLUSH)
  return stream.Writable.prototype.end.call(this, cb)
}

module.exports = Duplexify
