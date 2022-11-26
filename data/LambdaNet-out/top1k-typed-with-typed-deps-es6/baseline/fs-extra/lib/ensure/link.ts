'use strict'

import { fromCallback as u } from 'universalify';
import path from 'path';
import fs from 'graceful-fs';
import mkdir from '../mkdirs';
import { pathExists } from '../path-exists';
import { areIdentical } from '../util/stat';

function createLink (srcpath: string, dstpath: string, callback: Function): void {
  function makeLink (srcpath: string, dstpath: string): void {
    fs.link(srcpath, dstpath, (err: string) => {
      if (err) return callback(err)
      callback(null)
    })
  }

  fs.lstat(dstpath, (_: Function, dstStat: boolean) => {
    fs.lstat(srcpath, (err: Map, srcStat: number) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }
      if (dstStat && areIdentical(srcStat, dstStat)) return callback(null)

      const dir: string = path.dirname(dstpath)
      pathExists(dir, (err: Function, dirExists: boolean) => {
        if (err) return callback(err)
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, (err: string) => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath: string, dstpath: string): boolean {
  let dstStat: number
  try {
    dstStat = fs.lstatSync(dstpath)
  } catch {}

  try {
    const srcStat: string = fs.lstatSync(srcpath)
    if (dstStat && areIdentical(srcStat, dstStat)) return
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  const dir: string = path.dirname(dstpath)
  const dirExists: boolean = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

export default {
  createLink: u(createLink),
  createLinkSync
};
