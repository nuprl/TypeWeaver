export default lte;
/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than or equal to
 *  `other`, else `false`.
 * @see gt, gte, lt
 * @example
 *
 * lte(1, 3)
 * // => true
 *
 * lte(3, 3)
 * // => true
 *
 * lte(3, 1)
 * // => false
 */
declare function lte(value: any, other: any): boolean;
