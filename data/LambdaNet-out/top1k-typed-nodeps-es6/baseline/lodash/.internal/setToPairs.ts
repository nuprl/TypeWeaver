/**
 * Converts `set` to its value-value pairs.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the value-value pairs.
 */
function setToPairs(set: any[]): object {
  let index: number = -1
  const result: object = new Array(set.size)

  set.forEach((value: string) => {
    result[++index] = [value, value]
  })
  return result
}

export default setToPairs
