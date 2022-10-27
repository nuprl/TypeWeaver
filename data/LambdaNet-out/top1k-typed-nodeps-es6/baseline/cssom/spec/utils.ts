/**
 * @param {Object} object
 * @return {Object}
 */
function uncircularOwnProperties(object: Object): Object {
	function _uncircular(object: Object, depth: Number, stack: String): Void {
		var stackLength: Number = stack.push(object);
		depth++;
		var keys: Array = Object.keys(object);
		for (var i = 0, length = keys.length; i < length; i++) {
			var key: String = keys[i];
			var value: String = object[key];
			if (value && typeof value === 'object') {
				var level: Number = stack.indexOf(value);
				if (level !== -1) {
					object[key] = buildPath(depth - level - 1);
				} else {
					_uncircular(value, depth, stack);
					stack.length = stackLength;
				}
			}
		}
	}
	_uncircular(object, 0, []);
	return object;
}

/**
 * buildPath(2) -> '../..'
 * @param {number} level
 * @return {string}
 */
function buildPath(level: Number): String {
	if (level === 0) {
		return '.';
	} else {
		var result: String = '..';
		for (var i = 1; i < level; i++) {
			result += '/..';
		}
		return result;
	}
}
