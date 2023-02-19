const through2: Function = require('through2')
module.exports = function (opts: object) {
  if (opts.objectMode)
    return through2.obj()
  s = through2()
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s
}
