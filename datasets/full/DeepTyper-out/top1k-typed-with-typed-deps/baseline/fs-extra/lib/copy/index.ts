'use strict'

const u: any = require('universalify').fromCallback
module.exports = {
  copy: u(require('./copy')),
  copySync: require('./copy-sync')
}
