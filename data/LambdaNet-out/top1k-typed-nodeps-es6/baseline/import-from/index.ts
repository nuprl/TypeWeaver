'use strict';
import path from 'path';
import { createRequire } from 'module';

export default (fromDirectory: string, moduleId: string) => createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);

export const silent: Function = (fromDirectory: string, moduleId: string) => {
	try {
		return createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);
	} catch {}
};
