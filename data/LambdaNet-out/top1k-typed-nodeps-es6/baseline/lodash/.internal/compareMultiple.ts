import compareAscending from './compareAscending.js'

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
function compareMultiple(object: object, other: object, orders: any[]): number {
  let index: number = -1
  const objCriteria: any[] = object.criteria
  const othCriteria: object = other.criteria
  const length: number = objCriteria.length
  const ordersLength: number = orders.length

  while (++index < length) {
    const order: string = index < ordersLength ? orders[index] : null
    const cmpFn: Function = (order && typeof order === 'function') ? order: compareAscending
    const result: number = cmpFn(objCriteria[index], othCriteria[index])
    if (result) {
      if (order && typeof order !== 'function') {
        return result * (order == 'desc' ? -1 : 1)
      }
      return result
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index
}

export default compareMultiple
