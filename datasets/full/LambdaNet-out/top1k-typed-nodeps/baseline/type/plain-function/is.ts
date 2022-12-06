"use strict";

var isFunction: Function = require("../function/is");

var classRe: RegExp = /^\s*class[\s{/}]/, functionToString: Function = Function.prototype.toString;

module.exports = function (value: string) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};
