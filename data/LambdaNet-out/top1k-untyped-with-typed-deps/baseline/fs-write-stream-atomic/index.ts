var fs: string = require('graceful-fs')
var Writable: object = require('readable-stream').Writable
var util: string = require('util')
var MurmurHash3: Function = require('imurmurhash')
var iferr: Function = require('iferr')
var crypto: string = require('crypto')

function murmurhex (): string {
  var hash: HTMLElement = MurmurHash3('')
  for (var ii = 0; ii < arguments.length; ++ii) {
    hash.hash('' + arguments[ii])
  }
  return hash.result()
}

var invocations: number = 0
function getTmpname (filename: string): string {
  return filename + '.' + murmurhex(__filename, process.pid, ++invocations)
}

var setImmediate: Function = global.setImmediate || setTimeout

module.exports = WriteStreamAtomic

// Requirements:
//   1. Write everything written to the stream to a temp file.
//   2. If there are no errors:
//      a. moves the temp file into its final destination
//      b. emits `finish` & `closed` ONLY after the file is
//         fully flushed and renamed.
//   3. If there's an error, removes the temp file.

util.inherits(WriteStreamAtomic, Writable)
function WriteStreamAtomic (path: string, options: Function): string {
  if (!(this instanceof WriteStreamAtomic)) {
    return new WriteStreamAtomic(path, options)
  }
  Writable.call(this, options)

  this.__isWin = options && options.hasOwnProperty('isWin') ? options.isWin : process.platform === 'win32'

  this.__atomicTarget = path
  this.__atomicTmp = getTmpname(path)

  this.__atomicChown = options && options.chown

  this.__atomicClosed = false

  this.__atomicStream = fs.WriteStream(this.__atomicTmp, options)

  this.__atomicStream.once('open', handleOpen(this))
  this.__atomicStream.once('close', handleClose(this))
  this.__atomicStream.once('error', handleError(this))
}

// We have to suppress default finish emitting, because ordinarily it
// would happen as soon as `end` is called on us and all of the
// data has been written to our target stream. So we suppress
// finish from being emitted here, and only emit it after our
// target stream is closed and we've moved everything around.
WriteStreamAtomic.prototype.emit = function (event: string) {
  if (event === 'finish') return this.__atomicStream.end()
  return Writable.prototype.emit.apply(this, arguments)
}

WriteStreamAtomic.prototype._write = function (buffer: object, encoding: string, cb: Function) {
  var flushed: boolean = this.__atomicStream.write(buffer, encoding)
  if (flushed) return cb()
  this.__atomicStream.once('drain', cb)
}

function handleOpen (writeStream: Request): Function {
  return function (fd: string) {
    writeStream.emit('open', fd)
  }
}

function handleClose (writeStream: HTMLDivElement): Function {
  return function () {
    if (writeStream.__atomicClosed) return
    writeStream.__atomicClosed = true
    if (writeStream.__atomicChown) {
      var uid: string = writeStream.__atomicChown.uid
      var gid: number = writeStream.__atomicChown.gid
      return fs.chown(writeStream.__atomicTmp, uid, gid, iferr(cleanup, moveIntoPlace))
    } else {
      moveIntoPlace()
    }
  }

  function moveIntoPlace (): Void {
    fs.rename(writeStream.__atomicTmp, writeStream.__atomicTarget, iferr(trapWindowsEPERM, end))
  }

  function trapWindowsEPERM (err: object): Void {
    if (writeStream.__isWin &&
        err.syscall && err.syscall === 'rename' &&
        err.code && err.code === 'EPERM'
    ) {
      checkFileHashes(err)
    } else {
      cleanup(err)
    }
  }

  function checkFileHashes (eperm: string): Void {
    var inprocess: number = 2
    var tmpFileHash: any[] = crypto.createHash('sha512')
    var targetFileHash: any[] = crypto.createHash('sha512')

    fs.createReadStream(writeStream.__atomicTmp)
      .on('data', function (data: object, enc: string) { tmpFileHash.update(data, enc) })
      .on('error', fileHashError)
      .on('end', fileHashComplete)
    fs.createReadStream(writeStream.__atomicTarget)
      .on('data', function (data: object, enc: string) { targetFileHash.update(data, enc) })
      .on('error', fileHashError)
      .on('end', fileHashComplete)

    function fileHashError (): Void {
      if (inprocess === 0) return
      inprocess = 0
      cleanup(eperm)
    }

    function fileHashComplete (): Promise {
      if (inprocess === 0) return
      if (--inprocess) return
      if (tmpFileHash.digest('hex') === targetFileHash.digest('hex')) {
        return cleanup()
      } else {
        return cleanup(eperm)
      }
    }
  }

  function cleanup (err: Function): Void {
    fs.unlink(writeStream.__atomicTmp, function () {
      if (err) {
        writeStream.emit('error', err)
        writeStream.emit('close')
      } else {
        end()
      }
    })
  }

  function end (): Void {
    // We have to use our parent class directly because we suppress `finish`
    // events fired via our own emit method.
    Writable.prototype.emit.call(writeStream, 'finish')

    // Delay the close to provide the same temporal separation a physical
    // file operation would have– that is, the close event is emitted only
    // after the async close operation completes.
    setImmediate(function () {
      writeStream.emit('close')
    })
  }
}

function handleError (writeStream: Request): Function {
  return function (er: string) {
    cleanupSync()
    writeStream.emit('error', er)
    writeStream.__atomicClosed = true
    writeStream.emit('close')
  }
  function cleanupSync (): Void {
    try {
      fs.unlinkSync(writeStream.__atomicTmp)
    } finally {
      return
    }
  }
}
