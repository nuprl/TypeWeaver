import through2 from 'through2';

export default function (opts): any {
  if (opts.objectMode)
    return through2.obj()
  s = through2()
  if (opts.encoding) {
    s.setEncoding(opts.encoding)
  }
  return s
};
