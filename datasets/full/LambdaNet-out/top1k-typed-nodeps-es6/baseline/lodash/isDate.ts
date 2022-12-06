import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'
import nodeTypes from './.internal/nodeTypes.js'

/* Node.js helper references. */
const nodeIsDate: Function = nodeTypes && nodeTypes.isDate

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
const isDate: Function = nodeIsDate
  ? (value: string) => nodeIsDate(value)
  : (value: string) => isObjectLike(value) && getTag(value) == '[object Date]'

export default isDate
