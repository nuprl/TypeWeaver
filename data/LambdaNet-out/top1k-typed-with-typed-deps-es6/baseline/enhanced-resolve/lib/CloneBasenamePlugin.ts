/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import { basename } from './getPaths';

/** @typedef {import("./Resolver")} Resolver */

export default class CloneBasenamePlugin {
	constructor(source, target) {
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
			.tapAsync("CloneBasenamePlugin", (request: object, resolveContext: Function, callback: Function) => {
				const filename: string = basename(request.path);
				const filePath: string = resolver.join(request.path, filename);
				const obj: object = {
					...request,
					path: filePath,
					relativePath:
						request.relativePath &&
						resolver.join(request.relativePath, filename)
				};
				resolver.doResolve(
					target,
					obj,
					"using path: " + filePath,
					resolveContext,
					callback
				);
			});
	}
};
