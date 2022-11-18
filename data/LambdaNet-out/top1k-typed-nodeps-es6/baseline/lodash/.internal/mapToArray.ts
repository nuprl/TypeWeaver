/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map: any[]): object {
  let index: number = -1
  const result: object = new Array(map.size)

  map.forEach((value: string, key: string) => {
    result[++index] = [key, value]
  })
  return result
}

export default mapToArray
