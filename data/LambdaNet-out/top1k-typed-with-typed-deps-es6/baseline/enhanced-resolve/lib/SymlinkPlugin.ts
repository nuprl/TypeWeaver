/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import forEachBail from './forEachBail';
import getPaths from './getPaths';
import { getType, PathType } from './util/path';

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */

export default class SymlinkPlugin {
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
		const fs: Function = resolver.fileSystem;
		resolver
			.getHook(this.source)
			.tapAsync("SymlinkPlugin", (request: Object, resolveContext: Object, callback: Function) => {
				if (request.ignoreSymlinks) return callback();
				const pathsResult: Object = getPaths(request.path);
				const pathSegments: Array = pathsResult.segments;
				const paths: Function = pathsResult.paths;

				let containsSymlink: Boolean = false;
				let idx: Number = -1;
				forEachBail(
					paths,
					(path: String, callback: Function) => {
						idx++;
						if (resolveContext.fileDependencies)
							resolveContext.fileDependencies.add(path);
						fs.readlink(path, (err: Boolean, result: String) => {
							if (!err && result) {
								pathSegments[idx] = result;
								containsSymlink = true;
								// Shortcut when absolute symlink found
								const resultType: Number = getType(result.toString());
								if (
									resultType === PathType.AbsoluteWin ||
									resultType === PathType.AbsolutePosix
								) {
									return callback(null, idx);
								}
							}
							callback();
						});
					},
					(err: CacheBackend, idx: String) => {
						if (!containsSymlink) return callback();
						const resultSegments: Array =
							typeof idx === "number"
								? pathSegments.slice(0, idx + 1)
								: pathSegments.slice();
						const result: Number = resultSegments.reduceRight((a: String, b: String) => {
							return resolver.join(a, b);
						});
						const obj: Object = {
							...request,
							path: result
						};
						resolver.doResolve(
							target,
							obj,
							"resolved symlink to " + result,
							resolveContext,
							callback
						);
					}
				);
			});
	}
};
