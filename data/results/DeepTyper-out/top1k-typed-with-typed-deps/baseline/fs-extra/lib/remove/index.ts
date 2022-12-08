'use strict'

const fs: any = require('graceful-fs')
const u: any = require('universalify').fromCallback
const rimraf: any = require('./rimraf')

function remove (path: string, callback: any): void {
  // Node 14.14.0+
  if (fs.rm) return fs.rm(path, { recursive: true, force: true }, callback)
  rimraf(path, callback)
}

function removeSync (path: string): any {
  // Node 14.14.0+
  if (fs.rmSync) return fs.rmSync(path, { recursive: true, force: true })
  rimraf.sync(path)
}

module.exports = {
  remove: u(remove),
  removeSync
}
