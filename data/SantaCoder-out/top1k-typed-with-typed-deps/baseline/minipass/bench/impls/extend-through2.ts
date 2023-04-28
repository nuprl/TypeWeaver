const through2 = require('through2')
module.exports = function (opts: any) {
  if (opts.objectMode)
    return through2.obj(func)
  s = through2(func)
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s

  function func (data: any, enc: any, done: any) {
    this.push(data, enc)
    done()
  }
}