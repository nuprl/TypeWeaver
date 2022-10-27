'use strict'

import { fromCallback as u } from 'universalify';
import path from 'path';
import fs from '../fs';
import _mkdirs from '../mkdirs';
const mkdirs: Function = _mkdirs.mkdirs
const mkdirsSync: Function = _mkdirs.mkdirsSync

import _symlinkPaths from './symlink-paths';
const symlinkPaths: Function = _symlinkPaths.symlinkPaths
const symlinkPathsSync: Function = _symlinkPaths.symlinkPathsSync

import _symlinkType from './symlink-type';
const symlinkType: Function = _symlinkType.symlinkType
const symlinkTypeSync: Function = _symlinkType.symlinkTypeSync

import { pathExists } from '../path-exists';
import { areIdentical } from '../util/stat';

function createSymlink (srcpath: String, dstpath: String, type: Number, callback: String): Void {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  fs.lstat(dstpath, (err: Boolean, stats: String) => {
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

function _createSymlink (srcpath: Array, dstpath: String, type: String, callback: Function): Void {
  symlinkPaths(srcpath, dstpath, (err: String, relative: Object) => {
    if (err) return callback(err)
    srcpath = relative.toDst
    symlinkType(relative.toCwd, type, (err: String, type: String) => {
      if (err) return callback(err)
      const dir: String = path.dirname(dstpath)
      pathExists(dir, (err: String, dirExists: Boolean) => {
        if (err) return callback(err)
        if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
        mkdirs(dir, (err: String) => {
          if (err) return callback(err)
          fs.symlink(srcpath, dstpath, type, callback)
        })
      })
    })
  })
}

function createSymlinkSync (srcpath: Array, dstpath: String, type: String): Boolean {
  let stats: String
  try {
    stats = fs.lstatSync(dstpath)
  } catch {}
  if (stats && stats.isSymbolicLink()) {
    const srcStat: String = fs.statSync(srcpath)
    const dstStat: Number = fs.statSync(dstpath)
    if (areIdentical(srcStat, dstStat)) return
  }

  const relative: Object = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  const dir: String = path.dirname(dstpath)
  const exists: Boolean = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

export default {
  createSymlink: u(createSymlink),
  createSymlinkSync
};
