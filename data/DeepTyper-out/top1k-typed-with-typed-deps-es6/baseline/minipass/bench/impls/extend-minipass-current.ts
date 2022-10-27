import Minipass from '../..';

export default class ExtendMinipass extends Minipass {
  constructor (opts) {
    super(opts)
  }
  write (data, encoding) {
    return super.write(data, encoding)
  }
};
