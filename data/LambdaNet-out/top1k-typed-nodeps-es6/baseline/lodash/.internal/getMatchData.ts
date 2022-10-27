import isStrictComparable from './isStrictComparable.js'
import keys from '../keys.js'

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object: Object): Object {
  const result: Array = keys(object)
  let length: Number = result.length

  while (length--) {
    const key: String = result[length]
    const value: String = object[key]
    result[length] = [key, value, isStrictComparable(value)]
  }
  return result
}

export default getMatchData
