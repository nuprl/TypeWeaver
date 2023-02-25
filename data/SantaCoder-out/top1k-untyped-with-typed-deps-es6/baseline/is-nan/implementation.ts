'use strict';

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

export default function isNaN(value: any) {
	return value !== value;
};