import baseSortedIndex from './.internal/baseSortedIndex.js'

/**
 * Uses a binary search to determine the lowest index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * sortedIndex([30, 50], 40)
 * // => 1
 */
function sortedIndex(array: ArrayLike<number>,  value: number) {
  return baseSortedIndex(array, value)
}

export default sortedIndex