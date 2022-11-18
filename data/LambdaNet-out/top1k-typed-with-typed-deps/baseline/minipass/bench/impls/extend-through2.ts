const through2: Function = require('through2')
module.exports = function (opts: object) {
  if (opts.objectMode)
    return through2.obj(func)
  s = through2(func)
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s

  function func (data: object, enc: string, done: Function): Void {
    this.push(data, enc)
    done()
  }
}
