/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

export default function forEachBail(array: Array,  iterator: Function,  callback: Function) {
	if (array.length === 0) return callback();

	let i = 0;
	const next = () => {
		let loop = undefined;
		iterator(array[i++], (err, result) => {
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