/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

export default function createInnerContext(
	options: Object,
	message: String,
	messageOptional: Number
): Object {
	let messageReported: Boolean = false;
	let innerLog: Function = undefined;
	if (options.log) {
		if (message) {
			innerLog = (msg: String) => {
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
	const childContext: Object = {
		log: innerLog,
		yield: options.yield,
		fileDependencies: options.fileDependencies,
		contextDependencies: options.contextDependencies,
		missingDependencies: options.missingDependencies,
		stack: options.stack
	};
	return childContext;
};
