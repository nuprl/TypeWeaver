/** Used to compose unicode character classes. */
const rsAstralRange: string = '\\ud800-\\udfff'
const rsComboMarksRange: string = '\\u0300-\\u036f'
const reComboHalfMarksRange: string = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange: string = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange: string = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange: string = '\\u1dc0-\\u1dff'
const rsComboRange: string = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange
const rsDingbatRange: string = '\\u2700-\\u27bf'
const rsLowerRange: string = 'a-z\\xdf-\\xf6\\xf8-\\xff'
const rsMathOpRange: string = '\\xac\\xb1\\xd7\\xf7'
const rsNonCharRange: string = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf'
const rsPunctuationRange: string = '\\u2000-\\u206f'
const rsSpaceRange: string = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000'
const rsUpperRange: string = 'A-Z\\xc0-\\xd6\\xd8-\\xde'
const rsVarRange: string = '\\ufe0e\\ufe0f'
const rsBreakRange: string = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange

/** Used to compose unicode capture groups. */
const rsApos: string = "['\u2019]"
const rsBreak: string = `[${rsBreakRange}]`
const rsCombo: string = `[${rsComboRange}]`
const rsDigit: string = '\\d'
const rsDingbat: string = `[${rsDingbatRange}]`
const rsLower: string = `[${rsLowerRange}]`
const rsMisc: string = `[^${rsAstralRange}${rsBreakRange + rsDigit + rsDingbatRange + rsLowerRange + rsUpperRange}]`
const rsFitz: string = '\\ud83c[\\udffb-\\udfff]'
const rsModifier: string = `(?:${rsCombo}|${rsFitz})`
const rsNonAstral: string = `[^${rsAstralRange}]`
const rsRegional: string = '(?:\\ud83c[\\udde6-\\uddff]){2}'
const rsSurrPair: string = '[\\ud800-\\udbff][\\udc00-\\udfff]'
const rsUpper: string = `[${rsUpperRange}]`
const rsZWJ: string = '\\u200d'

/** Used to compose unicode regexes. */
const rsMiscLower: string = `(?:${rsLower}|${rsMisc})`
const rsMiscUpper: string = `(?:${rsUpper}|${rsMisc})`
const rsOptContrLower: string = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`
const rsOptContrUpper: string = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`
const reOptMod: string = `${rsModifier}?`
const rsOptVar: string = `[${rsVarRange}]?`
const rsOptJoin: string = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
const rsOrdLower: string = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])'
const rsOrdUpper: string = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])'
const rsSeq: string = rsOptVar + reOptMod + rsOptJoin
const rsEmoji: string = `(?:${[rsDingbat, rsRegional, rsSurrPair].join('|')})${rsSeq}`

const reUnicodeWords: number = RegExp([
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
function unicodeWords(string: string): any[] {
  return string.match(reUnicodeWords)
}

export default unicodeWords
