/** Used to convert symbols to primitives and strings. */
const symbolValueOf: Function = Symbol.prototype.valueOf

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol: String): Boolean {
  return Object(symbolValueOf.call(symbol))
}

export default cloneSymbol
