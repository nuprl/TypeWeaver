import through2 from 'through2';

export default function (opts: Options) {
  if (opts.objectMode)
    return through2.obj(func)
  s = through2(func)
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s

  function func (data: Buffer,  enc: Buffer,  done: Function) {
    this.push(data, enc)
    done()
  }
};