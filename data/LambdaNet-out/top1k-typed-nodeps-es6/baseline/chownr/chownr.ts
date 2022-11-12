'use strict'
import fs from 'fs';
import path from 'path';

/* istanbul ignore next */
const LCHOWN: String = fs.lchown ? 'lchown' : 'chown'
/* istanbul ignore next */
const LCHOWNSYNC: String = fs.lchownSync ? 'lchownSync' : 'chownSync'

/* istanbul ignore next */
const needEISDIRHandled: Boolean = fs.lchown &&
  !process.version.match(/v1[1-9]+\./) &&
  !process.version.match(/v10\.[6-9]/)

const lchownSync: Function = (path: String, uid: String, gid: String) => {
  try {
    return fs[LCHOWNSYNC](path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const chownSync: Function = (path: String, uid: String, gid: String) => {
  try {
    return fs.chownSync(path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const handleEISDIR: Function =
  needEISDIRHandled ? (path: String, uid: String, gid: String, cb: Function) => (er: Object) => {
    // Node prior to v10 had a very questionable implementation of
    // fs.lchown, which would always try to call fs.open on a directory
    // Fall back to fs.chown in those cases.
    if (!er || er.code !== 'EISDIR')
      cb(er)
    else
      fs.chown(path, uid, gid, cb)
  }
  : (_: String, __: String, ___: String, cb: String) => cb

/* istanbul ignore next */
const handleEISDirSync: Function =
  needEISDIRHandled ? (path: String, uid: String, gid: String) => {
    try {
      return lchownSync(path, uid, gid)
    } catch (er) {
      if (er.code !== 'EISDIR')
        throw er
      chownSync(path, uid, gid)
    }
  }
  : (path: String, uid: String, gid: String) => lchownSync(path, uid, gid)

// fs.readdir could only accept an options object as of node v6
const nodeVersion: Function = process.version
let readdir: Function = (path: String, options: Object, cb: String) => fs.readdir(path, options, cb)
let readdirSync: Function = (path: String, options: Object) => fs.readdirSync(path, options)
/* istanbul ignore next */
if (/^v4\./.test(nodeVersion))
  readdir = (path: String, options: Object, cb: String) => fs.readdir(path, cb)

const chown: Function = (cpath: String, uid: String, gid: String, cb: Function) => {
  fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, (er: Object) => {
    // Skip ENOENT error
    cb(er && er.code !== 'ENOENT' ? er : null)
  }))
}

const chownrKid: Function = (p: String, child: Function, uid: String, gid: String, cb: Function) => {
  if (typeof child === 'string')
    return fs.lstat(path.resolve(p, child), (er: Object, stats: Object) => {
      // Skip ENOENT error
      if (er)
        return cb(er.code !== 'ENOENT' ? er : null)
      stats.name = child
      chownrKid(p, stats, uid, gid, cb)
    })

  if (child.isDirectory()) {
    chownr(path.resolve(p, child.name), uid, gid, (er: String) => {
      if (er)
        return cb(er)
      const cpath: String = path.resolve(p, child.name)
      chown(cpath, uid, gid, cb)
    })
  } else {
    const cpath: String = path.resolve(p, child.name)
    chown(cpath, uid, gid, cb)
  }
}


const chownr: Function = (p: String, uid: String, gid: String, cb: Function) => {
  readdir(p, { withFileTypes: true }, (er: Object, children: Array) => {
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

    let len: Number = children.length
    let errState: String = null
    const then: Function = (er: Boolean) => {
      if (errState)
        return
      if (er)
        return cb(errState = er)
      if (-- len === 0)
        return chown(p, uid, gid, cb)
    }

    children.forEach((child: Object) => chownrKid(p, child, uid, gid, then))
  })
}

const chownrKidSync: Function = (p: String, child: Function, uid: String, gid: String) => {
  if (typeof child === 'string') {
    try {
      const stats: Array = fs.lstatSync(path.resolve(p, child))
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

const chownrSync: Function = (p: String, uid: String, gid: String) => {
  let children: Array
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
    children.forEach((child: Object) => chownrKidSync(p, child, uid, gid))

  return handleEISDirSync(p, uid, gid)
}

export default chownr;
chownr.sync = chownrSync
