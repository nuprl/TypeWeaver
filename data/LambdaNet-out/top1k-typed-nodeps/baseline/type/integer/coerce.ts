"use strict";

var coerceToFinite: Function = require("../finite/coerce");

var abs: Function = Math.abs, floor: Function = Math.floor;

module.exports = function (value: number) {
	value = coerceToFinite(value);
	if (!value) return value;
	return (value > 0 ? 1 : -1) * floor(abs(value));
};
