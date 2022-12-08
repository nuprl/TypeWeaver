'use strict'

import { fromCallback as u } from 'universalify';

export default {
  move: u(require('./move')),
  moveSync: require('./move-sync')
};
