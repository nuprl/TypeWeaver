'use strict';

var toStr = Object.prototype.toString;
import hasSymbolsFactory from 'has-symbols';
const hasSymbols = hasSymbolsFactory();

if (hasSymbols) {
    var symToStr = Symbol.prototype.toString;
    var symStringRegex = /^Symbol\(.*\)$/;
    var isSymbolObject = function isRealSymbolObject(value: any) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

    export default function isSymbol(value: any) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
    export default function isSymbol(value: any) {
		// this environment does not support Symbols.
		return false && value;
	};
}