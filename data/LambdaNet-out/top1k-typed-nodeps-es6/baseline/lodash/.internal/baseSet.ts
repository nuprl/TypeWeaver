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
function baseSet(object: object, path: string, value: string, customizer: Function): any[] {
  if (!isObject(object)) {
    return object
  }
  path = castPath(path, object)

  const length: number = path.length
  const lastIndex: number = length - 1

  let index: number = -1
  let nested: object = object

  while (nested != null && ++index < length) {
    const key: string = toKey(path[index])
    let newValue: string = value

    if (index != lastIndex) {
      const objValue: string = nested[key]
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
