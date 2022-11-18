/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const fs: string = require("graceful-fs");
const CachedInputFileSystem: any[] = require("./CachedInputFileSystem");
const ResolverFactory: Resolver = require("./ResolverFactory");

/** @typedef {import("./PnpPlugin").PnpApiImpl} PnpApi */
/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").FileSystem} FileSystem */
/** @typedef {import("./Resolver").ResolveContext} ResolveContext */
/** @typedef {import("./Resolver").ResolveRequest} ResolveRequest */
/** @typedef {import("./ResolverFactory").Plugin} Plugin */
/** @typedef {import("./ResolverFactory").UserResolveOptions} ResolveOptions */

const nodeFileSystem: string = new CachedInputFileSystem(fs, 4000);

const nodeContext: object = {
	environments: ["node+es3+es5+process+native"]
};

const asyncResolver: Resolver = ResolverFactory.createResolver({
	conditionNames: ["node"],
	extensions: [".js", ".json", ".node"],
	fileSystem: nodeFileSystem
});
function resolve(context: string, path: string, request: Function, resolveContext: Resolver, callback: string): Void {
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
function resolveSync(context: string, path: string, request: object): Promise {
	if (typeof context === "string") {
		request = path;
		path = context;
		context = nodeContext;
	}
	return syncResolver.resolveSync(context, path, request);
}

function create(options: object): Function {
	options = {
		fileSystem: nodeFileSystem,
		...options
	};
	const resolver: Resolver = ResolverFactory.createResolver(options);
	return function (context: number, path: string, request: Function, resolveContext: string, callback: Function) {
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

function createSync(options: object): Function {
	options = {
		useSyncFileSystemCalls: true,
		fileSystem: nodeFileSystem,
		...options
	};
	const resolver: Resolver = ResolverFactory.createResolver(options);
	return function (context: number, path: string, request: object) {
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
const mergeExports: Function = (obj: any[], exports: any[]) => {
	const descriptors: Resolver = Object.getOwnPropertyDescriptors(exports);
	Object.defineProperties(obj, descriptors);
	return /** @type {A & B} */ (Object.freeze(obj));
};

module.exports = mergeExports(resolve, {
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
