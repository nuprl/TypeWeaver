"use strict";

import isFunction from '../function/is';

var constructorRe: RegExp = /^\s*(?:class[\s{/}]|function[\s(])/
  , functionToString: Function = Function.prototype.toString;

export default function (value: String) {
	if (!isFunction(value)) return false;
	if (!constructorRe.test(functionToString.call(value))) return false;
	return true;
};
