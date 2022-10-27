'use strict'

import { fromCallback as u } from 'universalify';
import path from 'path';
import fs from 'graceful-fs';
import mkdir from '../mkdirs';
import { pathExists } from '../path-exists';
import { areIdentical } from '../util/stat';

function createLink (srcpath: String, dstpath: String, callback: Function): Void {
  function makeLink (srcpath: String, dstpath: String): Void {
    fs.link(srcpath, dstpath, (err: String) => {
      if (err) return callback(err)
      callback(null)
    })
  }

  fs.lstat(dstpath, (_: Function, dstStat: Boolean) => {
    fs.lstat(srcpath, (err: Map, srcStat: Number) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }
      if (dstStat && areIdentical(srcStat, dstStat)) return callback(null)

      const dir: String = path.dirname(dstpath)
      pathExists(dir, (err: Function, dirExists: Boolean) => {
        if (err) return callback(err)
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, (err: String) => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath: String, dstpath: String): Boolean {
  let dstStat: Number
  try {
    dstStat = fs.lstatSync(dstpath)
  } catch {}

  try {
    const srcStat: String = fs.lstatSync(srcpath)
    if (dstStat && areIdentical(srcStat, dstStat)) return
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  const dir: String = path.dirname(dstpath)
  const dirExists: Boolean = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

export default {
  createLink: u(createLink),
  createLinkSync
};
