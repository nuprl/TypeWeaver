'use strict'

// This is adapted from https://github.com/normalize/mz
// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
import { fromCallback as u } from 'universalify';

import fs from 'graceful-fs';

const api: Array = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'close',
  'copyFile',
  'fchmod',
  'fchown',
  'fdatasync',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchmod',
  'lchown',
  'link',
  'lstat',
  'mkdir',
  'mkdtemp',
  'open',
  'opendir',
  'readdir',
  'readFile',
  'readlink',
  'realpath',
  'rename',
  'rm',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'writeFile'
].filter((key: String) => {
  // Some commands are not available on some systems. Ex:
  // fs.opendir was added in Node.js v12.12.0
  // fs.rm was added in Node.js v14.14.0
  // fs.lchown is not available on at least some Linux
  return typeof fs[key] === 'function'
})

// Export cloned fs:
Object.assign(exports, fs)

// Universalify async methods:
api.forEach((method: Array) => {
  export const method: String = u(fs[method]);
})

// We differ from mz/fs in that we still ship the old, broken, fs.exists()
// since we are a drop-in replacement for the native module
export const exists: Function = function (filename: String, callback: String) {
  if (typeof callback === 'function') {
    return fs.exists(filename, callback)
  }
  return new Promise((resolve: String) => {
    return fs.exists(filename, resolve)
  })
};

// fs.read(), fs.write(), & fs.writev() need special treatment due to multiple callback args

export const read: Function = function (fd: String, buffer: Object, offset: String, length: String, position: Number, callback: String) {
  if (typeof callback === 'function') {
    return fs.read(fd, buffer, offset, length, position, callback)
  }
  return new Promise((resolve: Function, reject: Function) => {
    fs.read(fd, buffer, offset, length, position, (err: String, bytesRead: String, buffer: Object) => {
      if (err) return reject(err)
      resolve({ bytesRead, buffer })
    })
  })
};

// Function signature can be
// fs.write(fd, buffer[, offset[, length[, position]]], callback)
// OR
// fs.write(fd, string[, position[, encoding]], callback)
// We need to handle both cases, so we use ...args
export const write: Function = function (fd: String, buffer: Object, ...args) {
  if (typeof args[args.length - 1] === 'function') {
    return fs.write(fd, buffer, ...args)
  }

  return new Promise((resolve: Function, reject: Function) => {
    fs.write(fd, buffer, ...args, (err: String, bytesWritten: String, buffer: Object) => {
      if (err) return reject(err)
      resolve({ bytesWritten, buffer })
    })
  })
};

// fs.writev only available in Node v12.9.0+
if (typeof fs.writev === 'function') {
  // Function signature is
  // s.writev(fd, buffers[, position], callback)
  // We need to handle the optional arg, so we use ...args
  export const writev: Function = function (fd: String, buffers: String, ...args) {
    if (typeof args[args.length - 1] === 'function') {
      return fs.writev(fd, buffers, ...args)
    }

    return new Promise((resolve: Function, reject: Function) => {
      fs.writev(fd, buffers, ...args, (err: String, bytesWritten: String, buffers: Number) => {
        if (err) return reject(err)
        resolve({ bytesWritten, buffers })
      })
    })
  };
}

// fs.realpath.native sometimes not available if fs is monkey-patched
if (typeof fs.realpath.native === 'function') {
  exports.realpath.native = u(fs.realpath.native)
} else {
  process.emitWarning(
    'fs.realpath.native is not a function. Is fs being monkey-patched?',
    'Warning', 'fs-extra-WARN0003'
  )
}
