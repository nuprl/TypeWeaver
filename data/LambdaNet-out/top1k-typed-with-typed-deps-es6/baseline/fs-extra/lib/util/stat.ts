'use strict'

import fs from '../fs';
import path from 'path';
import util from 'util';

function getStats (src: String, dest: String, opts: Object): Promise {
  const statFunc: Function = opts.dereference
    ? (file: String) => fs.stat(file, { bigint: true })
    : (file: String) => fs.lstat(file, { bigint: true })
  return Promise.all([
    statFunc(src),
    statFunc(dest).catch((err: Object) => {
      if (err.code === 'ENOENT') return null
      throw err
    })
  ]).then(([srcStat, destStat]) => ({ srcStat, destStat }))
}

function getStatsSync (src: String, dest: String, opts: Object): Object {
  let destStat: Array
  const statFunc: Function = opts.dereference
    ? (file: String) => fs.statSync(file, { bigint: true })
    : (file: String) => fs.lstatSync(file, { bigint: true })
  const srcStat: Array = statFunc(src)
  try {
    destStat = statFunc(dest)
  } catch (err) {
    if (err.code === 'ENOENT') return { srcStat, destStat: null }
    throw err
  }
  return { srcStat, destStat }
}

function checkPaths (src: String, dest: String, funcName: String, opts: Function, cb: Function): Void {
  util.callbackify(getStats)(src, dest, opts, (err: Function, stats: Object) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats

    if (destStat) {
      if (areIdentical(srcStat, destStat)) {
        const srcBaseName: String = path.basename(src)
        const destBaseName: String = path.basename(dest)
        if (funcName === 'move' &&
          srcBaseName !== destBaseName &&
          srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
          return cb(null, { srcStat, destStat, isChangingCase: true })
        }
        return cb(new Error('Source and destination must not be the same.'))
      }
      if (srcStat.isDirectory() && !destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
      }
      if (!srcStat.isDirectory() && destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`))
      }
    }

    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      return cb(new Error(errMsg(src, dest, funcName)))
    }
    return cb(null, { srcStat, destStat })
  })
}

function checkPathsSync (src: String, dest: String, funcName: String, opts: String): Object {
  const { srcStat, destStat } = getStatsSync(src, dest, opts)

  if (destStat) {
    if (areIdentical(srcStat, destStat)) {
      const srcBaseName: String = path.basename(src)
      const destBaseName: String = path.basename(dest)
      if (funcName === 'move' &&
        srcBaseName !== destBaseName &&
        srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
        return { srcStat, destStat, isChangingCase: true }
      }
      throw new Error('Source and destination must not be the same.')
    }
    if (srcStat.isDirectory() && !destStat.isDirectory()) {
      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
    }
    if (!srcStat.isDirectory() && destStat.isDirectory()) {
      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
    }
  }

  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return { srcStat, destStat }
}

// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
function checkParentPaths (src: String, srcStat: String, dest: String, funcName: String, cb: Function): Void {
  const srcParent: String = path.resolve(path.dirname(src))
  const destParent: String = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return cb()
  fs.stat(destParent, { bigint: true }, (err: Object, destStat: Boolean) => {
    if (err) {
      if (err.code === 'ENOENT') return cb()
      return cb(err)
    }
    if (areIdentical(srcStat, destStat)) {
      return cb(new Error(errMsg(src, dest, funcName)))
    }
    return checkParentPaths(src, srcStat, destParent, funcName, cb)
  })
}

function checkParentPathsSync (src: String, srcStat: String, dest: String, funcName: String): Boolean {
  const srcParent: String = path.resolve(path.dirname(src))
  const destParent: String = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return
  let destStat: Number
  try {
    destStat = fs.statSync(destParent, { bigint: true })
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
  if (areIdentical(srcStat, destStat)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return checkParentPathsSync(src, srcStat, destParent, funcName)
}

function areIdentical (srcStat: Array, destStat: Array): Boolean {
  return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev
}

// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
function isSrcSubdir (src: String, dest: String): Array {
  const srcArr: Array = path.resolve(src).split(path.sep).filter((i: Function) => i)
  const destArr: Object = path.resolve(dest).split(path.sep).filter((i: Function) => i)
  return srcArr.reduce((acc: Boolean, cur: Number, i: String) => acc && destArr[i] === cur, true)
}

function errMsg (src: String, dest: String, funcName: String): String {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
}

export default {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir,
  areIdentical
};
