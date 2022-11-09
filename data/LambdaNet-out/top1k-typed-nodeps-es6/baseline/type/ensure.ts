"use strict";

import isArray from './array/is';
import toShortString from './lib/to-short-string';

var objPropertyIsEnumerable: Number = Object.prototype.propertyIsEnumerable;

var assign: Function = function (target: Object, source: Object) {
	for (var key in source) {
		if (objPropertyIsEnumerable.call(source, key)) target[key] = source[key];
	}
};

export default function (validationDatum1: Array/*, ...validationDatumN, options */) {
	var validationData: Array = [validationDatum1];
	var globalOptions: Object;
	if (arguments.length > 1) {
		var hasOptions: Boolean = !isArray(arguments[arguments.length - 1]);
		if (hasOptions) globalOptions = arguments[arguments.length - 1];
		var lastDatumIndex: Number = hasOptions ? arguments.length - 2 : arguments.length - 1;
		for (var i = 1; i <= lastDatumIndex; ++i) validationData.push(arguments[i]);
	}
	var result: Array = [], errors: Array;
	for (var j = 0; j < validationData.length; ++j) {
		var validationDatum: Object = validationData[j];
		var options: Object = { name: validationDatum[0] };
		if (globalOptions) assign(options, globalOptions);
		if (validationDatum[3]) assign(options, validationDatum[3]);
		var resultItem: String;
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
	var ErrorConstructor: Object = (globalOptions && globalOptions.Error) || TypeError;
	var errorMessage: String = "Approached following errors:";
	for (var k = 0; k < errors.length; ++k) {
		errorMessage += "\n - " + errors[k].message.split("\n").join("\n   ");
	}
	throw new ErrorConstructor(errorMessage);
};
