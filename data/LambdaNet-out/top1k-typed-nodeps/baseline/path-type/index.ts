import fs, {promises as fsPromises} from 'fs';

async function isType(fsStatType: Number, statsMethodName: String, filePath: String): Array {
	if (typeof filePath !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof filePath}`);
	}

	try {
		const stats: Object = await fsPromises[fsStatType](filePath);
		return stats[statsMethodName]();
	} catch (error) {
		if (error.code === 'ENOENT') {
			return false;
		}

		throw error;
	}
}

function isTypeSync(fsStatType: String, statsMethodName: String, filePath: String): Promise {
	if (typeof filePath !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof filePath}`);
	}

	try {
		return fs[fsStatType](filePath)[statsMethodName]();
	} catch (error) {
		if (error.code === 'ENOENT') {
			return false;
		}

		throw error;
	}
}

export const isFile: Function = isType.bind(null, 'stat', 'isFile');
export const isDirectory: Array = isType.bind(null, 'stat', 'isDirectory');
export const isSymlink: Array = isType.bind(null, 'lstat', 'isSymbolicLink');
export const isFileSync: Function = isTypeSync.bind(null, 'statSync', 'isFile');
export const isDirectorySync: Array = isTypeSync.bind(null, 'statSync', 'isDirectory');
export const isSymlinkSync: Array = isTypeSync.bind(null, 'lstatSync', 'isSymbolicLink');
