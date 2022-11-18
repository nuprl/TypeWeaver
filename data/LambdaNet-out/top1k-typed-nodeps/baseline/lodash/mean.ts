import baseMean from './meanBy.js'

/**
 * Computes the mean of the values in `array`.
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mean.
 * @example
 *
 * mean([4, 2, 8, 6])
 * // => 5
 */
function mean(array: any[]): Stack {
  return baseMean(array, (value: string) => value)
}

export default mean
