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
			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
			onResult: (i, result, next) =>
				`if(${result} !== undefined) {\n${onResult(
					result
				)}\n} else {\n${next()}}\n`,
			resultReturns,
			onDone
		});
	}
}

const factory: Hook = new AsyncSeriesBailHookCodeFactory();

const COMPILE: Function = function(options: Object) {
	factory.setup(this, options);
	return factory.create(options);
};

function AsyncSeriesBailHook(args: String = [], name: String = undefined): Hook {
	const hook: Hook = new Hook(args, name);
	hook.constructor = AsyncSeriesBailHook;
	hook.compile = COMPILE;
	hook._call = undefined;
	hook.call = undefined;
	return hook;
}

AsyncSeriesBailHook.prototype = null;

export default AsyncSeriesBailHook;
