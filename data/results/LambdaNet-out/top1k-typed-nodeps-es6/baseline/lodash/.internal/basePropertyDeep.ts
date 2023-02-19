import baseGet from './baseGet.js'

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path: string): Function {
  return (object: object) => baseGet(object, path)
}

export default basePropertyDeep
