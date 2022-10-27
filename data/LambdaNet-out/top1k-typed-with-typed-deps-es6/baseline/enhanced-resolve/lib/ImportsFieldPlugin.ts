/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ivan Kopeykin @vankop
*/

"use strict";

import path from 'path';
import DescriptionFileUtils from './DescriptionFileUtils';
import forEachBail from './forEachBail';
import { processImportsField } from './util/entrypoints';
import { parseIdentifier } from './util/identifier';
import { checkImportsExportsFieldTarget } from './util/path';

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
/** @typedef {import("./util/entrypoints").FieldProcessor} FieldProcessor */
/** @typedef {import("./util/entrypoints").ImportsField} ImportsField */

const dotCode: String = ".".charCodeAt(0);

export default class ImportsFieldPlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {Set<string>} conditionNames condition names
	 * @param {string | string[]} fieldNamePath name path
	 * @param {string | ResolveStepHook} targetFile target file
	 * @param {string | ResolveStepHook} targetPackage target package
	 */
	constructor(
		source,
		conditionNames,
		fieldNamePath,
		targetFile,
		targetPackage
	) {
		this.source = source;
		this.targetFile = targetFile;
		this.targetPackage = targetPackage;
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
		const targetFile: String = resolver.ensureHook(this.targetFile);
		const targetPackage: Array = resolver.ensureHook(this.targetPackage);

		resolver
			.getHook(this.source)
			.tapAsync("ImportsFieldPlugin", (request: Object, resolveContext: Function, callback: Function) => {
				// When there is no description file, abort
				if (!request.descriptionFilePath || request.request === undefined) {
					return callback();
				}

				const remainingRequest: String =
					request.request + request.query + request.fragment;
				/** @type {ImportsField|null} */
				const importsField: String = DescriptionFileUtils.getField(
					request.descriptionFileData,
					this.fieldName
				);
				if (!importsField) return callback();

				if (request.directory) {
					return callback(
						new Error(
							`Resolving to directories is not possible with the imports field (request was ${remainingRequest}/)`
						)
					);
				}

				let paths: Array;

				try {
					// We attach the cache to the description file instead of the importsField value
					// because we use a WeakMap and the importsField could be a string too.
					// Description file is always an object when exports field can be accessed.
					let fieldProcessor: Function = this.fieldProcessorCache.get(
						request.descriptionFileData
					);
					if (fieldProcessor === undefined) {
						fieldProcessor = processImportsField(importsField);
						this.fieldProcessorCache.set(
							request.descriptionFileData,
							fieldProcessor
						);
					}
					paths = fieldProcessor(remainingRequest, this.conditionNames);
				} catch (err) {
					if (resolveContext.log) {
						resolveContext.log(
							`Imports field in ${request.descriptionFilePath} can't be processed: ${err}`
						);
					}
					return callback(err);
				}

				if (paths.length === 0) {
					return callback(
						new Error(
							`Package import ${remainingRequest} is not imported from package ${request.descriptionFileRoot} (see imports field in ${request.descriptionFilePath})`
						)
					);
				}

				forEachBail(
					paths,
					(p: Number, callback: Function) => {
						const parsedIdentifier: Array = parseIdentifier(p);

						if (!parsedIdentifier) return callback();

						const [path_, query, fragment] = parsedIdentifier;

						const error: Object = checkImportsExportsFieldTarget(path_);

						if (error) {
							return callback(error);
						}

						switch (path_.charCodeAt(0)) {
							// should be relative
							case dotCode: {
								const obj: Object = {
									...request,
									request: undefined,
									path: path.join(
										/** @type {string} */ (request.descriptionFileRoot),
										path_
									),
									relativePath: path_,
									query,
									fragment
								};

								resolver.doResolve(
									targetFile,
									obj,
									"using imports field: " + p,
									resolveContext,
									callback
								);
								break;
							}

							// package resolving
							default: {
								const obj: Object = {
									...request,
									request: path_,
									relativePath: path_,
									fullySpecified: true,
									query,
									fragment
								};

								resolver.doResolve(
									targetPackage,
									obj,
									"using imports field: " + p,
									resolveContext,
									callback
								);
							}
						}
					},
					(err: Array, result: CachedInputFileSystem) => callback(err, result || null)
				);
			});
	}
};
