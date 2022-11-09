'use strict';

const object: Object = {};
const hasOwnProperty: Function = object.hasOwnProperty;
const forOwn: Function = (object: Object, callback: Function) => {
	for (const key in object) {
		if (hasOwnProperty.call(object, key)) {
			callback(key, object[key]);
		}
	}
};

const extend: Function = (destination: Object, source: Number) => {
	if (!source) {
		return destination;
	}
	forOwn(source, (key: String, value: String) => {
		destination[key] = value;
	});
	return destination;
};

const forEach: Function = (array: Array, callback: Function) => {
	const length: Number = array.length;
	let index: Number = -1;
	while (++index < length) {
		callback(array[index]);
	}
};

const fourHexEscape: Function = (hex: String) => {
	return '\\u' + ('0000' + hex).slice(-4);
}

const hexadecimal: Function = (code: String, lowercase: Boolean) => {
	let hexadecimal: String = code.toString(16);
	if (lowercase) return hexadecimal;
	return hexadecimal.toUpperCase();
};

const toString: Function = object.toString;
const isArray: Function = Array.isArray;
const isBuffer: Function = (value: String) => {
	return typeof Buffer === 'function' && Buffer.isBuffer(value);
};
const isObject: Function = (value: String) => {
	// This is a very simple check, but it’s good enough for what we need.
	return toString.call(value) == '[object Object]';
};
const isString: Function = (value: String) => {
	return typeof value == 'string' ||
		toString.call(value) == '[object String]';
};
const isNumber: Function = (value: String) => {
	return typeof value == 'number' ||
		toString.call(value) == '[object Number]';
};
const isFunction: Function = (value: String) => {
	return typeof value == 'function';
};
const isMap: Function = (value: String) => {
	return toString.call(value) == '[object Map]';
};
const isSet: Function = (value: String) => {
	return toString.call(value) == '[object Set]';
};

/*--------------------------------------------------------------------------*/

// https://mathiasbynens.be/notes/javascript-escapes#single
const singleEscapes: Object = {
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t'
	// `\v` is omitted intentionally, because in IE < 9, '\v' == 'v'.
	// '\v': '\\x0B'
};
const regexSingleEscape: RegExp = /[\\\b\f\n\r\t]/;

const regexDigit: RegExp = /[0-9]/;
const regexWhitespace: RegExp = /<%= whitespace %>/;

const escapeEverythingRegex: RegExp = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g;
const escapeNonAsciiRegex: RegExp = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^<%= whitelist %>]/g;

const jsesc: Function = (argument: Array, options: HTMLElement) => {
	const increaseIndentation: Function = () => {
		oldIndent = indent;
		++options.indentLevel;
		indent = options.indent.repeat(options.indentLevel)
	};
	// Handle options
	const defaults: Object = {
		'escapeEverything': false,
		'minimal': false,
		'isScriptContext': false,
		'quotes': 'single',
		'wrap': false,
		'es6': false,
		'json': false,
		'compact': true,
		'lowercaseHex': false,
		'numbers': 'decimal',
		'indent': '\t',
		'indentLevel': 0,
		'__inline1__': false,
		'__inline2__': false
	};
	const json: Boolean = options && options.json;
	if (json) {
		defaults.quotes = 'double';
		defaults.wrap = true;
	}
	options = extend(defaults, options);
	if (
		options.quotes != 'single' &&
		options.quotes != 'double' &&
		options.quotes != 'backtick'
	) {
		options.quotes = 'single';
	}
	const quote: String = options.quotes == 'double' ?
		'"' :
		(options.quotes == 'backtick' ?
			'`' :
			'\''
		);
	const compact: Number = options.compact;
	const lowercaseHex: Number = options.lowercaseHex;
	let indent: String = options.indent.repeat(options.indentLevel);
	let oldIndent: String = '';
	const inline1: String = options.__inline1__;
	const inline2: Number = options.__inline2__;
	const newLine: String = compact ? '' : '\n';
	let result: String;
	let isEmpty: Boolean = true;
	const useBinNumbers: Boolean = options.numbers == 'binary';
	const useOctNumbers: Boolean = options.numbers == 'octal';
	const useDecNumbers: Boolean = options.numbers == 'decimal';
	const useHexNumbers: Boolean = options.numbers == 'hexadecimal';

	if (json && argument && isFunction(argument.toJSON)) {
		argument = argument.toJSON();
	}

	if (!isString(argument)) {
		if (isMap(argument)) {
			if (argument.size == 0) {
				return 'new Map()';
			}
			if (!compact) {
				options.__inline1__ = true;
				options.__inline2__ = false;
			}
			return 'new Map(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isSet(argument)) {
			if (argument.size == 0) {
				return 'new Set()';
			}
			return 'new Set(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isBuffer(argument)) {
			if (argument.length == 0) {
				return 'Buffer.from([])';
			}
			return 'Buffer.from(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isArray(argument)) {
			result = [];
			options.wrap = true;
			if (inline1) {
				options.__inline1__ = false;
				options.__inline2__ = true;
			}
			if (!inline2) {
				increaseIndentation();
			}
			forEach(argument, (value: String) => {
				isEmpty = false;
				if (inline2) {
					options.__inline2__ = false;
				}
				result.push(
					(compact || inline2 ? '' : indent) +
					jsesc(value, options)
				);
			});
			if (isEmpty) {
				return '[]';
			}
			if (inline2) {
				return '[' + result.join(', ') + ']';
			}
			return '[' + newLine + result.join(',' + newLine) + newLine +
				(compact ? '' : oldIndent) + ']';
		} else if (isNumber(argument)) {
			if (json) {
				// Some number values (e.g. `Infinity`) cannot be represented in JSON.
				return JSON.stringify(argument);
			}
			if (useDecNumbers) {
				return String(argument);
			}
			if (useHexNumbers) {
				let hexadecimal: String = argument.toString(16);
				if (!lowercaseHex) {
					hexadecimal = hexadecimal.toUpperCase();
				}
				return '0x' + hexadecimal;
			}
			if (useBinNumbers) {
				return '0b' + argument.toString(2);
			}
			if (useOctNumbers) {
				return '0o' + argument.toString(8);
			}
		} else if (!isObject(argument)) {
			if (json) {
				// For some values (e.g. `undefined`, `function` objects),
				// `JSON.stringify(value)` returns `undefined` (which isn’t valid
				// JSON) instead of `'null'`.
				return JSON.stringify(argument) || 'null';
			}
			return String(argument);
		} else { // it’s an object
			result = [];
			options.wrap = true;
			increaseIndentation();
			forOwn(argument, (key: String, value: String) => {
				isEmpty = false;
				result.push(
					(compact ? '' : indent) +
					jsesc(key, options) + ':' +
					(compact ? '' : ' ') +
					jsesc(value, options)
				);
			});
			if (isEmpty) {
				return '{}';
			}
			return '{' + newLine + result.join(',' + newLine) + newLine +
				(compact ? '' : oldIndent) + '}';
		}
	}

	const regex: String = options.escapeEverything ? escapeEverythingRegex : escapeNonAsciiRegex;
	result = argument.replace(regex, (char: String, pair: String, lone: String, quoteChar: Number, index: Number, string: String) => {
		if (pair) {
			if (options.minimal) return pair;
			const first: Number = pair.charCodeAt(0);
			const second: Number = pair.charCodeAt(1);
			if (options.es6) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				const codePoint: String = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
				const hex: String = hexadecimal(codePoint, lowercaseHex);
				return '\\u{' + hex + '}';
			}
			return fourHexEscape(hexadecimal(first, lowercaseHex)) + fourHexEscape(hexadecimal(second, lowercaseHex));
		}

		if (lone) {
			return fourHexEscape(hexadecimal(lone.charCodeAt(0), lowercaseHex));
		}

		if (
			char == '\0' &&
			!json &&
			!regexDigit.test(string.charAt(index + 1))
		) {
			return '\\0';
		}

		if (quoteChar) {
			if (quoteChar == quote || options.escapeEverything) {
				return '\\' + quoteChar;
			}
			return quoteChar;
		}

		if (regexSingleEscape.test(char)) {
			// no need for a `hasOwnProperty` check here
			return singleEscapes[char];
		}

		if (options.minimal && !regexWhitespace.test(char)) {
			return char;
		}

		const hex: String = hexadecimal(char.charCodeAt(0), lowercaseHex);
		if (json || hex.length > 2) {
			return fourHexEscape(hex);
		}

		return '\\x' + ('00' + hex).slice(-2);
	});

	if (quote == '`') {
		result = result.replace(/\$\{/g, '\\${');
	}
	if (options.isScriptContext) {
		// https://mathiasbynens.be/notes/etago
		result = result
			.replace(/<\/(script|style)/gi, '<\\/$1')
			.replace(/<!--/g, json ? '\\u003C!--' : '\\x3C!--');
	}
	if (options.wrap) {
		result = quote + result + quote;
	}
	return result;
};

jsesc.version = '<%= version %>';

module.exports = jsesc;
