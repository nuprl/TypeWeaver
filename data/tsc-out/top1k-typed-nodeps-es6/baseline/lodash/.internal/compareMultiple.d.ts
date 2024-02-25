export default compareMultiple;
/**
 * Used by `orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {(string|function)[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
declare function compareMultiple(object: any, other: any, orders: (string | Function)[]): number;
