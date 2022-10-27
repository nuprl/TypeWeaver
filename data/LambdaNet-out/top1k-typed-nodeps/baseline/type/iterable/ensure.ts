"use strict";

var resolveException: Function    = require("../lib/resolve-exception")
  , resolveErrorMessage: Function = require("../lib/resolve-error-message")
  , toShortString: Function       = require("../lib/to-short-string")
  , ensurePlainFunction: Function = require("../plain-function/ensure")
  , is: Function                  = require("./is");

var invalidItemsLimit: Number = 3;

module.exports = function (value: Object/*, options*/) {
	var options: Object = arguments[1];
	var mainErrorMessage: String =
		options && options.name
			? "Expected an iterable for %n, received %v"
			: "%v is not expected iterable";
	if (!is(value, options)) return resolveException(value, mainErrorMessage, options);
	if (!options) return value;

	var ensureItem: Function = ensurePlainFunction(options.ensureItem, { isOptional: true });
	if (ensureItem) {
		var coercedValue: Array = [];
		var iterator: Object = value[Symbol.iterator]();
		var item: HTMLElement, invalidItems: Array;
		while (!(item = iterator.next()).done) {
			var newItemValue: String;
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
			var errorMessage: String =
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
