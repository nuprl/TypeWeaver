'use strict';

var fnToStr: Function = Function.prototype.toString;
var reflectApply: Function = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike: Number;
var isCallableMarker: Object;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex: RegExp = /^\s*class\b/;
var isES6ClassFn: Function = function isES6ClassFunction(value: String): Boolean {
	try {
		var fnStr: String = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject: Function = function tryFunctionToStr(value: String): Boolean {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr: Function = Object.prototype.toString;
var objectClass: String = '[object Object]';
var fnClass: String = '[object Function]';
var genClass: String = '[object GeneratorFunction]';
var ddaClass: String = '[object HTMLAllCollection]';
var hasToStringTag: Boolean = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68: Boolean = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA: Function = function isDocumentDotAll(): Boolean { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalized DDA to undefined when it's not accessed directly
	var all: Element = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value: Function): Boolean {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str: String = toStr.call(value);
					// IE 6-8 uses `objectClass`
					return (str === ddaClass || str === objectClass) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

export default reflectApply
	? function isCallable(value: Function): Boolean {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value: String): Boolean {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass: String = toStr.call(value);
		return strClass === fnClass || strClass === genClass || tryFunctionObject(value);
	};
