/*! https://mths.be/cssesc v<%= version %> by @mathias */
'use strict';

const object: Object = {};
const hasOwnProperty: Function = object.hasOwnProperty;
const merge: Function = (options: Object, defaults: Object) => {
	if (!options) {
		return defaults;
	}
	const result: Object = {};
	for (let key in defaults) {
		// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
		// only recognized option names are used.
		result[key] = hasOwnProperty.call(options, key)
			? options[key]
			: defaults[key];
	}
	return result;
};

const regexAnySingleEscape: RegExp = /<%= anySingleEscape %>/;
const regexSingleEscape: RegExp = /<%= singleEscapes %>/;
const regexAlwaysEscape: RegExp = /['"\\]/;
const regexExcessiveSpaces: RegExp = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;

// https://mathiasbynens.be/notes/css-escapes#css
const cssesc: Function = (string: String, options: Object) => {
	options = merge(options, cssesc.options);
	if (options.quotes != 'single' && options.quotes != 'double') {
		options.quotes = 'single';
	}
	const quote: String = options.quotes == 'double' ? '"' : '\'';
	const isIdentifier: Boolean = options.isIdentifier;

	const firstChar: String = string.charAt(0);
	let output: String = '';
	let counter: Number = 0;
	const length: Number = string.length;
	while (counter < length) {
		const character: String = string.charAt(counter++);
		let codePoint: Number = character.charCodeAt();
		let value: Number;
		// If it’s not a printable ASCII character…
		if (codePoint < 0x20 || codePoint > 0x7E) {
			if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
				// It’s a high surrogate, and there is a next character.
				const extra: Number = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // next character is low surrogate
					codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
				} else {
					// It’s an unmatched surrogate; only append this code unit, in case
					// the next code unit is the high surrogate of a surrogate pair.
					counter--;
				}
			}
			value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
		} else {
			if (options.escapeEverything) {
				if (regexAnySingleEscape.test(character)) {
					value = '\\' + character;
				} else {
					value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
				}
			} else if (/[\t\n\f\r\x0B]/.test(character)) {
				value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
			} else if (
				character == '\\' ||
				(
					!isIdentifier &&
					(
						(character == '"' && quote == character) ||
						(character == '\'' && quote == character)
					)
				) ||
				(isIdentifier && regexSingleEscape.test(character))
			) {
				value = '\\' + character;
			} else {
				value = character;
			}
		}
		output += value;
	}

	if (isIdentifier) {
		if (/^-[-\d]/.test(output)) {
			output = '\\-' + output.slice(1);
		} else if (/\d/.test(firstChar)) {
			output = '\\3' + firstChar + ' ' + output.slice(1);
		}
	}

	// Remove spaces after `\HEX` escapes that are not followed by a hex digit,
	// since they’re redundant. Note that this is only possible if the escape
	// sequence isn’t preceded by an odd number of backslashes.
	output = output.replace(regexExcessiveSpaces, function($0: Array, $1: Array, $2: Number) {
		if ($1 && $1.length % 2) {
			// It’s not safe to remove the space, so don’t.
			return $0;
		}
		// Strip the space.
		return ($1 || '') + $2;
	});

	if (!isIdentifier && options.wrap) {
		return quote + output + quote;
	}
	return output;
};

// Expose default options (so they can be overridden globally).
cssesc.options = {
	'escapeEverything': false,
	'isIdentifier': false,
	'quotes': 'single',
	'wrap': false
};

cssesc.version = '<%= version %>';

module.exports = cssesc;