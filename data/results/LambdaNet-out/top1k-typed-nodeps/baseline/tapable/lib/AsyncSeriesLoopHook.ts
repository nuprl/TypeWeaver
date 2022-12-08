/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook: any[] = require("./Hook");
const HookCodeFactory: HookCodeFactory = require("./HookCodeFactory");

class AsyncSeriesLoopHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone }) {
		return this.callTapsLooping({
			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory: Hook = new AsyncSeriesLoopHookCodeFactory();

const COMPILE: Function = function(options: object) {
	factory.setup(this, options);
	return factory.create(options);
};

function AsyncSeriesLoopHook(args: string = [], name: string = undefined): Hook {
	const hook: Hook = new Hook(args, name);
	hook.constructor = AsyncSeriesLoopHook;
	hook.compile = COMPILE;
	hook._call = undefined;
	hook.call = undefined;
	return hook;
}

AsyncSeriesLoopHook.prototype = null;

module.exports = AsyncSeriesLoopHook;
