const UPPERCASE: RegExp = /[\p{Lu}]/u;
const LOWERCASE: RegExp = /[\p{Ll}]/u;
const LEADING_CAPITAL: RegExp = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER: RegExp = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS: RegExp = /[_.\- ]+/;

const LEADING_SEPARATORS: Object = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER: Object = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER: Object = new RegExp('\\d+' + IDENTIFIER.source, 'gu');

const preserveCamelCase: Function = (string: String, toLowerCase: Function, toUpperCase: Function) => {
	let isLastCharLower: Boolean = false;
	let isLastCharUpper: Boolean = false;
	let isLastLastCharUpper: Boolean = false;

	for (let index = 0; index < string.length; index++) {
		const character: String = string[index];

		if (isLastCharLower && UPPERCASE.test(character)) {
			string = string.slice(0, index) + '-' + string.slice(index);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			index++;
		} else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
			string = string.slice(0, index - 1) + '-' + string.slice(index - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
		}
	}

	return string;
};

const preserveConsecutiveUppercase: Function = (input: String, toLowerCase: Function) => {
	LEADING_CAPITAL.lastIndex = 0;

	return input.replace(LEADING_CAPITAL, (m1: Array) => toLowerCase(m1));
};

const postProcess: Function = (input: String, toUpperCase: Function) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;

	return input.replace(SEPARATORS_AND_IDENTIFIER, (_: Function, identifier: String) => toUpperCase(identifier))
		.replace(NUMBERS_AND_IDENTIFIER, (m: Array) => toUpperCase(m));
};

export default function camelCase(input: String, options: Object): String {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...options,
	};

	if (Array.isArray(input)) {
		input = input.map((x: String) => x.trim())
			.filter((x: Array) => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	const toLowerCase: Function = options.locale === false
		? (string: String) => string.toLowerCase()
		: (string: String) => string.toLocaleLowerCase(options.locale);

	const toUpperCase: Function = options.locale === false
		? (string: String) => string.toUpperCase()
		: (string: String) => string.toLocaleUpperCase(options.locale);

	if (input.length === 1) {
		if (SEPARATORS.test(input)) {
			return '';
		}

		return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}

	const hasUpperCase: Boolean = input !== toLowerCase(input);

	if (hasUpperCase) {
		input = preserveCamelCase(input, toLowerCase, toUpperCase);
	}

	input = input.replace(LEADING_SEPARATORS, '');
	input = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input, toLowerCase) : toLowerCase(input);

	if (options.pascalCase) {
		input = toUpperCase(input.charAt(0)) + input.slice(1);
	}

	return postProcess(input, toUpperCase);
}
