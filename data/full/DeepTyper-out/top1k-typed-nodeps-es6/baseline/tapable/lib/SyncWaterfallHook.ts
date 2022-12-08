/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import Hook from './Hook';
import HookCodeFactory from './HookCodeFactory';

class SyncWaterfallHookCodeFactory extends HookCodeFactory {
	content({ onError, onResult, resultReturns, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i: any, err: any) => onError(err),
			onResult: (i: any, result: any, next: any) => {
				let code: string = "";
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

const factory: any = new SyncWaterfallHookCodeFactory();

const TAP_ASYNC: any = () => {
	throw new Error("tapAsync is not supported on a SyncWaterfallHook");
};

const TAP_PROMISE: any = () => {
	throw new Error("tapPromise is not supported on a SyncWaterfallHook");
};

const COMPILE: any = function(options: any) {
	factory.setup(this, options);
	return factory.create(options);
};

function SyncWaterfallHook(args = [], name = undefined) {
	if (args.length < 1)
		throw new Error("Waterfall hooks must have at least one argument");
	const hook: any = new Hook(args, name);
	hook.constructor = SyncWaterfallHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}

SyncWaterfallHook.prototype = null;

export default SyncWaterfallHook;
