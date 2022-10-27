'use strict'

import { fromCallback as u } from 'universalify';
import path from 'path';
import fs from 'graceful-fs';
import mkdir from '../mkdirs';

function createFile (file: String, callback: Function): Void {
  function makeFile (): Void {
    fs.writeFile(file, '', (err: Boolean) => {
      if (err) return callback(err)
      callback()
    })
  }

  fs.stat(file, (err: Boolean, stats: Array) => { // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback()
    const dir: String = path.dirname(file)
    fs.stat(dir, (err: Object, stats: Array) => {
      if (err) {
        // if the directory doesn't exist, make it
        if (err.code === 'ENOENT') {
          return mkdir.mkdirs(dir, (err: String) => {
            if (err) return callback(err)
            makeFile()
          })
        }
        return callback(err)
      }

      if (stats.isDirectory()) makeFile()
      else {
        // parent is not a directory
        // This is just to cause an internal ENOTDIR error to be thrown
        fs.readdir(dir, (err: String) => {
          if (err) return callback(err)
        })
      }
    })
  })
}

function createFileSync (file: String): Void {
  let stats: Array
  try {
    stats = fs.statSync(file)
  } catch {}
  if (stats && stats.isFile()) return

  const dir: String = path.dirname(file)
  try {
    if (!fs.statSync(dir).isDirectory()) {
      // parent is not a directory
      // This is just to cause an internal ENOTDIR error to be thrown
      fs.readdirSync(dir)
    }
  } catch (err) {
    // If the stat call above failed because the directory doesn't exist, create it
    if (err && err.code === 'ENOENT') mkdir.mkdirsSync(dir)
    else throw err
  }

  fs.writeFileSync(file, '')
}

export default {
  createFile: u(createFile),
  createFileSync
};
