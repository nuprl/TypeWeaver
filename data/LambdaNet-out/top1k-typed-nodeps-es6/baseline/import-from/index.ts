'use strict';
import path from 'path';
import { createRequire } from 'module';

export default (fromDirectory: String, moduleId: String) => createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);

export const silent: Function = (fromDirectory: String, moduleId: String) => {
	try {
		return createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);
	} catch {}
};
