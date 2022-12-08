"use strict";

import resolveException from '../lib/resolve-exception';
import resolveErrorMessage from '../lib/resolve-error-message';
import toShortString from '../lib/to-short-string';
import ensurePlainFunction from '../plain-function/ensure';
import is from './is';

var objHasOwnProperty: boolean = Object.prototype.hasOwnProperty, invalidItemsLimit = 3;

export default function (value: any /*, options*/) {
	var options: any = arguments[1];
	var mainErrorMessage: any =
		options && options.name ? "Expected an array for %n, received %v" : "%v is not an array";
	if (!is(value)) return resolveException(value, mainErrorMessage, options);
	if (!options) return value;

	var ensureItem: any = ensurePlainFunction(options.ensureItem, { isOptional: true });
	if (ensureItem) {
		var coercedValue: any[] = [], invalidItems;
		for (var index = 0, length = value.length; index < length; ++index) {
			if (!objHasOwnProperty.call(value, index)) continue;
			var coercedItem: any;
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
