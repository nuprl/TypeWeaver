export default gte;
/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than or equal to
 *  `other`, else `false`.
 * @see gt, lt, lte
 * @example
 *
 * gte(3, 1)
 * // => true
 *
 * gte(3, 3)
 * // => true
 *
 * gte(1, 3)
 * // => false
 */
declare function gte(value: any, other: any): boolean;
