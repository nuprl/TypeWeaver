'use strict'

const fs: any = require('graceful-fs')
const path: any = require('path')
const copySync: any = require('../copy').copySync
const removeSync: any = require('../remove').removeSync
const mkdirpSync: any = require('../mkdirs').mkdirpSync
const stat: any = require('../util/stat')

function moveSync (src: any, dest: string, opts: any): void {
  opts = opts || {}
  const overwrite: boolean = opts.overwrite || opts.clobber || false

  const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, 'move', opts)
  stat.checkParentPathsSync(src, srcStat, dest, 'move')
  if (!isParentRoot(dest)) mkdirpSync(path.dirname(dest))
  return doRename(src, dest, overwrite, isChangingCase)
}

function isParentRoot (dest: any): any {
  const parent: any = path.dirname(dest)
  const parsedPath: any = path.parse(parent)
  return parsedPath.root === parent
}

function doRename (src: any, dest: any, overwrite: any, isChangingCase: any): any {
  if (isChangingCase) return rename(src, dest, overwrite)
  if (overwrite) {
    removeSync(dest)
    return rename(src, dest, overwrite)
  }
  if (fs.existsSync(dest)) throw new Error('dest already exists.')
  return rename(src, dest, overwrite)
}

function rename (src: any, dest: string, overwrite: boolean): void {
  try {
    fs.renameSync(src, dest)
  } catch (err) {
    if (err.code !== 'EXDEV') throw err
    return moveAcrossDevice(src, dest, overwrite)
  }
}

function moveAcrossDevice (src: any, dest: string, overwrite: boolean): void {
  const opts: any = {
    overwrite,
    errorOnExist: true
  }
  copySync(src, dest, opts)
  return removeSync(src)
}

module.exports = moveSync
