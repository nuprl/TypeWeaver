/** Used to compose unicode character classes. */
const rsAstralRange: string = '\\ud800-\\udfff'
const rsComboMarksRange: string = '\\u0300-\\u036f'
const reComboHalfMarksRange: string = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange: string = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange: string = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange: string = '\\u1dc0-\\u1dff'
const rsComboRange: string = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange
const rsVarRange: string = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
const rsZWJ: string = '\\u200d'

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
const reHasUnicode: number = RegExp(`[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`)

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string: string): boolean {
  return reHasUnicode.test(string)
}

export default hasUnicode
