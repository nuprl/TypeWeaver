/** Used to compose unicode character classes. */
const rsAstralRange: String = '\\ud800-\\udfff'
const rsComboMarksRange: String = '\\u0300-\\u036f'
const reComboHalfMarksRange: String = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange: String = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange: String = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange: String = '\\u1dc0-\\u1dff'
const rsComboRange: String = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange
const rsVarRange: String = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
const rsZWJ: String = '\\u200d'

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
const reHasUnicode: Number = RegExp(`[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`)

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string: String): Boolean {
  return reHasUnicode.test(string)
}

export default hasUnicode
