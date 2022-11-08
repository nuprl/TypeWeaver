'use strict'

import fs from 'graceful-fs';
import path from 'path';
import { copy } from '../copy';
import { remove } from '../remove';
import { mkdirp } from '../mkdirs';
import { pathExists } from '../path-exists';
import stat from '../util/stat';

function move (src: Buffer,  dest: Buffer,  opts: Object,  cb: Function) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}

  const overwrite = opts.overwrite || opts.clobber || false

  stat.checkPaths(src, dest, 'move', opts, (err, stats) => {
    if (err) return cb(err)
    const { srcStat, isChangingCase = false } = stats
    stat.checkParentPaths(src, srcStat, dest, 'move', err => {
      if (err) return cb(err)
      if (isParentRoot(dest)) return doRename(src, dest, overwrite, isChangingCase, cb)
      mkdirp(path.dirname(dest), err => {
        if (err) return cb(err)
        return doRename(src, dest, overwrite, isChangingCase, cb)
      })
    })
  })
}

function isParentRoot (dest: Path) {
  const parent = path.dirname(dest)
  const parsedPath = path.parse(parent)
  return parsedPath.root === parent
}

function doRename (src: String,  dest: String,  overwrite: Boolean,  isChangingCase: Boolean,  cb: Function) {
  if (isChangingCase) return rename(src, dest, overwrite, cb)
  if (overwrite) {
    return remove(dest, err => {
      if (err) return cb(err)
      return rename(src, dest, overwrite, cb)
    })
  }
  pathExists(dest, (err, destExists) => {
    if (err) return cb(err)
    if (destExists) return cb(new Error('dest already exists.'))
    return rename(src, dest, overwrite, cb)
  })
}

function rename (src: String,  dest: String,  overwrite: Boolean,  cb: Function) {
  fs.rename(src, dest, err => {
    if (!err) return cb()
    if (err.code !== 'EXDEV') return cb(err)
    return moveAcrossDevice(src, dest, overwrite, cb)
  })
}

function moveAcrossDevice (src: any,  dest: any,  overwrite: boolean | null,  cb: Function) {
  const opts = {
    overwrite,
    errorOnExist: true
  }
  copy(src, dest, opts, err => {
    if (err) return cb(err)
    return remove(src, cb)
  })
}

export default move;