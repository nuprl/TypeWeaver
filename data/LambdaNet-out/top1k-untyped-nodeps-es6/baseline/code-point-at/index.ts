/* eslint-disable babel/new-cap, xo/throw-new-error */
'use strict';

export default function (str: String, pos: Number) {
	if (str === null || str === undefined) {
		throw TypeError();
	}

	str = String(str);

	var size: Number = str.length;
	var i: Number = pos ? Number(pos) : 0;

	if (Number.isNaN(i)) {
		i = 0;
	}

	if (i < 0 || i >= size) {
		return undefined;
	}

	var first: Number = str.charCodeAt(i);

	if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {
		var second: Number = str.charCodeAt(i + 1);

		if (second >= 0xDC00 && second <= 0xDFFF) {
			return ((first - 0xD800) * 0x400) + second - 0xDC00 + 0x10000;
		}
	}

	return first;
};
