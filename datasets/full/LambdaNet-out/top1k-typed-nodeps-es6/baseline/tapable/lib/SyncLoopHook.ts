/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import Hook from './Hook';
import HookCodeFactory from './HookCodeFactory';

class SyncLoopHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone, rethrowIfPossible }) {
		return this.callTapsLooping({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

const factory: Hook = new SyncLoopHookCodeFactory();

const TAP_ASYNC: Function = () => {
	throw new Error("tapAsync is not supported on a SyncLoopHook");
};

const TAP_PROMISE: Function = () => {
	throw new Error("tapPromise is not supported on a SyncLoopHook");
};

const COMPILE: Function = function(options: object) {
	factory.setup(this, options);
	return factory.create(options);
};

function SyncLoopHook(args: string = [], name: string = undefined): Hook {
	const hook: Hook = new Hook(args, name);
	hook.constructor = SyncLoopHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}

SyncLoopHook.prototype = null;

export default SyncLoopHook;
