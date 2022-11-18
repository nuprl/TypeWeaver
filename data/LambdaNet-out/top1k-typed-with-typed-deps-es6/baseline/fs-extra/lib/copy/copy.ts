'use strict'

import fs from 'graceful-fs';
import path from 'path';
import { mkdirs } from '../mkdirs';
import { pathExists } from '../path-exists';
import { utimesMillis } from '../util/utimes';
import stat from '../util/stat';

function copy (src: string, dest: string, opts: object, cb: Function): Void {
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

  stat.checkPaths(src, dest, 'copy', opts, (err: string, stats: object) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'copy', (err: string) => {
      if (err) return cb(err)
      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
      return checkParentDir(destStat, src, dest, opts, cb)
    })
  })
}

function checkParentDir (destStat: string, src: string, dest: string, opts: string, cb: Function): Void {
  const destParent: string = path.dirname(dest)
  pathExists(destParent, (err: string, dirExists: boolean) => {
    if (err) return cb(err)
    if (dirExists) return getStats(destStat, src, dest, opts, cb)
    mkdirs(destParent, (err: string) => {
      if (err) return cb(err)
      return getStats(destStat, src, dest, opts, cb)
    })
  })
}

function handleFilter (onInclude: Function, destStat: number, src: string, dest: string, opts: any[], cb: Function): Void {
  Promise.resolve(opts.filter(src, dest)).then((include: boolean) => {
    if (include) return onInclude(destStat, src, dest, opts, cb)
    return cb()
  }, (error: object) => cb(error))
}

function startCopy (destStat: string, src: string, dest: string, opts: object, cb: string): string {
  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
  return getStats(destStat, src, dest, opts, cb)
}

function getStats (destStat: string, src: string, dest: string, opts: object, cb: Function): Void {
  const stat: Function = opts.dereference ? fs.stat : fs.lstat
  stat(src, (err: string, srcStat: Function) => {
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

function onFile (srcStat: string, destStat: boolean, src: string, dest: string, opts: string, cb: string): string {
  if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
  return mayCopyFile(srcStat, src, dest, opts, cb)
}

function mayCopyFile (srcStat: string, src: string, dest: string, opts: Error, cb: Function): Void {
  if (opts.overwrite) {
    fs.unlink(dest, (err: string) => {
      if (err) return cb(err)
      return copyFile(srcStat, src, dest, opts, cb)
    })
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`))
  } else return cb()
}

function copyFile (srcStat: object, src: string, dest: string, opts: object, cb: Function): Void {
  fs.copyFile(src, dest, (err: string) => {
    if (err) return cb(err)
    if (opts.preserveTimestamps) return handleTimestampsAndMode(srcStat.mode, src, dest, cb)
    return setDestMode(dest, srcStat.mode, cb)
  })
}

function handleTimestampsAndMode (srcMode: string, src: string, dest: string, cb: Function): boolean {
  // Make sure the file is writable before setting the timestamp
  // otherwise open fails with EPERM when invoked with 'r+'
  // (through utimes call)
  if (fileIsNotWritable(srcMode)) {
    return makeFileWritable(dest, srcMode, (err: string) => {
      if (err) return cb(err)
      return setDestTimestampsAndMode(srcMode, src, dest, cb)
    })
  }
  return setDestTimestampsAndMode(srcMode, src, dest, cb)
}

function fileIsNotWritable (srcMode: number): boolean {
  return (srcMode & 0o200) === 0
}

function makeFileWritable (dest: string, srcMode: number, cb: Function): string {
  return setDestMode(dest, srcMode | 0o200, cb)
}

function setDestTimestampsAndMode (srcMode: string, src: string, dest: string, cb: Function): Void {
  setDestTimestamps(src, dest, (err: string) => {
    if (err) return cb(err)
    return setDestMode(dest, srcMode, cb)
  })
}

function setDestMode (dest: string, srcMode: string, cb: string): number {
  return fs.chmod(dest, srcMode, cb)
}

function setDestTimestamps (src: string, dest: number, cb: Function): Void {
  // The initial srcStat.atime cannot be trusted
  // because it is modified by the read(2) system call
  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
  fs.stat(src, (err: boolean, updatedSrcStat: object) => {
    if (err) return cb(err)
    return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb)
  })
}

function onDir (srcStat: object, destStat: boolean, src: string, dest: string, opts: string, cb: string): string {
  if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts, cb)
  return copyDir(src, dest, opts, cb)
}

function mkDirAndCopy (srcMode: string, src: string, dest: string, opts: string, cb: Function): Void {
  fs.mkdir(dest, (err: string) => {
    if (err) return cb(err)
    copyDir(src, dest, opts, (err: string) => {
      if (err) return cb(err)
      return setDestMode(dest, srcMode, cb)
    })
  })
}

function copyDir (src: string, dest: string, opts: string, cb: Function): Void {
  fs.readdir(src, (err: string, items: any[]) => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  })
}

function copyDirItems (items: any[], src: string, dest: number, opts: string, cb: Function): Void {
  const item: string = items.pop()
  if (!item) return cb()
  return copyDirItem(items, item, src, dest, opts, cb)
}

function copyDirItem (items: string, item: string, src: string, dest: string, opts: string, cb: Function): Void {
  const srcItem: string = path.join(src, item)
  const destItem: string = path.join(dest, item)
  stat.checkPaths(srcItem, destItem, 'copy', opts, (err: string, stats: object) => {
    if (err) return cb(err)
    const { destStat } = stats
    startCopy(destStat, srcItem, destItem, opts, (err: string) => {
      if (err) return cb(err)
      return copyDirItems(items, src, dest, opts, cb)
    })
  })
}

function onLink (destStat: any[], src: string, dest: string, opts: HTMLElement, cb: Function): Void {
  fs.readlink(src, (err: string, resolvedSrc: string) => {
    if (err) return cb(err)
    if (opts.dereference) {
      resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
    }

    if (!destStat) {
      return fs.symlink(resolvedSrc, dest, cb)
    } else {
      fs.readlink(dest, (err: object, resolvedDest: string) => {
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

function copyLink (resolvedSrc: string, dest: string, cb: Function): Void {
  fs.unlink(dest, (err: boolean) => {
    if (err) return cb(err)
    return fs.symlink(resolvedSrc, dest, cb)
  })
}

export default copy;
