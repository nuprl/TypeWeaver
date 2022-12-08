import fs, {promises as fsPromises} from 'fs';

async function isType(fsStatType: string, statsMethodName: string, filePath: string): any {
	if (typeof filePath !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof filePath}`);
	}

	try {
		const stats: any = await fsPromises[fsStatType](filePath);
		return stats[statsMethodName]();
	} catch (error) {
		if (error.code === 'ENOENT') {
			return false;
		}

		throw error;
	}
}

function isTypeSync(fsStatType: any, statsMethodName: any, filePath: string): any {
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

export const isFile: any = isType.bind(null, 'stat', 'isFile');
export const isDirectory: any = isType.bind(null, 'stat', 'isDirectory');
export const isSymlink: any = isType.bind(null, 'lstat', 'isSymbolicLink');
export const isFileSync: any = isTypeSync.bind(null, 'statSync', 'isFile');
export const isDirectorySync: any = isTypeSync.bind(null, 'statSync', 'isDirectory');
export const isSymlinkSync: any = isTypeSync.bind(null, 'lstatSync', 'isSymbolicLink');
