/** Used to compose unicode character classes. */
const rsAstralRange: String = '\\ud800-\\udfff'
const rsComboMarksRange: String = '\\u0300-\\u036f'
const reComboHalfMarksRange: String = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange: String = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange: String = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange: String = '\\u1dc0-\\u1dff'
const rsComboRange: String = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange
const rsDingbatRange: String = '\\u2700-\\u27bf'
const rsLowerRange: String = 'a-z\\xdf-\\xf6\\xf8-\\xff'
const rsMathOpRange: String = '\\xac\\xb1\\xd7\\xf7'
const rsNonCharRange: String = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf'
const rsPunctuationRange: String = '\\u2000-\\u206f'
const rsSpaceRange: String = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000'
const rsUpperRange: String = 'A-Z\\xc0-\\xd6\\xd8-\\xde'
const rsVarRange: String = '\\ufe0e\\ufe0f'
const rsBreakRange: String = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange

/** Used to compose unicode capture groups. */
const rsApos: String = "['\u2019]"
const rsBreak: String = `[${rsBreakRange}]`
const rsCombo: String = `[${rsComboRange}]`
const rsDigit: String = '\\d'
const rsDingbat: String = `[${rsDingbatRange}]`
const rsLower: String = `[${rsLowerRange}]`
const rsMisc: String = `[^${rsAstralRange}${rsBreakRange + rsDigit + rsDingbatRange + rsLowerRange + rsUpperRange}]`
const rsFitz: String = '\\ud83c[\\udffb-\\udfff]'
const rsModifier: String = `(?:${rsCombo}|${rsFitz})`
const rsNonAstral: String = `[^${rsAstralRange}]`
const rsRegional: String = '(?:\\ud83c[\\udde6-\\uddff]){2}'
const rsSurrPair: String = '[\\ud800-\\udbff][\\udc00-\\udfff]'
const rsUpper: String = `[${rsUpperRange}]`
const rsZWJ: String = '\\u200d'

/** Used to compose unicode regexes. */
const rsMiscLower: String = `(?:${rsLower}|${rsMisc})`
const rsMiscUpper: String = `(?:${rsUpper}|${rsMisc})`
const rsOptContrLower: String = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`
const rsOptContrUpper: String = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`
const reOptMod: String = `${rsModifier}?`
const rsOptVar: String = `[${rsVarRange}]?`
const rsOptJoin: String = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
const rsOrdLower: String = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])'
const rsOrdUpper: String = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])'
const rsSeq: String = rsOptVar + reOptMod + rsOptJoin
const rsEmoji: String = `(?:${[rsDingbat, rsRegional, rsSurrPair].join('|')})${rsSeq}`

const reUnicodeWords: Number = RegExp([
  `${rsUpper}?${rsLower}+${rsOptContrLower}(?=${[rsBreak, rsUpper, '$'].join('|')})`,
  `${rsMiscUpper}+${rsOptContrUpper}(?=${[rsBreak, rsUpper + rsMiscLower, '$'].join('|')})`,
  `${rsUpper}?${rsMiscLower}+${rsOptContrLower}`,
  `${rsUpper}+${rsOptContrUpper}`,
  rsOrdUpper,
  rsOrdLower,
  `${rsDigit}+`,
  rsEmoji
].join('|'), 'g')

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string: String): Array {
  return string.match(reUnicodeWords)
}

export default unicodeWords
