import baseDifference from './baseDifference.js'
import baseFlatten from './baseFlatten.js'
import baseUniq from './baseUniq.js'

/**
 * The base implementation of methods like `xor` which accepts an array of
 * arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(arrays: Array, iteratee: String, comparator: String): Array {
  const length: Number = arrays.length
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : []
  }
  let index: Number = -1
  const result: Object = new Array(length)

  while (++index < length) {
    const array: ListCache = arrays[index]
    let othIndex: Number = -1

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator)
}

export default baseXor
