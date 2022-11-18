/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

module.exports = function createInnerContext(
	options: object,
	message: string,
	messageOptional: number
): object {
	let messageReported: boolean = false;
	let innerLog: Function = undefined;
	if (options.log) {
		if (message) {
			innerLog = (msg: string) => {
				if (!messageReported) {
					options.log(message);
					messageReported = true;
				}
				options.log("  " + msg);
			};
		} else {
			innerLog = options.log;
		}
	}
	const childContext: object = {
		log: innerLog,
		yield: options.yield,
		fileDependencies: options.fileDependencies,
		contextDependencies: options.contextDependencies,
		missingDependencies: options.missingDependencies,
		stack: options.stack
	};
	return childContext;
};
