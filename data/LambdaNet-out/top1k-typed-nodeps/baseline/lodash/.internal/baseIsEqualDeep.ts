import Stack from './Stack.js'
import equalArrays from './equalArrays.js'
import equalByTag from './equalByTag.js'
import equalObjects from './equalObjects.js'
import getTag from './getTag.js'
import isBuffer from '../isBuffer.js'
import isTypedArray from '../isTypedArray.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG: number = 1

/** `Object#toString` result references. */
const argsTag: string = '[object Arguments]'
const arrayTag: string = '[object Array]'
const objectTag: string = '[object Object]'

/** Used to check objects for own properties. */
const hasOwnProperty: Function = Object.prototype.hasOwnProperty

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object: object, other: object, bitmask: number, customizer: string, equalFunc: Function, stack: Stack): boolean {
  let objIsArr: boolean = Array.isArray(object)
  const othIsArr: boolean = Array.isArray(other)
  let objTag: string = objIsArr ? arrayTag : getTag(object)
  let othTag: string = othIsArr ? arrayTag : getTag(other)

  objTag = objTag == argsTag ? objectTag : objTag
  othTag = othTag == argsTag ? objectTag : othTag

  let objIsObj: boolean = objTag == objectTag
  const othIsObj: boolean = othTag == objectTag
  const isSameTag: boolean = objTag == othTag

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false
    }
    objIsArr = true
    objIsObj = false
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack)
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack)
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    const objIsWrapped: boolean = objIsObj && hasOwnProperty.call(object, '__wrapped__')
    const othIsWrapped: boolean = othIsObj && hasOwnProperty.call(other, '__wrapped__')

    if (objIsWrapped || othIsWrapped) {
      const objUnwrapped: any[] = objIsWrapped ? object.value() : object
      const othUnwrapped: string = othIsWrapped ? other.value() : other

      stack || (stack = new Stack)
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
    }
  }
  if (!isSameTag) {
    return false
  }
  stack || (stack = new Stack)
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack)
}

export default baseIsEqualDeep
