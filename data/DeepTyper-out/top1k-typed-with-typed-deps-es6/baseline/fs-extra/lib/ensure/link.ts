'use strict'

import { fromCallback as u } from 'universalify';
import path from 'path';
import fs from 'graceful-fs';
import mkdir from '../mkdirs';
import { pathExists } from '../path-exists';
import { areIdentical } from '../util/stat';

function createLink (srcpath: string, dstpath: any, callback: Function): void {
  function makeLink (srcpath: string, dstpath: string): void {
    fs.link(srcpath, dstpath, (err: any) => {
      if (err) return callback(err)
      callback(null)
    })
  }

  fs.lstat(dstpath, (_: string, dstStat: string) => {
    fs.lstat(srcpath, (err: any, srcStat: string) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }
      if (dstStat && areIdentical(srcStat, dstStat)) return callback(null)

      const dir: any = path.dirname(dstpath)
      pathExists(dir, (err: any, dirExists: any) => {
        if (err) return callback(err)
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, (err: any) => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath: string, dstpath: string): void {
  let dstStat: any
  try {
    dstStat = fs.lstatSync(dstpath)
  } catch {}

  try {
    const srcStat: any = fs.lstatSync(srcpath)
    if (dstStat && areIdentical(srcStat, dstStat)) return
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  const dir: any = path.dirname(dstpath)
  const dirExists: any = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

export default {
  createLink: u(createLink),
  createLinkSync
};
