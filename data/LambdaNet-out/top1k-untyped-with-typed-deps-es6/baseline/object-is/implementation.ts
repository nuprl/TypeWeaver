'use strict';

var numberIsNaN: Function = function (value: Number) {
	return value !== value;
};

export default function is(a: Number, b: Number): Boolean {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};

