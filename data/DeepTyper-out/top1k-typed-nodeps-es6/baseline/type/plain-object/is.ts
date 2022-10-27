"use strict";

import isObject from '../object/is';
import isPrototype from '../prototype/is';

var getPrototypeOf: any;
if (typeof Object.getPrototypeOf === "function") {
	getPrototypeOf = Object.getPrototypeOf;
} else if ({}.__proto__ === Object.prototype) {
	getPrototypeOf = function (object: any) { return object.__proto__; };
}

export default function (value): any {
	if (!isObject(value)) return false;
	var prototype: any;
	if (getPrototypeOf) {
		prototype = getPrototypeOf(value);
	} else {
		try {
			var valueConstructor: any = value.constructor;
			if (valueConstructor) prototype = valueConstructor.prototype;
		} catch (error) {
			return false;
		}
	}
	if (prototype && !hasOwnProperty.call(prototype, "propertyIsEnumerable")) return false;
	return !isPrototype(value);
};
