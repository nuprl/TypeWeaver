'use strict';

var $BigInt: Function = typeof BigInt !== 'undefined' && BigInt;

export default function hasNativeBigInts(): Boolean {
	return typeof $BigInt === 'function'
		&& typeof BigInt === 'function'
		&& typeof $BigInt(42) === 'bigint' // eslint-disable-line no-magic-numbers
		&& typeof BigInt(42) === 'bigint'; // eslint-disable-line no-magic-numbers
};
