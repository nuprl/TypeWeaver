/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

module.exports = function getPaths(path: string): object {
	if (path === "/") return { paths: ["/"], segments: [""] };
	const parts: any[] = path.split(/(.*?[\\/]+)/);
	const paths: any[] = [path];
	const segments: any[] = [parts[parts.length - 1]];
	let part: string = parts[parts.length - 1];
	path = path.substr(0, path.length - part.length - 1);
	for (let i = parts.length - 2; i > 2; i -= 2) {
		paths.push(path);
		part = parts[i];
		path = path.substr(0, path.length - part.length) || "/";
		segments.push(part.substr(0, part.length - 1));
	}
	part = parts[1];
	segments.push(part);
	paths.push(part);
	return {
		paths: paths,
		segments: segments
	};
};

module.exports.basename = function basename(path: string): Resolver {
	const i: number = path.lastIndexOf("/"),
		j: number = path.lastIndexOf("\\");
	const p: number = i < 0 ? j : j < 0 ? i : i < j ? j : i;
	if (p < 0) return null;
	const s: Resolver = path.substr(p + 1);
	return s;
};
