'use strict'

const fs: any = require('graceful-fs')
const path: any = require('path')
const mkdirs: any = require('../mkdirs').mkdirs
const pathExists: any = require('../path-exists').pathExists
const utimesMillis: any = require('../util/utimes').utimesMillis
const stat: any = require('../util/stat')

function copy (src: any, dest: any, opts: any, cb: any): void {
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

  stat.checkPaths(src, dest, 'copy', opts, (err: any, stats: any) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'copy', (err: any) => {
      if (err) return cb(err)
      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
      return checkParentDir(destStat, src, dest, opts, cb)
    })
  })
}

function checkParentDir (destStat: any, src: any, dest: string, opts: any, cb: any): any {
  const destParent: any = path.dirname(dest)
  pathExists(destParent, (err: any, dirExists: any) => {
    if (err) return cb(err)
    if (dirExists) return getStats(destStat, src, dest, opts, cb)
    mkdirs(destParent, (err: any) => {
      if (err) return cb(err)
      return getStats(destStat, src, dest, opts, cb)
    })
  })
}

function handleFilter (onInclude: any, destStat: any, src: any, dest: any, opts: any, cb: any): any {
  Promise.resolve(opts.filter(src, dest)).then((include: any) => {
    if (include) return onInclude(destStat, src, dest, opts, cb)
    return cb()
  }, (error: any) => cb(error))
}

function startCopy (destStat: any, src: any, dest: any, opts: any, cb: any): any {
  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
  return getStats(destStat, src, dest, opts, cb)
}

function getStats (destStat: any, src: any, dest: string, opts: any, cb: any): any {
  const stat: any = opts.dereference ? fs.stat : fs.lstat
  stat(src, (err: any, srcStat: any) => {
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

function onFile (srcStat: any, destStat: any, src: any, dest: any, opts: any, cb: any): any {
  if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
  return mayCopyFile(srcStat, src, dest, opts, cb)
}

function mayCopyFile (srcStat: any, src: any, dest: any, opts: any, cb: any): void {
  if (opts.overwrite) {
    fs.unlink(dest, (err: any) => {
      if (err) return cb(err)
      return copyFile(srcStat, src, dest, opts, cb)
    })
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`))
  } else return cb()
}

function copyFile (srcStat: string, src: string, dest: string, opts: any, cb: any): void {
  fs.copyFile(src, dest, (err: any) => {
    if (err) return cb(err)
    if (opts.preserveTimestamps) return handleTimestampsAndMode(srcStat.mode, src, dest, cb)
    return setDestMode(dest, srcStat.mode, cb)
  })
}

function handleTimestampsAndMode (srcMode: any, src: any, dest: any, cb: any): void {
  // Make sure the file is writable before setting the timestamp
  // otherwise open fails with EPERM when invoked with 'r+'
  // (through utimes call)
  if (fileIsNotWritable(srcMode)) {
    return makeFileWritable(dest, srcMode, (err: any) => {
      if (err) return cb(err)
      return setDestTimestampsAndMode(srcMode, src, dest, cb)
    })
  }
  return setDestTimestampsAndMode(srcMode, src, dest, cb)
}

function fileIsNotWritable (srcMode: any): boolean {
  return (srcMode & 0o200) === 0
}

function makeFileWritable (dest: string, srcMode: any, cb: any): any {
  return setDestMode(dest, srcMode | 0o200, cb)
}

function setDestTimestampsAndMode (srcMode: any, src: any, dest: any, cb: any): void {
  setDestTimestamps(src, dest, (err: any) => {
    if (err) return cb(err)
    return setDestMode(dest, srcMode, cb)
  })
}

function setDestMode (dest: any, srcMode: any, cb: any): any {
  return fs.chmod(dest, srcMode, cb)
}

function setDestTimestamps (src: any, dest: any, cb: any): void {
  // The initial srcStat.atime cannot be trusted
  // because it is modified by the read(2) system call
  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
  fs.stat(src, (err: any, updatedSrcStat: any) => {
    if (err) return cb(err)
    return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb)
  })
}

function onDir (srcStat: any, destStat: any, src: any, dest: any, opts: any, cb: any): any {
  if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts, cb)
  return copyDir(src, dest, opts, cb)
}

function mkDirAndCopy (srcMode: any, src: any, dest: any, opts: any, cb: any): void {
  fs.mkdir(dest, (err: any) => {
    if (err) return cb(err)
    copyDir(src, dest, opts, (err: any) => {
      if (err) return cb(err)
      return setDestMode(dest, srcMode, cb)
    })
  })
}

function copyDir (src: any, dest: any, opts: any, cb: any): void {
  fs.readdir(src, (err: any, items: any) => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  })
}

function copyDirItems (items: any, src: any, dest: any, opts: any, cb: any): any {
  const item: any = items.pop()
  if (!item) return cb()
  return copyDirItem(items, item, src, dest, opts, cb)
}

function copyDirItem (items: any, item: any, src: any, dest: any, opts: any, cb: any): void {
  const srcItem: any = path.join(src, item)
  const destItem: any = path.join(dest, item)
  stat.checkPaths(srcItem, destItem, 'copy', opts, (err: any, stats: any) => {
    if (err) return cb(err)
    const { destStat } = stats
    startCopy(destStat, srcItem, destItem, opts, (err: any) => {
      if (err) return cb(err)
      return copyDirItems(items, src, dest, opts, cb)
    })
  })
}

function onLink (destStat: any, src: any, dest: any, opts: any, cb: any): void {
  fs.readlink(src, (err: any, resolvedSrc: any) => {
    if (err) return cb(err)
    if (opts.dereference) {
      resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
    }

    if (!destStat) {
      return fs.symlink(resolvedSrc, dest, cb)
    } else {
      fs.readlink(dest, (err: any, resolvedDest: any) => {
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

function copyLink (resolvedSrc: any, dest: any, cb: any): void {
  fs.unlink(dest, (err: any) => {
    if (err) return cb(err)
    return fs.symlink(resolvedSrc, dest, cb)
  })
}

module.exports = copy
