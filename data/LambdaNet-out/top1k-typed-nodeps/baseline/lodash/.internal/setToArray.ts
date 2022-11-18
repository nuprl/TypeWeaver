/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set: any[]): object {
  let index: number = -1
  const result: object = new Array(set.size)

  set.forEach((value: string) => {
    result[++index] = value
  })
  return result
}

export default setToArray
