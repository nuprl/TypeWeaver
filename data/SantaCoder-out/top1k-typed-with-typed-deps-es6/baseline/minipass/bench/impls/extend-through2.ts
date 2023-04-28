import through2 from 'through2';

export default function (opts: any) {
  if (opts.objectMode)
    return through2.obj(func)
  s = through2(func)
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s

  function func (data: any, enc: string, done: Function) {
    this.push(data, enc)
    done()
  }
};