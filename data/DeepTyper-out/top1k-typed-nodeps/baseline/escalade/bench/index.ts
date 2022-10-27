const assert: any = require('assert');
const { resolve } = require('path');
const { Suite } = require('benchmark');
const sync: any = require('escalade/sync');
const escalade: any = require('escalade');
const findup: any = require('find-up');

const fixtures: any = resolve(__dirname, 'fixtures');
const file: any = resolve(fixtures, 'a/b/c/d/e/f/g/h/i/j/file.txt');

const filter: any = (name: any) => (dir: any, files: any) => files.includes(name) && name;

const contenders: any = {
	'find-up': (x: any) => findup(x, { cwd: file }),
	'escalade': (x: any) => escalade(file, filter(x)),
	'find-up.sync': (x: any) => findup.sync(x, { cwd: file }),
	'escalade/sync': (x: any) => sync(file, filter(x)),
}

function pad(str: string): string {
	return str + ' '.repeat(16 - str.length);
}

async function runner(target: any, expects: string): Promise<void> {
	console.log(`\nValidation (target = "${target}"): `);
	for (const name of Object.keys(contenders)) {
		try {
			const output: any = await contenders[name](target);

			if (expects) assert.equal(typeof output, 'string', 'returns string');
			assert.equal(output, expects);

			console.log('  ✔', pad(name));
		} catch (err) {
			console.log('  ✘', pad(name), `(FAILED @ "${err.message}")`);
		}
	}
	console.log(`\nBenchmark (target = "${target}"):`);
	const bench: any = new Suite().on('cycle', (e: any) => {
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

	return new Promise((res: void, rej: void) => {
		bench.on('complete', res);
		bench.on('error', rej);
		bench.run();
	});
}

(async function () {
	await runner('foo.txt', resolve(fixtures, 'a/b/c/d/e/f/foo.txt')); // ~> 6 lvls
	await runner('package.json', resolve(__dirname, 'package.json')); // ~> 12 lvls
	await runner('missing123.txt', undefined); // ~> 15? root
})().catch((err: any) => {
	console.error('Oops~!', err)
});
