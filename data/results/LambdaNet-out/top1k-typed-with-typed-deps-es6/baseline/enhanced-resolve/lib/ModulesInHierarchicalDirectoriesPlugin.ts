/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import forEachBail from './forEachBail';
import getPaths from './getPaths';

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */

export default class ModulesInHierarchicalDirectoriesPlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {string | Array<string>} directories directories
	 * @param {string | ResolveStepHook} target target
	 */
	constructor(source, directories, target) {
		this.source = source;
		this.directories = /** @type {Array<string>} */ ([]).concat(directories);
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
			.tapAsync(
				"ModulesInHierarchicalDirectoriesPlugin",
				(request: object, resolveContext: object, callback: Function) => {
					const fs: Function = resolver.fileSystem;
					const addrs: any[] = getPaths(request.path)
						.paths.map((p: string) => {
							return this.directories.map((d: string) => resolver.join(p, d));
						})
						.reduce((array: any[], p: Function) => {
							array.push.apply(array, p);
							return array;
						}, []);
					forEachBail(
						addrs,
						(addr: number, callback: Function) => {
							fs.stat(addr, (err: boolean, stat: Resolver) => {
								if (!err && stat && stat.isDirectory()) {
									const obj: object = {
										...request,
										path: addr,
										request: "./" + request.request,
										module: false
									};
									const message: string = "looking for modules in " + addr;
									return resolver.doResolve(
										target,
										obj,
										message,
										resolveContext,
										callback
									);
								}
								if (resolveContext.log)
									resolveContext.log(
										addr + " doesn't exist or is not a directory"
									);
								if (resolveContext.missingDependencies)
									resolveContext.missingDependencies.add(addr);
								return callback();
							});
						},
						callback
					);
				}
			);
	}
};
