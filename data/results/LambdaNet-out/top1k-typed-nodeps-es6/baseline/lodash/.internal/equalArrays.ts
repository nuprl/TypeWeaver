import SetCache from './SetCache.js'
import some from '../some.js'
import cacheHas from './cacheHas.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG: number = 1
const COMPARE_UNORDERED_FLAG: number = 2

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array: any[], other: any[], bitmask: number, customizer: Function, equalFunc: Function, stack: object): boolean {
  const isPartial: boolean = bitmask & COMPARE_PARTIAL_FLAG
  const arrLength: number = array.length
  const othLength: number = other.length

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false
  }
  // Assume cyclic values are equal.
  const stacked: Stack = stack.get(array)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  let index: number = -1
  let result: boolean = true
  const seen: any[] = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined

  stack.set(array, other)
  stack.set(other, array)

  // Ignore non-index properties.
  while (++index < arrLength) {
    let compared: number
    const arrValue: string = array[index]
    const othValue: string = other[index]

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack)
    }
    if (compared !== undefined) {
      if (compared) {
        continue
      }
      result = false
      break
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!some(other, (othValue: number, othIndex: string) => {
        if (!cacheHas(seen, othIndex) &&
          (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex)
        }
      })) {
        result = false
        break
      }
    } else if (!(
      arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
    )) {
      result = false
      break
    }
  }
  stack['delete'](array)
  stack['delete'](other)
  return result
}

export default equalArrays
