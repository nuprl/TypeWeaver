'use strict'

import fs from 'graceful-fs';
import path from 'path';
import { copySync } from '../copy';
import { removeSync } from '../remove';
import { mkdirpSync } from '../mkdirs';
import stat from '../util/stat';

function moveSync (src: number,  dest: number,  opts: MoveOptions) {
  opts = opts || {}
  const overwrite = opts.overwrite || opts.clobber || false

  const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, 'move', opts)
  stat.checkParentPathsSync(src, srcStat, dest, 'move')
  if (!isParentRoot(dest)) mkdirpSync(path.dirname(dest))
  return doRename(src, dest, overwrite, isChangingCase)
}

function isParentRoot (dest: Path) {
  const parent = path.dirname(dest)
  const parsedPath = path.parse(parent)
  return parsedPath.root === parent
}

function doRename (src: any,  dest: any,  overwrite: boolean,  isChangingCase: boolean) {
  if (isChangingCase) return rename(src, dest, overwrite)
  if (overwrite) {
    removeSync(dest)
    return rename(src, dest, overwrite)
  }
  if (fs.existsSync(dest)) throw new Error('dest already exists.')
  return rename(src, dest, overwrite)
}

function rename (src: String,  dest: String,  overwrite: Boolean) {
  try {
    fs.renameSync(src, dest)
  } catch (err) {
    if (err.code !== 'EXDEV') throw err
    return moveAcrossDevice(src, dest, overwrite)
  }
}

function moveAcrossDevice (src: number,  dest: number,  overwrite: number) {
  const opts = {
    overwrite,
    errorOnExist: true
  }
  copySync(src, dest, opts)
  return removeSync(src)
}

export default moveSync;