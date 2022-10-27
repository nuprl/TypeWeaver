/** Built-in value references. */
const propertyIsEnumerable: Function = Object.prototype.propertyIsEnumerable

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeGetSymbols: Function = Object.getOwnPropertySymbols

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
function getSymbols(object: Number): Array {
  if (object == null) {
    return []
  }
  object = Object(object)
  return nativeGetSymbols(object).filter((symbol: String) => propertyIsEnumerable.call(object, symbol))
}

export default getSymbols
