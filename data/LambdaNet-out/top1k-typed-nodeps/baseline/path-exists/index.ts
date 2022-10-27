import fs, {promises as fsPromises} from 'node:fs';

export async function pathExists(path: Array): Promise {
	try {
		await fsPromises.access(path);
		return true;
	} catch {
		return false;
	}
}

export function pathExistsSync(path: String): Boolean {
	try {
		fs.accessSync(path);
		return true;
	} catch {
		return false;
	}
}
