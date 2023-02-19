import getTag from './.internal/getTag.js'
import nodeTypes from './.internal/nodeTypes.js'
import isObjectLike from './isObjectLike.js'

/* Node.js helper references. */
const nodeIsSet: Function = nodeTypes && nodeTypes.isSet

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * isSet(new Set)
 * // => true
 *
 * isSet(new WeakSet)
 * // => false
 */
const isSet: Function = nodeIsSet
  ? (value: string) => nodeIsSet(value)
  : (value: string) => isObjectLike(value) && getTag(value) == '[object Set]'

export default isSet
