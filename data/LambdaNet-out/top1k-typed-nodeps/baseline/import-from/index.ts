'use strict';
const path: String = require('path');
const {createRequire} = require('module');

module.exports = (fromDirectory: String, moduleId: Number) => createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);

module.exports.silent = (fromDirectory: String, moduleId: Number) => {
	try {
		return createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);
	} catch {}
};
