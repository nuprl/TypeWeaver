import castSlice from './castSlice.js'
import hasUnicode from './hasUnicode.js'
import stringToArray from './stringToArray.js'

/**
 * Creates a function like `lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName: String): Function {
  return (string: Array) => {
    if (!string) {
      return ''
    }

    const strSymbols: Object = hasUnicode(string)
      ? stringToArray(string)
      : undefined

    const chr: Object = strSymbols
      ? strSymbols[0]
      : string[0]

    const trailing: String = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1)

    return chr[methodName]() + trailing
  }
}

export default createCaseFirst
