'use strict';

export default function isNegativeZero(number: number) {
	return number === 0 && (1 / number) === -Infinity;
};
