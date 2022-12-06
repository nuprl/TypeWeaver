// Based on https://github.com/lodash/lodash/blob/6018350ac10d5ce6a5b7db625140b82aeab804df/.internal/unicodeSize.js

export default function charRegex(): void {
	// Unicode character classes
	const astralRange: RegExp = '\\ud800-\\udfff';
	const comboMarksRange: RegExp = '\\u0300-\\u036f';
	const comboHalfMarksRange: RegExp = '\\ufe20-\\ufe2f';
	const comboSymbolsRange: RegExp = '\\u20d0-\\u20ff';
	const comboMarksExtendedRange: RegExp = '\\u1ab0-\\u1aff';
	const comboMarksSupplementRange: RegExp = '\\u1dc0-\\u1dff';
	const comboRange: string = comboMarksRange + comboHalfMarksRange + comboSymbolsRange + comboMarksExtendedRange + comboMarksSupplementRange;
	const varRange: RegExp = '\\ufe0e\\ufe0f';

	// Telugu characters
	const teluguVowels: RegExp = '\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c14\\u0c60-\\u0c61';
	const teluguVowelsDiacritic: RegExp = '\\u0c3e-\\u0c44\\u0c46-\\u0c48\\u0c4a-\\u0c4c\\u0c62-\\u0c63';
	const teluguConsonants: RegExp = '\\u0c15-\\u0c28\\u0c2a-\\u0c39';
	const teluguConsonantsRare: RegExp = '\\u0c58-\\u0c5a';
	const teluguModifiers: RegExp = '\\u0c01-\\u0c03\\u0c4d\\u0c55\\u0c56';
	const teluguNumerals: RegExp = '\\u0c66-\\u0c6f\\u0c78-\\u0c7e';
	const teluguSingle: string = `[${teluguVowels}(?:${teluguConsonants}(?!\\u0c4d))${teluguNumerals}${teluguConsonantsRare}]`;
	const teluguDouble: string = `[${teluguConsonants}${teluguConsonantsRare}][${teluguVowelsDiacritic}]|[${teluguConsonants}${teluguConsonantsRare}][${teluguModifiers}`;
	const teluguTriple: string = `[${teluguConsonants}]\\u0c4d[${teluguConsonants}]`;
	const telugu: string = `(?:${teluguTriple}|${teluguDouble}|${teluguSingle})`;

	// Unicode capture groups
	const astral: string = `[${astralRange}]`;
	const combo: any = `[${comboRange}]`;
	const fitz: RegExp = '\\ud83c[\\udffb-\\udfff]';
	const modifier: string = `(?:${combo}|${fitz})`;
	const nonAstral: string = `[^${astralRange}]`;
	const regional: RegExp = '(?:\\ud83c[\\udde6-\\uddff]){2}';
	const surrogatePair: RegExp = '[\\ud800-\\udbff][\\udc00-\\udfff]';
	const zeroWidthJoiner: RegExp = '\\u200d';
	const blackFlag: RegExp = '(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)';

	// Unicode regexes
	const optModifier: string = `${modifier}?`;
	const optVar: string = `[${varRange}]?`;
	const optJoin: string = `(?:${zeroWidthJoiner}(?:${[nonAstral, regional, surrogatePair].join('|')})${optVar + optModifier})*`;
	const seq: string = optVar + optModifier + optJoin;
	const nonAstralCombo: string = `${nonAstral}${combo}?`;
	const symbol = `(?:${[blackFlag, nonAstralCombo, combo, regional, surrogatePair, astral].join('|')})`;

	// Match string symbols (https://mathiasbynens.be/notes/javascript-unicode)
	return new RegExp(`${fitz}(?=${fitz})|${telugu}|${symbol + seq}`, 'g');
}
