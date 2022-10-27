/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER: Number = 9007199254740991

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH: Number = 4294967295

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument: (index).
 *
 * @since 0.1.0
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * times(3, String)
 * // => ['0', '1', '2']
 *
 *  times(4, () => 0)
 * // => [0, 0, 0, 0]
 */
function times(n: Number, iteratee: Function): Array {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return []
  }
  let index: Number = -1
  const length: Number = Math.min(n, MAX_ARRAY_LENGTH)
  const result: Object = new Array(length)
  while (++index < length) {
    result[index] = iteratee(index)
  }
  index = MAX_ARRAY_LENGTH
  n -= MAX_ARRAY_LENGTH
  while (++index < n) {
    iteratee(index)
  }
  return result
}

export default times
