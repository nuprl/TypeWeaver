/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator: Object): Array {
  let data: Object
  const result: Array = []

  while (!(data = iterator.next()).done) {
    result.push(data.value)
  }
  return result
}

export default iteratorToArray
