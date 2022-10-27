'use strict';

export default function isNegativeZero(number: Number): Boolean {
	return number === 0 && (1 / number) === -Infinity;
};

