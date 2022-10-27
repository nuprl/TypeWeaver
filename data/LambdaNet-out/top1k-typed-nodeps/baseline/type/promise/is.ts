"use strict";

var isPrototype: Function = require("../prototype/is");

// In theory we could rely on Symbol.toStringTag directly,
// still early native implementation (e.g. in FF) predated symbols
var objectToString: Function = Object.prototype.toString
  , objectTaggedString: Number = objectToString.call(Promise.resolve());

module.exports = function (value: Promise) {
	if (!value) return false;

	// Sanity check (reject objects which do not expose common Promise interface)
	try {
		if (typeof value.then !== "function") return false;
		if (typeof value["catch"] !== "function") return false;
	} catch (error) {
		return false;
	}

	// Ensure its native Promise object (has [[PromiseState]] slot)
	// Note: it's not 100% precise as string tag may be overriden
	// and other objects could be hacked to expose it
	if (objectToString.call(value) !== objectTaggedString) return false;

	return !isPrototype(value);
};
