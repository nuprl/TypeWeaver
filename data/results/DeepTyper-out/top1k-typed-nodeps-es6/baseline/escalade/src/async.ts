import { dirname, resolve } from 'path';
import { readdir, stat } from 'fs';
import { promisify } from 'util';

const toStats: any = promisify(stat);
const toRead: any = promisify(readdir);

export default async function (start: any, callback: any) {
	let dir: any = resolve('.', start);
	let tmp: any, stats = await toStats(dir);

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
