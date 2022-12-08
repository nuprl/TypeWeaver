// Polyfills friendly, therefore ES5 syntax

"use strict";

var isObject: Function = require("../object/is");

var iteratorSymbol: string = Symbol.iterator;

if (!iteratorSymbol) {
	throw new Error("Cannot initialize iterator/is due to Symbol.iterator not being implemented");
}

module.exports = function (value: object/*, options*/) {
	var options: HTMLElement = arguments[1];
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
