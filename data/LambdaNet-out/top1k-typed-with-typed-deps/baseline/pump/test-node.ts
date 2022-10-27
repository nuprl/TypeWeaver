var pump: Function = require('./index')

var rs: Object = require('fs').createReadStream('/dev/random')
var ws: Object = require('fs').createWriteStream('/dev/null')

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
    console.log('test-node.js passes')
    clearTimeout(timeout)
  }
}

ws.on('close', function () {
  wsClosed = true
  check()
})

rs.on('close', function () {
  rsClosed = true
  check()
})

var res: Boolean = pump(rs, toHex(), toHex(), toHex(), ws, function () {
  callbackCalled = true
  check()
})

if (res !== ws) {
  throw new Error('should return last stream')
}

setTimeout(function () {
  rs.destroy()
}, 1000)

var timeout: Number = setTimeout(function () {
  throw new Error('timeout')
}, 5000)
