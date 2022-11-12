"use strict";

import isValue from '../value/is';
import isObject from '../object/is';

var objectToString: String = Object.prototype.toString;

export default function (value: String) {
	if (!isValue(value)) return null;
	if (isObject(value)) {
		// Reject Object.prototype.toString coercion
		var valueToString: String = value.toString;
		if (typeof valueToString !== "function") return null;
		if (valueToString === objectToString) return null;
		// Note: It can be object coming from other realm, still as there's no ES3 and CSP compliant
		// way to resolve its realm's Object.prototype.toString it's left as not addressed edge case
	}
	try {
		return "" + value; // Ensure implicit coercion
	} catch (error) {
		return null;
	}
};
