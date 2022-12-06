"use strict";

var isPrototype: any = require("../prototype/is");

// In theory we could rely on Symbol.toStringTag directly,
// still early native implementation (e.g. in FF) predated symbols
var objectToString: string = Object.prototype.toString, objectTaggedString = objectToString.call(new Map());

module.exports = function (value: any) {
	if (!value) return false;

	// Sanity check (reject objects which do not expose common Promise interface)
	try {
		if (typeof value.set !== "function") return false;
		if (typeof value.get !== "function") return false;
		if (typeof value.has !== "function") return false;
		if (typeof value.clear !== "function") return false;
	} catch (error) {
		return false;
	}

	// Ensure its native Promise object (has [[MapData]] slot)
	// Note: it's not 100% precise as string tag may be overriden
	// and other objects could be hacked to expose it
	if (objectToString.call(value) !== objectTaggedString) return false;

	return !isPrototype(value);
};
