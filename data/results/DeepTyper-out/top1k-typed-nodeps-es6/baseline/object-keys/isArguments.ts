'use strict';

var toStr: string = Object.prototype.toString;

export default function isArguments(value: any): boolean {
	var str: any = toStr.call(value);
	var isArgs: boolean = str === '[object Arguments]';
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
