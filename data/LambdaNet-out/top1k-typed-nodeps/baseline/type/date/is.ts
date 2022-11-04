"use strict";

var isPrototype: Function = require("../prototype/is");

var dateValueOf: Function = Date.prototype.valueOf;

module.exports = function (value: Object) {
	if (!value) return false;

	try {
		// Sanity check (reject objects which do not expose common Date interface)
		if (typeof value.getFullYear !== "function") return false;
		if (typeof value.getTimezoneOffset !== "function") return false;
		if (typeof value.setFullYear !== "function") return false;

		// Ensure its native Date object (has [[DateValue]] slot)
		dateValueOf.call(value);
	} catch (error) {
		return false;
	}

	// Ensure it hosts valid date
	if (isNaN(value)) return false;

	return !isPrototype(value);
};