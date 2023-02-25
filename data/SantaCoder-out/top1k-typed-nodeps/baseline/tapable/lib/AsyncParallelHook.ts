/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class AsyncParallelHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone }) {
		return this.callTapsParallel({
			onError: (i, err, done, doneBreak) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory = new AsyncParallelHookCodeFactory();

const COMPILE = function(options: IOptions) {
	factory.setup(this, options);
	return factory.create(options);
};

function AsyncParallelHook(args = []: any[], name = undefined: string) {
	const hook = new Hook(args, name);
	hook.constructor = AsyncParallelHook;
	hook.compile = COMPILE;
	hook._call = undefined;
	hook.call = undefined;
	return hook;
}

AsyncParallelHook.prototype = null;

module.exports = AsyncParallelHook;