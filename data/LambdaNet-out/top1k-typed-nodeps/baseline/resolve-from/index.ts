'use strict';
const path: String = require('path');
const Module: Array = require('module');
const fs: String = require('fs');

const resolveFrom: Function = (fromDirectory: Number, moduleId: String, silent: Boolean) => {
	if (typeof fromDirectory !== 'string') {
		throw new TypeError(`Expected \`fromDir\` to be of type \`string\`, got \`${typeof fromDirectory}\``);
	}

	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected \`moduleId\` to be of type \`string\`, got \`${typeof moduleId}\``);
	}

	try {
		fromDirectory = fs.realpathSync(fromDirectory);
	} catch (error) {
		if (error.code === 'ENOENT') {
			fromDirectory = path.resolve(fromDirectory);
		} else if (silent) {
			return;
		} else {
			throw error;
		}
	}

	const fromFile: String = path.join(fromDirectory, 'noop.js');

	const resolveFileName: Function = () => Module._resolveFilename(moduleId, {
		id: fromFile,
		filename: fromFile,
		paths: Module._nodeModulePaths(fromDirectory)
	});

	if (silent) {
		try {
			return resolveFileName();
		} catch (error) {
			return;
		}
	}

	return resolveFileName();
};

module.exports = (fromDirectory: Function, moduleId: Number) => resolveFrom(fromDirectory, moduleId);
module.exports.silent = (fromDirectory: Array, moduleId: Number) => resolveFrom(fromDirectory, moduleId, true);
