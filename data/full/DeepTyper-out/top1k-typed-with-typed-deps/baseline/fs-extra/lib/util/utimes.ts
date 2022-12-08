'use strict'

const fs: any = require('graceful-fs')

function utimesMillis (path: string, atime: any, mtime: number, callback: any): void {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', (err: any, fd: any) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, (futimesErr: any) => {
      fs.close(fd, (closeErr: any) => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

function utimesMillisSync (path: string, atime: any, mtime: number): any {
  const fd: any = fs.openSync(path, 'r+')
  fs.futimesSync(fd, atime, mtime)
  return fs.closeSync(fd)
}

module.exports = {
  utimesMillis,
  utimesMillisSync
}
