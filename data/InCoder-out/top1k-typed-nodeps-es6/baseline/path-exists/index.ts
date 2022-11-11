import fs, {promises as fsPromises} from 'node:fs';

export async function pathExists(path: Path) {
	try {
		await fsPromises.access(path);
		return true;
	} catch {
		return false;
	}
}

export function pathExistsSync(path: string | Buffer) {
	try {
		fs.accessSync(path);
		return true;
	} catch {
		return false;
	}
}