/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ivan Kopeykin @vankop
*/

"use strict";

/** @typedef {string|(string|ConditionalMapping)[]} DirectMapping */
/** @typedef {{[k: string]: MappingValue}} ConditionalMapping */
/** @typedef {ConditionalMapping|DirectMapping|null} MappingValue */
/** @typedef {Record<string, MappingValue>|ConditionalMapping|DirectMapping} ExportsField */
/** @typedef {Record<string, MappingValue>} ImportsField */

/**
 * @typedef {Object} PathTreeNode
 * @property {Map<string, PathTreeNode>|null} children
 * @property {MappingValue} folder
 * @property {Map<string, MappingValue>|null} wildcards
 * @property {Map<string, MappingValue>} files
 */

/**
 * Processing exports/imports field
 * @callback FieldProcessor
 * @param {string} request request
 * @param {Set<string>} conditionNames condition names
 * @returns {string[]} resolved paths
 */

/*
Example exports field:
{
  ".": "./main.js",
  "./feature": {
    "browser": "./feature-browser.js",
    "default": "./feature.js"
  }
}
Terminology:

Enhanced-resolve name keys ("." and "./feature") as exports field keys.

If value is string or string[], mapping is called as a direct mapping
and value called as a direct export.

If value is key-value object, mapping is called as a conditional mapping
and value called as a conditional export.

Key in conditional mapping is called condition name.

Conditional mapping nested in another conditional mapping is called nested mapping.

----------

Example imports field:
{
  "#a": "./main.js",
  "#moment": {
    "browser": "./moment/index.js",
    "default": "moment"
  },
  "#moment/": {
    "browser": "./moment/",
    "default": "moment/"
  }
}
Terminology:

Enhanced-resolve name keys ("#a" and "#moment/", "#moment") as imports field keys.

If value is string or string[], mapping is called as a direct mapping
and value called as a direct export.

If value is key-value object, mapping is called as a conditional mapping
and value called as a conditional export.

Key in conditional mapping is called condition name.

Conditional mapping nested in another conditional mapping is called nested mapping.

*/

const slashCode: number = "/".charCodeAt(0);
const dotCode: number = ".".charCodeAt(0);
const hashCode: number = "#".charCodeAt(0);

/**
 * @param {ExportsField} exportsField the exports field
 * @returns {FieldProcessor} process callback
 */
export const processExportsField: string = function processExportsField(
	exportsField: string
): Resolver {
	return createFieldProcessor(
		buildExportsFieldPathTree(exportsField),
		assertExportsFieldRequest,
		assertExportTarget
	);
};

/**
 * @param {ImportsField} importsField the exports field
 * @returns {FieldProcessor} process callback
 */
export const processImportsField: string = function processImportsField(
	importsField: string
): Resolver {
	return createFieldProcessor(
		buildImportsFieldPathTree(importsField),
		assertImportsFieldRequest,
		assertImportTarget
	);
};

/**
 * @param {PathTreeNode} treeRoot root
 * @param {(s: string) => string} assertRequest assertRequest
 * @param {(s: string, f: boolean) => void} assertTarget assertTarget
 * @returns {FieldProcessor} field processor
 */
function createFieldProcessor(treeRoot: string, assertRequest: Function, assertTarget: number): Function {
	return function fieldProcessor(request: any[], conditionNames: boolean): any[] {
		request = assertRequest(request);

		const match: any[] = findMatch(request, treeRoot);

		if (match === null) return [];

		const [mapping, remainRequestIndex] = match;

		/** @type {DirectMapping|null} */
		let direct: string = null;

		if (isConditionalMapping(mapping)) {
			direct = conditionalMapping(
				/** @type {ConditionalMapping} */ (mapping),
				conditionNames
			);

			// matching not found
			if (direct === null) return [];
		} else {
			direct = /** @type {DirectMapping} */ (mapping);
		}

		const remainingRequest: Function =
			remainRequestIndex === request.length + 1
				? undefined
				: remainRequestIndex < 0
				? request.slice(-remainRequestIndex - 1)
				: request.slice(remainRequestIndex);

		return directMapping(
			remainingRequest,
			remainRequestIndex < 0,
			direct,
			conditionNames,
			assertTarget
		);
	};
}

/**
 * @param {string} request request
 * @returns {string} updated request
 */
function assertExportsFieldRequest(request: string): any[] {
	if (request.charCodeAt(0) !== dotCode) {
		throw new Error('Request should be relative path and start with "."');
	}
	if (request.length === 1) return "";
	if (request.charCodeAt(1) !== slashCode) {
		throw new Error('Request should be relative path and start with "./"');
	}
	if (request.charCodeAt(request.length - 1) === slashCode) {
		throw new Error("Only requesting file allowed");
	}

	return request.slice(2);
}

/**
 * @param {string} request request
 * @returns {string} updated request
 */
function assertImportsFieldRequest(request: string): any[] {
	if (request.charCodeAt(0) !== hashCode) {
		throw new Error('Request should start with "#"');
	}
	if (request.length === 1) {
		throw new Error("Request should have at least 2 characters");
	}
	if (request.charCodeAt(1) === slashCode) {
		throw new Error('Request should not start with "#/"');
	}
	if (request.charCodeAt(request.length - 1) === slashCode) {
		throw new Error("Only requesting file allowed");
	}

	return request.slice(1);
}

/**
 * @param {string} exp export target
 * @param {boolean} expectFolder is folder expected
 */
function assertExportTarget(exp: string, expectFolder: boolean): void {
	if (
		exp.charCodeAt(0) === slashCode ||
		(exp.charCodeAt(0) === dotCode && exp.charCodeAt(1) !== slashCode)
	) {
		throw new Error(
			`Export should be relative path and start with "./", got ${JSON.stringify(
				exp
			)}.`
		);
	}

	const isFolder: boolean = exp.charCodeAt(exp.length - 1) === slashCode;

	if (isFolder !== expectFolder) {
		throw new Error(
			expectFolder
				? `Expecting folder to folder mapping. ${JSON.stringify(
						exp
				  )} should end with "/"`
				: `Expecting file to file mapping. ${JSON.stringify(
						exp
				  )} should not end with "/"`
		);
	}
}

/**
 * @param {string} imp import target
 * @param {boolean} expectFolder is folder expected
 */
function assertImportTarget(imp: string, expectFolder: boolean): void {
	const isFolder: boolean = imp.charCodeAt(imp.length - 1) === slashCode;

	if (isFolder !== expectFolder) {
		throw new Error(
			expectFolder
				? `Expecting folder to folder mapping. ${JSON.stringify(
						imp
				  )} should end with "/"`
				: `Expecting file to file mapping. ${JSON.stringify(
						imp
				  )} should not end with "/"`
		);
	}
}

/**
 * Trying to match request to field
 * @param {string} request request
 * @param {PathTreeNode} treeRoot path tree root
 * @returns {[MappingValue, number]|null} match or null, number is negative and one less when it's a folder mapping, number is request.length + 1 for direct mappings
 */
function findMatch(request: string, treeRoot: object): any[] {
	if (request.length === 0) {
		const value: string = treeRoot.files.get("");

		return value ? [value, 1] : null;
	}

	if (
		treeRoot.children === null &&
		treeRoot.folder === null &&
		treeRoot.wildcards === null
	) {
		const value: string = treeRoot.files.get(request);

		return value ? [value, request.length + 1] : null;
	}

	let node: object = treeRoot;
	let lastNonSlashIndex: number = 0;
	let slashIndex: number = request.indexOf("/", 0);

	/** @type {[MappingValue, number]|null} */
	let lastFolderMatch: object = null;

	const applyFolderMapping: Function = () => {
		const folderMapping: string = node.folder;
		if (folderMapping) {
			if (lastFolderMatch) {
				lastFolderMatch[0] = folderMapping;
				lastFolderMatch[1] = -lastNonSlashIndex - 1;
			} else {
				lastFolderMatch = [folderMapping, -lastNonSlashIndex - 1];
			}
		}
	};

	const applyWildcardMappings: Function = (wildcardMappings: any[], remainingRequest: object) => {
		if (wildcardMappings) {
			for (const [key, target] of wildcardMappings) {
				if (remainingRequest.startsWith(key)) {
					if (!lastFolderMatch) {
						lastFolderMatch = [target, lastNonSlashIndex + key.length];
					} else if (lastFolderMatch[1] < lastNonSlashIndex + key.length) {
						lastFolderMatch[0] = target;
						lastFolderMatch[1] = lastNonSlashIndex + key.length;
					}
				}
			}
		}
	};

	while (slashIndex !== -1) {
		applyFolderMapping();

		const wildcardMappings: boolean = node.wildcards;

		if (!wildcardMappings && node.children === null) return lastFolderMatch;

		const folder: string = request.slice(lastNonSlashIndex, slashIndex);

		applyWildcardMappings(wildcardMappings, folder);

		if (node.children === null) return lastFolderMatch;

		const newNode: CacheBackend = node.children.get(folder);

		if (!newNode) {
			return lastFolderMatch;
		}

		node = newNode;
		lastNonSlashIndex = slashIndex + 1;
		slashIndex = request.indexOf("/", lastNonSlashIndex);
	}

	const remainingRequest: string =
		lastNonSlashIndex > 0 ? request.slice(lastNonSlashIndex) : request;

	const value: string = node.files.get(remainingRequest);

	if (value) {
		return [value, request.length + 1];
	}

	applyFolderMapping();

	applyWildcardMappings(node.wildcards, remainingRequest);

	return lastFolderMatch;
}

/**
 * @param {ConditionalMapping|DirectMapping|null} mapping mapping
 * @returns {boolean} is conditional mapping
 */
function isConditionalMapping(mapping: number): boolean {
	return (
		mapping !== null && typeof mapping === "object" && !Array.isArray(mapping)
	);
}

/**
 * @param {string|undefined} remainingRequest remaining request when folder mapping, undefined for file mappings
 * @param {boolean} subpathMapping true, for subpath mappings
 * @param {DirectMapping|null} mappingTarget direct export
 * @param {Set<string>} conditionNames condition names
 * @param {(d: string, f: boolean) => void} assert asserting direct value
 * @returns {string[]} mapping result
 */
function directMapping(
	remainingRequest: string,
	subpathMapping: Function,
	mappingTarget: any[],
	conditionNames: Function,
	assert: string
): any[] {
	if (mappingTarget === null) return [];

	if (typeof mappingTarget === "string") {
		return [
			targetMapping(remainingRequest, subpathMapping, mappingTarget, assert)
		];
	}

	const targets: any[] = [];

	for (const exp of mappingTarget) {
		if (typeof exp === "string") {
			targets.push(
				targetMapping(remainingRequest, subpathMapping, exp, assert)
			);
			continue;
		}

		const mapping: Resolver = conditionalMapping(exp, conditionNames);
		if (!mapping) continue;
		const innerExports: string = directMapping(
			remainingRequest,
			subpathMapping,
			mapping,
			conditionNames,
			assert
		);
		for (const innerExport of innerExports) {
			targets.push(innerExport);
		}
	}

	return targets;
}

/**
 * @param {string|undefined} remainingRequest remaining request when folder mapping, undefined for file mappings
 * @param {boolean} subpathMapping true, for subpath mappings
 * @param {string} mappingTarget direct export
 * @param {(d: string, f: boolean) => void} assert asserting direct value
 * @returns {string} mapping result
 */
function targetMapping(
	remainingRequest: string,
	subpathMapping: boolean,
	mappingTarget: string,
	assert: Function
): string {
	if (remainingRequest === undefined) {
		assert(mappingTarget, false);
		return mappingTarget;
	}
	if (subpathMapping) {
		assert(mappingTarget, true);
		return mappingTarget + remainingRequest;
	}
	assert(mappingTarget, false);
	return mappingTarget.replace(/\*/g, remainingRequest.replace(/\$/g, "$$"));
}

/**
 * @param {ConditionalMapping} conditionalMapping_ conditional mapping
 * @param {Set<string>} conditionNames condition names
 * @returns {DirectMapping|null} direct mapping if found
 */
function conditionalMapping(conditionalMapping_: Function, conditionNames: Map): string {
	/** @type {[ConditionalMapping, string[], number][]} */
	let lookup: any[] = [[conditionalMapping_, Object.keys(conditionalMapping_), 0]];

	loop: while (lookup.length > 0) {
		const [mapping, conditions, j] = lookup[lookup.length - 1];
		const last: number = conditions.length - 1;

		for (let i = j; i < conditions.length; i++) {
			const condition: string = conditions[i];

			// assert default. Could be last only
			if (i !== last) {
				if (condition === "default") {
					throw new Error("Default condition should be last one");
				}
			} else if (condition === "default") {
				const innerMapping: Function = mapping[condition];
				// is nested
				if (isConditionalMapping(innerMapping)) {
					const conditionalMapping: Function = /** @type {ConditionalMapping} */ (innerMapping);
					lookup[lookup.length - 1][2] = i + 1;
					lookup.push([conditionalMapping, Object.keys(conditionalMapping), 0]);
					continue loop;
				}

				return /** @type {DirectMapping} */ (innerMapping);
			}

			if (conditionNames.has(condition)) {
				const innerMapping: Function = mapping[condition];
				// is nested
				if (isConditionalMapping(innerMapping)) {
					const conditionalMapping: Function = /** @type {ConditionalMapping} */ (innerMapping);
					lookup[lookup.length - 1][2] = i + 1;
					lookup.push([conditionalMapping, Object.keys(conditionalMapping), 0]);
					continue loop;
				}

				return /** @type {DirectMapping} */ (innerMapping);
			}
		}

		lookup.pop();
	}

	return null;
}

/**
 * Internal helper to create path tree node
 * to ensure that each node gets the same hidden class
 * @returns {PathTreeNode} node
 */
function createNode(): object {
	return {
		children: null,
		folder: null,
		wildcards: null,
		files: new Map()
	};
}

/**
 * Internal helper for building path tree
 * @param {PathTreeNode} root root
 * @param {string} path path
 * @param {MappingValue} target target
 */
function walkPath(root: object, path: string, target: any[]): void {
	if (path.length === 0) {
		root.folder = target;
		return;
	}

	let node: Error = root;
	// Typical path tree can looks like
	// root
	// - files: ["a.js", "b.js"]
	// - children:
	//    node1:
	//    - files: ["a.js", "b.js"]
	let lastNonSlashIndex: number = 0;
	let slashIndex: number = path.indexOf("/", 0);

	while (slashIndex !== -1) {
		const folder: string = path.slice(lastNonSlashIndex, slashIndex);
		let newNode: object;

		if (node.children === null) {
			newNode = createNode();
			node.children = new Map();
			node.children.set(folder, newNode);
		} else {
			newNode = node.children.get(folder);

			if (!newNode) {
				newNode = createNode();
				node.children.set(folder, newNode);
			}
		}

		node = newNode;
		lastNonSlashIndex = slashIndex + 1;
		slashIndex = path.indexOf("/", lastNonSlashIndex);
	}

	if (lastNonSlashIndex >= path.length) {
		node.folder = target;
	} else {
		const file: any[] = lastNonSlashIndex > 0 ? path.slice(lastNonSlashIndex) : path;
		if (file.endsWith("*")) {
			if (node.wildcards === null) node.wildcards = new Map();
			node.wildcards.set(file.slice(0, -1), target);
		} else {
			node.files.set(file, target);
		}
	}
}

/**
 * @param {ExportsField} field exports field
 * @returns {PathTreeNode} tree root
 */
function buildExportsFieldPathTree(field: any[]): CacheBackend {
	const root: object = createNode();

	// handle syntax sugar, if exports field is direct mapping for "."
	if (typeof field === "string") {
		root.files.set("", field);

		return root;
	} else if (Array.isArray(field)) {
		root.files.set("", field.slice());

		return root;
	}

	const keys: any[] = Object.keys(field);

	for (let i = 0; i < keys.length; i++) {
		const key: string = keys[i];

		if (key.charCodeAt(0) !== dotCode) {
			// handle syntax sugar, if exports field is conditional mapping for "."
			if (i === 0) {
				while (i < keys.length) {
					const charCode: number = keys[i].charCodeAt(0);
					if (charCode === dotCode || charCode === slashCode) {
						throw new Error(
							`Exports field key should be relative path and start with "." (key: ${JSON.stringify(
								key
							)})`
						);
					}
					i++;
				}

				root.files.set("", field);
				return root;
			}

			throw new Error(
				`Exports field key should be relative path and start with "." (key: ${JSON.stringify(
					key
				)})`
			);
		}

		if (key.length === 1) {
			root.files.set("", field[key]);
			continue;
		}

		if (key.charCodeAt(1) !== slashCode) {
			throw new Error(
				`Exports field key should be relative path and start with "./" (key: ${JSON.stringify(
					key
				)})`
			);
		}

		walkPath(root, key.slice(2), field[key]);
	}

	return root;
}

/**
 * @param {ImportsField} field imports field
 * @returns {PathTreeNode} root
 */
function buildImportsFieldPathTree(field: object): Resolver {
	const root: Resolver = createNode();

	const keys: any[] = Object.keys(field);

	for (let i = 0; i < keys.length; i++) {
		const key: string = keys[i];

		if (key.charCodeAt(0) !== hashCode) {
			throw new Error(
				`Imports field key should start with "#" (key: ${JSON.stringify(key)})`
			);
		}

		if (key.length === 1) {
			throw new Error(
				`Imports field key should have at least 2 characters (key: ${JSON.stringify(
					key
				)})`
			);
		}

		if (key.charCodeAt(1) === slashCode) {
			throw new Error(
				`Imports field key should not start with "#/" (key: ${JSON.stringify(
					key
				)})`
			);
		}

		walkPath(root, key.slice(1), field[key]);
	}

	return root;
}
