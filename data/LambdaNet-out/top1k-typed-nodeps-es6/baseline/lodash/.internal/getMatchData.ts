import isStrictComparable from './isStrictComparable.js'
import keys from '../keys.js'

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object: object): object {
  const result: any[] = keys(object)
  let length: number = result.length

  while (length--) {
    const key: string = result[length]
    const value: string = object[key]
    result[length] = [key, value, isStrictComparable(value)]
  }
  return result
}

export default getMatchData
