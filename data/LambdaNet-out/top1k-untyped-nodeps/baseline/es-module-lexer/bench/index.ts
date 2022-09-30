/*
 * Shimport benchmarks for comparison
 */

import fs from 'fs';
import c from 'kleur';

const n: Number = 25;

const files: Array = fs.readdirSync('test/samples')
	.map((f: String) => `test/samples/${f}`)
	.filter((x: String) => x.endsWith('.js'))
	.map((file: String) => {
		const source: String = fs.readFileSync(file);
		return {
			file,
			code: source.toString(),
			size: source.byteLength
		};
	});

Promise.resolve().then(async () => {
	function timeRun (code: String): Number {
		const start: Number = process.hrtime.bigint();
		const parsed: String = parse(code);
		const end: Number = process.hrtime.bigint();
		return Math.round(Number(end - start) / 1e6);
	}

	if (!process.env.BENCH || process.env.BENCH === 'js') {
		console.log('--- JS Build ---');
		console.log('Module load time');
		{
			const start: Number = process.hrtime.bigint();
			var { parse } = await import('../dist/lexer.asm.js');
			console.log(`> ${c.bold.green(Math.round(Number(process.hrtime.bigint() - start) / 1e6) + 'ms')}`);
		}
	
		doRun();
	}
	
	if (!process.env.BENCH || process.env.BENCH === 'wasm') {
		console.log('--- Wasm Build ---');
		console.log('Module load time');
		{
			const start: Number = process.hrtime.bigint();
			var { parse, init } = await import('../dist/lexer.js');
			await init;
			console.log(`> ${c.bold.green(Math.round(Number(process.hrtime.bigint() - start) / 1e6) + 'ms')}`);
		}
	
		doRun();
	}

	function doRun (): Void {
		console.log('Cold Run, All Samples');
		let totalSize: Number = 0;
		{
			let total: Number = 0;
			files.forEach(({ code, size }) => {
				totalSize += size;
				total += timeRun(code);
			});
			console.log(c.bold.cyan(`test/samples/*.js (${Math.round(totalSize / 1e3)} KiB)`));
			console.log(`> ${c.bold.green(total + 'ms')}`);
			gc();
		}
	
		console.log(`\nWarm Runs (average of ${n} runs)`);
		files.forEach(({ file, code, size }) => {
			console.log(c.bold.cyan(`${file} (${Math.round(size / 1e3)} KiB)`));
	
			let total = 0;
			for (let i = 0; i < n; i++) {
				total += timeRun(code);
				gc();
			}
	
			console.log(`> ${c.bold.green((total / n) + 'ms')}`);
		});
	
		console.log(`\nWarm Runs, All Samples (average of ${n} runs)`);
		{
			let total: Number = 0;
			for (let i = 0; i < n; i++) {
				files.forEach(({ code }) => {
					total += timeRun(code);
				});
			}
			console.log(c.bold.cyan(`test/samples/*.js (${Math.round(totalSize / 1e3)} KiB)`));
			console.log(`> ${c.bold.green((total / n) + 'ms')}`);
		}
	}
});