'use strict';

import GetIntrinsic from 'get-intrinsic';
import callBind from './';

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

export default function callBoundIntrinsic(name: string, allowMissing: string): boolean {
	var intrinsic: boolean = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};
