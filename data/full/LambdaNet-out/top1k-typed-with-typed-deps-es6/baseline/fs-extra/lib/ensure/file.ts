'use strict'

import { fromCallback as u } from 'universalify';
import path from 'path';
import fs from 'graceful-fs';
import mkdir from '../mkdirs';

function createFile (file: string, callback: Function): void {
  function makeFile (): void {
    fs.writeFile(file, '', (err: boolean) => {
      if (err) return callback(err)
      callback()
    })
  }

  fs.stat(file, (err: boolean, stats: any[]) => { // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback()
    const dir: string = path.dirname(file)
    fs.stat(dir, (err: object, stats: any[]) => {
      if (err) {
        // if the directory doesn't exist, make it
        if (err.code === 'ENOENT') {
          return mkdir.mkdirs(dir, (err: string) => {
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
        fs.readdir(dir, (err: string) => {
          if (err) return callback(err)
        })
      }
    })
  })
}

function createFileSync (file: string): void {
  let stats: any[]
  try {
    stats = fs.statSync(file)
  } catch {}
  if (stats && stats.isFile()) return

  const dir: string = path.dirname(file)
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
