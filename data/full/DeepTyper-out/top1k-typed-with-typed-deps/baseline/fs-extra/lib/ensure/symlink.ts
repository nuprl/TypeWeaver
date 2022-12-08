'use strict'

const u: any = require('universalify').fromCallback
const path: any = require('path')
const fs: any = require('../fs')
const _mkdirs: any = require('../mkdirs')
const mkdirs: any = _mkdirs.mkdirs
const mkdirsSync: any = _mkdirs.mkdirsSync

const _symlinkPaths: any = require('./symlink-paths')
const symlinkPaths: any = _symlinkPaths.symlinkPaths
const symlinkPathsSync: any = _symlinkPaths.symlinkPathsSync

const _symlinkType: any = require('./symlink-type')
const symlinkType: any = _symlinkType.symlinkType
const symlinkTypeSync: any = _symlinkType.symlinkTypeSync

const pathExists: any = require('../path-exists').pathExists

const { areIdentical } = require('../util/stat')

function createSymlink (srcpath: any, dstpath: any, type, callback: any): any {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  fs.lstat(dstpath, (err: any, stats: any) => {
    if (!err && stats.isSymbolicLink()) {
      Promise.all([
        fs.stat(srcpath),
        fs.stat(dstpath)
      ]).then(([srcStat, dstStat]) => {
        if (areIdentical(srcStat, dstStat)) return callback(null)
        _createSymlink(srcpath, dstpath, type, callback)
      })
    } else _createSymlink(srcpath, dstpath, type, callback)
  })
}

function _createSymlink (srcpath: any, dstpath: any, type, callback: any): any {
  symlinkPaths(srcpath, dstpath, (err: any, relative: any) => {
    if (err) return callback(err)
    srcpath = relative.toDst
    symlinkType(relative.toCwd, type, (err: any, type) => {
      if (err) return callback(err)
      const dir: any = path.dirname(dstpath)
      pathExists(dir, (err: any, dirExists: any) => {
        if (err) return callback(err)
        if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
        mkdirs(dir, (err: any) => {
          if (err) return callback(err)
          fs.symlink(srcpath, dstpath, type, callback)
        })
      })
    })
  })
}

function createSymlinkSync (srcpath: string, dstpath: any, type): void {
  let stats: any
  try {
    stats = fs.lstatSync(dstpath)
  } catch {}
  if (stats && stats.isSymbolicLink()) {
    const srcStat: any = fs.statSync(srcpath)
    const dstStat: any = fs.statSync(dstpath)
    if (areIdentical(srcStat, dstStat)) return
  }

  const relative: any = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  const dir: any = path.dirname(dstpath)
  const exists: any = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

module.exports = {
  createSymlink: u(createSymlink),
  createSymlinkSync
}
