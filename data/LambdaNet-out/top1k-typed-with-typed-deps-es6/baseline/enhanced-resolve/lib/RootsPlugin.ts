/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ivan Kopeykin @vankop
*/

"use strict";

import forEachBail from './forEachBail';

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */

class RootsPlugin {
	/**
	 * @param {string | ResolveStepHook} source source hook
	 * @param {Set<string>} roots roots
	 * @param {string | ResolveStepHook} target target hook
	 */
	constructor(source, roots, target) {
		this.roots = Array.from(roots);
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
			.tapAsync("RootsPlugin", (request: Object, resolveContext: Function, callback: Function) => {
				const req: Array = request.request;
				if (!req) return callback();
				if (!req.startsWith("/")) return callback();

				forEachBail(
					this.roots,
					(root: String, callback: Array) => {
						const path: Number = resolver.join(root, req.slice(1));
						const obj: Object = {
							...request,
							path,
							relativePath: request.relativePath && path
						};
						resolver.doResolve(
							target,
							obj,
							`root path ${root}`,
							resolveContext,
							callback
						);
					},
					callback
				);
			});
	}
}

export default RootsPlugin;
