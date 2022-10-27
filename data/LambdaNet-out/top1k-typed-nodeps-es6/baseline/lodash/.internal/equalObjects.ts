import getAllKeys from './getAllKeys.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG: Number = 1

/** Used to check objects for own properties. */
const hasOwnProperty: Function = Object.prototype.hasOwnProperty

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object: Object, other: Object, bitmask: Number, customizer: Function, equalFunc: Function, stack: Object): Boolean {
  const isPartial: Number = bitmask & COMPARE_PARTIAL_FLAG
  const objProps: Array = getAllKeys(object)
  const objLength: Number = objProps.length
  const othProps: Array = getAllKeys(other)
  const othLength: Number = othProps.length

  if (objLength != othLength && !isPartial) {
    return false
  }
  let key: String
  let index: Number = objLength
  while (index--) {
    key = objProps[index]
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false
    }
  }
  // Assume cyclic values are equal.
  const stacked: Stack = stack.get(object)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  let result: Boolean = true
  stack.set(object, other)
  stack.set(other, object)

  let compared: Number
  let skipCtor: Number = isPartial
  while (++index < objLength) {
    key = objProps[index]
    const objValue: String = object[key]
    const othValue: String = other[key]

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack)
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
      ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
      : compared
    )) {
      result = false
      break
    }
    skipCtor || (skipCtor = key == 'constructor')
  }
  if (result && !skipCtor) {
    const objCtor: Function = object.constructor
    const othCtor: String = other.constructor

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor === 'function' && objCtor instanceof objCtor &&
          typeof othCtor === 'function' && othCtor instanceof othCtor)) {
      result = false
    }
  }
  stack['delete'](object)
  stack['delete'](other)
  return result
}

export default equalObjects
