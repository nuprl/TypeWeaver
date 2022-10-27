/**
 * This base implementation of `zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */
function baseZipObject(props: Array, values: Array, assignFunc: Function): Array {
  let index: Number = -1
  const length: Number = props.length
  const valsLength: Number = values.length
  const result: Hash = {}

  while (++index < length) {
    const value: String = index < valsLength ? values[index] : undefined
    assignFunc(result, props[index], value)
  }
  return result
}

export default baseZipObject
