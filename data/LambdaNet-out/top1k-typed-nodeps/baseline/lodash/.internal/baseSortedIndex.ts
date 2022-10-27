import baseSortedIndexBy from './baseSortedIndexBy.js'
import isSymbol from '../isSymbol.js'

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH: Number = 4294967295
const HALF_MAX_ARRAY_LENGTH: Number = MAX_ARRAY_LENGTH >>> 1

/**
 * The base implementation of `sortedIndex` and `sortedLastIndex` which
 * performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndex(array: Array, value: Number, retHighest: Boolean): Number {
  let low: Number = 0
  let high: Number = array == null ? low : array.length

  if (typeof value === 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      const mid: Number = (low + high) >>> 1
      const computed: Number = array[mid]
      if (computed !== null && !isSymbol(computed) &&
          (retHighest ? (computed <= value) : (computed < value))) {
        low = mid + 1
      } else {
        high = mid
      }
    }
    return high
  }
  return baseSortedIndexBy(array, value, (value: String) => value, retHighest)
}

export default baseSortedIndex
