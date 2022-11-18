/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook: any[] = require("./Hook");
const HookCodeFactory: HookCodeFactory = require("./HookCodeFactory");

class AsyncParallelHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone }) {
		return this.callTapsParallel({
			onError: (i, err, done, doneBreak) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory: Hook = new AsyncParallelHookCodeFactory();

const COMPILE: Function = function(options: object) {
	factory.setup(this, options);
	return factory.create(options);
};

function AsyncParallelHook(args: string = [], name: string = undefined): Hook {
	const hook: Hook = new Hook(args, name);
	hook.constructor = AsyncParallelHook;
	hook.compile = COMPILE;
	hook._call = undefined;
	hook.call = undefined;
	return hook;
}

AsyncParallelHook.prototype = null;

module.exports = AsyncParallelHook;
