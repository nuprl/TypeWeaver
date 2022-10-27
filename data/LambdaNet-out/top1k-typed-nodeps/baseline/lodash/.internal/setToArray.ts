/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set: Array): Object {
  let index: Number = -1
  const result: Object = new Array(set.size)

  set.forEach((value: String) => {
    result[++index] = value
  })
  return result
}

export default setToArray
