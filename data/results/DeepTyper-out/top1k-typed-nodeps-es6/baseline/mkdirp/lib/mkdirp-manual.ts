import { dirname } from 'path';

const mkdirpManual: any = (path: string, opts: any, made: any) => {
  opts.recursive = false
  const parent: any = dirname(path)
  if (parent === path) {
    return opts.mkdirAsync(path, opts).catch((er: any) => {
      // swallowed by recursive implementation on posix systems
      // any other error is a failure
      if (er.code !== 'EISDIR')
        throw er
    })
  }

  return opts.mkdirAsync(path, opts).then(() => made || path, (er: any) => {
    if (er.code === 'ENOENT')
      return mkdirpManual(parent, opts)
        .then((made: any) => mkdirpManual(path, opts, made))
    if (er.code !== 'EEXIST' && er.code !== 'EROFS')
      throw er
    return opts.statAsync(path).then((st: any) => {
      if (st.isDirectory())
        return made
      else
        throw er
    }, () => { throw er })
  })
}

const mkdirpManualSync: any = (path: string, opts: any, made: any) => {
  const parent: any = dirname(path)
  opts.recursive = false

  if (parent === path) {
    try {
      return opts.mkdirSync(path, opts)
    } catch (er) {
      // swallowed by recursive implementation on posix systems
      // any other error is a failure
      if (er.code !== 'EISDIR')
        throw er
      else
        return
    }
  }

  try {
    opts.mkdirSync(path, opts)
    return made || path
  } catch (er) {
    if (er.code === 'ENOENT')
      return mkdirpManualSync(path, opts, mkdirpManualSync(parent, opts, made))
    if (er.code !== 'EEXIST' && er.code !== 'EROFS')
      throw er
    try {
      if (!opts.statSync(path).isDirectory())
        throw er
    } catch (_) {
      throw er
    }
  }
}

export default {mkdirpManual, mkdirpManualSync};
