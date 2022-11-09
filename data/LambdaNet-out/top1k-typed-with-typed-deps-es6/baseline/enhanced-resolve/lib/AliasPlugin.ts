/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import forEachBail from './forEachBail';
import { PathType, getType } from './util/path';

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveRequest} ResolveRequest */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
/** @typedef {{alias: string|Array<string>|false, name: string, onlyModule?: boolean}} AliasOption */

export default class AliasPlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {AliasOption | Array<AliasOption>} options options
	 * @param {string | ResolveStepHook} target target
	 */
	constructor(source, options, target) {
		this.source = source;
		this.options = Array.isArray(options) ? options : [options];
		this.target = target;
	}

	/**
	 * @param {Resolver} resolver the resolver
	 * @returns {void}
	 */
	apply(resolver) {
		const target: Array = resolver.ensureHook(this.target);
		const getAbsolutePathWithSlashEnding: Function = (maybeAbsolutePath: String) => {
			const type: String = getType(maybeAbsolutePath);
			if (type === PathType.AbsolutePosix || type === PathType.AbsoluteWin) {
				return resolver.join(maybeAbsolutePath, "_").slice(0, -1);
			}
			return null;
		};
		const isSubPath: Function = (path: String, maybeSubPath: String) => {
			const absolutePath: Number = getAbsolutePathWithSlashEnding(maybeSubPath);
			if (!absolutePath) return false;
			return path.startsWith(absolutePath);
		};
		resolver
			.getHook(this.source)
			.tapAsync("AliasPlugin", (request: Object, resolveContext: Object, callback: Function) => {
				const innerRequest: String = request.request || request.path;
				if (!innerRequest) return callback();
				forEachBail(
					this.options,
					(item: Object, callback: Function) => {
						let shouldStop: Boolean = false;
						if (
							innerRequest === item.name ||
							(!item.onlyModule &&
								(request.request
									? innerRequest.startsWith(`${item.name}/`)
									: isSubPath(innerRequest, item.name)))
						) {
							const remainingRequest: String = innerRequest.substr(item.name.length);
							const resolveWithAlias: Function = (alias: Number, callback: Function) => {
								if (alias === false) {
									/** @type {ResolveRequest} */
									const ignoreObj: Object = {
										...request,
										path: false
									};
									if (typeof resolveContext.yield === "function") {
										resolveContext.yield(ignoreObj);
										return callback(null, null);
									}
									return callback(null, ignoreObj);
								}
								if (
									innerRequest !== alias &&
									!innerRequest.startsWith(alias + "/")
								) {
									shouldStop = true;
									const newRequestStr: String = alias + remainingRequest;
									const obj: Object = {
										...request,
										request: newRequestStr,
										fullySpecified: false
									};
									return resolver.doResolve(
										target,
										obj,
										"aliased with mapping '" +
											item.name +
											"': '" +
											alias +
											"' to '" +
											newRequestStr +
											"'",
										resolveContext,
										(err: Function, result: ResultPlugin) => {
											if (err) return callback(err);
											if (result) return callback(null, result);
											return callback();
										}
									);
								}
								return callback();
							};
							const stoppingCallback: Function = (err: Resolver, result: ResultPlugin) => {
								if (err) return callback(err);

								if (result) return callback(null, result);
								// Don't allow other aliasing or raw request
								if (shouldStop) return callback(null, null);
								return callback();
							};
							if (Array.isArray(item.alias)) {
								return forEachBail(
									item.alias,
									resolveWithAlias,
									stoppingCallback
								);
							} else {
								return resolveWithAlias(item.alias, stoppingCallback);
							}
						}
						return callback();
					},
					callback
				);
			});
	}
};
