import once from 'once';
import eos from 'end-of-stream';
import fs from 'fs'; // we only need fs to get the ReadStream and WriteStream prototypes

var noop: void = function () {}
var ancient: boolean = /^v?\.0/.test(process.version)

var isFn: boolean = function (fn: any) {
  return typeof fn === 'function'
}

var isFS: boolean = function (stream: any) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs) return false // browser
  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
}

var isRequest: any = function (stream: any) {
  return stream.setHeader && isFn(stream.abort)
}

var destroyer: void = function (stream: any, reading: any, writing: any, callback: any) {
  callback = once(callback)

  var closed: boolean = false
  stream.on('close', function () {
    closed = true
  })

  eos(stream, {readable: reading, writable: writing}, function (err: any) {
    if (err) return callback(err)
    closed = true
    callback()
  })

  var destroyed: boolean = false
  return function (err: any) {
    if (closed) return
    if (destroyed) return
    destroyed = true

    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'))
  }
}

var call: any = function (fn: any) {
  fn()
}

var pipe: any = function (from, to: any) {
  return from.pipe(to)
}

var pump: any = function () {
  var streams: any = Array.prototype.slice.call(arguments)
  var callback: any = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop

  if (Array.isArray(streams[0])) streams = streams[0]
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error: any
  var destroys: any = streams.map(function (stream: any, i: number) {
    var reading: any = i < streams.length - 1
    var writing: any = i > 0
    return destroyer(stream, reading, writing, function (err: any) {
      if (!error) error = err
      if (err) destroys.forEach(call)
      if (reading) return
      destroys.forEach(call)
      callback(error)
    })
  })

  return streams.reduce(pipe)
}

export default pump;
