'use strict';

var slice: Function = Array.prototype.slice;
import isArgs from './isArguments';

var origKeys: Function = Object.keys;
var keysShim: string = origKeys ? function keys(o: string): string { return origKeys(o); } : require('./implementation');

keysShim.shim = function shimObjectKeys(): boolean {
	if (Object.keys) {
		var keysWorksWithArguments: boolean = (function () {
			// Safari 5.0 bug
			var args: any[] = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object: Function): string { // eslint-disable-line func-name-matching
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
