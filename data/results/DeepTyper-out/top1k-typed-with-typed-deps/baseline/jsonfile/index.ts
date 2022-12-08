let _fs: any
try {
  _fs = require('graceful-fs')
} catch (_) {
  _fs = require('fs')
}
const universalify: any = require('universalify')
const { stringify, stripBom } = require('./utils')

async function _readFile (file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options }
  }

  const fs: any = options.fs || _fs

  const shouldThrow: boolean = 'throws' in options ? options.throws : true

  let data: string = await universalify.fromCallback(fs.readFile)(file, options)

  data = stripBom(data)

  let obj: any
  try {
    obj = JSON.parse(data, options ? options.reviver : null)
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`
      throw err
    } else {
      return null
    }
  }

  return obj
}

const readFile: any = universalify.fromPromise(_readFile)

function readFileSync (file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options }
  }

  const fs: any = options.fs || _fs

  const shouldThrow: boolean = 'throws' in options ? options.throws : true

  try {
    let content: any = fs.readFileSync(file, options)
    content = stripBom(content)
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`
      throw err
    } else {
      return null
    }
  }
}

async function _writeFile (file, obj, options = {}) {
  const fs: any = options.fs || _fs

  const str: string = stringify(obj, options)

  await universalify.fromCallback(fs.writeFile)(file, str, options)
}

const writeFile: any = universalify.fromPromise(_writeFile)

function writeFileSync (file, obj, options = {}) {
  const fs: any = options.fs || _fs

  const str: string = stringify(obj, options)
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

const jsonfile: any = {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync
}

module.exports = jsonfile
