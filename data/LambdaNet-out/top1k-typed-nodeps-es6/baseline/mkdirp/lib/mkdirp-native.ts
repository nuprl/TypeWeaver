import { dirname } from 'path';
import { findMade, findMadeSync } from './find-made.js';
import { mkdirpManual, mkdirpManualSync } from './mkdirp-manual.js';

const mkdirpNative: Function = (path: String, opts: Object) => {
  opts.recursive = true
  const parent: Number = dirname(path)
  if (parent === path)
    return opts.mkdirAsync(path, opts)

  return findMade(opts, path).then((made: Array) =>
    opts.mkdirAsync(path, opts).then(() => made)
    .catch((er: Object) => {
      if (er.code === 'ENOENT')
        return mkdirpManual(path, opts)
      else
        throw er
    }))
}

const mkdirpNativeSync: Function = (path: String, opts: HTMLElement) => {
  opts.recursive = true
  const parent: Number = dirname(path)
  if (parent === path)
    return opts.mkdirSync(path, opts)

  const made: Array = findMadeSync(opts, path)
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

export default {mkdirpNative, mkdirpNativeSync};
