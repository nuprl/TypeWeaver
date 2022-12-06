import baseUnset from './baseUnset.js'
import isIndex from './isIndex.js'

/**
 * The base implementation of `pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
function basePullAt(array: any[], indexes: any[]): Promise {
  let length: number = array ? indexes.length : 0
  const lastIndex: number = length - 1

  while (length--) {
    let previous: Function
    const index: string = indexes[length]
    if (length === lastIndex || index !== previous) {
      previous = index
      if (isIndex(index)) {
        array.splice(index, 1)
      } else {
        baseUnset(array, index)
      }
    }
  }
  return array
}

export default basePullAt
