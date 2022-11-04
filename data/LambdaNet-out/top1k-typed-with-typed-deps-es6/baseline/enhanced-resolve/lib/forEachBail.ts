/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

export default function forEachBail(array: Array, iterator: Function, callback: Function): Void {
	if (array.length === 0) return callback();

	let i: Number = 0;
	const next: Function = () => {
		let loop: Boolean = undefined;
		iterator(array[i++], (err: Resolver, result: CachedInputFileSystem) => {
			if (err || result !== undefined || i >= array.length) {
				return callback(err, result);
			}
			if (loop === false) while (next());
			loop = true;
		});
		if (!loop) loop = false;
		return loop;
	};
	while (next());
};