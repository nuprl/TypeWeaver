'use strict';

var toStr: Function = Object.prototype.toString;

module.exports = function isArguments(value: Array): Boolean {
	var str: String = toStr.call(value);
	var isArgs: Boolean = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]'
			&& value !== null
			&& typeof value === 'object'
			&& typeof value.length === 'number'
			&& value.length >= 0
			&& toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};
