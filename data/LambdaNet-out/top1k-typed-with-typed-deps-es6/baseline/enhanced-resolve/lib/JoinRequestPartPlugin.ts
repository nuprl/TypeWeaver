/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */

const namespaceStartCharCode: String = "@".charCodeAt(0);

export default class JoinRequestPartPlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {string | ResolveStepHook} target target
	 */
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	/**
	 * @param {Resolver} resolver the resolver
	 * @returns {void}
	 */
	apply(resolver) {
		const target: Array = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync(
				"JoinRequestPartPlugin",
				(request: Object, resolveContext: Function, callback: Function) => {
					const req: String = request.request || "";
					let i: Number = req.indexOf("/", 3);

					if (i >= 0 && req.charCodeAt(2) === namespaceStartCharCode) {
						i = req.indexOf("/", i + 1);
					}

					let moduleName: String, remainingRequest: String, fullySpecified: Boolean;
					if (i < 0) {
						moduleName = req;
						remainingRequest = ".";
						fullySpecified = false;
					} else {
						moduleName = req.slice(0, i);
						remainingRequest = "." + req.slice(i);
						fullySpecified = request.fullySpecified;
					}
					const obj: Object = {
						...request,
						path: resolver.join(request.path, moduleName),
						relativePath:
							request.relativePath &&
							resolver.join(request.relativePath, moduleName),
						request: remainingRequest,
						fullySpecified
					};
					resolver.doResolve(target, obj, null, resolveContext, callback);
				}
			);
	}
};
