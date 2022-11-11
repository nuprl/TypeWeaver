'use strict'

import { fromCallback as u } from 'universalify';
import fs from 'graceful-fs';
import path from 'path';
import mkdir from '../mkdirs';
import { pathExists } from '../path-exists';

function outputFile (file: File,  data: any,  encoding: any,  callback: Function) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  const dir = path.dirname(file)
  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file: tring | Buffer,  ...args: ny[]) {
  const dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync(file, ...args)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync(file, ...args)
}

export default {
  outputFile: u(outputFile),
  outputFileSync
};