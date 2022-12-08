'use strict'

const u: any = require('universalify').fromCallback
const fs: any = require('graceful-fs')
const path: any = require('path')
const mkdir: any = require('../mkdirs')
const pathExists: any = require('../path-exists').pathExists

function outputFile (file: string, data: string, encoding: string, callback: any): any {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  const dir: any = path.dirname(file)
  pathExists(dir, (err: any, itDoes: any) => {
    if (err) return callback(err)
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, (err: any) => {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file, ...args) {
  const dir: any = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync(file, ...args)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync(file, ...args)
}

module.exports = {
  outputFile: u(outputFile),
  outputFileSync
}
