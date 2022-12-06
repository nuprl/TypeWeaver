import {inspect} from 'node:util';
import {runInNewContext} from 'node:vm';
import isPlainObject from 'is-plain-obj';

const runBenchmarks: void = () => {
	for (const value of values) {
		const name: any = value instanceof Error ? String(Error) : inspect(value);
		const paddedName: string = name.padEnd(50);
		console.time(paddedName);
		runLoop(value);
		console.timeEnd(paddedName);
	}
};

const runLoop: void = (value: any) => {
	for (let index = 0; index < 1e8; index += 1) {
		isPlainObject(value);
	}
};

const values: any = [
	undefined,
	0,
	0n,
	'',
	true,
	Symbol(''),
	() => {},
	// eslint-disable-next-line func-names
	(function namedFunc(): void {}),
	null,
	{},
	Math,
	new Set([]),
	new ArrayBuffer(0),
	Promise.resolve(),
	Object.create(null),
	new Intl.Locale('en'),
	// eslint-disable-next-line no-new-object
	new Object({prop: true}),
	new class Class {}(),
	[],
	/regexp/,
	new Error('test'),
	new Date(),
	(function () {
		// eslint-disable-next-line prefer-rest-params
		return arguments;
	})(),
	new Proxy({}, {})
];

// Warm up V8 optimization.
// Must go through every branch of the code, which requires using an object from a different realm.
runLoop(runInNewContext('({})'));

runBenchmarks();
