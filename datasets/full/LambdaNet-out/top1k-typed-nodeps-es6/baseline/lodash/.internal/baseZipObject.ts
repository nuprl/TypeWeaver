/**
 * This base implementation of `zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */
function baseZipObject(props: any[], values: any[], assignFunc: Function): any[] {
  let index: number = -1
  const length: number = props.length
  const valsLength: number = values.length
  const result: any[] = {}

  while (++index < length) {
    const value: string = index < valsLength ? values[index] : undefined
    assignFunc(result, props[index], value)
  }
  return result
}

export default baseZipObject
