'use strict'

const u: any = require('universalify').fromCallback
module.exports = {
  move: u(require('./move')),
  moveSync: require('./move-sync')
}
