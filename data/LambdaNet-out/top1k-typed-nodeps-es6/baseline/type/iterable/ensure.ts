"use strict";

import resolveException from '../lib/resolve-exception';
import resolveErrorMessage from '../lib/resolve-error-message';
import toShortString from '../lib/to-short-string';
import ensurePlainFunction from '../plain-function/ensure';
import is from './is';

var invalidItemsLimit: number = 3;

export default function (value: object/*, options*/) {
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
