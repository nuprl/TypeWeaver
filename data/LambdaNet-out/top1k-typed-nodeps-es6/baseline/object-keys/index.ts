'use strict';

var slice: Function = Array.prototype.slice;
import isArgs from './isArguments';

var origKeys: Function = Object.keys;
var keysShim: String = origKeys ? function keys(o: String): String { return origKeys(o); } : require('./implementation');

keysShim.shim = function shimObjectKeys(): Boolean {
	if (Object.keys) {
		var keysWorksWithArguments: Boolean = (function () {
			// Safari 5.0 bug
			var args: Array = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object: Function): String { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return origKeys(slice.call(object));
				}
				return origKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

export default keysShim;
