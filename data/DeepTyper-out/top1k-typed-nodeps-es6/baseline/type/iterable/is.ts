// Polyfills friendly, therefore ES5 syntax

"use strict";

import isObject from '../object/is';

var iteratorSymbol: number = Symbol.iterator;

if (!iteratorSymbol) {
	throw new Error("Cannot initialize iterator/is due to Symbol.iterator not being implemented");
}

export default function (value: any/*, options*/) {
	var options: any = arguments[1];
	if (!isObject(value)) {
		if (!isObject(options) || !options.allowString || typeof value !== "string") return false;
	}
	try {
		if (typeof value[iteratorSymbol] !== "function") return false;
	} catch (error) {
		return false;
	}
	if (!options) return true;
	if (options.denyEmpty) {
		try {
			if (value[iteratorSymbol]().next().done) return false;
		} catch (error) {
			return false;
		}
	}
	return true;
};
