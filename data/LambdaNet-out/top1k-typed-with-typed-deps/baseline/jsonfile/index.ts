let _fs: number
try {
  _fs = require('graceful-fs')
} catch (_) {
  _fs = require('fs')
}
const universalify: string = require('universalify')
const { stringify, stripBom } = require('./utils')

async function _readFile (file: any[], options: object = {}): Map {
  if (typeof options === 'string') {
    options = { encoding: options }
  }

  const fs: boolean = options.fs || _fs

  const shouldThrow: boolean = 'throws' in options ? options.throws : true

  let data: object = await universalify.fromCallback(fs.readFile)(file, options)

  data = stripBom(data)

  let obj: object
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

const readFile: string = universalify.fromPromise(_readFile)

function readFileSync (file: string, options: object = {}): any[] {
  if (typeof options === 'string') {
    options = { encoding: options }
  }

  const fs: boolean = options.fs || _fs

  const shouldThrow: boolean = 'throws' in options ? options.throws : true

  try {
    let content: string = fs.readFileSync(file, options)
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

async function _writeFile (file: any[], obj: Element, options: Map = {}): Map {
  const fs: boolean = options.fs || _fs

  const str: string = stringify(obj, options)

  await universalify.fromCallback(fs.writeFile)(file, str, options)
}

const writeFile: string = universalify.fromPromise(_writeFile)

function writeFileSync (file: string, obj: string, options: object = {}): number {
  const fs: boolean = options.fs || _fs

  const str: string = stringify(obj, options)
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

const jsonfile: object = {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync
}

module.exports = jsonfile
