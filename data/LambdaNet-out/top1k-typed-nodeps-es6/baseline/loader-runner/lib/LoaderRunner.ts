/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
import fs from 'fs';

var readFile: String = fs.readFile.bind(fs);
import loadLoader from './loadLoader';

function utf8BufferToString(buf: String): String {
	var str: String = buf.toString("utf-8");
	if(str.charCodeAt(0) === 0xFEFF) {
		return str.slice(1);
	} else {
		return str;
	}
}

const PATH_QUERY_FRAGMENT_REGEXP: RegExp = /^((?:\0.|[^?#\0])*)(\?(?:\0.|[^#\0])*)?(#.*)?$/;

/**
 * @param {string} str the path with query and fragment
 * @returns {{ path: string, query: string, fragment: string }} parsed parts
 */
function parsePathQueryFragment(str: String): Object {
	var match: Promise = PATH_QUERY_FRAGMENT_REGEXP.exec(str);
	return {
		path: match[1].replace(/\0(.)/g, "$1"),
		query: match[2] ? match[2].replace(/\0(.)/g, "$1") : "",
		fragment: match[3] || ""
	};
}

function dirname(path: String): String {
	if(path === "/") return "/";
	var i: Number = path.lastIndexOf("/");
	var j: Number = path.lastIndexOf("\\");
	var i2: Number = path.indexOf("/");
	var j2: Number = path.indexOf("\\");
	var idx: Number = i > j ? i : j;
	var idx2: Number = i > j ? i2 : j2;
	if(idx < 0) return path;
	if(idx === idx2) return path.slice(0, idx + 1);
	return path.slice(0, idx);
}

function createLoaderObject(loader: Function): String {
	var obj: String = {
		path: null,
		query: null,
		fragment: null,
		options: null,
		ident: null,
		normal: null,
		pitch: null,
		raw: null,
		data: null,
		pitchExecuted: false,
		normalExecuted: false
	};
	Object.defineProperty(obj, "request", {
		enumerable: true,
		get: function() {
			return obj.path.replace(/#/g, "\0#") + obj.query.replace(/#/g, "\0#") + obj.fragment;
		},
		set: function(value: Object) {
			if(typeof value === "string") {
				var splittedRequest: Object = parsePathQueryFragment(value);
				obj.path = splittedRequest.path;
				obj.query = splittedRequest.query;
				obj.fragment = splittedRequest.fragment;
				obj.options = undefined;
				obj.ident = undefined;
			} else {
				if(!value.loader)
					throw new Error("request should be a string or object with loader and options (" + JSON.stringify(value) + ")");
				obj.path = value.loader;
				obj.fragment = value.fragment || "";
				obj.type = value.type;
				obj.options = value.options;
				obj.ident = value.ident;
				if(obj.options === null)
					obj.query = "";
				else if(obj.options === undefined)
					obj.query = "";
				else if(typeof obj.options === "string")
					obj.query = "?" + obj.options;
				else if(obj.ident)
					obj.query = "??" + obj.ident;
				else if(typeof obj.options === "object" && obj.options.ident)
					obj.query = "??" + obj.options.ident;
				else
					obj.query = "?" + JSON.stringify(obj.options);
			}
		}
	});
	obj.request = loader;
	if(Object.preventExtensions) {
		Object.preventExtensions(obj);
	}
	return obj;
}

function runSyncOrAsync(fn: Function, context: Object, args: String, callback: Function): Promise {
	var isSync: Boolean = true;
	var isDone: Boolean = false;
	var isError: Boolean = false; // internal error
	var reportedError: Boolean = false;
	context.async = function async(): Boolean {
		if(isDone) {
			if(reportedError) return; // ignore
			throw new Error("async(): The callback was already called.");
		}
		isSync = false;
		return innerCallback;
	};
	var innerCallback: Boolean = context.callback = function() {
		if(isDone) {
			if(reportedError) return; // ignore
			throw new Error("callback(): The callback was already called.");
		}
		isDone = true;
		isSync = false;
		try {
			callback.apply(null, arguments);
		} catch(e) {
			isError = true;
			throw e;
		}
	};
	try {
		var result: Promise = (function LOADER_EXECUTION(): Promise {
			return fn.apply(context, args);
		}());
		if(isSync) {
			isDone = true;
			if(result === undefined)
				return callback();
			if(result && typeof result === "object" && typeof result.then === "function") {
				return result.then(function(r: Number) {
					callback(null, r);
				}, callback);
			}
			return callback(null, result);
		}
	} catch(e) {
		if(isError) throw e;
		if(isDone) {
			// loader is already "done", so we cannot use the callback function
			// for better debugging we print the error on the console
			if(typeof e === "object" && e.stack) console.error(e.stack);
			else console.error(e);
			return;
		}
		isDone = true;
		reportedError = true;
		callback(e);
	}

}

function convertArgs(args: Promise, raw: Boolean): Void {
	if(!raw && Buffer.isBuffer(args[0]))
		args[0] = utf8BufferToString(args[0]);
	else if(raw && typeof args[0] === "string")
		args[0] = Buffer.from(args[0], "utf-8");
}

function iteratePitchingLoaders(options: Object, loaderContext: HTMLElement, callback: Function): String {
	// abort after last loader
	if(loaderContext.loaderIndex >= loaderContext.loaders.length)
		return processResource(options, loaderContext, callback);

	var currentLoaderObject: HTMLElement = loaderContext.loaders[loaderContext.loaderIndex];

	// iterate
	if(currentLoaderObject.pitchExecuted) {
		loaderContext.loaderIndex++;
		return iteratePitchingLoaders(options, loaderContext, callback);
	}

	// load loader module
	loadLoader(currentLoaderObject, function(err: String) {
		if(err) {
			loaderContext.cacheable(false);
			return callback(err);
		}
		var fn: Number = currentLoaderObject.pitch;
		currentLoaderObject.pitchExecuted = true;
		if(!fn) return iteratePitchingLoaders(options, loaderContext, callback);

		runSyncOrAsync(
			fn,
			loaderContext, [loaderContext.remainingRequest, loaderContext.previousRequest, currentLoaderObject.data = {}],
			function(err: String) {
				if(err) return callback(err);
				var args: Array = Array.prototype.slice.call(arguments, 1);
				// Determine whether to continue the pitching process based on
				// argument values (as opposed to argument presence) in order
				// to support synchronous and asynchronous usages.
				var hasArg: Boolean = args.some(function(value: Number) {
					return value !== undefined;
				});
				if(hasArg) {
					loaderContext.loaderIndex--;
					iterateNormalLoaders(options, loaderContext, args, callback);
				} else {
					iteratePitchingLoaders(options, loaderContext, callback);
				}
			}
		);
	});
}

function processResource(options: Object, loaderContext: HTMLElement, callback: Function): Void {
	// set loader index to last loader
	loaderContext.loaderIndex = loaderContext.loaders.length - 1;

	var resourcePath: String = loaderContext.resourcePath;
	if(resourcePath) {
		options.processResource(loaderContext, resourcePath, function(err: String) {
			if(err) return callback(err);
			var args: Object = Array.prototype.slice.call(arguments, 1);
			options.resourceBuffer = args[0];
			iterateNormalLoaders(options, loaderContext, args, callback);
		});
	} else {
		iterateNormalLoaders(options, loaderContext, [null], callback);
	}
}

function iterateNormalLoaders(options: Object, loaderContext: HTMLElement, args: String, callback: Function): String {
	if(loaderContext.loaderIndex < 0)
		return callback(null, args);

	var currentLoaderObject: HTMLElement = loaderContext.loaders[loaderContext.loaderIndex];

	// iterate
	if(currentLoaderObject.normalExecuted) {
		loaderContext.loaderIndex--;
		return iterateNormalLoaders(options, loaderContext, args, callback);
	}

	var fn: Number = currentLoaderObject.normal;
	currentLoaderObject.normalExecuted = true;
	if(!fn) {
		return iterateNormalLoaders(options, loaderContext, args, callback);
	}

	convertArgs(args, currentLoaderObject.raw);

	runSyncOrAsync(fn, loaderContext, args, function(err: String) {
		if(err) return callback(err);

		var args: String = Array.prototype.slice.call(arguments, 1);
		iterateNormalLoaders(options, loaderContext, args, callback);
	});
}

export const getContext: String = function getContext(resource: String): String {
	var path: String = parsePathQueryFragment(resource).path;
	return dirname(path);
};

export const runLoaders: String = function runLoaders(options: Object, callback: Function): Void {
	// read options
	var resource: Number = options.resource || "";
	var loaders: Array = options.loaders || [];
	var loaderContext: HTMLElement = options.context || {};
	var processResource: String = options.processResource || ((readResource: Function, context: HTMLElement, resource: String, callback: Boolean) => {
		context.addDependency(resource);
		readResource(resource, callback);
	}).bind(null, options.readResource || readFile);

	//
	var splittedResource: Object = resource && parsePathQueryFragment(resource);
	var resourcePath: String = splittedResource ? splittedResource.path : undefined;
	var resourceQuery: String = splittedResource ? splittedResource.query : undefined;
	var resourceFragment: Function = splittedResource ? splittedResource.fragment : undefined;
	var contextDirectory: Object = resourcePath ? dirname(resourcePath) : null;

	// execution state
	var requestCacheable: Boolean = true;
	var fileDependencies: Array = [];
	var contextDependencies: Array = [];
	var missingDependencies: Array = [];

	// prepare loader objects
	loaders = loaders.map(createLoaderObject);

	loaderContext.context = contextDirectory;
	loaderContext.loaderIndex = 0;
	loaderContext.loaders = loaders;
	loaderContext.resourcePath = resourcePath;
	loaderContext.resourceQuery = resourceQuery;
	loaderContext.resourceFragment = resourceFragment;
	loaderContext.async = null;
	loaderContext.callback = null;
	loaderContext.cacheable = function cacheable(flag: Number): Void {
		if(flag === false) {
			requestCacheable = false;
		}
	};
	loaderContext.dependency = loaderContext.addDependency = function addDependency(file: String): Void {
		fileDependencies.push(file);
	};
	loaderContext.addContextDependency = function addContextDependency(context: String): Void {
		contextDependencies.push(context);
	};
	loaderContext.addMissingDependency = function addMissingDependency(context: String): Void {
		missingDependencies.push(context);
	};
	loaderContext.getDependencies = function getDependencies(): Array {
		return fileDependencies.slice();
	};
	loaderContext.getContextDependencies = function getContextDependencies(): Array {
		return contextDependencies.slice();
	};
	loaderContext.getMissingDependencies = function getMissingDependencies(): Array {
		return missingDependencies.slice();
	};
	loaderContext.clearDependencies = function clearDependencies(): Void {
		fileDependencies.length = 0;
		contextDependencies.length = 0;
		missingDependencies.length = 0;
		requestCacheable = true;
	};
	Object.defineProperty(loaderContext, "resource", {
		enumerable: true,
		get: function() {
			if(loaderContext.resourcePath === undefined)
				return undefined;
			return loaderContext.resourcePath.replace(/#/g, "\0#") + loaderContext.resourceQuery.replace(/#/g, "\0#") + loaderContext.resourceFragment;
		},
		set: function(value: Number) {
			var splittedResource: Object = value && parsePathQueryFragment(value);
			loaderContext.resourcePath = splittedResource ? splittedResource.path : undefined;
			loaderContext.resourceQuery = splittedResource ? splittedResource.query : undefined;
			loaderContext.resourceFragment = splittedResource ? splittedResource.fragment : undefined;
		}
	});
	Object.defineProperty(loaderContext, "request", {
		enumerable: true,
		get: function() {
			return loaderContext.loaders.map(function(o: Function) {
				return o.request;
			}).concat(loaderContext.resource || "").join("!");
		}
	});
	Object.defineProperty(loaderContext, "remainingRequest", {
		enumerable: true,
		get: function() {
			if(loaderContext.loaderIndex >= loaderContext.loaders.length - 1 && !loaderContext.resource)
				return "";
			return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(function(o: Function) {
				return o.request;
			}).concat(loaderContext.resource || "").join("!");
		}
	});
	Object.defineProperty(loaderContext, "currentRequest", {
		enumerable: true,
		get: function() {
			return loaderContext.loaders.slice(loaderContext.loaderIndex).map(function(o: Function) {
				return o.request;
			}).concat(loaderContext.resource || "").join("!");
		}
	});
	Object.defineProperty(loaderContext, "previousRequest", {
		enumerable: true,
		get: function() {
			return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(function(o: Function) {
				return o.request;
			}).join("!");
		}
	});
	Object.defineProperty(loaderContext, "query", {
		enumerable: true,
		get: function() {
			var entry: HTMLElement = loaderContext.loaders[loaderContext.loaderIndex];
			return entry.options && typeof entry.options === "object" ? entry.options : entry.query;
		}
	});
	Object.defineProperty(loaderContext, "data", {
		enumerable: true,
		get: function() {
			return loaderContext.loaders[loaderContext.loaderIndex].data;
		}
	});

	// finish loader context
	if(Object.preventExtensions) {
		Object.preventExtensions(loaderContext);
	}

	var processOptions: Object = {
		resourceBuffer: null,
		processResource: processResource
	};
	iteratePitchingLoaders(processOptions, loaderContext, function(err: String, result: String) {
		if(err) {
			return callback(err, {
				cacheable: requestCacheable,
				fileDependencies: fileDependencies,
				contextDependencies: contextDependencies,
				missingDependencies: missingDependencies
			});
		}
		callback(null, {
			result: result,
			resourceBuffer: processOptions.resourceBuffer,
			cacheable: requestCacheable,
			fileDependencies: fileDependencies,
			contextDependencies: contextDependencies,
			missingDependencies: missingDependencies
		});
	});
};
