import castSlice from './.internal/castSlice.js'
import charsEndIndex from './.internal/charsEndIndex.js'
import charsStartIndex from './.internal/charsStartIndex.js'
import stringToArray from './.internal/stringToArray.js'

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trimEnd, trimStart
 * @example
 *
 * trim('  abc  ')
 * // => 'abc'
 *
 * trim('-_-abc-_-', '_-')
 * // => 'abc'
 */
function trim(string: String, chars: Number): String {
  if (string && chars === undefined) {
    return string.trim()
  }
  if (!string || !chars) {
    return (string || '')
  }
  const strSymbols: String = stringToArray(string)
  const chrSymbols: Array = stringToArray(chars)
  const start: String = charsStartIndex(strSymbols, chrSymbols)
  const end: String = charsEndIndex(strSymbols, chrSymbols) + 1

  return castSlice(strSymbols, start, end).join('')
}

export default trim
