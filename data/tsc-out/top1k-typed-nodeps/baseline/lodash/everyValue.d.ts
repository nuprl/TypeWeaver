export default everyValue;
/**
 * Checks if `predicate` returns truthy for **all** properties of `object`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, key, object).
 *
 * **Note:** This method returns `true` for
 * [empty objects](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty objects.
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all properties pass the predicate check,
 *  else `false`.
 * @example
 *
 * everyValue({ 'a': 0, 'b': 'yes', 'c': false }, Boolean)
 * // => false
 */
declare function everyValue(object: any, predicate: Function): boolean;
