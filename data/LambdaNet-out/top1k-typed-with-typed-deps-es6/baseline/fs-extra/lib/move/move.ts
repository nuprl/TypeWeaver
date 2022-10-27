'use strict'

import fs from 'graceful-fs';
import path from 'path';
import { copy } from '../copy';
import { remove } from '../remove';
import { mkdirp } from '../mkdirs';
import { pathExists } from '../path-exists';
import stat from '../util/stat';

function move (src: String, dest: String, opts: Object, cb: Function): Void {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}

  const overwrite: Number = opts.overwrite || opts.clobber || false

  stat.checkPaths(src, dest, 'move', opts, (err: String, stats: Object) => {
    if (err) return cb(err)
    const { srcStat, isChangingCase = false } = stats
    stat.checkParentPaths(src, srcStat, dest, 'move', (err: String) => {
      if (err) return cb(err)
      if (isParentRoot(dest)) return doRename(src, dest, overwrite, isChangingCase, cb)
      mkdirp(path.dirname(dest), (err: String) => {
        if (err) return cb(err)
        return doRename(src, dest, overwrite, isChangingCase, cb)
      })
    })
  })
}

function isParentRoot (dest: String): Boolean {
  const parent: Number = path.dirname(dest)
  const parsedPath: String = path.parse(parent)
  return parsedPath.root === parent
}

function doRename (src: String, dest: String, overwrite: String, isChangingCase: Boolean, cb: Function): Array {
  if (isChangingCase) return rename(src, dest, overwrite, cb)
  if (overwrite) {
    return remove(dest, (err: String) => {
      if (err) return cb(err)
      return rename(src, dest, overwrite, cb)
    })
  }
  pathExists(dest, (err: String, destExists: Boolean) => {
    if (err) return cb(err)
    if (destExists) return cb(new Error('dest already exists.'))
    return rename(src, dest, overwrite, cb)
  })
}

function rename (src: String, dest: String, overwrite: String, cb: Function): Void {
  fs.rename(src, dest, (err: Object) => {
    if (!err) return cb()
    if (err.code !== 'EXDEV') return cb(err)
    return moveAcrossDevice(src, dest, overwrite, cb)
  })
}

function moveAcrossDevice (src: String, dest: String, overwrite: Number, cb: Function): Void {
  const opts: Object = {
    overwrite,
    errorOnExist: true
  }
  copy(src, dest, opts, (err: String) => {
    if (err) return cb(err)
    return remove(src, cb)
  })
}

export default move;
