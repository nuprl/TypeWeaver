"use strict";

var isFunction: any = require("../function/is");

var classRe: RegExp = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value: any) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};
