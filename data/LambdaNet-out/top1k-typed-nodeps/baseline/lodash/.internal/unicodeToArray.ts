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
const rsAstral: String = `[${rsAstralRange}]`
const rsCombo: String = `[${rsComboRange}]`
const rsFitz: String = '\\ud83c[\\udffb-\\udfff]'
const rsModifier: String = `(?:${rsCombo}|${rsFitz})`
const rsNonAstral: String = `[^${rsAstralRange}]`
const rsRegional: String = '(?:\\ud83c[\\udde6-\\uddff]){2}'
const rsSurrPair: String = '[\\ud800-\\udbff][\\udc00-\\udfff]'
const rsZWJ: String = '\\u200d'

/** Used to compose unicode regexes. */
const reOptMod: String = `${rsModifier}?`
const rsOptVar: String = `[${rsVarRange}]?`
const rsOptJoin: String = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
const rsSeq: String = rsOptVar + reOptMod + rsOptJoin
const rsNonAstralCombo: String = `${rsNonAstral}${rsCombo}?`
const rsSymbol: String = `(?:${[rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|')})`

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
const reUnicode: Number = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, 'g')

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string: String): Boolean {
  return string.match(reUnicode) || []
}

export default unicodeToArray
