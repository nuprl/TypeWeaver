'use strict';

var numberIsNaN: boolean = function (value: any) {
	return value !== value;
};

module.exports = function is(a: any, b: any) {
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

