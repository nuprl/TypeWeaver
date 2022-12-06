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
const rsAstral: string = `[${rsAstralRange}]`
const rsCombo: string = `[${rsComboRange}]`
const rsFitz: string = '\\ud83c[\\udffb-\\udfff]'
const rsModifier: string = `(?:${rsCombo}|${rsFitz})`
const rsNonAstral: string = `[^${rsAstralRange}]`
const rsRegional: string = '(?:\\ud83c[\\udde6-\\uddff]){2}'
const rsSurrPair: string = '[\\ud800-\\udbff][\\udc00-\\udfff]'
const rsZWJ: string = '\\u200d'

/** Used to compose unicode regexes. */
const reOptMod: string = `${rsModifier}?`
const rsOptVar: string = `[${rsVarRange}]?`
const rsOptJoin: string = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
const rsSeq: string = rsOptVar + reOptMod + rsOptJoin
const rsNonAstralCombo: string = `${rsNonAstral}${rsCombo}?`
const rsSymbol: string = `(?:${[rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|')})`

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
const reUnicode: number = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, 'g')

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string: string): boolean {
  return string.match(reUnicode) || []
}

export default unicodeToArray
