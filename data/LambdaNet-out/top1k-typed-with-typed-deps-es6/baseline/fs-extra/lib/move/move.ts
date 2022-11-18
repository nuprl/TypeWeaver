'use strict'

import fs from 'graceful-fs';
import path from 'path';
import { copy } from '../copy';
import { remove } from '../remove';
import { mkdirp } from '../mkdirs';
import { pathExists } from '../path-exists';
import stat from '../util/stat';

function move (src: string, dest: string, opts: object, cb: Function): Void {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}

  const overwrite: string = opts.overwrite || opts.clobber || false

  stat.checkPaths(src, dest, 'move', opts, (err: string, stats: object) => {
    if (err) return cb(err)
    const { srcStat, isChangingCase = false } = stats
    stat.checkParentPaths(src, srcStat, dest, 'move', (err: string) => {
      if (err) return cb(err)
      if (isParentRoot(dest)) return doRename(src, dest, overwrite, isChangingCase, cb)
      mkdirp(path.dirname(dest), (err: string) => {
        if (err) return cb(err)
        return doRename(src, dest, overwrite, isChangingCase, cb)
      })
    })
  })
}

function isParentRoot (dest: string): boolean {
  const parent: number = path.dirname(dest)
  const parsedPath: string = path.parse(parent)
  return parsedPath.root === parent
}

function doRename (src: string, dest: string, overwrite: string, isChangingCase: boolean, cb: Function): any[] {
  if (isChangingCase) return rename(src, dest, overwrite, cb)
  if (overwrite) {
    return remove(dest, (err: string) => {
      if (err) return cb(err)
      return rename(src, dest, overwrite, cb)
    })
  }
  pathExists(dest, (err: string, destExists: boolean) => {
    if (err) return cb(err)
    if (destExists) return cb(new Error('dest already exists.'))
    return rename(src, dest, overwrite, cb)
  })
}

function rename (src: string, dest: string, overwrite: string, cb: Function): Void {
  fs.rename(src, dest, (err: object) => {
    if (!err) return cb()
    if (err.code !== 'EXDEV') return cb(err)
    return moveAcrossDevice(src, dest, overwrite, cb)
  })
}

function moveAcrossDevice (src: string, dest: string, overwrite: number, cb: Function): Void {
  const opts: object = {
    overwrite,
    errorOnExist: true
  }
  copy(src, dest, opts, (err: string) => {
    if (err) return cb(err)
    return remove(src, cb)
  })
}

export default move;
