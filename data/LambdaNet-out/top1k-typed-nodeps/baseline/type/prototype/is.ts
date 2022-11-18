"use strict";

var isObject: Function = require("../object/is");

module.exports = function (value: object) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};
