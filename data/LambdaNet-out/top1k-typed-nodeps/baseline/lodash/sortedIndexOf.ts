import baseSortedIndex from './.internal/baseSortedIndex.js'
import eq from './eq.js'

/**
 * This method is like `indexOf` except that it performs a binary
 * search on a sorted `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * sortedIndexOf([4, 5, 5, 5, 6], 5)
 * // => 1
 */
function sortedIndexOf(array: Array, value: String): Number {
  const length: Number = array == null ? 0 : array.length
  if (length) {
    const index: Number = baseSortedIndex(array, value)
    if (index < length && eq(array[index], value)) {
      return index
    }
  }
  return -1
}

export default sortedIndexOf