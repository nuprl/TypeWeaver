'use strict';

var numberIsNaN = function (value: ny) {
	return value !== value;
};

export default function is(a: number,  b: number) {
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
