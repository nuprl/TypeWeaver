"use strict";

var coerceToNumber: Function = require("../number/coerce");

module.exports = function (value: number) {
	value = coerceToNumber(value);
	return isFinite(value) ? value : null;
};
