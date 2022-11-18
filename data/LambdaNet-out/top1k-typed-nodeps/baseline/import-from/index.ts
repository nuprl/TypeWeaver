'use strict';
const path: string = require('path');
const {createRequire} = require('module');

module.exports = (fromDirectory: string, moduleId: number) => createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);

module.exports.silent = (fromDirectory: string, moduleId: number) => {
	try {
		return createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);
	} catch {}
};
