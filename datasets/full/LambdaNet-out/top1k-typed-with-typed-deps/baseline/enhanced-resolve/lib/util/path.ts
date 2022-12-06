/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const path: string = require("path");

const CHAR_HASH: string = "#".charCodeAt(0);
const CHAR_SLASH: string = "/".charCodeAt(0);
const CHAR_BACKSLASH: number = "\\".charCodeAt(0);
const CHAR_A: number = "A".charCodeAt(0);
const CHAR_Z: number = "Z".charCodeAt(0);
const CHAR_LOWER_A: number = "a".charCodeAt(0);
const CHAR_LOWER_Z: number = "z".charCodeAt(0);
const CHAR_DOT: string = ".".charCodeAt(0);
const CHAR_COLON: number = ":".charCodeAt(0);

const posixNormalize: Function = path.posix.normalize;
const winNormalize: Function = path.win32.normalize;

/**
 * @enum {number}
 */
const PathType: Function = Object.freeze({
	Empty: 0,
	Normal: 1,
	Relative: 2,
	AbsoluteWin: 3,
	AbsolutePosix: 4,
	Internal: 5
});
exports.PathType = PathType;

/**
 * @param {string} p a path
 * @returns {PathType} type of path
 */
const getType: Function = (p: string) => {
	switch (p.length) {
		case 0:
			return PathType.Empty;
		case 1: {
			const c0: string = p.charCodeAt(0);
			switch (c0) {
				case CHAR_DOT:
					return PathType.Relative;
				case CHAR_SLASH:
					return PathType.AbsolutePosix;
				case CHAR_HASH:
					return PathType.Internal;
			}
			return PathType.Normal;
		}
		case 2: {
			const c0: number = p.charCodeAt(0);
			switch (c0) {
				case CHAR_DOT: {
					const c1: string = p.charCodeAt(1);
					switch (c1) {
						case CHAR_DOT:
						case CHAR_SLASH:
							return PathType.Relative;
					}
					return PathType.Normal;
				}
				case CHAR_SLASH:
					return PathType.AbsolutePosix;
				case CHAR_HASH:
					return PathType.Internal;
			}
			const c1: number = p.charCodeAt(1);
			if (c1 === CHAR_COLON) {
				if (
					(c0 >= CHAR_A && c0 <= CHAR_Z) ||
					(c0 >= CHAR_LOWER_A && c0 <= CHAR_LOWER_Z)
				) {
					return PathType.AbsoluteWin;
				}
			}
			return PathType.Normal;
		}
	}
	const c0: number = p.charCodeAt(0);
	switch (c0) {
		case CHAR_DOT: {
			const c1: string = p.charCodeAt(1);
			switch (c1) {
				case CHAR_SLASH:
					return PathType.Relative;
				case CHAR_DOT: {
					const c2: number = p.charCodeAt(2);
					if (c2 === CHAR_SLASH) return PathType.Relative;
					return PathType.Normal;
				}
			}
			return PathType.Normal;
		}
		case CHAR_SLASH:
			return PathType.AbsolutePosix;
		case CHAR_HASH:
			return PathType.Internal;
	}
	const c1: number = p.charCodeAt(1);
	if (c1 === CHAR_COLON) {
		const c2: number = p.charCodeAt(2);
		if (
			(c2 === CHAR_BACKSLASH || c2 === CHAR_SLASH) &&
			((c0 >= CHAR_A && c0 <= CHAR_Z) ||
				(c0 >= CHAR_LOWER_A && c0 <= CHAR_LOWER_Z))
		) {
			return PathType.AbsoluteWin;
		}
	}
	return PathType.Normal;
};
exports.getType = getType;

/**
 * @param {string} p a path
 * @returns {string} the normalized path
 */
const normalize: Function = (p: any[]) => {
	switch (getType(p)) {
		case PathType.Empty:
			return p;
		case PathType.AbsoluteWin:
			return winNormalize(p);
		case PathType.Relative: {
			const r: string = posixNormalize(p);
			return getType(r) === PathType.Relative ? r : `./${r}`;
		}
	}
	return posixNormalize(p);
};
exports.normalize = normalize;

/**
 * @param {string} rootPath the root path
 * @param {string | undefined} request the request path
 * @returns {string} the joined path
 */
const join: Function = (rootPath: string, request: string) => {
	if (!request) return normalize(rootPath);
	const requestType: string = getType(request);
	switch (requestType) {
		case PathType.AbsolutePosix:
			return posixNormalize(request);
		case PathType.AbsoluteWin:
			return winNormalize(request);
	}
	switch (getType(rootPath)) {
		case PathType.Normal:
		case PathType.Relative:
		case PathType.AbsolutePosix:
			return posixNormalize(`${rootPath}/${request}`);
		case PathType.AbsoluteWin:
			return winNormalize(`${rootPath}\\${request}`);
	}
	switch (requestType) {
		case PathType.Empty:
			return rootPath;
		case PathType.Relative: {
			const r: string = posixNormalize(rootPath);
			return getType(r) === PathType.Relative ? r : `./${r}`;
		}
	}
	return posixNormalize(rootPath);
};
exports.join = join;

const joinCache: Map = new Map();

/**
 * @param {string} rootPath the root path
 * @param {string | undefined} request the request path
 * @returns {string} the joined path
 */
const cachedJoin: Function = (rootPath: string, request: object) => {
	let cacheEntry: Function;
	let cache: Map = joinCache.get(rootPath);
	if (cache === undefined) {
		joinCache.set(rootPath, (cache = new Map()));
	} else {
		cacheEntry = cache.get(request);
		if (cacheEntry !== undefined) return cacheEntry;
	}
	cacheEntry = join(rootPath, request);
	cache.set(request, cacheEntry);
	return cacheEntry;
};
exports.cachedJoin = cachedJoin;

const checkImportsExportsFieldTarget: Function = (relativePath: string) => {
	let lastNonSlashIndex: number = 0;
	let slashIndex: number = relativePath.indexOf("/", 1);
	let cd: number = 0;

	while (slashIndex !== -1) {
		const folder: string = relativePath.slice(lastNonSlashIndex, slashIndex);

		switch (folder) {
			case "..": {
				cd--;
				if (cd < 0)
					return new Error(
						`Trying to access out of package scope. Requesting ${relativePath}`
					);
				break;
			}
			case ".":
				break;
			default:
				cd++;
				break;
		}

		lastNonSlashIndex = slashIndex + 1;
		slashIndex = relativePath.indexOf("/", lastNonSlashIndex);
	}
};
exports.checkImportsExportsFieldTarget = checkImportsExportsFieldTarget;
