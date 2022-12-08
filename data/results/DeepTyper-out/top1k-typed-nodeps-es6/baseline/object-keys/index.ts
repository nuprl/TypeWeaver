'use strict';

var slice: any[] = Array.prototype.slice;
import isArgs from './isArguments';

var origKeys: string[] = Object.keys;
var keysShim: any = origKeys ? function keys(o: any): string[] { return origKeys(o); } : require('./implementation');

keysShim.shim = function shimObjectKeys(): string {
	if (Object.keys) {
		var keysWorksWithArguments: any = (function () {
			// Safari 5.0 bug
			var args: string[] = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object: any): string[] { // eslint-disable-line func-name-matching
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
