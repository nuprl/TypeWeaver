'use strict';

var GetIntrinsic: Function = require('get-intrinsic');

var callBind: Function = require('./');

var $indexOf: Function = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name: String, allowMissing: Boolean): Boolean {
	var intrinsic: String = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};
