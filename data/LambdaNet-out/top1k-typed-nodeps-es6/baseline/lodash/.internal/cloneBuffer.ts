import root from './root.js'

/** Detect free variable `exports`. */
const freeExports: Number = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
const freeModule: Object = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports: Boolean = freeModule && freeModule.exports === freeExports

/** Built-in value references. */
const Buffer: Element = moduleExports ? root.Buffer : undefined, allocUnsafe: Function = Buffer ? Buffer.allocUnsafe : undefined

/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer: Object, isDeep: Boolean): Stack {
  if (isDeep) {
    return buffer.slice()
  }
  const length: Function = buffer.length
  const result: String = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length)

  buffer.copy(result)
  return result
}

export default cloneBuffer
