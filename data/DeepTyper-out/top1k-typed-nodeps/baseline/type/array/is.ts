"use strict";

var isPrototype: any = require("../prototype/is");

var isArray: boolean;
if (typeof Array.isArray === "function") {
	isArray = Array.isArray;
} else {
	var objectToString: any = Object.prototype.toString, objectTaggedString = objectToString.call([]);
	isArray = function (value: any) { return objectToString.call(value) === objectTaggedString; };
}

module.exports = function (value: any) {
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
