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
function createCaseFirst(methodName: string): Function {
  return (string: any[]) => {
    if (!string) {
      return ''
    }

    const strSymbols: object = hasUnicode(string)
      ? stringToArray(string)
      : undefined

    const chr: object = strSymbols
      ? strSymbols[0]
      : string[0]

    const trailing: string = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1)

    return chr[methodName]() + trailing
  }
}

export default createCaseFirst
