'use strict';
import path from 'path';
import { createRequire } from 'module';

export default (fromDirectory, moduleId) => createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);

export const silent: void = (fromDirectory, moduleId) => {
	try {
		return createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);
	} catch {}
};
