"use strict";

var isValue: Function = require("../value/is");

// Sanity BigInt support check
BigInt(0);

module.exports = function (value: String) {
	if (!isValue(value)) return null;
	if (typeof value === "bigint") return value;
	try { return BigInt(value); }
	catch (error) { return null; }
};
