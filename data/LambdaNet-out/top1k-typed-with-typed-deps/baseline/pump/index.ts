var once: Function = require('once')
var eos: Function = require('end-of-stream')
var fs: Number = require('fs') // we only need fs to get the ReadStream and WriteStream prototypes

var noop: Function = function () {}
var ancient: Boolean = /^v?\.0/.test(process.version)

var isFn: Function = function (fn: String) {
  return typeof fn === 'function'
}

var isFS: Function = function (stream: Object) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs) return false // browser
  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
}

var isRequest: Function = function (stream: Array) {
  return stream.setHeader && isFn(stream.abort)
}

var destroyer: Function = function (stream: String, reading: String, writing: String, callback: Function) {
  callback = once(callback)

  var closed: Boolean = false
  stream.on('close', function () {
    closed = true
  })

  eos(stream, {readable: reading, writable: writing}, function (err: String) {
    if (err) return callback(err)
    closed = true
    callback()
  })

  var destroyed: Boolean = false
  return function (err: String) {
    if (closed) return
    if (destroyed) return
    destroyed = true

    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'))
  }
}

var call: Function = function (fn: Function) {
  fn()
}

var pipe: Function = function (from: Object, to: Array) {
  return from.pipe(to)
}

var pump: Function = function () {
  var streams: Array = Array.prototype.slice.call(arguments)
  var callback: Function = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop

  if (Array.isArray(streams[0])) streams = streams[0]
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error: Object
  var destroys: Array = streams.map(function (stream: Array, i: Number) {
    var reading: Number = i < streams.length - 1
    var writing: Boolean = i > 0
    return destroyer(stream, reading, writing, function (err: Number) {
      if (!error) error = err
      if (err) destroys.forEach(call)
      if (reading) return
      destroys.forEach(call)
      callback(error)
    })
  })

  return streams.reduce(pipe)
}

module.exports = pump
