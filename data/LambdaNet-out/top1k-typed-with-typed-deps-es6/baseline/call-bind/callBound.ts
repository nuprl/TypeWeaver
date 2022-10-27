'use strict';

import GetIntrinsic from 'get-intrinsic';
import callBind from './';

var $indexOf: Function = callBind(GetIntrinsic('String.prototype.indexOf'));

export default function callBoundIntrinsic(name: String, allowMissing: Boolean): Array {
	var intrinsic: Array = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};
