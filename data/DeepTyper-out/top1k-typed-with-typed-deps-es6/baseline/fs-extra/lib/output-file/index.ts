'use strict'

import { fromCallback as u } from 'universalify';
import fs from 'graceful-fs';
import path from 'path';
import mkdir from '../mkdirs';
import { pathExists } from '../path-exists';

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

export default {
  outputFile: u(outputFile),
  outputFileSync
};
