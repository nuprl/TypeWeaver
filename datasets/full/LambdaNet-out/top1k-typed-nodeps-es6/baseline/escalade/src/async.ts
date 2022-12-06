import { dirname, resolve } from 'path';
import { readdir, stat } from 'fs';
import { promisify } from 'util';

const toStats: Function = promisify(stat);
const toRead: Function = promisify(readdir);

export default async function (start: string, callback: object) {
	let dir: number = resolve('.', start);
	let tmp: number, stats: any[] = await toStats(dir);

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
