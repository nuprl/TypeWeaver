/**
 * The base implementation of `propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object: object): Function {
  return (key: string) => object == null ? undefined : object[key]
}

export default basePropertyOf
