import stream from 'readable-stream';
import inherits from 'inherits';

var SIGNAL_FLUSH =(Buffer.from && Buffer.from !== Uint8Array.from)
  ? Buffer.from([0])
  : new Buffer([0])

export default WriteStream;

function WriteStream (opts: WriteOpts,  write: WriteFunction,  flush: FlushFunction) {
  if (!(this instanceof WriteStream)) return new WriteStream(opts, write, flush)

  if (typeof opts === 'function') {
    flush = write
    write = opts
    opts = {}
  }

  stream.Writable.call(this, opts)

  this.destroyed = false
  this._worker = write || null
  this._flush = flush || null
}

inherits(WriteStream, stream.Writable)

WriteStream.obj = function (opts: WorkerOptions,  worker: Worker,  flush: Function) {
  if (typeof opts === 'function') return WriteStream.obj(null, opts, worker)
  if (!opts) opts = {}
  opts.objectMode = true
  return new WriteStream(opts, worker, flush)
}

WriteStream.prototype._write = function (data: any,  enc: any,  cb: Function) {
  if (SIGNAL_FLUSH === data) this._flush(cb)
  else this._worker(data, enc, cb)
}

WriteStream.prototype.end = function (data: any,  enc: any,  cb: Function) {
  if (!this._flush) return stream.Writable.prototype.end.apply(this, arguments)
  if (typeof data === 'function') return this.end(null, null, data)
  if (typeof enc === 'function') return this.end(data, null, enc)
  if (data) this.write(data)
  if (!this._writableState.ending) this.write(SIGNAL_FLUSH)
  return stream.Writable.prototype.end.call(this, cb)
}

WriteStream.prototype.destroy = function (err: Error) {
  if (this.destroyed) return
  this.destroyed = true
  if (err) this.emit('error', err)
  this.emit('close')
}