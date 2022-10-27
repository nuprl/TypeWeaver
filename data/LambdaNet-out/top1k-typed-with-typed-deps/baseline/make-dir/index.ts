'use strict';
const fs: String = require('fs');
const path: String = require('path');
const {promisify} = require('util');
const semverGte: Function = require('semver/functions/gte');

const useNativeRecursiveOption: Boolean = semverGte(process.version, '10.12.0');

// https://github.com/nodejs/node/issues/8987
// https://github.com/libuv/libuv/pull/1088
const checkPath: Function = (pth: String) => {
	if (process.platform === 'win32') {
		const pathHasInvalidWinCharacters: Number = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ''));

		if (pathHasInvalidWinCharacters) {
			const error: Error = new Error(`Path contains invalid characters: ${pth}`);
			error.code = 'EINVAL';
			throw error;
		}
	}
};

const processOptions: Function = (options: Object) => {
	const defaults: Object = {
		mode: 0o777,
		fs
	};

	return {
		...defaults,
		...options
	};
};

const permissionError: Function = (pth: String) => {
	// This replicates the exception of `fs.mkdir` with native the
	// `recusive` option when run on an invalid drive under Windows.
	const error: Error = new Error(`operation not permitted, mkdir '${pth}'`);
	error.code = 'EPERM';
	error.errno = -4048;
	error.path = pth;
	error.syscall = 'mkdir';
	return error;
};

const makeDir: String = async (input: HTMLElement, options: Object) => {
	checkPath(input);
	options = processOptions(options);

	const mkdir: Function = promisify(options.fs.mkdir);
	const stat: String = promisify(options.fs.stat);

	if (useNativeRecursiveOption && options.fs.mkdir === fs.mkdir) {
		const pth: Array = path.resolve(input);

		await mkdir(pth, {
			mode: options.mode,
			recursive: true
		});

		return pth;
	}

	const make: Function = async (pth: HTMLInputElement) => {
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
				const stats = await stat(pth);
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

module.exports = makeDir;

module.exports.sync = (input: String, options: Object) => {
	checkPath(input);
	options = processOptions(options);

	if (useNativeRecursiveOption && options.fs.mkdirSync === fs.mkdirSync) {
		const pth: String = path.resolve(input);

		fs.mkdirSync(pth, {
			mode: options.mode,
			recursive: true
		});

		return pth;
	}

	const make: Function = (pth: Array) => {
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
