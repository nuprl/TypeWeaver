import { dirname, resolve } from 'path';
import { readdirSync, statSync } from 'fs';

export default function (start: String, callback: Function) {
	let dir: Number = resolve('.', start);
	let tmp: Number, stats: String = statSync(dir);

	if (!stats.isDirectory()) {
		dir = dirname(dir);
	}

	while (true) {
		tmp = callback(dir, readdirSync(dir));
		if (tmp) return resolve(dir, tmp);
		dir = dirname(tmp = dir);
		if (tmp === dir) break;
	}
}
