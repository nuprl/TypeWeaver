import get from '../get.js'

/**
 * The base implementation of `at` without support for individual paths.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {string[]} paths The property paths to pick.
 * @returns {Array} Returns the picked elements.
 */
function baseAt(object: Array, paths: Array): Object {
  let index: Number = -1
  const length: Number = paths.length
  const result: Object = new Array(length)
  const skip: Boolean = object == null

  while (++index < length) {
    result[index] = skip ? undefined : get(object, paths[index])
  }
  return result
}

export default baseAt
