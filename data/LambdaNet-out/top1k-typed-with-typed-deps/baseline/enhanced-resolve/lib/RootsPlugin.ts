/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ivan Kopeykin @vankop
*/

"use strict";

const forEachBail: Function = require("./forEachBail");

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
		const target: any[] = resolver.ensureHook(this.target);

		resolver
			.getHook(this.source)
			.tapAsync("RootsPlugin", (request: Request, resolveContext: Function, callback: Function) => {
				const req: string = request.request;
				if (!req) return callback();
				if (!req.startsWith("/")) return callback();

				forEachBail(
					this.roots,
					(root: string, callback: any[]) => {
						const path: string = resolver.join(root, req.slice(1));
						const obj: object = {
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

module.exports = RootsPlugin;
