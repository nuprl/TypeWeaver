'use strict';

export default function isNegativeZero(number) {
	return number === 0 && (1 / number) === -Infinity;
};

