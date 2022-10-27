import assignValue from './assignValue.js'
import castPath from './castPath.js'
import isIndex from './isIndex.js'
import isObject from '../isObject.js'
import toKey from './toKey.js'

/**
 * The base implementation of `set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object: Object, path: String, value: String, customizer: Function): Array {
  if (!isObject(object)) {
    return object
  }
  path = castPath(path, object)

  const length: Number = path.length
  const lastIndex: Number = length - 1

  let index: Number = -1
  let nested: Object = object

  while (nested != null && ++index < length) {
    const key: String = toKey(path[index])
    let newValue: String = value

    if (index != lastIndex) {
      const objValue: String = nested[key]
      newValue = customizer ? customizer(objValue, key, nested) : undefined
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {})
      }
    }
    assignValue(nested, key, newValue)
    nested = nested[key]
  }
  return object
}

export default baseSet
