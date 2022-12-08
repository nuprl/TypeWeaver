"use strict";

var resolveException: Function    = require("../lib/resolve-exception")
  , resolveErrorMessage: Function = require("../lib/resolve-error-message")
  , toShortString: string       = require("../lib/to-short-string")
  , ensurePlainFunction: Function = require("../plain-function/ensure")
  , is: Function                  = require("./is");

var objHasOwnProperty: Function = Object.prototype.hasOwnProperty, invalidItemsLimit: number = 3;

module.exports = function (value: any[] /*, options*/) {
	var options: object = arguments[1];
	var mainErrorMessage: string =
		options && options.name ? "Expected an array for %n, received %v" : "%v is not an array";
	if (!is(value)) return resolveException(value, mainErrorMessage, options);
	if (!options) return value;

	var ensureItem: Function = ensurePlainFunction(options.ensureItem, { isOptional: true });
	if (ensureItem) {
		var coercedValue: Promise = [], invalidItems: any[];
		for (var index = 0, length = value.length; index < length; ++index) {
			if (!objHasOwnProperty.call(value, index)) continue;
			var coercedItem: Function;
			try {
				coercedItem = ensureItem(value[index]);
			} catch (error) {
				if (!invalidItems) invalidItems = [];
				if (invalidItems.push(toShortString(value[index])) === invalidItemsLimit) break;
			}
			if (invalidItems) continue;
			coercedValue[index] = coercedItem;
		}
		if (invalidItems) {
			throw new TypeError(
				resolveErrorMessage(mainErrorMessage, value, options) +
					".\n           Following items are invalid: " +
					invalidItems.join(", ")
			);
		}
		return coercedValue;
	}
	return value;
};
