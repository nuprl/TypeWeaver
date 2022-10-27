import eos from 'end-of-stream';
import shift from 'stream-shift';

export default each;

function each (stream: Function, fn: Function, cb: Function): Array {
  var want: Boolean = true
  var error: Object = null
  var ended: Boolean = false
  var running: Boolean = false
  var calling: Boolean = false

  stream.on('readable', onreadable)
  onreadable()

  if (cb) eos(stream, {readable: true, writable: false}, done)
  return stream

  function done (err: String): Void {
    if (!error) error = err
    ended = true
    if (!running) cb(error)
  }

  function onreadable (): Void {
    if (want) read()
  }

  function afterRead (err: String): Void {
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

  function read (): Void {
    while (!running && !ended) {
      want = false

      var data: String = shift(stream)
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
