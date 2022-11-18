"use strict";

var isFunction: Function = require("../function/is");

var constructorRe: RegExp = /^\s*(?:class[\s{/}]|function[\s(])/
  , functionToString: Function = Function.prototype.toString;

module.exports = function (value: string) {
	if (!isFunction(value)) return false;
	if (!constructorRe.test(functionToString.call(value))) return false;
	return true;
};
