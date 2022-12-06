import pump from 'pump';
import inherits from 'inherits';
import Duplexify from 'duplexify';

var toArray: Function = function(args: any[]) {
  if (!args.length) return []
  return Array.isArray(args[0]) ? args[0] : Array.prototype.slice.call(args)
}

var define: Function = function(opts: string) {
  var Pumpify: Function = function() {
    var streams: string = toArray(arguments)
    if (!(this instanceof Pumpify)) return new Pumpify(streams)
    Duplexify.call(this, null, null, opts)
    if (streams.length) this.setPipeline(streams)
  }

  inherits(Pumpify, Duplexify)

  Pumpify.prototype.setPipeline = function() {
    var streams: any[] = toArray(arguments)
    var self: HTMLElement = this
    var ended: boolean = false
    var w: string = streams[0]
    var r: any[] = streams[streams.length-1]

    r = r.readable ? r : null
    w = w.writable ? w : null

    var onclose: Function = function() {
      streams[0].emit('error', new Error('stream was destroyed'))
    }

    this.on('close', onclose)
    this.on('prefinish', function() {
      if (!ended) self.cork()
    })

    pump(streams, function(err: Promise) {
      self.removeListener('close', onclose)
      if (err) return self.destroy(err.message === 'premature close' ? null : err)
      ended = true
      // pump ends after the last stream is not writable *but*
      // pumpify still forwards the readable part so we need to catch errors
      // still, so reenable autoDestroy in this case
      if (self._autoDestroy === false) self._autoDestroy = true
      self.uncork()
    })

    if (this.destroyed) return onclose()
    this.setWritable(w)
    this.setReadable(r)
  }

  return Pumpify
}

export default define({autoDestroy:false, destroy:false});
export const obj: object = define({autoDestroy: false, destroy:false, objectMode:true, highWaterMark:16});
export const ctor: Function = define;
