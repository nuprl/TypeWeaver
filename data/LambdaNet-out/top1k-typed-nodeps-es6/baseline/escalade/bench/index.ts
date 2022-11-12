import assert from 'assert';
import { resolve } from 'path';
import { Suite } from 'benchmark';
import sync from 'escalade/sync';
import escalade from 'escalade';
import findup from 'find-up';

const fixtures: String = resolve(__dirname, 'fixtures');
const file: String = resolve(fixtures, 'a/b/c/d/e/f/g/h/i/j/file.txt');

const filter: Function = (name: String) => (dir: Function, files: String) => files.includes(name) && name;

const contenders: Object = {
	'find-up': (x: String) => findup(x, { cwd: file }),
	'escalade': (x: String) => escalade(file, filter(x)),
	'find-up.sync': (x: String) => findup.sync(x, { cwd: file }),
	'escalade/sync': (x: String) => sync(file, filter(x)),
}

function pad(str: String): String {
	return str + ' '.repeat(16 - str.length);
}

async function runner(target: Array, expects: Array): Promise {
	console.log(`\nValidation (target = "${target}"): `);
	for (const name of Object.keys(contenders)) {
		try {
			const output: String = await contenders[name](target);

			if (expects) assert.equal(typeof output, 'string', 'returns string');
			assert.equal(output, expects);

			console.log('  ✔', pad(name));
		} catch (err) {
			console.log('  ✘', pad(name), `(FAILED @ "${err.message}")`);
		}
	}
	console.log(`\nBenchmark (target = "${target}"):`);
	const bench: HTMLElement = new Suite().on('cycle', (e: HTMLElement) => {
		console.log('  ' + e.target);
	});

	Object.keys(contenders).forEach((name: String) => {
		if (name.includes('sync')) {
			bench.add(pad(name), () => {
				contenders[name](target);
			});
		} else {
			bench.add(pad(name), async () => {
				await contenders[name](target);
			}, { async: true });
		}
	});

	return new Promise((res: Function, rej: Function) => {
		bench.on('complete', res);
		bench.on('error', rej);
		bench.run();
	});
}

(async function () {
	await runner('foo.txt', resolve(fixtures, 'a/b/c/d/e/f/foo.txt')); // ~> 6 lvls
	await runner('package.json', resolve(__dirname, 'package.json')); // ~> 12 lvls
	await runner('missing123.txt', undefined); // ~> 15? root
})().catch((err: Function) => {
	console.error('Oops~!', err)
});
