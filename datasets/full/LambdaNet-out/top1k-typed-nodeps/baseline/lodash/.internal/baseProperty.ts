/**
 * The base implementation of `property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key: string): Function {
  return (object: object) => object == null ? undefined : object[key]
}

export default baseProperty
