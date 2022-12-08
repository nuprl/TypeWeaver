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
function baseXor(arrays: any[], iteratee: string, comparator: string): any[] {
  const length: number = arrays.length
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : []
  }
  let index: number = -1
  const result: object = new Array(length)

  while (++index < length) {
    const array: Hash = arrays[index]
    let othIndex: number = -1

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator)
}

export default baseXor
