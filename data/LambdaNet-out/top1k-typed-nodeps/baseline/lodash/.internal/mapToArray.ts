/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map: Array): Object {
  let index: Number = -1
  const result: Object = new Array(map.size)

  map.forEach((value: String, key: String) => {
    result[++index] = [key, value]
  })
  return result
}

export default mapToArray
