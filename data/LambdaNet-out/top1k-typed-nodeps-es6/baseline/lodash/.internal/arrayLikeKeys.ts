import isArguments from '../isArguments.js'
import isBuffer from '../isBuffer.js'
import isIndex from './isIndex.js'
import isTypedArray from '../isTypedArray.js'

/** Used to check objects for own properties. */
const hasOwnProperty: Function = Object.prototype.hasOwnProperty

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value: Array, inherited: Number): Array {
  const isArr: Boolean = Array.isArray(value)
  const isArg: Boolean = !isArr && isArguments(value)
  const isBuff: Boolean = !isArr && !isArg && isBuffer(value)
  const isType: Boolean = !isArr && !isArg && !isBuff && isTypedArray(value)
  const skipIndexes: Boolean = isArr || isArg || isBuff || isType
  const length: Number = value.length
  const result: Array = new Array(skipIndexes ? length : 0)
  let index: Number = skipIndexes ? -1 : length
  while (++index < length) {
    result[index] = `${index}`
  }
  for (const key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
        // Safari 9 has enumerable `arguments.length` in strict mode.
          (key === 'length' ||
           // Skip index properties.
           isIndex(key, length))
        ))) {
      result.push(key)
    }
  }
  return result
}

export default arrayLikeKeys
