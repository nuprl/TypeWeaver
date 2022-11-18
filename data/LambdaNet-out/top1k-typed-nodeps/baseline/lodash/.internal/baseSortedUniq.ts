import eq from '../eq.js'

/**
 * The base implementation of `sortedUniq` and `sortedUniqBy`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseSortedUniq(array: any[], iteratee: Function): object {
  let seen: Function
  let index: number = -1
  let resIndex: number = 0

  const { length } = array
  const result: any[] = []

  while (++index < length) {
    const value: number = array[index], computed: string = iteratee ? iteratee(value) : value
    if (!index || !eq(computed, seen)) {
      seen = computed
      result[resIndex++] = value === 0 ? 0 : value
    }
  }
  return result
}

export default baseSortedUniq
