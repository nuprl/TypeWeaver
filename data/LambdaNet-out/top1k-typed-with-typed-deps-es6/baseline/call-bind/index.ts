'use strict';

import bind from 'function-bind';
import GetIntrinsic from 'get-intrinsic';

var $apply: String = GetIntrinsic('%Function.prototype.apply%');
var $call: String = GetIntrinsic('%Function.prototype.call%');
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

export default function callBind(originalFunction: Array): Array {
	var func: Array = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc: Array = $gOPD(func, 'length');
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

var applyBind: Function = function applyBind(): Promise {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
    export const apply: Function = applyBind;
}
