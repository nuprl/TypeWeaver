export default someValues;
/**
 * Checks if `predicate` returns truthy for **any** element of `object`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, key, object).
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * someValues({ 'a': 0, 'b': 'yes', 'c': false }, Boolean)
 * // => true
 */
declare function someValues(object: any, predicate: Function): boolean;
