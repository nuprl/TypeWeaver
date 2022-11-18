import baseAssignValue from './baseAssignValue.js'
import eq from '../eq.js'

/** Used to check objects for own properties. */
const hasOwnProperty: Function = Object.prototype.hasOwnProperty

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object: object, key: string, value: number): Void {
  const objValue: number = object[key]

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    if (value !== 0 || (1 / value) === (1 / objValue)) {
      baseAssignValue(object, key, value)
    }
  } else if (value === undefined && !(key in object)) {
    baseAssignValue(object, key, value)
  }
}

export default assignValue
