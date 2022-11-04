/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import DescriptionFileUtils from './DescriptionFileUtils';
import getInnerRequest from './getInnerRequest';

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveRequest} ResolveRequest */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */

export default class AliasFieldPlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {string | Array<string>} field field
	 * @param {string | ResolveStepHook} target target
	 */
	constructor(source, field, target) {
		this.source = source;
		this.field = field;
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
			.tapAsync("AliasFieldPlugin", (request: Object, resolveContext: Object, callback: Function) => {
				if (!request.descriptionFileData) return callback();
				const innerRequest: String = getInnerRequest(resolver, request);
				if (!innerRequest) return callback();
				const fieldData: Object = DescriptionFileUtils.getField(
					request.descriptionFileData,
					this.field
				);
				if (fieldData === null || typeof fieldData !== "object") {
					if (resolveContext.log)
						resolveContext.log(
							"Field '" +
								this.field +
								"' doesn't contain a valid alias configuration"
						);
					return callback();
				}
				const data: String = Object.prototype.hasOwnProperty.call(
					fieldData,
					innerRequest
				)
					? fieldData[innerRequest]
					: innerRequest.startsWith("./")
					? fieldData[innerRequest.slice(2)]
					: undefined;
				if (data === innerRequest) return callback();
				if (data === undefined) return callback();
				if (data === false) {
					/** @type {ResolveRequest} */
					const ignoreObj: Object = {
						...request,
						path: false
					};
					if (typeof resolveContext.yield === "function") {
						resolveContext.yield(ignoreObj);
						return callback(null, null);
					}
					return callback(null, ignoreObj);
				}
				const obj: Object = {
					...request,
					path: request.descriptionFileRoot,
					request: data,
					fullySpecified: false
				};
				resolver.doResolve(
					target,
					obj,
					"aliased from description file " +
						request.descriptionFilePath +
						" with mapping '" +
						innerRequest +
						"' to '" +
						data +
						"'",
					resolveContext,
					(err: Function, result: CachedInputFileSystem) => {
						if (err) return callback(err);

						// Don't allow other aliasing or raw request
						if (result === undefined) return callback(null, null);
						callback(null, result);
					}
				);
			});
	}
};