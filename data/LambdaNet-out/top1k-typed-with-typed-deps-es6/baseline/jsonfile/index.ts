let _fs: Number
try {
  _fs = require('graceful-fs')
} catch (_) {
  _fs = require('fs')
}
import universalify from 'universalify';
import { stringify, stripBom } from './utils';

async function _readFile (file: Array, options: Object = {}): Map {
  if (typeof options === 'string') {
    options = { encoding: options }
  }

  const fs: Boolean = options.fs || _fs

  const shouldThrow: Boolean = 'throws' in options ? options.throws : true

  let data: Object = await universalify.fromCallback(fs.readFile)(file, options)

  data = stripBom(data)

  let obj: Object
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

const readFile: String = universalify.fromPromise(_readFile)

function readFileSync (file: String, options: Object = {}): Array {
  if (typeof options === 'string') {
    options = { encoding: options }
  }

  const fs: Boolean = options.fs || _fs

  const shouldThrow: Boolean = 'throws' in options ? options.throws : true

  try {
    let content: String = fs.readFileSync(file, options)
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

async function _writeFile (file: Array, obj: Element, options: Map = {}): Map {
  const fs: Boolean = options.fs || _fs

  const str: String = stringify(obj, options)

  await universalify.fromCallback(fs.writeFile)(file, str, options)
}

const writeFile: String = universalify.fromPromise(_writeFile)

function writeFileSync (file: String, obj: Array, options: Object = {}): Number {
  const fs: Boolean = options.fs || _fs

  const str: String = stringify(obj, options)
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

const jsonfile: Object = {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync
}

export default jsonfile;
