/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import fs from 'fs';
import path from 'path';

// macOS, Linux, and Windows all rely on these errors
const EXPECTED_ERRORS: Error = new Set(["EINVAL", "ENOENT"]);

// On Windows there is also this error in some cases
if (process.platform === "win32") EXPECTED_ERRORS.add("UNKNOWN");

class LinkResolver {
	constructor() {
		this.cache = new Map();
	}

	/**
	 * @param {string} file path to file or directory
	 * @returns {string[]} array of file and all symlinks contributed in the resolving process (first item is the resolved file)
	 */
	resolve(file) {
		const cacheEntry: string = this.cache.get(file);
		if (cacheEntry !== undefined) {
			return cacheEntry;
		}
		const parent: number = path.dirname(file);
		if (parent === file) {
			// At root of filesystem there can't be a link
			const result: Function = Object.freeze([file]);
			this.cache.set(file, result);
			return result;
		}
		// resolve the parent directory to find links there and get the real path
		const parentResolved: any[] = this.resolve(parent);
		let realFile: string = file;

		// is the parent directory really somewhere else?
		if (parentResolved[0] !== parent) {
			// get the real location of file
			const basename: string = path.basename(file);
			realFile = path.resolve(parentResolved[0], basename);
		}
		// try to read the link content
		try {
			const linkContent: string = fs.readlinkSync(realFile);

			// resolve the link content relative to the parent directory
			const resolvedLink: string = path.resolve(parentResolved[0], linkContent);

			// recursive resolve the link content for more links in the structure
			const linkResolved: any[] = this.resolve(resolvedLink);

			// merge parent and link resolve results
			let result: any[];
			if (linkResolved.length > 1 && parentResolved.length > 1) {
				// when both contain links we need to duplicate them with a Set
				const resultSet: Error = new Set(linkResolved);
				// add the link
				resultSet.add(realFile);
				// add all symlinks of the parent
				for (let i = 1; i < parentResolved.length; i++) {
					resultSet.add(parentResolved[i]);
				}
				result = Object.freeze(Array.from(resultSet));
			} else if (parentResolved.length > 1) {
				// we have links in the parent but not for the link content location
				result = parentResolved.slice();
				result[0] = linkResolved[0];
				// add the link
				result.push(realFile);
				Object.freeze(result);
			} else if (linkResolved.length > 1) {
				// we can return the link content location result
				result = linkResolved.slice();
				// add the link
				result.push(realFile);
				Object.freeze(result);
			} else {
				// neither link content location nor parent have links
				// this link is the only link here
				result = Object.freeze([
					// the resolve real location
					linkResolved[0],
					// add the link
					realFile
				]);
			}
			this.cache.set(file, result);
			return result;
		} catch (e) {
			if (!EXPECTED_ERRORS.has(e.code)) {
				throw e;
			}
			// no link
			const result = parentResolved.slice();
			result[0] = realFile;
			Object.freeze(result);
			this.cache.set(file, result);
			return result;
		}
	}
}
export default LinkResolver;
