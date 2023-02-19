'use strict';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import semverGte from 'semver/functions/gte';

const useNativeRecursiveOption: string = semverGte(process.version, '10.12.0');

// https://github.com/nodejs/node/issues/8987
// https://github.com/libuv/libuv/pull/1088
const checkPath: any = (pth: string) => {
	if (process.platform === 'win32') {
		const pathHasInvalidWinCharacters: boolean = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ''));

		if (pathHasInvalidWinCharacters) {
			const error: Error = new Error(`Path contains invalid characters: ${pth}`);
			error.code = 'EINVAL';
			throw error;
		}
	}
};

const processOptions: any = (options: any) => {
	const defaults: any = {
		mode: 0o777,
		fs
	};

	return {
		...defaults,
		...options
	};
};

const permissionError: any = (pth: any) => {
	// This replicates the exception of `fs.mkdir` with native the
	// `recusive` option when run on an invalid drive under Windows.
	const error: Error = new Error(`operation not permitted, mkdir '${pth}'`);
	error.code = 'EPERM';
	error.errno = -4048;
	error.path = pth;
	error.syscall = 'mkdir';
	return error;
};

const makeDir: Promise<void> = async (input: string, options: any) => {
	checkPath(input);
	options = processOptions(options);

	const mkdir: any = promisify(options.fs.mkdir);
	const stat: any = promisify(options.fs.stat);

	if (useNativeRecursiveOption && options.fs.mkdir === fs.mkdir) {
		const pth: any = path.resolve(input);

		await mkdir(pth, {
			mode: options.mode,
			recursive: true
		});

		return pth;
	}

	const make: Promise<void> = async (pth: any) => {
		try {
			await mkdir(pth, options.mode);

			return pth;
		} catch (error) {
			if (error.code === 'EPERM') {
				throw error;
			}

			if (error.code === 'ENOENT') {
				if (path.dirname(pth) === pth) {
					throw permissionError(pth);
				}

				if (error.message.includes('null bytes')) {
					throw error;
				}

				await make(path.dirname(pth));

				return make(pth);
			}

			try {
				const stats: any = await stat(pth);
				if (!stats.isDirectory()) {
					throw new Error('The path is not a directory');
				}
			} catch {
				throw error;
			}

			return pth;
		}
	};

	return make(path.resolve(input));
};

export default makeDir;

export const sync: void = (input: string, options: any) => {
	checkPath(input);
	options = processOptions(options);

	if (useNativeRecursiveOption && options.fs.mkdirSync === fs.mkdirSync) {
		const pth: any = path.resolve(input);

		fs.mkdirSync(pth, {
			mode: options.mode,
			recursive: true
		});

		return pth;
	}

	const make: any = (pth: any) => {
		try {
			options.fs.mkdirSync(pth, options.mode);
		} catch (error) {
			if (error.code === 'EPERM') {
				throw error;
			}

			if (error.code === 'ENOENT') {
				if (path.dirname(pth) === pth) {
					throw permissionError(pth);
				}

				if (error.message.includes('null bytes')) {
					throw error;
				}

				make(path.dirname(pth));
				return make(pth);
			}

			try {
				if (!options.fs.statSync(pth).isDirectory()) {
					throw new Error('The path is not a directory');
				}
			} catch {
				throw error;
			}
		}

		return pth;
	};

	return make(path.resolve(input));
};
