import eos from 'end-of-stream';
import shift from 'stream-shift';

export default each;

function each (stream: Readable, fn: Function, cb: Function) {
  var want = true
  var error = null
  var ended = false
  var running = false
  var calling = false

  stream.on('readable', onreadable)
  onreadable()

  if (cb) eos(stream, {readable: true, writable: false}, done)
  return stream

  function done (err: Error) {
    if (!error) error = err
    ended = true
    if (!running) cb(error)
  }

  function onreadable () {
    if (want) read()
  }

  function afterRead (err: Error) {
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

  function read () {
    while (!running && !ended) {
      want = false

      var data = shift(stream)
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