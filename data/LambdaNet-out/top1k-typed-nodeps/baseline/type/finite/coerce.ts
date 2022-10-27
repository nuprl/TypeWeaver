"use strict";

var coerceToNumber: Function = require("../number/coerce");

module.exports = function (value: Number) {
	value = coerceToNumber(value);
	return isFinite(value) ? value : null;
};
