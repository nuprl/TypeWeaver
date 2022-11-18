"use strict";

var resolveException: Function    = require("../lib/resolve-exception")
  , resolveErrorMessage: Function = require("../lib/resolve-error-message")
  , toShortString: Function       = require("../lib/to-short-string")
  , ensurePlainFunction: Function = require("../plain-function/ensure")
  , is: Function                  = require("./is");

var invalidItemsLimit: number = 3;

module.exports = function (value: object/*, options*/) {
	var options: object = arguments[1];
	var mainErrorMessage: string =
		options && options.name
			? "Expected an iterable for %n, received %v"
			: "%v is not expected iterable";
	if (!is(value, options)) return resolveException(value, mainErrorMessage, options);
	if (!options) return value;

	var ensureItem: Function = ensurePlainFunction(options.ensureItem, { isOptional: true });
	if (ensureItem) {
		var coercedValue: any[] = [];
		var iterator: object = value[Symbol.iterator]();
		var item: HTMLElement, invalidItems: any[];
		while (!(item = iterator.next()).done) {
			var newItemValue: string;
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
