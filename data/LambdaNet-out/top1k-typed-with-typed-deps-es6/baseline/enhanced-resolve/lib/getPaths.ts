/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

export default function getPaths(path: String): Object {
	if (path === "/") return { paths: ["/"], segments: [""] };
	const parts: Array = path.split(/(.*?[\\/]+)/);
	const paths: Array = [path];
	const segments: Array = [parts[parts.length - 1]];
	let part: String = parts[parts.length - 1];
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

export const basename: AppendPlugin = function basename(path: String): Resolver {
	const i: Number = path.lastIndexOf("/"),
		j: Number = path.lastIndexOf("\\");
	const p: Number = i < 0 ? j : j < 0 ? i : i < j ? j : i;
	if (p < 0) return null;
	const s: Resolver = path.substr(p + 1);
	return s;
};
