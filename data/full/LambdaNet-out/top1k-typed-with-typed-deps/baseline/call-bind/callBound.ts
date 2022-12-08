'use strict';

var GetIntrinsic: Function = require('get-intrinsic');

var callBind: Function = require('./');

var $indexOf: Function = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name: string, allowMissing: boolean): boolean {
	var intrinsic: string = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};
