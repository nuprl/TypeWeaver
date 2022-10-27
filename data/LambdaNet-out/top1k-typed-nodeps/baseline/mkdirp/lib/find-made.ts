const {dirname} = require('path')

const findMade: Function = (opts: Object, parent: String, path: String = undefined) => {
  // we never want the 'made' return value to be a root directory
  if (path === parent)
    return Promise.resolve()

  return opts.statAsync(parent).then(
    (st: Array) => st.isDirectory() ? path : undefined, // will fail later
    (er: Object) => er.code === 'ENOENT'
      ? findMade(opts, dirname(parent), parent)
      : undefined
  )
}

const findMadeSync: Function = (opts: HTMLElement, parent: String, path: String = undefined) => {
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

module.exports = {findMade, findMadeSync}
