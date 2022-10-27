'use strict';

var toStr: string = Object.prototype.toString;
import hasSymbolsFactory from 'has-symbols';
const hasSymbols: string = hasSymbolsFactory();

if (hasSymbols) {
    var symToStr: any = Symbol.prototype.toString;
    var symStringRegex: string = /^Symbol\(.*\)$/;
    var isSymbolObject: boolean = function isRealSymbolObject(value: any): boolean {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

    export default function isSymbol(value: any): boolean {
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
    export default function isSymbol(value: any): boolean {
		// this environment does not support Symbols.
		return false && value;
	};
}
