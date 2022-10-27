import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from './cacheHas.js'

/**
 * The base implementation of methods like `intersection` that accepts an
 * array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays: Array, iteratee: Function, comparator: Number): Array {
  const includes: Function = comparator ? arrayIncludesWith : arrayIncludes
  const length: Number = arrays[0].length
  const othLength: Number = arrays.length
  const caches: Object = new Array(othLength)
  const result: Array = []

  let array: Array
  let maxLength: Number = Infinity
  let othIndex: Number = othLength

  while (othIndex--) {
    array = arrays[othIndex]
    if (othIndex && iteratee) {
      array = map(array, (value: Number) => iteratee(value))
    }
    maxLength = Math.min(array.length, maxLength)
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined
  }
  array = arrays[0]

  let index: Number = -1
  const seen: Array = caches[0]

  outer:
  while (++index < length && result.length < maxLength) {
    let value: Number = array[index]
    const computed: Number = iteratee ? iteratee(value) : value

    value = (comparator || value !== 0) ? value : 0
    if (!(seen
      ? cacheHas(seen, computed)
      : includes(result, computed, comparator)
    )) {
      othIndex = othLength
      while (--othIndex) {
        const cache: ListCache = caches[othIndex]
        if (!(cache
          ? cacheHas(cache, computed)
          : includes(arrays[othIndex], computed, comparator))
        ) {
          continue outer
        }
      }
      if (seen) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}

export default baseIntersection
