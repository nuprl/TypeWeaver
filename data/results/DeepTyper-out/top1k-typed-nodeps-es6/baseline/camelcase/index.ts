const UPPERCASE: RegExp = /[\p{Lu}]/u;
const LOWERCASE: RegExp = /[\p{Ll}]/u;
const LEADING_CAPITAL: RegExp = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER: RegExp = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS: RegExp = /[_.\- ]+/;

const LEADING_SEPARATORS: RegExp = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER: RegExp = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER: RegExp = new RegExp('\\d+' + IDENTIFIER.source, 'gu');

const preserveCamelCase: string = (string, toLowerCase: string, toUpperCase: string) => {
	let isLastCharLower: boolean = false;
	let isLastCharUpper: boolean = false;
	let isLastLastCharUpper: boolean = false;

	for (let index = 0; index < string.length; index++) {
		const character: string = string[index];

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

const preserveConsecutiveUppercase: string = (input: string, toLowerCase: string) => {
	LEADING_CAPITAL.lastIndex = 0;

	return input.replace(LEADING_CAPITAL, (m1: string) => toLowerCase(m1));
};

const postProcess: string = (input: string, toUpperCase: string) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;

	return input.replace(SEPARATORS_AND_IDENTIFIER, (_: string, identifier: string) => toUpperCase(identifier))
		.replace(NUMBERS_AND_IDENTIFIER, (m: string) => toUpperCase(m));
};

export default function camelCase(input: string, options: any): string {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...options,
	};

	if (Array.isArray(input)) {
		input = input.map((x: string) => x.trim())
			.filter((x: string) => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	const toLowerCase: string = options.locale === false
		? string => string.toLowerCase()
		: string => string.toLocaleLowerCase(options.locale);

	const toUpperCase: string = options.locale === false
		? string => string.toUpperCase()
		: string => string.toLocaleUpperCase(options.locale);

	if (input.length === 1) {
		if (SEPARATORS.test(input)) {
			return '';
		}

		return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}

	const hasUpperCase: string = input !== toLowerCase(input);

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
