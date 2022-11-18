import { dirname } from 'path';

const findMade: Function = (opts: object, parent: string, path: string = undefined) => {
  // we never want the 'made' return value to be a root directory
  if (path === parent)
    return Promise.resolve()

  return opts.statAsync(parent).then(
    (st: any[]) => st.isDirectory() ? path : undefined, // will fail later
    (er: object) => er.code === 'ENOENT'
      ? findMade(opts, dirname(parent), parent)
      : undefined
  )
}

const findMadeSync: Function = (opts: HTMLElement, parent: string, path: string = undefined) => {
  if (path === parent)
    return undefined

  try {
    return opts.statSync(parent).isDirectory() ? path : undefined
  } catch (er) {
    return er.code === 'ENOENT'
      ? findMadeSync(opts, dirname(parent), parent)
      : undefined
  }
}

export default {findMade, findMadeSync};
