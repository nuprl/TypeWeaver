const {dirname} = require('path')
const {findMade, findMadeSync} = require('./find-made.js')
const {mkdirpManual, mkdirpManualSync} = require('./mkdirp-manual.js')

const mkdirpNative: Function = (path: string, opts: HTMLElement) => {
  opts.recursive = true
  const parent: string = dirname(path)
  if (parent === path)
    return opts.mkdirAsync(path, opts)

  return findMade(opts, path).then((made: any[]) =>
    opts.mkdirAsync(path, opts).then(() => made)
    .catch((er: object) => {
      if (er.code === 'ENOENT')
        return mkdirpManual(path, opts)
      else
        throw er
    }))
}

const mkdirpNativeSync: Function = (path: string, opts: HTMLElement) => {
  opts.recursive = true
  const parent: string = dirname(path)
  if (parent === path)
    return opts.mkdirSync(path, opts)

  const made: boolean = findMadeSync(opts, path)
  try {
    opts.mkdirSync(path, opts)
    return made
  } catch (er) {
    if (er.code === 'ENOENT')
      return mkdirpManualSync(path, opts)
    else
      throw er
  }
}

module.exports = {mkdirpNative, mkdirpNativeSync}
