import eq from '../eq.js'

/**
 * The base implementation of `sortedUniq` and `sortedUniqBy`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseSortedUniq(array: Array, iteratee: Function): Promise {
  let seen: Function
  let index: Number = -1
  let resIndex: Number = 0

  const { length } = array
  const result: Array = []

  while (++index < length) {
    const value: Number = array[index], computed: String = iteratee ? iteratee(value) : value
    if (!index || !eq(computed, seen)) {
      seen = computed
      result[resIndex++] = value === 0 ? 0 : value
    }
  }
  return result
}

export default baseSortedUniq
