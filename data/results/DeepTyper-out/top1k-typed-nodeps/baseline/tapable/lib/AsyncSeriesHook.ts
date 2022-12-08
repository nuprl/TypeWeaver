/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook: any = require("./Hook");
const HookCodeFactory: any = require("./HookCodeFactory");

class AsyncSeriesHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone }) {
		return this.callTapsSeries({
			onError: (i: number, err: any, next: any, doneBreak: any) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory: any = new AsyncSeriesHookCodeFactory();

const COMPILE: any = function(options: any) {
	factory.setup(this, options);
	return factory.create(options);
};

function AsyncSeriesHook(args = [], name = undefined) {
	const hook: any = new Hook(args, name);
	hook.constructor = AsyncSeriesHook;
	hook.compile = COMPILE;
	hook._call = undefined;
	hook.call = undefined;
	return hook;
}

AsyncSeriesHook.prototype = null;

module.exports = AsyncSeriesHook;
