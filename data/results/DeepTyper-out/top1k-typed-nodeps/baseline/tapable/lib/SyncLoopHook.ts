/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook: any = require("./Hook");
const HookCodeFactory: any = require("./HookCodeFactory");

class SyncLoopHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone, rethrowIfPossible }) {
		return this.callTapsLooping({
			onError: (i: string, err: Error) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

const factory: any = new SyncLoopHookCodeFactory();

const TAP_ASYNC: any = () => {
	throw new Error("tapAsync is not supported on a SyncLoopHook");
};

const TAP_PROMISE: any = () => {
	throw new Error("tapPromise is not supported on a SyncLoopHook");
};

const COMPILE: any = function(options: any) {
	factory.setup(this, options);
	return factory.create(options);
};

function SyncLoopHook(args = [], name = undefined) {
	const hook: any = new Hook(args, name);
	hook.constructor = SyncLoopHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}

SyncLoopHook.prototype = null;

module.exports = SyncLoopHook;
