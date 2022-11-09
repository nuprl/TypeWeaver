/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import fs from 'graceful-fs';
import CachedInputFileSystem from './CachedInputFileSystem';
import ResolverFactory from './ResolverFactory';

/** @typedef {import("./PnpPlugin").PnpApiImpl} PnpApi */
/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").FileSystem} FileSystem */
/** @typedef {import("./Resolver").ResolveContext} ResolveContext */
/** @typedef {import("./Resolver").ResolveRequest} ResolveRequest */
/** @typedef {import("./ResolverFactory").Plugin} Plugin */
/** @typedef {import("./ResolverFactory").UserResolveOptions} ResolveOptions */

const nodeFileSystem: Function = new CachedInputFileSystem(fs, 4000);

const nodeContext: Object = {
	environments: ["node+es3+es5+process+native"]
};

const asyncResolver: Resolver = ResolverFactory.createResolver({
	conditionNames: ["node"],
	extensions: [".js", ".json", ".node"],
	fileSystem: nodeFileSystem
});
function resolve(context: String, path: String, request: Function, resolveContext: String, callback: String): Void {
	if (typeof context === "string") {
		callback = resolveContext;
		resolveContext = request;
		request = path;
		path = context;
		context = nodeContext;
	}
	if (typeof callback !== "function") {
		callback = resolveContext;
	}
	asyncResolver.resolve(context, path, request, resolveContext, callback);
}

const syncResolver: Resolver = ResolverFactory.createResolver({
	conditionNames: ["node"],
	extensions: [".js", ".json", ".node"],
	useSyncFileSystemCalls: true,
	fileSystem: nodeFileSystem
});
function resolveSync(context: String, path: String, request: Object): Promise {
	if (typeof context === "string") {
		request = path;
		path = context;
		context = nodeContext;
	}
	return syncResolver.resolveSync(context, path, request);
}

function create(options: Object): Function {
	options = {
		fileSystem: nodeFileSystem,
		...options
	};
	const resolver: Resolver = ResolverFactory.createResolver(options);
	return function (context: Number, path: String, request: Object, resolveContext: String, callback: Function) {
		if (typeof context === "string") {
			callback = resolveContext;
			resolveContext = request;
			request = path;
			path = context;
			context = nodeContext;
		}
		if (typeof callback !== "function") {
			callback = resolveContext;
		}
		resolver.resolve(context, path, request, resolveContext, callback);
	};
}

function createSync(options: Object): Function {
	options = {
		useSyncFileSystemCalls: true,
		fileSystem: nodeFileSystem,
		...options
	};
	const resolver: Resolver = ResolverFactory.createResolver(options);
	return function (context: Number, path: String, request: ResultPlugin) {
		if (typeof context === "string") {
			request = path;
			path = context;
			context = nodeContext;
		}
		return resolver.resolveSync(context, path, request);
	};
}

/**
 * @template A
 * @template B
 * @param {A} obj input a
 * @param {B} exports input b
 * @returns {A & B} merged
 */
const mergeExports: Function = (obj: Array, exports: String) => {
	const descriptors: Object = Object.getOwnPropertyDescriptors(exports);
	Object.defineProperties(obj, descriptors);
	return /** @type {A & B} */ (Object.freeze(obj));
};

export default mergeExports(resolve, {
	get sync() {
		return resolveSync;
	},
	create: mergeExports(create, {
		get sync() {
			return createSync;
		}
	}),
	ResolverFactory,
	CachedInputFileSystem,
	get CloneBasenamePlugin() {
		return require("./CloneBasenamePlugin");
	},
	get LogInfoPlugin() {
		return require("./LogInfoPlugin");
	},
	get forEachBail() {
		return require("./forEachBail");
	}
});
