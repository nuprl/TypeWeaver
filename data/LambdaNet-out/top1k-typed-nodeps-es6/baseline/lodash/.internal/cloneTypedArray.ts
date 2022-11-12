import cloneArrayBuffer from './cloneArrayBuffer.js'

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray: Map, isDeep: Boolean): Stack {
  const buffer: Array = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
}

export default cloneTypedArray
