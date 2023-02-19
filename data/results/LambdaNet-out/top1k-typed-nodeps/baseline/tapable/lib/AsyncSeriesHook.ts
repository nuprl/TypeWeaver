/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook: any[] = require("./Hook");
const HookCodeFactory: HookCodeFactory = require("./HookCodeFactory");

class AsyncSeriesHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone }) {
		return this.callTapsSeries({
			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory: Hook = new AsyncSeriesHookCodeFactory();

const COMPILE: Function = function(options: object) {
	factory.setup(this, options);
	return factory.create(options);
};

function AsyncSeriesHook(args: string = [], name: string = undefined): Hook {
	const hook: Hook = new Hook(args, name);
	hook.constructor = AsyncSeriesHook;
	hook.compile = COMPILE;
	hook._call = undefined;
	hook.call = undefined;
	return hook;
}

AsyncSeriesHook.prototype = null;

module.exports = AsyncSeriesHook;
