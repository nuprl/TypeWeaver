"use strict";

import isObject from '../object/is';

export default function (value: Promise) {
	if (!isObject(value)) return false;
	try { return typeof value.then === "function"; }
	catch (error) { return false; }
};
