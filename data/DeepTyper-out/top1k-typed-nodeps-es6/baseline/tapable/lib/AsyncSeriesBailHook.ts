/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import Hook from './Hook';
import HookCodeFactory from './HookCodeFactory';

class AsyncSeriesBailHookCodeFactory extends HookCodeFactory {
	content({ onError, onResult, resultReturns, onDone }) {
		return this.callTapsSeries({
			onError: (i: number, err: any, next: any, doneBreak: any) => onError(err) + doneBreak(true),
			onResult: (i: number, result: any, next: any) =>
				`if(${result} !== undefined) {\n${onResult(
					result
				)}\n} else {\n${next()}}\n`,
			resultReturns,
			onDone
		});
	}
}

const factory: any = new AsyncSeriesBailHookCodeFactory();

const COMPILE: any = function(options: any) {
	factory.setup(this, options);
	return factory.create(options);
};

function AsyncSeriesBailHook(args = [], name = undefined) {
	const hook: any = new Hook(args, name);
	hook.constructor = AsyncSeriesBailHook;
	hook.compile = COMPILE;
	hook._call = undefined;
	hook.call = undefined;
	return hook;
}

AsyncSeriesBailHook.prototype = null;

export default AsyncSeriesBailHook;
