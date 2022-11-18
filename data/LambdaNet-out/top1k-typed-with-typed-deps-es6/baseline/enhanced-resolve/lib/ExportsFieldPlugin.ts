/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ivan Kopeykin @vankop
*/

"use strict";

import path from 'path';
import DescriptionFileUtils from './DescriptionFileUtils';
import forEachBail from './forEachBail';
import { processExportsField } from './util/entrypoints';
import { parseIdentifier } from './util/identifier';
import { checkImportsExportsFieldTarget } from './util/path';

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
/** @typedef {import("./util/entrypoints").ExportsField} ExportsField */
/** @typedef {import("./util/entrypoints").FieldProcessor} FieldProcessor */

export default class ExportsFieldPlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {Set<string>} conditionNames condition names
	 * @param {string | string[]} fieldNamePath name path
	 * @param {string | ResolveStepHook} target target
	 */
	constructor(source, conditionNames, fieldNamePath, target) {
		this.source = source;
		this.target = target;
		this.conditionNames = conditionNames;
		this.fieldName = fieldNamePath;
		/** @type {WeakMap<any, FieldProcessor>} */
		this.fieldProcessorCache = new WeakMap();
	}

	/**
	 * @param {Resolver} resolver the resolver
	 * @returns {void}
	 */
	apply(resolver) {
		const target: any[] = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("ExportsFieldPlugin", (request: object, resolveContext: Function, callback: Function) => {
				// When there is no description file, abort
				if (!request.descriptionFilePath) return callback();
				if (
					// When the description file is inherited from parent, abort
					// (There is no description file inside of this package)
					request.relativePath !== "." ||
					request.request === undefined
				)
					return callback();

				const remainingRequest: string =
					request.query || request.fragment
						? (request.request === "." ? "./" : request.request) +
						  request.query +
						  request.fragment
						: request.request;
				/** @type {ExportsField|null} */
				const exportsField: string = DescriptionFileUtils.getField(
					request.descriptionFileData,
					this.fieldName
				);
				if (!exportsField) return callback();

				if (request.directory) {
					return callback(
						new Error(
							`Resolving to directories is not possible with the exports field (request was ${remainingRequest}/)`
						)
					);
				}

				let paths: any[];

				try {
					// We attach the cache to the description file instead of the exportsField value
					// because we use a WeakMap and the exportsField could be a string too.
					// Description file is always an object when exports field can be accessed.
					let fieldProcessor: Function = this.fieldProcessorCache.get(
						request.descriptionFileData
					);
					if (fieldProcessor === undefined) {
						fieldProcessor = processExportsField(exportsField);
						this.fieldProcessorCache.set(
							request.descriptionFileData,
							fieldProcessor
						);
					}
					paths = fieldProcessor(remainingRequest, this.conditionNames);
				} catch (err) {
					if (resolveContext.log) {
						resolveContext.log(
							`Exports field in ${request.descriptionFilePath} can't be processed: ${err}`
						);
					}
					return callback(err);
				}

				if (paths.length === 0) {
					return callback(
						new Error(
							`Package path ${remainingRequest} is not exported from package ${request.descriptionFileRoot} (see exports field in ${request.descriptionFilePath})`
						)
					);
				}

				forEachBail(
					paths,
					(p: string, callback: Function) => {
						const parsedIdentifier: any[] = parseIdentifier(p);

						if (!parsedIdentifier) return callback();

						const [relativePath, query, fragment] = parsedIdentifier;

						const error: object = checkImportsExportsFieldTarget(relativePath);

						if (error) {
							return callback(error);
						}

						const obj: object = {
							...request,
							request: undefined,
							path: path.join(
								/** @type {string} */ (request.descriptionFileRoot),
								relativePath
							),
							relativePath,
							query,
							fragment
						};

						resolver.doResolve(
							target,
							obj,
							"using exports field: " + p,
							resolveContext,
							callback
						);
					},
					(err: any[], result: CachedInputFileSystem) => callback(err, result || null)
				);
			});
	}
};
