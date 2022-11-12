const cache: Map = new Map()
const fs: String = require('fs')
const { dirname, resolve } = require('path')


const lstat: Function = (path: String) => new Promise((res: Function, rej: Function) =>
  fs.lstat(path, (er: Number, st: Array) => er ? rej(er) : res(st)))

const inferOwner: Function = (path: String) => {
  path = resolve(path)
  if (cache.has(path))
    return Promise.resolve(cache.get(path))

  const statThen: Function = (st: Object) => {
    const { uid, gid } = st
    cache.set(path, { uid, gid })
    return { uid, gid }
  }
  const parent: String = dirname(path)
  const parentTrap: Function = parent === path ? null : (er: String) => {
    return inferOwner(parent).then((owner: Array) => {
      cache.set(path, owner)
      return owner
    })
  }
  return lstat(path).then(statThen, parentTrap)
}

const inferOwnerSync: Function = (path: String) => {
  path = resolve(path)
  if (cache.has(path))
    return cache.get(path)

  const parent: String = dirname(path)

  // avoid obscuring call site by re-throwing
  // "catch" the error by returning from a finally,
  // only if we're not at the root, and the parent call works.
  let threw: Boolean = true
  try {
    const st: Object = fs.lstatSync(path)
    threw = false
    const { uid, gid } = st
    cache.set(path, { uid, gid })
    return { uid, gid }
  } finally {
    if (threw && parent !== path) {
      const owner: Array = inferOwnerSync(parent)
      cache.set(path, owner)
      return owner // eslint-disable-line no-unsafe-finally
    }
  }
}

const inflight: Map = new Map()
module.exports = (path: String) => {
  path = resolve(path)
  if (inflight.has(path))
    return Promise.resolve(inflight.get(path))
  const p: Array = inferOwner(path).then((owner: Array) => {
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
