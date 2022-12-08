import eq from '../eq.js'
import equalArrays from './equalArrays.js'
import mapToArray from './mapToArray.js'
import setToArray from './setToArray.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG: number = 1
const COMPARE_UNORDERED_FLAG: number = 2

/** `Object#toString` result references. */
const boolTag: string = '[object Boolean]'
const dateTag: string = '[object Date]'
const errorTag: string = '[object Error]'
const mapTag: string = '[object Map]'
const numberTag: string = '[object Number]'
const regexpTag: string = '[object RegExp]'
const setTag: string = '[object Set]'
const stringTag: string = '[object String]'
const symbolTag: string = '[object Symbol]'

const arrayBufferTag: string = '[object ArrayBuffer]'
const dataViewTag: string = '[object DataView]'

/** Used to convert symbols to primitives and strings. */
const symbolValueOf: Function = Symbol.prototype.valueOf

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object: object, other: object, tag: string, bitmask: number, customizer: number, equalFunc: Function, stack: object): boolean {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false
      }
      object = object.buffer
      other = other.buffer

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false
      }
      return true

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other)

    case errorTag:
      return object.name == other.name && object.message == other.message

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == `${other}`

    case mapTag:
      let convert: Function = mapToArray

    case setTag:
      const isPartial: boolean = bitmask & COMPARE_PARTIAL_FLAG
      convert || (convert = setToArray)

      if (object.size != other.size && !isPartial) {
        return false
      }
      // Assume cyclic values are equal.
      const stacked: string = stack.get(object)
      if (stacked) {
        return stacked == other
      }
      bitmask |= COMPARE_UNORDERED_FLAG

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other)
      const result: boolean = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack)
      stack['delete'](object)
      return result

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other)
      }
  }
  return false
}

export default equalByTag
