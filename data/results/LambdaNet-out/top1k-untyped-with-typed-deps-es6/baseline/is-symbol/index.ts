'use strict';

var toStr: Function = Object.prototype.toString;
import hasSymbolsFactory from 'has-symbols';
const hasSymbols: boolean = hasSymbolsFactory();

if (hasSymbols) {
    var symToStr: Function = Symbol.prototype.toString;
    var symStringRegex: RegExp = /^Symbol\(.*\)$/;
    var isSymbolObject: Function = function isRealSymbolObject(value: any[]): boolean {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

    export default function isSymbol(value: string): boolean {
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
    export default function isSymbol(value: number): boolean {
		// this environment does not support Symbols.
		return false && value;
	};
}
