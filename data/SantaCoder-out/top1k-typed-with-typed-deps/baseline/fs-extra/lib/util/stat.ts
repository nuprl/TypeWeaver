'use strict'

const fs = require('../fs')
const path = require('path')
const util = require('util')

function getStats (src: string, dest: string, opts: Options) {
  const statFunc = opts.dereference
    ? (file) => fs.stat(file, { bigint: true })
    : (file) => fs.lstat(file, { bigint: true })
  return Promise.all([
    statFunc(src),
    statFunc(dest).catch(err => {
      if (err.code === 'ENOENT') return null
      throw err
    })
  ]).then(([srcStat, destStat]) => ({ srcStat, destStat }))
}

function getStatsSync (src: string, dest: string, opts: StatsOptions) {
  let destStat
  const statFunc = opts.dereference
    ? (file) => fs.statSync(file, { bigint: true })
    : (file) => fs.lstatSync(file, { bigint: true })
  const srcStat = statFunc(src)
  try {
    destStat = statFunc(dest)
  } catch (err) {
    if (err.code === 'ENOENT') return { srcStat, destStat: null }
    throw err
  }
  return { srcStat, destStat }
}

function checkPaths (src: string, dest: string, funcName: string, opts: Object, cb: Function) {
  util.callbackify(getStats)(src, dest, opts, (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats

    if (destStat) {
      if (areIdentical(srcStat, destStat)) {
        const srcBaseName = path.basename(src)
        const destBaseName = path.basename(dest)
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

function checkPathsSync (src: string, dest: string, funcName: string, opts: Options) {
  const { srcStat, destStat } = getStatsSync(src, dest, opts)

  if (destStat) {
    if (areIdentical(srcStat, destStat)) {
      const srcBaseName = path.basename(src)
      const destBaseName = path.basename(dest)
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
function checkParentPaths (src: string, srcStat: fs.Stats, dest: string, funcName: string, cb: Function) {
  const srcParent = path.resolve(path.dirname(src))
  const destParent = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return cb()
  fs.stat(destParent, { bigint: true }, (err, destStat) => {
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

function checkParentPathsSync (src: string, srcStat: fs.Stats, dest: string, funcName: string) {
  const srcParent = path.resolve(path.dirname(src))
  const destParent = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return
  let destStat
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

function areIdentical (srcStat: fs.Stats, destStat: fs.Stats) {
  return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev
}

// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
function isSrcSubdir (src: string, dest: string) {
  const srcArr = path.resolve(src).split(path.sep).filter(i => i)
  const destArr = path.resolve(dest).split(path.sep).filter(i => i)
  return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)
}

function errMsg (src: string, dest: string, funcName: string) {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
}

module.exports = {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir,
  areIdentical
}