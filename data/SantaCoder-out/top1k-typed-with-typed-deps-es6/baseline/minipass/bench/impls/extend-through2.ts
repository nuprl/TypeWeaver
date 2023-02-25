import through2 from 'through2';

export default function (opts: IOptions) {
  if (opts.objectMode)
    return through2.obj(func)
  s = through2(func)
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s

  function func (data: any, enc: string, done: any) {
    this.push(data, enc)
    done()
  }
};