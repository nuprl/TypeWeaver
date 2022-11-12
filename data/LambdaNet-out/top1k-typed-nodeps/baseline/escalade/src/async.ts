import { dirname, resolve } from 'path';
import { readdir, stat } from 'fs';
import { promisify } from 'util';

const toStats: Function = promisify(stat);
const toRead: Function = promisify(readdir);

export default async function (start: String, callback: Object) {
	let dir: String = resolve('.', start);
	let tmp: String, stats: Array = await toStats(dir);

	if (!stats.isDirectory()) {
		dir = dirname(dir);
	}

	while (true) {
		tmp = await callback(dir, await toRead(dir));
		if (tmp) return resolve(dir, tmp);
		dir = dirname(tmp = dir);
		if (tmp === dir) break;
	}
}
