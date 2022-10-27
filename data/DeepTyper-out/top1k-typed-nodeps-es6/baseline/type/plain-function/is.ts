"use strict";

import isFunction from '../function/is';

var classRe: RegExp = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

export default function (value): any {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};
