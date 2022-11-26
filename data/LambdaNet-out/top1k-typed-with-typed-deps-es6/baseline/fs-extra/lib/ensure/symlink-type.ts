'use strict'

import fs from 'graceful-fs';

function symlinkType (srcpath: string, type: number, callback: Function): void {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type
  if (type) return callback(null, type)
  fs.lstat(srcpath, (err: boolean, stats: any[]) => {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
    callback(null, type)
  })
}

function symlinkTypeSync (srcpath: string, type: number): string {
  let stats: any[]

  if (type) return type
  try {
    stats = fs.lstatSync(srcpath)
  } catch {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

export default {
  symlinkType,
  symlinkTypeSync
};
