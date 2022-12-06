import Minipass from '../..';

export default class extends Minipass {
  constructor (options = {}) {
    options.async = true
    super(options)
  }
};