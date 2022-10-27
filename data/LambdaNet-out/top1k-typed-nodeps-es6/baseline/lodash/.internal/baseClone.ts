import Stack from './Stack.js'
import arrayEach from './arrayEach.js'
import assignValue from './assignValue.js'
import cloneBuffer from './cloneBuffer.js'
import copyArray from './copyArray.js'
import copyObject from './copyObject.js'
import cloneArrayBuffer from './cloneArrayBuffer.js'
import cloneDataView from './cloneDataView.js'
import cloneRegExp from './cloneRegExp.js'
import cloneSymbol from './cloneSymbol.js'
import cloneTypedArray from './cloneTypedArray.js'
import copySymbols from './copySymbols.js'
import copySymbolsIn from './copySymbolsIn.js'
import getAllKeys from './getAllKeys.js'
import getAllKeysIn from './getAllKeysIn.js'
import getTag from './getTag.js'
import initCloneObject from './initCloneObject.js'
import isBuffer from '../isBuffer.js'
import isObject from '../isObject.js'
import isTypedArray from '../isTypedArray.js'
import keys from '../keys.js'
import keysIn from '../keysIn.js'

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG: Number = 1
const CLONE_FLAT_FLAG: Number = 2
const CLONE_SYMBOLS_FLAG: Number = 4

/** `Object#toString` result references. */
const argsTag: String = '[object Arguments]'
const arrayTag: String = '[object Array]'
const boolTag: String = '[object Boolean]'
const dateTag: String = '[object Date]'
const errorTag: String = '[object Error]'
const mapTag: String = '[object Map]'
const numberTag: String = '[object Number]'
const objectTag: String = '[object Object]'
const regexpTag: String = '[object RegExp]'
const setTag: String = '[object Set]'
const stringTag: String = '[object String]'
const symbolTag: String = '[object Symbol]'
const weakMapTag: String = '[object WeakMap]'

const arrayBufferTag: String = '[object ArrayBuffer]'
const dataViewTag: String = '[object DataView]'
const float32Tag: String = '[object Float32Array]'
const float64Tag: String = '[object Float64Array]'
const int8Tag: String = '[object Int8Array]'
const int16Tag: String = '[object Int16Array]'
const int32Tag: String = '[object Int32Array]'
const uint8Tag: String = '[object Uint8Array]'
const uint8ClampedTag: String = '[object Uint8ClampedArray]'
const uint16Tag: String = '[object Uint16Array]'
const uint32Tag: String = '[object Uint32Array]'

/** Used to identify `toStringTag` values supported by `clone`. */
const cloneableTags: Object = {}
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true
cloneableTags[errorTag] = cloneableTags[weakMapTag] = false

/** Used to check objects for own properties. */
const hasOwnProperty: Function = Object.prototype.hasOwnProperty

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object: Function, tag: String, isDeep: Boolean): Object {
  const Ctor: Object = object.constructor
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object)

    case boolTag:
    case dateTag:
      return new Ctor(+object)

    case dataViewTag:
      return cloneDataView(object, isDeep)

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep)

    case mapTag:
      return new Ctor

    case numberTag:
    case stringTag:
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      return new Ctor

    case symbolTag:
      return cloneSymbol(object)
  }
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array: Array): Hash {
  const { length } = array
  const result: Hash = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}

/**
 * The base implementation of `clone` and `cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {number} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value: Array, bitmask: Number, customizer: Function, key: String, object: Boolean, stack: Stack): Array {
  let result: SetCache
  const isDeep: Boolean = bitmask & CLONE_DEEP_FLAG
  const isFlat: Number = bitmask & CLONE_FLAT_FLAG
  const isFull: Number = bitmask & CLONE_SYMBOLS_FLAG

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value)
  }
  if (result !== undefined) {
    return result
  }
  if (!isObject(value)) {
    return value
  }
  const isArr: Boolean = Array.isArray(value)
  const tag: String = getTag(value)
  if (isArr) {
    result = initCloneArray(value)
    if (!isDeep) {
      return copyArray(value, result)
    }
  } else {
    const isFunc: Boolean = typeof value === 'function'

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep)
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value)
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
          : copySymbols(value, Object.assign(result, value))
      }
    } else {
      if (isFunc || !cloneableTags[tag]) {
        return object ? value : {}
      }
      result = initCloneByTag(value, tag, isDeep)
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack)
  const stacked: Stack = stack.get(value)
  if (stacked) {
    return stacked
  }
  stack.set(value, result)

  if (tag == mapTag) {
    value.forEach((subValue: Number, key: String) => {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    return result
  }

  if (tag == setTag) {
    value.forEach((subValue: String) => {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
    })
    return result
  }

  if (isTypedArray(value)) {
    return result
  }

  const keysFunc: Function = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys)

  const props: Hash = isArr ? undefined : keysFunc(value)
  arrayEach(props || value, (subValue: String, key: String) => {
    if (props) {
      key = subValue
      subValue = value[key]
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
  })
  return result
}

export default baseClone
