'use strict'

const u = require('universalify').fromCallback
module.exports = {
  copy: u(require('./copy')),
  copySync: require('./copy-sync')
}