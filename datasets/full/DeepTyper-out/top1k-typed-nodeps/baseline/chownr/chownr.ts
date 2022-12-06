'use strict'
const fs: any = require('fs')
const path: any = require('path')

/* istanbul ignore next */
const LCHOWN: any = fs.lchown ? 'lchown' : 'chown'
/* istanbul ignore next */
const LCHOWNSYNC: any = fs.lchownSync ? 'lchownSync' : 'chownSync'

/* istanbul ignore next */
const needEISDIRHandled: any = fs.lchown &&
  !process.version.match(/v1[1-9]+\./) &&
  !process.version.match(/v10\.[6-9]/)

const lchownSync: any = (path: string, uid: string, gid: number) => {
  try {
    return fs[LCHOWNSYNC](path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const chownSync: string = (path: string, uid: string, gid: number) => {
  try {
    return fs.chownSync(path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const handleEISDIR: any =
  needEISDIRHandled ? (path: string, uid: string, gid: number, cb: any) => (er: any) => {
    // Node prior to v10 had a very questionable implementation of
    // fs.lchown, which would always try to call fs.open on a directory
    // Fall back to fs.chown in those cases.
    if (!er || er.code !== 'EISDIR')
      cb(er)
    else
      fs.chown(path, uid, gid, cb)
  }
  : (_: any, __: any, ___: any, cb: any) => cb

/* istanbul ignore next */
const handleEISDirSync: any =
  needEISDIRHandled ? (path: string, uid: string, gid: number) => {
    try {
      return lchownSync(path, uid, gid)
    } catch (er) {
      if (er.code !== 'EISDIR')
        throw er
      chownSync(path, uid, gid)
    }
  }
  : (path: string, uid: string, gid: number) => lchownSync(path, uid, gid)

// fs.readdir could only accept an options object as of node v6
const nodeVersion: any = process.version
let readdir: any = (path: string, options: any, cb: any) => fs.readdir(path, options, cb)
let readdirSync: any = (path: string, options: any) => fs.readdirSync(path, options)
/* istanbul ignore next */
if (/^v4\./.test(nodeVersion))
  readdir = (path: any, options: any, cb: any) => fs.readdir(path, cb)

const chown: void = (cpath: any, uid: string, gid: number, cb: any) => {
  fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, (er: any) => {
    // Skip ENOENT error
    cb(er && er.code !== 'ENOENT' ? er : null)
  }))
}

const chownrKid: any = (p: string, child: any, uid: string, gid: number, cb: any) => {
  if (typeof child === 'string')
    return fs.lstat(path.resolve(p, child), (er: any, stats: any) => {
      // Skip ENOENT error
      if (er)
        return cb(er.code !== 'ENOENT' ? er : null)
      stats.name = child
      chownrKid(p, stats, uid, gid, cb)
    })

  if (child.isDirectory()) {
    chownr(path.resolve(p, child.name), uid, gid, (er: any) => {
      if (er)
        return cb(er)
      const cpath: any = path.resolve(p, child.name)
      chown(cpath, uid, gid, cb)
    })
  } else {
    const cpath: any = path.resolve(p, child.name)
    chown(cpath, uid, gid, cb)
  }
}


const chownr: any = (p: string, uid: string, gid: number, cb: any) => {
  readdir(p, { withFileTypes: true }, (er: any, children: any) => {
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
    let errState: any = null
    const then: any = (er: any) => {
      if (errState)
        return
      if (er)
        return cb(errState = er)
      if (-- len === 0)
        return chown(p, uid, gid, cb)
    }

    children.forEach((child: any) => chownrKid(p, child, uid, gid, then))
  })
}

const chownrKidSync: any = (p: string, child: any, uid: string, gid: number) => {
  if (typeof child === 'string') {
    try {
      const stats: any = fs.lstatSync(path.resolve(p, child))
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

const chownrSync: any = (p: string, uid: string, gid: number) => {
  let children: any
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
    children.forEach((child: any) => chownrKidSync(p, child, uid, gid))

  return handleEISDirSync(p, uid, gid)
}

module.exports = chownr
chownr.sync = chownrSync
