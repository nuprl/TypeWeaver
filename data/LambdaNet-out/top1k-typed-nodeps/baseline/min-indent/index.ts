'use strict';
module.exports = (string: String) => {
	const match: Array = string.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return 0;
	}

	return match.reduce((r: Number, a: Array) => Math.min(r, a.length), Infinity);
};
