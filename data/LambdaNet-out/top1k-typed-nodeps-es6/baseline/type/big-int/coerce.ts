"use strict";

import isValue from '../value/is';

// Sanity BigInt support check
BigInt(0);

export default function (value: String) {
	if (!isValue(value)) return null;
	if (typeof value === "bigint") return value;
	try { return BigInt(value); }
	catch (error) { return null; }
};
