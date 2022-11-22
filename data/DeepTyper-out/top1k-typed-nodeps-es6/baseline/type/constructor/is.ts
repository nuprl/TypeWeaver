"use strict";

import isFunction from '../function/is';

var constructorRe: string = /^\s*(?:class[\s{/}]|function[\s(])/
  , functionToString = Function.prototype.toString;

export default function (value: any) {
	if (!isFunction(value)) return false;
	if (!constructorRe.test(functionToString.call(value))) return false;
	return true;
};
