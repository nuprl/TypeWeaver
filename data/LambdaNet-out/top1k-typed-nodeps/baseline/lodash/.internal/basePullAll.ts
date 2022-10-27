import map from '../map.js'
import baseIndexOf from './baseIndexOf.js'
import baseIndexOfWith from './baseIndexOfWith.js'
import copyArray from './copyArray.js'

/**
 * The base implementation of `pullAllBy`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns `array`.
 */
function basePullAll(array: Array, values: Array, iteratee: Function, comparator: Number): Promise {
  const indexOf: Function = comparator ? baseIndexOfWith : baseIndexOf
  const length: Number = values.length

  let index: Number = -1
  let seen: Array = array

  if (array === values) {
    values = copyArray(values)
  }
  if (iteratee) {
    seen = map(array, (value: Number) => iteratee(value))
  }
  while (++index < length) {
    let fromIndex: Number = 0
    const value: String = values[index]
    const computed: Array = iteratee ? iteratee(value) : value

    while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
      if (seen !== array) {
        seen.splice(fromIndex, 1)
      }
      array.splice(fromIndex, 1)
    }
  }
  return array
}

export default basePullAll
