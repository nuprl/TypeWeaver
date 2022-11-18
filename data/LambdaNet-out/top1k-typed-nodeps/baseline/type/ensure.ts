"use strict";

var isArray: Function       = require("./array/is")
  , toShortString: Function = require("./lib/to-short-string");

var objPropertyIsEnumerable: number = Object.prototype.propertyIsEnumerable;

var assign: Function = function (target: object, source: object) {
	for (var key in source) {
		if (objPropertyIsEnumerable.call(source, key)) target[key] = source[key];
	}
};

module.exports = function (validationDatum1: string/*, ...validationDatumN, options */) {
	var validationData: any[] = [validationDatum1];
	var globalOptions: object;
	if (arguments.length > 1) {
		var hasOptions: boolean = !isArray(arguments[arguments.length - 1]);
		if (hasOptions) globalOptions = arguments[arguments.length - 1];
		var lastDatumIndex: number = hasOptions ? arguments.length - 2 : arguments.length - 1;
		for (var i = 1; i <= lastDatumIndex; ++i) validationData.push(arguments[i]);
	}
	var result: any[] = [], errors: any[];
	for (var j = 0; j < validationData.length; ++j) {
		var validationDatum: object = validationData[j];
		var options: object = { name: validationDatum[0] };
		if (globalOptions) assign(options, globalOptions);
		if (validationDatum[3]) assign(options, validationDatum[3]);
		var resultItem: string;
		if (typeof validationDatum[2] !== "function") {
			throw new TypeError(toShortString(validationDatum[2]) + " is not a function");
		}
		try {
			resultItem = validationDatum[2](validationDatum[1], options);
		} catch (error) {
			if (!errors) errors = [];
			errors.push(error);
		}
		if (errors) continue;
		result.push(resultItem);
	}
	if (!errors) return result;

	if (errors.length === 1) throw errors[0];
	var ErrorConstructor: object = (globalOptions && globalOptions.Error) || TypeError;
	var errorMessage: string = "Approached following errors:";
	for (var k = 0; k < errors.length; ++k) {
		errorMessage += "\n - " + errors[k].message.split("\n").join("\n   ");
	}
	throw new ErrorConstructor(errorMessage);
};
