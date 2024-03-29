/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const forEachBail: Function = require("./forEachBail");

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveContext} ResolveContext */

/**
 * @typedef {Object} DescriptionFileInfo
 * @property {any=} content
 * @property {string} path
 * @property {string} directory
 */

/**
 * @callback ErrorFirstCallback
 * @param {Error|null=} error
 * @param {DescriptionFileInfo=} result
 */

/**
 * @param {Resolver} resolver resolver
 * @param {string} directory directory
 * @param {string[]} filenames filenames
 * @param {DescriptionFileInfo|undefined} oldInfo oldInfo
 * @param {ResolveContext} resolveContext resolveContext
 * @param {ErrorFirstCallback} callback callback
 */
function loadDescriptionFile(
	resolver: Resolver,
	directory: boolean,
	filenames: string,
	oldInfo: object,
	resolveContext: object,
	callback: Function
): void {
	(function findDescriptionFile(): void {
		if (oldInfo && oldInfo.directory === directory) {
			// We already have info for this directory and can reuse it
			return callback(null, oldInfo);
		}
		forEachBail(
			filenames,
			(filename: string, callback: Function) => {
				const descriptionFilePath: string = resolver.join(directory, filename);
				if (resolver.fileSystem.readJson) {
					resolver.fileSystem.readJson(descriptionFilePath, (err: object, content: string) => {
						if (err) {
							if (typeof err.code !== "undefined") {
								if (resolveContext.missingDependencies) {
									resolveContext.missingDependencies.add(descriptionFilePath);
								}
								return callback();
							}
							if (resolveContext.fileDependencies) {
								resolveContext.fileDependencies.add(descriptionFilePath);
							}
							return onJson(err);
						}
						if (resolveContext.fileDependencies) {
							resolveContext.fileDependencies.add(descriptionFilePath);
						}
						onJson(null, content);
					});
				} else {
					resolver.fileSystem.readFile(descriptionFilePath, (err: boolean, content: number) => {
						if (err) {
							if (resolveContext.missingDependencies) {
								resolveContext.missingDependencies.add(descriptionFilePath);
							}
							return callback();
						}
						if (resolveContext.fileDependencies) {
							resolveContext.fileDependencies.add(descriptionFilePath);
						}
						let json: number;

						if (content) {
							try {
								json = JSON.parse(content.toString());
							} catch (e) {
								return onJson(e);
							}
						} else {
							return onJson(new Error("No content in file"));
						}

						onJson(null, json);
					});
				}

				function onJson(err: any[], content: string): void {
					if (err) {
						if (resolveContext.log)
							resolveContext.log(
								descriptionFilePath + " (directory description file): " + err
							);
						else
							err.message =
								descriptionFilePath + " (directory description file): " + err;
						return callback(err);
					}
					callback(null, {
						content,
						directory,
						path: descriptionFilePath
					});
				}
			},
			(err: Resolver, result: boolean) => {
				if (err) return callback(err);
				if (result) {
					return callback(null, result);
				} else {
					const dir: boolean = cdUp(directory);
					if (!dir) {
						return callback();
					} else {
						directory = dir;
						return findDescriptionFile();
					}
				}
			}
		);
	})();
}

/**
 * @param {any} content content
 * @param {string|string[]} field field
 * @returns {object|string|number|boolean|undefined} field data
 */
function getField(content: object, field: any[]): object {
	if (!content) return undefined;
	if (Array.isArray(field)) {
		let current: object = content;
		for (let j = 0; j < field.length; j++) {
			if (current === null || typeof current !== "object") {
				current = null;
				break;
			}
			current = current[field[j]];
		}
		return current;
	} else {
		return content[field];
	}
}

/**
 * @param {string} directory directory
 * @returns {string|null} parent directory or null
 */
function cdUp(directory: string): string {
	if (directory === "/") return null;
	const i: number = directory.lastIndexOf("/"),
		j: number = directory.lastIndexOf("\\");
	const p: number = i < 0 ? j : j < 0 ? i : i < j ? j : i;
	if (p < 0) return null;
	return directory.substr(0, p || 1);
}

exports.loadDescriptionFile = loadDescriptionFile;
exports.getField = getField;
exports.cdUp = cdUp;
