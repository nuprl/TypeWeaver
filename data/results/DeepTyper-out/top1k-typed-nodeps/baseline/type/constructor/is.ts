"use strict";

var isFunction: any = require("../function/is");

var constructorRe: RegExp = /^\s*(?:class[\s{/}]|function[\s(])/
  , functionToString = Function.prototype.toString;

module.exports = function (value: any) {
	if (!isFunction(value)) return false;
	if (!constructorRe.test(functionToString.call(value))) return false;
	return true;
};
