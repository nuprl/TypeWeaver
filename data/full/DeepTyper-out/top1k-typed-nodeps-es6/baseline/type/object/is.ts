"use strict";

import isValue from '../value/is';

// prettier-ignore
var possibleTypes: any = { "object": true, "function": true, "undefined": true /* document.all */ };

export default function (value: any) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};
