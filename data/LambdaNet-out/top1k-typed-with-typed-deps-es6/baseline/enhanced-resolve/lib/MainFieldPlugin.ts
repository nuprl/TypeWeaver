/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import path from 'path';
import DescriptionFileUtils from './DescriptionFileUtils';

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
/** @typedef {{name: string|Array<string>, forceRelative: boolean}} MainFieldOptions */

const alreadyTriedMainField: String = Symbol("alreadyTriedMainField");

export default class MainFieldPlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {MainFieldOptions} options options
	 * @param {string | ResolveStepHook} target target
	 */
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
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
			.tapAsync("MainFieldPlugin", (request: Object, resolveContext: Function, callback: Function) => {
				if (
					request.path !== request.descriptionFileRoot ||
					request[alreadyTriedMainField] === request.descriptionFilePath ||
					!request.descriptionFilePath
				)
					return callback();
				const filename: String = path.basename(request.descriptionFilePath);
				let mainModule: String = DescriptionFileUtils.getField(
					request.descriptionFileData,
					this.options.name
				);

				if (
					!mainModule ||
					typeof mainModule !== "string" ||
					mainModule === "." ||
					mainModule === "./"
				) {
					return callback();
				}
				if (this.options.forceRelative && !/^\.\.?\//.test(mainModule))
					mainModule = "./" + mainModule;
				const obj: Object = {
					...request,
					request: mainModule,
					module: false,
					directory: mainModule.endsWith("/"),
					[alreadyTriedMainField]: request.descriptionFilePath
				};
				return resolver.doResolve(
					target,
					obj,
					"use " +
						mainModule +
						" from " +
						this.options.name +
						" in " +
						filename,
					resolveContext,
					callback
				);
			});
	}
};
