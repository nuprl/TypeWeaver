'use strict';

var keys: Function = require('object-keys');

module.exports = function hasSymbols(): boolean {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj: object = {};
	var sym: string = Symbol('test');
	var symObj: number = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	/*
	 * temp disabled per https://github.com/ljharb/object.assign/issues/17
	 * if (sym instanceof Symbol) { return false; }
	 * temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	 * if (!(symObj instanceof Symbol)) { return false; }
	 */

	var symVal: number = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-unreachable-loop
	if (keys(obj).length !== 0) { return false; }
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms: any[] = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor: Element = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};
