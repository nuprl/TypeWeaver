"use strict";

import isPrototype from '../prototype/is';

var isArray: Function;
if (typeof Array.isArray === "function") {
	isArray = Array.isArray;
} else {
	var objectToString: Function = Object.prototype.toString, objectTaggedString: number = objectToString.call([]);
	isArray = function (value: string) { return objectToString.call(value) === objectTaggedString; };
}

export default function (value: any[]) {
	if (!isArray(value)) return false;

	// Sanity check (reject objects which do not expose common Array interface)
	if (!hasOwnProperty.call(value, "length")) return false;
	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.push !== "function") return false;
		if (typeof value.splice !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};
