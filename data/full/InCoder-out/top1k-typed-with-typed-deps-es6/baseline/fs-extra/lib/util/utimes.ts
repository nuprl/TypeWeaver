'use strict'

import fs from 'graceful-fs';

function utimesMillis (path: Path,  atime: number,  mtime: number,  callback: Function) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', (err, fd) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, futimesErr => {
      fs.close(fd, closeErr => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

function utimesMillisSync (path: string | Buffer,  atime: number,  mtime: number) {
  const fd = fs.openSync(path, 'r+')
  fs.futimesSync(fd, atime, mtime)
  return fs.closeSync(fd)
}

export default {
  utimesMillis,
  utimesMillisSync
};