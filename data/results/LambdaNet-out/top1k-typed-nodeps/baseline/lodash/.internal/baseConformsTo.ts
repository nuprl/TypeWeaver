/**
 * The base implementation of `conformsTo` which accepts `props` to check.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */
function baseConformsTo(object: object, source: object, props: any[]): boolean {
  let length: number = props.length
  if (object == null) {
    return !length
  }
  object = Object(object)
  while (length--) {
    const key: string = props[length]
    const predicate: Function = source[key]
    const value: string = object[key]

    if ((value === undefined && !(key in object)) || !predicate(value)) {
      return false
    }
  }
  return true
}

export default baseConformsTo
