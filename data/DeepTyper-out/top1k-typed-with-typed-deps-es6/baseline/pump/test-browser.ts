import stream from 'stream';
import pump from './index';

var rs: any = new stream.Readable()
var ws: any = new stream.Writable()

rs._read = function (size: any) {
  this.push(Buffer(size).fill('abc'))
}

ws._write = function (chunk: any, encoding: string, cb: any) {
  setTimeout(function () {
    cb()
  }, 100)
}

var toHex: void = function () {
  var reverse: any = new (require('stream').Transform)()

  reverse._transform = function (chunk: any, enc: any, callback: any) {
    reverse.push(chunk.toString('hex'))
    callback()
  }

  return reverse
}

var wsClosed: boolean = false
var rsClosed: boolean = false
var callbackCalled: boolean = false

var check: void = function () {
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

var res: any = pump(rs, toHex(), toHex(), toHex(), ws, function () {
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

var timeout: number = setTimeout(function () {
  check()
  throw new Error('timeout')
}, 5000)
