'use strict';

import ArraySpeciesCreate from 'es-abstract/2021/ArraySpeciesCreate';
import FlattenIntoArray from 'es-abstract/2021/FlattenIntoArray';
import Get from 'es-abstract/2021/Get';
import ToIntegerOrInfinity from 'es-abstract/2021/ToIntegerOrInfinity';
import ToLength from 'es-abstract/2021/ToLength';
import ToObject from 'es-abstract/2021/ToObject';

export default function flat() {
	var O = ToObject(this);
	var sourceLen = ToLength(Get(O, 'length'));

	var depthNum = 1;
	if (arguments.length > 0 && typeof arguments[0] !== 'undefined') {
		depthNum = ToIntegerOrInfinity(arguments[0]);
	}

	var A = ArraySpeciesCreate(O, 0);
	FlattenIntoArray(A, O, sourceLen, 0, depthNum);
	return A;
};
