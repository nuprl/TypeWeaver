"use strict";

import resolveException from '../lib/resolve-exception';
import resolveErrorMessage from '../lib/resolve-error-message';
import ensurePlainFunction from '../plain-function/ensure';
import ensureArray from '../array/ensure';
import is from './is';

var objHasOwnProperty: boolean = Object.prototype.hasOwnProperty, invalidItemsLimit = 3;

export default function (value: any/*, options*/) {
	var options: any = arguments[1];
	var mainErrorMessage: any =
		options && options.name
			? "Expected a plain object for %n, received %v"
			: "%v is not a plain object";
	if (!is(value)) return resolveException(value, mainErrorMessage, options);
	if (!options) return value;

	var invalidKeys: any, key, errorMessage;
	var allowedKeys: any = ensureArray(options.allowedKeys, { isOptional: true });
	if (allowedKeys) {
		for (key in value) {
			if (!objHasOwnProperty.call(value, key)) continue;
			if (allowedKeys.indexOf(key) > -1) continue;
			if (!invalidKeys) invalidKeys = [];
			if (invalidKeys.push(key) === invalidItemsLimit) break;
		}
		if (invalidKeys) {
			errorMessage =
				resolveErrorMessage(mainErrorMessage, value, options) +
				".\n           Following keys are unexpected: " +
				invalidKeys.join(", ");
			throw new TypeError(errorMessage);
		}
	}

	var ensurePropertyValue: any = ensurePlainFunction(options.ensurePropertyValue, {
		isOptional: true
	});
	if (ensurePropertyValue) {
		var coercedValue: {} = {};
		for (key in value) {
			if (!objHasOwnProperty.call(value, key)) continue;
			var coercedPropertyValue: any;
			try {
				coercedPropertyValue = ensurePropertyValue(value[key]);
			} catch (error) {
				if (!invalidKeys) invalidKeys = [];
				if (invalidKeys.push(key) === invalidItemsLimit) break;
			}
			if (invalidKeys) continue;
			coercedValue[key] = coercedPropertyValue;
		}
		if (invalidKeys) {
			errorMessage =
				resolveErrorMessage(mainErrorMessage, value, options) +
				".\n           Values for following keys are invalid: " +
				invalidKeys.join(", ");
			throw new TypeError(errorMessage);
		}

		return coercedValue;
	}

	return value;
};
