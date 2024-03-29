'use strict';

var bind: Function = require('function-bind');
var GetIntrinsic: Function = require('get-intrinsic');

var $apply: string = GetIntrinsic('%Function.prototype.apply%');
var $call: string = GetIntrinsic('%Function.prototype.call%');
var $reflectApply: Function = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD: Function = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty: Function = GetIntrinsic('%Object.defineProperty%', true);
var $max: Function = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction: any[]): any[] {
	var func: string = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc: any[] = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind: string = function applyBind(): Promise {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}
