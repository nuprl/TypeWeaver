module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs: any = require('fs')
var origRealpath: any = fs.realpath
var origRealpathSync: any = fs.realpathSync

var version: any = process.version
var ok: boolean = /^v[0-5]\./.test(version)
var old: any = require('./old.js')

function newError (er: any): any {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p: string, cache: any, cb: any): any {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er: any, result: any) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p: string, cache: string): any {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch (): void {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch (): void {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}
