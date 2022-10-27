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
		const target: Array = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("CloneBasenamePlugin", (request: Object, resolveContext: Function, callback: Function) => {
				const filename: String = basename(request.path);
				const filePath: String = resolver.join(request.path, filename);
				const obj: Object = {
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
