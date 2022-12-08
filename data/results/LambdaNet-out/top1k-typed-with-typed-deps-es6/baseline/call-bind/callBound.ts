'use strict';

import GetIntrinsic from 'get-intrinsic';
import callBind from './';

var $indexOf: Function = callBind(GetIntrinsic('String.prototype.indexOf'));

export default function callBoundIntrinsic(name: string, allowMissing: boolean): any[] {
	var intrinsic: any[] = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};
