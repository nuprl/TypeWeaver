'use strict';

module.exports = function isNegativeZero(number: number): boolean {
	return number === 0 && (1 / number) === -Infinity;
};

