'use strict';

var slice = Array.prototype.slice;
import isArgs from './isArguments';

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o: any) { return origKeys(o); } : require('./implementation');

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object: any) { // eslint-disable-line func-name-matching
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