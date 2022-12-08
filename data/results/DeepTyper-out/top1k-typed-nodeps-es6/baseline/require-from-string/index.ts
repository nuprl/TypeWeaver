'use strict';

import Module from 'module';
import path from 'path';

export default function requireFromString(code: string, filename: string, opts: any): any {
	if (typeof filename === 'object') {
		opts = filename;
		filename = undefined;
	}

	opts = opts || {};
	filename = filename || '';

	opts.appendPaths = opts.appendPaths || [];
	opts.prependPaths = opts.prependPaths || [];

	if (typeof code !== 'string') {
		throw new Error('code must be a string, not ' + typeof code);
	}

	var paths: any = Module._nodeModulePaths(path.dirname(filename));

	var parent: any = module.parent;
	var m: any = new Module(filename, parent);
	m.filename = filename;
	m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
	m._compile(code, filename);

	var exports: any = m.exports;
	parent && parent.children && parent.children.splice(parent.children.indexOf(m), 1);

	return exports;
};
