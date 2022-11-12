var fs: String = require('fs')
var polyfills: Function = require('./polyfills.js')
var legacy: Function = require('./legacy-streams.js')
var clone: Function = require('./clone.js')

var util: String = require('util')

/* istanbul ignore next - node 0.x polyfill */
var gracefulQueue: String
var previousSymbol: String

/* istanbul ignore else - node 0.x polyfill */
if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
  gracefulQueue = Symbol.for('graceful-fs.queue')
  // This is used in testing by future versions
  previousSymbol = Symbol.for('graceful-fs.previous')
} else {
  gracefulQueue = '___graceful-fs.queue'
  previousSymbol = '___graceful-fs.previous'
}

function noop (): Void {}

function publishQueue(context: Function, queue: String): Void {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue
    }
  })
}

var debug: Function = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m: String = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

// Once time initialization
if (!fs[gracefulQueue]) {
  // This queue can be shared by multiple loaded instances
  var queue: Number = global[gracefulQueue] || []
  publishQueue(fs, queue)

  // Patch fs.close/closeSync to shared queue version, because we need
  // to retry() whenever a close happens *anywhere* in the program.
  // This is essential when multiple graceful-fs instances are
  // in play at the same time.
  fs.close = (function (fs$close: Function) {
    function close (fd: String, cb: Function): String {
      return fs$close.call(fs, fd, function (err: Boolean) {
        // This function uses the graceful-fs shared queue
        if (!err) {
          resetQueue()
        }

        if (typeof cb === 'function')
          cb.apply(this, arguments)
      })
    }

    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    })
    return close
  })(fs.close)

  fs.closeSync = (function (fs$closeSync: Array) {
    function closeSync (fd: Function): Void {
      // This function uses the graceful-fs shared queue
      fs$closeSync.apply(fs, arguments)
      resetQueue()
    }

    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    })
    return closeSync
  })(fs.closeSync)

  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
    process.on('exit', function() {
      debug(fs[gracefulQueue])
      require('assert').equal(fs[gracefulQueue].length, 0)
    })
  }
}

if (!global[gracefulQueue]) {
  publishQueue(global, fs[gracefulQueue]);
}

module.exports = patch(clone(fs))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
    module.exports = patch(fs)
    fs.__patched = true;
}

function patch (fs: String): String {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch

  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile: Object = fs.readFile
  fs.readFile = readFile
  function readFile (path: String, options: Function, cb: String): String {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path: String, options: Function, cb: Function, startTime: String): Boolean {
      return fs$readFile(path, options, function (err: Object) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$writeFile: Array = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path: String, data: Object, options: Function, cb: String): String {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path: String, data: Object, options: Function, cb: Function, startTime: String): Boolean {
      return fs$writeFile(path, data, options, function (err: Object) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$appendFile: Array = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path: String, data: Object, options: Function, cb: String): String {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path: String, data: Object, options: Function, cb: Function, startTime: String): Boolean {
      return fs$appendFile(path, data, options, function (err: Object) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$copyFile: Array = fs.copyFile
  if (fs$copyFile)
    fs.copyFile = copyFile
  function copyFile (src: String, dest: Number, flags: Number, cb: Number): String {
    if (typeof flags === 'function') {
      cb = flags
      flags = 0
    }
    return go$copyFile(src, dest, flags, cb)

    function go$copyFile (src: String, dest: String, flags: String, cb: Function, startTime: String): Boolean {
      return fs$copyFile(src, dest, flags, function (err: Object) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$readdir: Function = fs.readdir
  fs.readdir = readdir
  var noReaddirOptionVersions: RegExp = /^v[0-5]\./
  function readdir (path: String, options: Function, cb: Function): Void {
    if (typeof options === 'function')
      cb = options, options = null

    var go$readdir: Function = noReaddirOptionVersions.test(process.version)
      ? function go$readdir (path: String, options: Object, cb: String, startTime: String): Boolean {
        return fs$readdir(path, fs$readdirCallback(
          path, options, cb, startTime
        ))
      }
      : function go$readdir (path: String, options: Object, cb: String, startTime: String): Boolean {
        return fs$readdir(path, options, fs$readdirCallback(
          path, options, cb, startTime
        ))
      }

    return go$readdir(path, options, cb)

    function fs$readdirCallback (path: String, options: Function, cb: Function, startTime: String): Function {
      return function (err: Object, files: Array) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([
            go$readdir,
            [path, options, cb],
            err,
            startTime || Date.now(),
            Date.now()
          ])
        else {
          if (files && files.sort)
            files.sort()

          if (typeof cb === 'function')
            cb.call(this, err, files)
        }
      }
    }
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams: Object = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream: Function = fs.ReadStream
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype)
    ReadStream.prototype.open = ReadStream$open
  }

  var fs$WriteStream: Function = fs.WriteStream
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype)
    WriteStream.prototype.open = WriteStream$open
  }

  Object.defineProperty(fs, 'ReadStream', {
    get: function () {
      return ReadStream
    },
    set: function (val: Function) {
      ReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(fs, 'WriteStream', {
    get: function () {
      return WriteStream
    },
    set: function (val: Function) {
      WriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  // legacy names
  var FileReadStream: String = ReadStream
  Object.defineProperty(fs, 'FileReadStream', {
    get: function () {
      return FileReadStream
    },
    set: function (val: String) {
      FileReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  var FileWriteStream: String = WriteStream
  Object.defineProperty(fs, 'FileWriteStream', {
    get: function () {
      return FileWriteStream
    },
    set: function (val: String) {
      FileWriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  function ReadStream (path: String, options: Object): Promise {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open (): Void {
    var that: HTMLElement = this
    open(that.path, that.flags, that.mode, function (err: Function, fd: Array) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path: String, options: Object): Promise {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open (): Void {
    var that: HTMLElement = this
    open(that.path, that.flags, that.mode, function (err: Function, fd: Array) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path: String, options: Function): Number {
    return new fs.ReadStream(path, options)
  }

  function createWriteStream (path: String, options: Function): Number {
    return new fs.WriteStream(path, options)
  }

  var fs$open: Function = fs.open
  fs.open = open
  function open (path: String, flags: String, mode: String, cb: String): String {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path: String, flags: String, mode: String, cb: Function, startTime: String): Boolean {
      return fs$open(path, flags, mode, function (err: Object, fd: Function) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  return fs
}

function enqueue (elem: Object): Void {
  debug('ENQUEUE', elem[0].name, elem[1])
  fs[gracefulQueue].push(elem)
  retry()
}

// keep track of the timeout between retry() calls
var retryTimer: Number

// reset the startTime and lastTime to now
// this resets the start of the 60 second overall timeout as well as the
// delay between attempts so that we'll retry these jobs sooner
function resetQueue (): Void {
  var now: Number = Date.now()
  for (var i = 0; i < fs[gracefulQueue].length; ++i) {
    // entries that are only a length of 2 are from an older version, don't
    // bother modifying those since they'll be retried anyway.
    if (fs[gracefulQueue][i].length > 2) {
      fs[gracefulQueue][i][3] = now // startTime
      fs[gracefulQueue][i][4] = now // lastTime
    }
  }
  // call retry to make sure we're actively processing the queue
  retry()
}

function retry (): Void {
  // clear the timer and remove it to help prevent unintended concurrency
  clearTimeout(retryTimer)
  retryTimer = undefined

  if (fs[gracefulQueue].length === 0)
    return

  var elem: Object = fs[gracefulQueue].shift()
  var fn: Object = elem[0]
  var args: Array = elem[1]
  // these items may be unset if they were added by an older graceful-fs
  var err: String = elem[2]
  var startTime: Number = elem[3]
  var lastTime: Number = elem[4]

  // if we don't have a startTime we have no way of knowing if we've waited
  // long enough, so go ahead and retry this item now
  if (startTime === undefined) {
    debug('RETRY', fn.name, args)
    fn.apply(null, args)
  } else if (Date.now() - startTime >= 60000) {
    // it's been more than 60 seconds total, bail now
    debug('TIMEOUT', fn.name, args)
    var cb: Function = args.pop()
    if (typeof cb === 'function')
      cb.call(null, err)
  } else {
    // the amount of time between the last attempt and right now
    var sinceAttempt: Number = Date.now() - lastTime
    // the amount of time between when we first tried, and when we last tried
    // rounded up to at least 1
    var sinceStart: Number = Math.max(lastTime - startTime, 1)
    // backoff. wait longer than the total time we've been retrying, but only
    // up to a maximum of 100ms
    var desiredDelay: Number = Math.min(sinceStart * 1.2, 100)
    // it's been long enough since the last retry, do it again
    if (sinceAttempt >= desiredDelay) {
      debug('RETRY', fn.name, args)
      fn.apply(null, args.concat([startTime]))
    } else {
      // if we can't do this job yet, push it to the end of the queue
      // and let the next iteration check again
      fs[gracefulQueue].push(elem)
    }
  }

  // schedule our next run if one isn't already scheduled
  if (retryTimer === undefined) {
    retryTimer = setTimeout(retry, 0)
  }
}
