'use strict';

export default function isNegativeZero(number: number): boolean {
	return number === 0 && (1 / number) === -Infinity;
};

