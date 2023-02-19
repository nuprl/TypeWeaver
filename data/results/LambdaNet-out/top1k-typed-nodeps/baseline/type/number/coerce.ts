"use strict";

var isValue: Function = require("../value/is");

module.exports = function (value: number) {
	if (!isValue(value)) return null;
	try {
		value = +value; // Ensure implicit coercion
	} catch (error) {
		return null;
	}
	if (isNaN(value)) return null;
	return value;
};
