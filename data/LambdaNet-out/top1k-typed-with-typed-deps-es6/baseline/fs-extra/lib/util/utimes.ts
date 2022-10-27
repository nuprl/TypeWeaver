'use strict'

import fs from 'graceful-fs';

function utimesMillis (path: String, atime: String, mtime: String, callback: Function): Void {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', (err: String, fd: String) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, (futimesErr: Number) => {
      fs.close(fd, (closeErr: Boolean) => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

function utimesMillisSync (path: String, atime: String, mtime: String): Number {
  const fd: Number = fs.openSync(path, 'r+')
  fs.futimesSync(fd, atime, mtime)
  return fs.closeSync(fd)
}

export default {
  utimesMillis,
  utimesMillisSync
};
