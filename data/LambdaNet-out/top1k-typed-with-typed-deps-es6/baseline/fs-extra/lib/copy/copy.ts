'use strict'

import fs from 'graceful-fs';
import path from 'path';
import { mkdirs } from '../mkdirs';
import { pathExists } from '../path-exists';
import { utimesMillis } from '../util/utimes';
import stat from '../util/stat';

function copy (src: String, dest: String, opts: Object, cb: Function): Void {
  if (typeof opts === 'function' && !cb) {
    cb = opts
    opts = {}
  } else if (typeof opts === 'function') {
    opts = { filter: opts }
  }

  cb = cb || function () {}
  opts = opts || {}

  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    process.emitWarning(
      'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
      '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
      'Warning', 'fs-extra-WARN0001'
    )
  }

  stat.checkPaths(src, dest, 'copy', opts, (err: String, stats: Object) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'copy', (err: String) => {
      if (err) return cb(err)
      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
      return checkParentDir(destStat, src, dest, opts, cb)
    })
  })
}

function checkParentDir (destStat: String, src: String, dest: String, opts: String, cb: Function): Void {
  const destParent: String = path.dirname(dest)
  pathExists(destParent, (err: String, dirExists: Boolean) => {
    if (err) return cb(err)
    if (dirExists) return getStats(destStat, src, dest, opts, cb)
    mkdirs(destParent, (err: String) => {
      if (err) return cb(err)
      return getStats(destStat, src, dest, opts, cb)
    })
  })
}

function handleFilter (onInclude: Function, destStat: Number, src: String, dest: String, opts: Array, cb: Function): Void {
  Promise.resolve(opts.filter(src, dest)).then((include: Boolean) => {
    if (include) return onInclude(destStat, src, dest, opts, cb)
    return cb()
  }, (error: Object) => cb(error))
}

function startCopy (destStat: String, src: String, dest: String, opts: Object, cb: String): String {
  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
  return getStats(destStat, src, dest, opts, cb)
}

function getStats (destStat: String, src: String, dest: String, opts: Object, cb: Function): Void {
  const stat: Function = opts.dereference ? fs.stat : fs.lstat
  stat(src, (err: String, srcStat: Function) => {
    if (err) return cb(err)

    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isFile() ||
             srcStat.isCharacterDevice() ||
             srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb)
    else if (srcStat.isSocket()) return cb(new Error(`Cannot copy a socket file: ${src}`))
    else if (srcStat.isFIFO()) return cb(new Error(`Cannot copy a FIFO pipe: ${src}`))
    return cb(new Error(`Unknown file: ${src}`))
  })
}

function onFile (srcStat: String, destStat: Boolean, src: String, dest: String, opts: String, cb: String): String {
  if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
  return mayCopyFile(srcStat, src, dest, opts, cb)
}

function mayCopyFile (srcStat: String, src: String, dest: String, opts: HTMLElement, cb: Function): Void {
  if (opts.overwrite) {
    fs.unlink(dest, (err: String) => {
      if (err) return cb(err)
      return copyFile(srcStat, src, dest, opts, cb)
    })
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`))
  } else return cb()
}

function copyFile (srcStat: Object, src: String, dest: String, opts: HTMLElement, cb: Function): Void {
  fs.copyFile(src, dest, (err: String) => {
    if (err) return cb(err)
    if (opts.preserveTimestamps) return handleTimestampsAndMode(srcStat.mode, src, dest, cb)
    return setDestMode(dest, srcStat.mode, cb)
  })
}

function handleTimestampsAndMode (srcMode: String, src: String, dest: String, cb: Function): Boolean {
  // Make sure the file is writable before setting the timestamp
  // otherwise open fails with EPERM when invoked with 'r+'
  // (through utimes call)
  if (fileIsNotWritable(srcMode)) {
    return makeFileWritable(dest, srcMode, (err: String) => {
      if (err) return cb(err)
      return setDestTimestampsAndMode(srcMode, src, dest, cb)
    })
  }
  return setDestTimestampsAndMode(srcMode, src, dest, cb)
}

function fileIsNotWritable (srcMode: Number): Boolean {
  return (srcMode & 0o200) === 0
}

function makeFileWritable (dest: String, srcMode: Number, cb: Function): String {
  return setDestMode(dest, srcMode | 0o200, cb)
}

function setDestTimestampsAndMode (srcMode: String, src: String, dest: String, cb: Function): Void {
  setDestTimestamps(src, dest, (err: String) => {
    if (err) return cb(err)
    return setDestMode(dest, srcMode, cb)
  })
}

function setDestMode (dest: String, srcMode: String, cb: String): Boolean {
  return fs.chmod(dest, srcMode, cb)
}

function setDestTimestamps (src: String, dest: String, cb: Function): Void {
  // The initial srcStat.atime cannot be trusted
  // because it is modified by the read(2) system call
  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
  fs.stat(src, (err: Boolean, updatedSrcStat: Object) => {
    if (err) return cb(err)
    return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb)
  })
}

function onDir (srcStat: Object, destStat: Boolean, src: String, dest: String, opts: String, cb: String): String {
  if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts, cb)
  return copyDir(src, dest, opts, cb)
}

function mkDirAndCopy (srcMode: String, src: String, dest: String, opts: String, cb: Function): Void {
  fs.mkdir(dest, (err: String) => {
    if (err) return cb(err)
    copyDir(src, dest, opts, (err: String) => {
      if (err) return cb(err)
      return setDestMode(dest, srcMode, cb)
    })
  })
}

function copyDir (src: String, dest: String, opts: String, cb: Function): Void {
  fs.readdir(src, (err: String, items: Array) => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  })
}

function copyDirItems (items: Array, src: String, dest: Number, opts: String, cb: Function): Void {
  const item: String = items.pop()
  if (!item) return cb()
  return copyDirItem(items, item, src, dest, opts, cb)
}

function copyDirItem (items: String, item: String, src: String, dest: String, opts: String, cb: Function): Void {
  const srcItem: String = path.join(src, item)
  const destItem: String = path.join(dest, item)
  stat.checkPaths(srcItem, destItem, 'copy', opts, (err: String, stats: Object) => {
    if (err) return cb(err)
    const { destStat } = stats
    startCopy(destStat, srcItem, destItem, opts, (err: String) => {
      if (err) return cb(err)
      return copyDirItems(items, src, dest, opts, cb)
    })
  })
}

function onLink (destStat: Array, src: String, dest: String, opts: HTMLElement, cb: Function): Void {
  fs.readlink(src, (err: String, resolvedSrc: String) => {
    if (err) return cb(err)
    if (opts.dereference) {
      resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
    }

    if (!destStat) {
      return fs.symlink(resolvedSrc, dest, cb)
    } else {
      fs.readlink(dest, (err: Object, resolvedDest: String) => {
        if (err) {
          // dest exists and is a regular file or directory,
          // Windows may throw UNKNOWN error. If dest already exists,
          // fs throws error anyway, so no need to guard against it here.
          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest, cb)
          return cb(err)
        }
        if (opts.dereference) {
          resolvedDest = path.resolve(process.cwd(), resolvedDest)
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))
        }

        // do not copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))
        }
        return copyLink(resolvedSrc, dest, cb)
      })
    }
  })
}

function copyLink (resolvedSrc: String, dest: String, cb: Function): Void {
  fs.unlink(dest, (err: Boolean) => {
    if (err) return cb(err)
    return fs.symlink(resolvedSrc, dest, cb)
  })
}

export default copy;
