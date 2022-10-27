import baseFlatten from './.internal/baseFlatten.js'

/** Used as references for various `Number` constants. */
const INFINITY: Number = 1 / 0

/**
 * Recursively flattens `array`.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flatten, flattenDepth
 * @example
 *
 * flattenDeep([1, [2, [3, [4]], 5]])
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(array: Array): Array {
  const length: Number = array == null ? 0 : array.length
  return length ? baseFlatten(array, INFINITY) : []
}

export default flattenDeep
