'use strict'
import fs from 'fs';
import path from 'path';

/* istanbul ignore next */
const LCHOWN: string = fs.lchown ? 'lchown' : 'chown'
/* istanbul ignore next */
const LCHOWNSYNC: string = fs.lchownSync ? 'lchownSync' : 'chownSync'

/* istanbul ignore next */
const needEISDIRHandled: boolean = fs.lchown &&
  !process.version.match(/v1[1-9]+\./) &&
  !process.version.match(/v10\.[6-9]/)

const lchownSync: Function = (path: string, uid: string, gid: string) => {
  try {
    return fs[LCHOWNSYNC](path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const chownSync: Function = (path: string, uid: string, gid: string) => {
  try {
    return fs.chownSync(path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const handleEISDIR: Function =
  needEISDIRHandled ? (path: string, uid: string, gid: string, cb: Function) => (er: object) => {
    // Node prior to v10 had a very questionable implementation of
    // fs.lchown, which would always try to call fs.open on a directory
    // Fall back to fs.chown in those cases.
    if (!er || er.code !== 'EISDIR')
      cb(er)
    else
      fs.chown(path, uid, gid, cb)
  }
  : (_: string, __: string, ___: string, cb: string) => cb

/* istanbul ignore next */
const handleEISDirSync: Function =
  needEISDIRHandled ? (path: string, uid: string, gid: string) => {
    try {
      return lchownSync(path, uid, gid)
    } catch (er) {
      if (er.code !== 'EISDIR')
        throw er
      chownSync(path, uid, gid)
    }
  }
  : (path: string, uid: string, gid: string) => lchownSync(path, uid, gid)

// fs.readdir could only accept an options object as of node v6
const nodeVersion: Function = process.version
let readdir: Function = (path: string, options: object, cb: string) => fs.readdir(path, options, cb)
let readdirSync: Function = (path: string, options: object) => fs.readdirSync(path, options)
/* istanbul ignore next */
if (/^v4\./.test(nodeVersion))
  readdir = (path: string, options: object, cb: string) => fs.readdir(path, cb)

const chown: Function = (cpath: string, uid: string, gid: string, cb: Function) => {
  fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, (er: object) => {
    // Skip ENOENT error
    cb(er && er.code !== 'ENOENT' ? er : null)
  }))
}

const chownrKid: Function = (p: string, child: Function, uid: string, gid: string, cb: Function) => {
  if (typeof child === 'string')
    return fs.lstat(path.resolve(p, child), (er: object, stats: object) => {
      // Skip ENOENT error
      if (er)
        return cb(er.code !== 'ENOENT' ? er : null)
      stats.name = child
      chownrKid(p, stats, uid, gid, cb)
    })

  if (child.isDirectory()) {
    chownr(path.resolve(p, child.name), uid, gid, (er: string) => {
      if (er)
        return cb(er)
      const cpath: string = path.resolve(p, child.name)
      chown(cpath, uid, gid, cb)
    })
  } else {
    const cpath: string = path.resolve(p, child.name)
    chown(cpath, uid, gid, cb)
  }
}


const chownr: Function = (p: string, uid: string, gid: string, cb: Function) => {
  readdir(p, { withFileTypes: true }, (er: object, children: any[]) => {
    // any error other than ENOTDIR or ENOTSUP means it's not readable,
    // or doesn't exist.  give up.
    if (er) {
      if (er.code === 'ENOENT')
        return cb()
      else if (er.code !== 'ENOTDIR' && er.code !== 'ENOTSUP')
        return cb(er)
    }
    if (er || !children.length)
      return chown(p, uid, gid, cb)

    let len: number = children.length
    let errState: string = null
    const then: Function = (er: boolean) => {
      if (errState)
        return
      if (er)
        return cb(errState = er)
      if (-- len === 0)
        return chown(p, uid, gid, cb)
    }

    children.forEach((child: object) => chownrKid(p, child, uid, gid, then))
  })
}

const chownrKidSync: Function = (p: string, child: Function, uid: string, gid: string) => {
  if (typeof child === 'string') {
    try {
      const stats: any[] = fs.lstatSync(path.resolve(p, child))
      stats.name = child
      child = stats
    } catch (er) {
      if (er.code === 'ENOENT')
        return
      else
        throw er
    }
  }

  if (child.isDirectory())
    chownrSync(path.resolve(p, child.name), uid, gid)

  handleEISDirSync(path.resolve(p, child.name), uid, gid)
}

const chownrSync: Function = (p: string, uid: string, gid: string) => {
  let children: any[]
  try {
    children = readdirSync(p, { withFileTypes: true })
  } catch (er) {
    if (er.code === 'ENOENT')
      return
    else if (er.code === 'ENOTDIR' || er.code === 'ENOTSUP')
      return handleEISDirSync(p, uid, gid)
    else
      throw er
  }

  if (children && children.length)
    children.forEach((child: object) => chownrKidSync(p, child, uid, gid))

  return handleEISDirSync(p, uid, gid)
}

export default chownr;
chownr.sync = chownrSync
