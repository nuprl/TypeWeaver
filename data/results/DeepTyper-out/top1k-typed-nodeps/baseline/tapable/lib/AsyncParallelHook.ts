/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook: any = require("./Hook");
const HookCodeFactory: any = require("./HookCodeFactory");

class AsyncParallelHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone }) {
		return this.callTapsParallel({
			onError: (i: string, err: any, done: any, doneBreak: any) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory: any = new AsyncParallelHookCodeFactory();

const COMPILE: any = function(options: any) {
	factory.setup(this, options);
	return factory.create(options);
};

function AsyncParallelHook(args = [], name = undefined) {
	const hook: any = new Hook(args, name);
	hook.constructor = AsyncParallelHook;
	hook.compile = COMPILE;
	hook._call = undefined;
	hook.call = undefined;
	return hook;
}

AsyncParallelHook.prototype = null;

module.exports = AsyncParallelHook;
