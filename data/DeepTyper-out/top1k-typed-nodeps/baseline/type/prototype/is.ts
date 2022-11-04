"use strict";

var isObject: boolean = require("../object/is");

module.exports = function (value: any) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};