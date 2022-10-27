/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook: Array = require("./Hook");
const HookCodeFactory: HookCodeFactory = require("./HookCodeFactory");

class SyncWaterfallHookCodeFactory extends HookCodeFactory {
	content({ onError, onResult, resultReturns, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onResult: (i, result, next) => {
				let code = "";
				code += `if(${result} !== undefined) {\n`;
				code += `${this._args[0]} = ${result};\n`;
				code += `}\n`;
				code += next();
				return code;
			},
			onDone: () => onResult(this._args[0]),
			doneReturns: resultReturns,
			rethrowIfPossible
		});
	}
}

const factory: Hook = new SyncWaterfallHookCodeFactory();

const TAP_ASYNC: Function = () => {
	throw new Error("tapAsync is not supported on a SyncWaterfallHook");
};

const TAP_PROMISE: Function = () => {
	throw new Error("tapPromise is not supported on a SyncWaterfallHook");
};

const COMPILE: Function = function(options: Object) {
	factory.setup(this, options);
	return factory.create(options);
};

function SyncWaterfallHook(args: Array = [], name: String = undefined): Hook {
	if (args.length < 1)
		throw new Error("Waterfall hooks must have at least one argument");
	const hook: Hook = new Hook(args, name);
	hook.constructor = SyncWaterfallHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}

SyncWaterfallHook.prototype = null;

module.exports = SyncWaterfallHook;
