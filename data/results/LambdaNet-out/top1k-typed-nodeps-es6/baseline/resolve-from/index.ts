'use strict';
import path from 'path';
import Module from 'module';
import fs from 'fs';

const resolveFrom: Function = (fromDirectory: number, moduleId: string, silent: boolean) => {
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

	const fromFile: string = path.join(fromDirectory, 'noop.js');

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

export default (fromDirectory: any[], moduleId: string) => resolveFrom(fromDirectory, moduleId);
export const silent: Function = (fromDirectory: any[], moduleId: number) => resolveFrom(fromDirectory, moduleId, true);
