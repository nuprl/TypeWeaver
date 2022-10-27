"use strict";

var isObject: Function    = require("../object/is")
  , isPrototype: Function = require("../prototype/is");

var getPrototypeOf: Function;
if (typeof Object.getPrototypeOf === "function") {
	getPrototypeOf = Object.getPrototypeOf;
} else if ({}.__proto__ === Object.prototype) {
	getPrototypeOf = function (object: Object) { return object.__proto__; };
}

module.exports = function (value: Function) {
	if (!isObject(value)) return false;
	var prototype: Function;
	if (getPrototypeOf) {
		prototype = getPrototypeOf(value);
	} else {
		try {
			var valueConstructor: Function = value.constructor;
			if (valueConstructor) prototype = valueConstructor.prototype;
		} catch (error) {
			return false;
		}
	}
	if (prototype && !hasOwnProperty.call(prototype, "propertyIsEnumerable")) return false;
	return !isPrototype(value);
};
