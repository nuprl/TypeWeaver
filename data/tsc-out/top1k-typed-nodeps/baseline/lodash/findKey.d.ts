export default findKey;
/**
 * This method is like `find` except that it returns the key of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @since 1.1.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @see find, findIndex, findLast, findLastIndex, findLastKey
 * @example
 *
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * }
 *
 * findKey(users, ({ age }) => age < 40)
 * // => 'barney' (iteration order is not guaranteed)
 */
declare function findKey(object: any, predicate: Function): string | undefined;
