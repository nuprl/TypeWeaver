import stream from 'stream';

export default class ExtendTransform extends stream.Transform {
  constructor (opts) {
    super(opts)
  }
  _transform (data, enc, done) {
    this.push(data, enc)
    done()
  }
};
