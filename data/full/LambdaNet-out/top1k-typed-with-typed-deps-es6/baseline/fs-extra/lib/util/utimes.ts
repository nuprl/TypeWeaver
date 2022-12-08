'use strict'

import fs from 'graceful-fs';

function utimesMillis (path: string, atime: string, mtime: string, callback: Function): void {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', (err: string, fd: string) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, (futimesErr: Function) => {
      fs.close(fd, (closeErr: boolean) => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

function utimesMillisSync (path: string, atime: string, mtime: string): number {
  const fd: number = fs.openSync(path, 'r+')
  fs.futimesSync(fd, atime, mtime)
  return fs.closeSync(fd)
}

export default {
  utimesMillis,
  utimesMillisSync
};
