const assert: string = require('assert');
const { resolve } = require('path');
const { Suite } = require('benchmark');
const sync: Function = require('escalade/sync');
const escalade: Function = require('escalade');
const findup: Function = require('find-up');

const fixtures: string = resolve(__dirname, 'fixtures');
const file: string = resolve(fixtures, 'a/b/c/d/e/f/g/h/i/j/file.txt');

const filter: Function = (name: string) => (dir: Function, files: string) => files.includes(name) && name;

const contenders: object = {
	'find-up': (x: string) => findup(x, { cwd: file }),
	'escalade': (x: string) => escalade(file, filter(x)),
	'find-up.sync': (x: string) => findup.sync(x, { cwd: file }),
	'escalade/sync': (x: string) => sync(file, filter(x)),
}

function pad(str: string): string {
	return str + ' '.repeat(16 - str.length);
}

async function runner(target: any[], expects: any[]): Promise {
	console.log(`\nValidation (target = "${target}"): `);
	for (const name of Object.keys(contenders)) {
		try {
			const output: string = await contenders[name](target);

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

	Object.keys(contenders).forEach((name: string) => {
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
