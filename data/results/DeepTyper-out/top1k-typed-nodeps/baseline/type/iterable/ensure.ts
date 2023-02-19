"use strict";

var resolveException: any    = require("../lib/resolve-exception")
  , resolveErrorMessage = require("../lib/resolve-error-message")
  , toShortString       = require("../lib/to-short-string")
  , ensurePlainFunction = require("../plain-function/ensure")
  , is                  = require("./is");

var invalidItemsLimit: number = 3;

module.exports = function (value: any/*, options*/) {
	var options: any = arguments[1];
	var mainErrorMessage: any =
		options && options.name
			? "Expected an iterable for %n, received %v"
			: "%v is not expected iterable";
	if (!is(value, options)) return resolveException(value, mainErrorMessage, options);
	if (!options) return value;

	var ensureItem: any = ensurePlainFunction(options.ensureItem, { isOptional: true });
	if (ensureItem) {
		var coercedValue: any[] = [];
		var iterator: any = value[Symbol.iterator]();
		var item: any, invalidItems;
		while (!(item = iterator.next()).done) {
			var newItemValue: any;
			try {
				newItemValue = ensureItem(item.value);
			} catch (error) {
				if (!invalidItems) invalidItems = [];
				if (invalidItems.push(item.value) === invalidItemsLimit) break;
			}
			if (invalidItems) continue;
			coercedValue.push(newItemValue);
		}
		if (invalidItems) {
			var errorMessage: string =
				resolveErrorMessage(mainErrorMessage, value, options) +
				".\n           Following items are invalid:";
			for (var i = 0; i < invalidItems.length; ++i) {
				errorMessage += "\n             - " + toShortString(invalidItems[i]);
			}
			throw new TypeError(errorMessage);
		}
		return coercedValue;
	}

	return value;
};
