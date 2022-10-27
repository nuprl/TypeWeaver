import isSymbol from '../isSymbol.js'

/** Used as references for various `Number` constants. */
const INFINITY: Number = 1 / 0

/** Used to convert symbols to primitives and strings. */
const symbolToString: String = Symbol.prototype.toString

/**
 * The base implementation of `toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value: Number): String {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map(baseToString)}`
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  const result: String = `${value}`
  return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result
}

export default baseToString
