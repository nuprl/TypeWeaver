'use strict';

/* global window */

var keysShim: Function;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has: Function = Object.prototype.hasOwnProperty;
	var toStr: Function = Object.prototype.toString;
	var isArgs: Function = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable: Function = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug: Boolean = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug: Boolean = isEnumerable.call(function () {}, 'prototype');
	var dontEnums: Array = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype: Function = function (o: String) {
		var ctor: Function = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys: Object = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug: Boolean = (function () {
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy: Function = function (o: String) {
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object: Array): Array {
		var isObject: Boolean = object !== null && typeof object === 'object';
		var isFunction: Boolean = toStr.call(object) === '[object Function]';
		var isArguments: Boolean = isArgs(object);
		var isString: Boolean = isObject && toStr.call(object) === '[object String]';
		var theKeys: Array = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto: Boolean = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor: Number = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
export default keysShim;
