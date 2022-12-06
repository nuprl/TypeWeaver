/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook: any = require("./Hook");
const HookCodeFactory: any = require("./HookCodeFactory");

class SyncBailHookCodeFactory extends HookCodeFactory {
	content({ onError, onResult, resultReturns, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i: number, err: Error) => onError(err),
			onResult: (i: string, result: string, next: any) =>
				`if(${result} !== undefined) {\n${onResult(
					result
				)};\n} else {\n${next()}}\n`,
			resultReturns,
			onDone,
			rethrowIfPossible
		});
	}
}

const factory: any = new SyncBailHookCodeFactory();

const TAP_ASYNC: any = () => {
	throw new Error("tapAsync is not supported on a SyncBailHook");
};

const TAP_PROMISE: any = () => {
	throw new Error("tapPromise is not supported on a SyncBailHook");
};

const COMPILE: any = function(options: any) {
	factory.setup(this, options);
	return factory.create(options);
};

function SyncBailHook(args = [], name = undefined) {
	const hook: any = new Hook(args, name);
	hook.constructor = SyncBailHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}

SyncBailHook.prototype = null;

module.exports = SyncBailHook;
