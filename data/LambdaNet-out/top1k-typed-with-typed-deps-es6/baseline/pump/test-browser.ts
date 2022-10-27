import stream from 'stream';
import pump from './index';

var rs: Array = new stream.Readable()
var ws: Object = new stream.Writable()

rs._read = function (size: Number) {
  this.push(Buffer(size).fill('abc'))
}

ws._write = function (chunk: Function, encoding: Number, cb: Function) {
  setTimeout(function () {
    cb()
  }, 100)
}

var toHex: Function = function () {
  var reverse: Array = new (require('stream').Transform)()

  reverse._transform = function (chunk: String, enc: Function, callback: Function) {
    reverse.push(chunk.toString('hex'))
    callback()
  }

  return reverse
}

var wsClosed: Boolean = false
var rsClosed: Boolean = false
var callbackCalled: Boolean = false

var check: Function = function () {
  if (wsClosed && rsClosed && callbackCalled) {
    console.log('test-browser.js passes')
    clearTimeout(timeout)
  }
}

ws.on('finish', function () {
  wsClosed = true
  check()
})

rs.on('end', function () {
  rsClosed = true
  check()
})

var res: Number = pump(rs, toHex(), toHex(), toHex(), ws, function () {
  callbackCalled = true
  check()
})

if (res !== ws) {
  throw new Error('should return last stream')
}

setTimeout(function () {
  rs.push(null)
  rs.emit('close')
}, 1000)

var timeout: Number = setTimeout(function () {
  check()
  throw new Error('timeout')
}, 5000)
