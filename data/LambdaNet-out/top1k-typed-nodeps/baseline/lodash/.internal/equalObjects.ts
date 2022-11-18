import getAllKeys from './getAllKeys.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG: number = 1

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
function equalObjects(object: object, other: object, bitmask: number, customizer: Function, equalFunc: Function, stack: object): boolean {
  const isPartial: number = bitmask & COMPARE_PARTIAL_FLAG
  const objProps: any[] = getAllKeys(object)
  const objLength: number = objProps.length
  const othProps: any[] = getAllKeys(other)
  const othLength: number = othProps.length

  if (objLength != othLength && !isPartial) {
    return false
  }
  let key: string
  let index: number = objLength
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
  let result: boolean = true
  stack.set(object, other)
  stack.set(other, object)

  let compared: number
  let skipCtor: number = isPartial
  while (++index < objLength) {
    key = objProps[index]
    const objValue: string = object[key]
    const othValue: string = other[key]

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
    const othCtor: string = other.constructor

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
