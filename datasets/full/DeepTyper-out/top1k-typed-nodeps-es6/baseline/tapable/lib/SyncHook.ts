/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import Hook from './Hook';
import HookCodeFactory from './HookCodeFactory';

class SyncHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i: any, err: Error) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

const factory: any = new SyncHookCodeFactory();

const TAP_ASYNC: any = () => {
	throw new Error("tapAsync is not supported on a SyncHook");
};

const TAP_PROMISE: any = () => {
	throw new Error("tapPromise is not supported on a SyncHook");
};

const COMPILE: any = function(options: any) {
	factory.setup(this, options);
	return factory.create(options);
};

function SyncHook(args = [], name = undefined) {
	const hook: any = new Hook(args, name);
	hook.constructor = SyncHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}

SyncHook.prototype = null;

export default SyncHook;
