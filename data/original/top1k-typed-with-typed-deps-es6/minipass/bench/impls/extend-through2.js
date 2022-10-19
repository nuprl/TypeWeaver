import through2 from 'through2';

export default function (opts) {
  if (opts.objectMode)
    return through2.obj(func)
  s = through2(func)
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s

  function func (data, enc, done) {
    this.push(data, enc)
    done()
  }
};
