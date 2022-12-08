'use strict';

module.exports = function isNegativeZero(number): number {
	return number === 0 && (1 / number) === -Infinity;
};

