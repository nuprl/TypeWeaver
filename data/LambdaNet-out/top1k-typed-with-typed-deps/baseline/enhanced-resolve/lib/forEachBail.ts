/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

module.exports = function forEachBail(array: any[], iterator: Function, callback: Function): Void {
	if (array.length === 0) return callback();

	let i: number = 0;
	const next: Function = () => {
		let loop: boolean = undefined;
		iterator(array[i++], (err: Resolver, result: number) => {
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
