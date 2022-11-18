import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import cacheHas from './cacheHas.js'
import createSet from './createSet.js'
import setToArray from './setToArray.js'

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE: number = 200

/**
 * The base implementation of `uniqBy`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array: any[], iteratee: Function, comparator: number): any[] {
  let index: number = -1
  let includes: Function = arrayIncludes
  let isCommon: boolean = true

  const { length } = array
  const result: any[] = []
  let seen: any[] = result

  if (comparator) {
    isCommon = false
    includes = arrayIncludesWith
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    const set: string = iteratee ? null : createSet(array)
    if (set) {
      return setToArray(set)
    }
    isCommon = false
    includes = cacheHas
    seen = new SetCache
  }
  else {
    seen = iteratee ? [] : result
  }
  outer:
  while (++index < length) {
    let value: number = array[index]
    const computed: number = iteratee ? iteratee(value) : value

    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let seenIndex: number = seen.length
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer
        }
      }
      if (iteratee) {
        seen.push(computed)
      }
      result.push(value)
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}

export default baseUniq
