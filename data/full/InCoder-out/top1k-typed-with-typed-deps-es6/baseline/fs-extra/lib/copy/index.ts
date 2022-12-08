'use strict'

import { fromCallback as u } from 'universalify';

export default {
  copy: u(require('./copy')),
  copySync: require('./copy-sync')
};