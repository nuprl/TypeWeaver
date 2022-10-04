const cache: any = new Map()
import fs from 'fs';
const { dirname, resolve } = require('path')


const lstat: any = (path: any) => new Promise((res: void, rej: void) =>
  fs.lstat(path, (er: any, st: any) => er ? rej(er) : res(st)))

const inferOwner: any = (path: any) => {
  path = resolve(path)
  if (cache.has(path))
    return Promise.resolve(cache.get(path))

  const statThen: any = (st: any) => {
    const { uid, gid } = st
    cache.set(path, { uid, gid })
    return { uid, gid }
  }
  const parent: any = dirname(path)
  const parentTrap: any = parent === path ? null : (er: any) => {
    return inferOwner(parent).then((owner: any) => {
      cache.set(path, owner)
      return owner
    })
  }
  return lstat(path).then(statThen, parentTrap)
}

const inferOwnerSync: any = (path: any) => {
  path = resolve(path)
  if (cache.has(path))
    return cache.get(path)

  const parent: any = dirname(path)

  // avoid obscuring call site by re-throwing
  // "catch" the error by returning from a finally,
  // only if we're not at the root, and the parent call works.
  let threw: boolean = true
  try {
    const st: any = fs.lstatSync(path)
    threw = false
    const { uid, gid } = st
    cache.set(path, { uid, gid })
    return { uid, gid }
  } finally {
    if (threw && parent !== path) {
      const owner: any = inferOwnerSync(parent)
      cache.set(path, owner)
      return owner // eslint-disable-line no-unsafe-finally
    }
  }
}

const inflight: any = new Map()
module.exports = (path: any) => {
  path = resolve(path)
  if (inflight.has(path))
    return Promise.resolve(inflight.get(path))
  const p: any = inferOwner(path).then((owner: any) => {
    inflight.delete(path)
    return owner
  })
  inflight.set(path, p)
  return p
}
module.exports.sync = inferOwnerSync
module.exports.clearCache = () => {
  cache.clear()
  inflight.clear()
}
