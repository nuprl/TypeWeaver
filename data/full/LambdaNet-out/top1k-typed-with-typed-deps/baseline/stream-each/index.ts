var eos: Function = require('end-of-stream')
var shift: Function = require('stream-shift')

module.exports = each

function each (stream: string, fn: Function, cb: Function): string {
  var want: boolean = true
  var error: object = null
  var ended: boolean = false
  var running: boolean = false
  var calling: boolean = false

  stream.on('readable', onreadable)
  onreadable()

  if (cb) eos(stream, {readable: true, writable: false}, done)
  return stream

  function done (err: string): void {
    if (!error) error = err
    ended = true
    if (!running) cb(error)
  }

  function onreadable (): void {
    if (want) read()
  }

  function afterRead (err: string): void {
    running = false

    if (err) {
      error = err
      if (ended) return cb(error)
      stream.destroy(err)
      return
    }
    if (ended) return cb(error)
    if (!calling) read()
  }

  function read (): void {
    while (!running && !ended) {
      want = false

      var data: boolean = shift(stream)
      if (ended) return
      if (data === null) {
        want = true
        return
      }

      running = true
      calling = true
      fn(data, afterRead)
      calling = false
    }
  }
}
