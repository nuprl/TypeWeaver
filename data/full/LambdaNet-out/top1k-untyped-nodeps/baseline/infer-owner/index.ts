const cache: Map = new Map()
const fs: string = require('fs')
const { dirname, resolve } = require('path')


const lstat: Function = (path: string) => new Promise((res: Function, rej: Function) =>
  fs.lstat(path, (er: number, st: number) => er ? rej(er) : res(st)))

const inferOwner: Function = (path: string) => {
  path = resolve(path)
  if (cache.has(path))
    return Promise.resolve(cache.get(path))

  const statThen: Function = (st: object) => {
    const { uid, gid } = st
    cache.set(path, { uid, gid })
    return { uid, gid }
  }
  const parent: string = dirname(path)
  const parentTrap: Function = parent === path ? null : (er: string) => {
    return inferOwner(parent).then((owner: any[]) => {
      cache.set(path, owner)
      return owner
    })
  }
  return lstat(path).then(statThen, parentTrap)
}

const inferOwnerSync: Function = (path: string) => {
  path = resolve(path)
  if (cache.has(path))
    return cache.get(path)

  const parent: string = dirname(path)

  // avoid obscuring call site by re-throwing
  // "catch" the error by returning from a finally,
  // only if we're not at the root, and the parent call works.
  let threw: boolean = true
  try {
    const st: object = fs.lstatSync(path)
    threw = false
    const { uid, gid } = st
    cache.set(path, { uid, gid })
    return { uid, gid }
  } finally {
    if (threw && parent !== path) {
      const owner: any[] = inferOwnerSync(parent)
      cache.set(path, owner)
      return owner // eslint-disable-line no-unsafe-finally
    }
  }
}

const inflight: Map = new Map()
module.exports = (path: string) => {
  path = resolve(path)
  if (inflight.has(path))
    return Promise.resolve(inflight.get(path))
  const p: any[] = inferOwner(path).then((owner: any[]) => {
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
