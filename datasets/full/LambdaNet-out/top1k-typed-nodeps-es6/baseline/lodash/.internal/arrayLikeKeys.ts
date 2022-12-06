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
function arrayLikeKeys(value: any[], inherited: number): any[] {
  const isArr: boolean = Array.isArray(value)
  const isArg: boolean = !isArr && isArguments(value)
  const isBuff: boolean = !isArr && !isArg && isBuffer(value)
  const isType: boolean = !isArr && !isArg && !isBuff && isTypedArray(value)
  const skipIndexes: boolean = isArr || isArg || isBuff || isType
  const length: number = value.length
  const result: any[] = new Array(skipIndexes ? length : 0)
  let index: number = skipIndexes ? -1 : length
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
