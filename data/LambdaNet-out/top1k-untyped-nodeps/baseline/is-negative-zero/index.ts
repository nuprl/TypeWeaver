'use strict';

module.exports = function isNegativeZero(number: Number): Boolean {
	return number === 0 && (1 / number) === -Infinity;
};

