'use strict'

const fs: any = require('graceful-fs')
const path: any = require('path')
const copy: any = require('../copy').copy
const remove: any = require('../remove').remove
const mkdirp: any = require('../mkdirs').mkdirp
const pathExists: any = require('../path-exists').pathExists
const stat: any = require('../util/stat')

function move (src: any, dest: any, opts: any, cb: any): void {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}

  const overwrite: boolean = opts.overwrite || opts.clobber || false

  stat.checkPaths(src, dest, 'move', opts, (err: any, stats: any) => {
    if (err) return cb(err)
    const { srcStat, isChangingCase = false } = stats
    stat.checkParentPaths(src, srcStat, dest, 'move', (err: any) => {
      if (err) return cb(err)
      if (isParentRoot(dest)) return doRename(src, dest, overwrite, isChangingCase, cb)
      mkdirp(path.dirname(dest), (err: any) => {
        if (err) return cb(err)
        return doRename(src, dest, overwrite, isChangingCase, cb)
      })
    })
  })
}

function isParentRoot (dest: any): any {
  const parent: any = path.dirname(dest)
  const parsedPath: any = path.parse(parent)
  return parsedPath.root === parent
}

function doRename (src: any, dest: any, overwrite: any, isChangingCase: any, cb: any): void {
  if (isChangingCase) return rename(src, dest, overwrite, cb)
  if (overwrite) {
    return remove(dest, (err: any) => {
      if (err) return cb(err)
      return rename(src, dest, overwrite, cb)
    })
  }
  pathExists(dest, (err: any, destExists: any) => {
    if (err) return cb(err)
    if (destExists) return cb(new Error('dest already exists.'))
    return rename(src, dest, overwrite, cb)
  })
}

function rename (src: any, dest: any, overwrite: any, cb: any): void {
  fs.rename(src, dest, (err: any) => {
    if (!err) return cb()
    if (err.code !== 'EXDEV') return cb(err)
    return moveAcrossDevice(src, dest, overwrite, cb)
  })
}

function moveAcrossDevice (src: any, dest: any, overwrite: any, cb: any): void {
  const opts: any = {
    overwrite,
    errorOnExist: true
  }
  copy(src, dest, opts, (err: any) => {
    if (err) return cb(err)
    return remove(src, cb)
  })
}

module.exports = move
