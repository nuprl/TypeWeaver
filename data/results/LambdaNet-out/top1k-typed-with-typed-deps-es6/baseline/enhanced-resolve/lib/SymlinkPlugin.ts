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
		const target: any[] = resolver.ensureHook(this.target);
		const fs: Function = resolver.fileSystem;
		resolver
			.getHook(this.source)
			.tapAsync("SymlinkPlugin", (request: object, resolveContext: object, callback: Function) => {
				if (request.ignoreSymlinks) return callback();
				const pathsResult: object = getPaths(request.path);
				const pathSegments: any[] = pathsResult.segments;
				const paths: Function = pathsResult.paths;

				let containsSymlink: boolean = false;
				let idx: number = -1;
				forEachBail(
					paths,
					(path: string, callback: Function) => {
						idx++;
						if (resolveContext.fileDependencies)
							resolveContext.fileDependencies.add(path);
						fs.readlink(path, (err: boolean, result: string) => {
							if (!err && result) {
								pathSegments[idx] = result;
								containsSymlink = true;
								// Shortcut when absolute symlink found
								const resultType: number = getType(result.toString());
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
					(err: Function, idx: string) => {
						if (!containsSymlink) return callback();
						const resultSegments: any[] =
							typeof idx === "number"
								? pathSegments.slice(0, idx + 1)
								: pathSegments.slice();
						const result: number = resultSegments.reduceRight((a: string, b: string) => {
							return resolver.join(a, b);
						});
						const obj: object = {
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
