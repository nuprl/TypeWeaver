'use strict'
const u: any = require('universalify').fromPromise
const fs: any = require('../fs')

function pathExists (path: string): any {
  return fs.access(path).then(() => true).catch(() => false)
}

module.exports = {
  pathExists: u(pathExists),
  pathExistsSync: fs.existsSync
}
