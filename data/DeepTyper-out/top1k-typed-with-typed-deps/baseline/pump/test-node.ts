var pump: any = require('./index')

var rs: any = require('fs').createReadStream('/dev/random')
var ws: any = require('fs').createWriteStream('/dev/null')

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

var res: any = pump(rs, toHex(), toHex(), toHex(), ws, function () {
  callbackCalled = true
  check()
})

if (res !== ws) {
  throw new Error('should return last stream')
}

setTimeout(function () {
  rs.destroy()
}, 1000)

var timeout: number = setTimeout(function () {
  throw new Error('timeout')
}, 5000)
