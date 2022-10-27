const through2: Function = require('through2')
module.exports = function (opts: Object) {
  if (opts.objectMode)
    return through2.obj(func)
  s = through2(func)
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s

  function func (data: Object, enc: String, done: Function): Void {
    this.push(data, enc)
    done()
  }
}
