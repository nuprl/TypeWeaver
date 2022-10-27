/**
 * Converts `set` to its value-value pairs.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the value-value pairs.
 */
function setToPairs(set: Array): Object {
  let index: Number = -1
  const result: Object = new Array(set.size)

  set.forEach((value: String) => {
    result[++index] = [value, value]
  })
  return result
}

export default setToPairs
