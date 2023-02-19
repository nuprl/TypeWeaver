const { join } = require('path');
const { Suite } = require('benchmark');

console.log('Load times: ');

console.time('lodash/clonedeep');
const lodash: any = require('lodash/clonedeep');
console.timeEnd('lodash/clonedeep');

console.time('rfdc');
const rfdc: any = require('rfdc');
console.timeEnd('rfdc');

console.time('clone');
const clone: any = require('clone');
console.timeEnd('clone');

console.time('clone-deep');
const clonedeep: any = require('clone-deep');
console.timeEnd('clone-deep');

console.time('deep-copy');
const deepcopy: any = require('deep-copy');
console.timeEnd('deep-copy');

console.time('klona/full');
const full: any = require('klona/full');
console.timeEnd('klona/full');

console.time('klona');
const klona: any = require('klona');
console.timeEnd('klona');

console.time('klona/lite');
const lite: any = require('klona/lite');
console.timeEnd('klona/lite');

console.time('klona/json');
const json: any = require('klona/json');
console.timeEnd('klona/json');

const naiive: any = (x: any) => JSON.parse(JSON.stringify(x));
const clone_full: any = (x: any) => clone(x, { includeNonEnumerable: true });

function runner(name: string, contenders: any): void {
	const fixture: any = join(__dirname, 'fixtures', name + '.js');
	const validator: any = join(__dirname, 'validate', name + '.js');

	console.log('\nValidation :: %s', name);
	Object.keys(contenders).forEach((name: string) => {
		const isValid: any = require(validator);
		const INPUT: any = require(fixture);

		try {
			isValid(INPUT, contenders[name](INPUT));
			console.log('  ✔', name);
		} catch (err) {
			console.log('  ✘', name, `(FAILED @ "${err.message}")`);
		} finally {
			delete require.cache[fixture];
		}
	});

	const INPUT: any = require(fixture);
	console.log('\nBenchmark :: %s', name);
	const bench: any = new Suite().on('cycle', (e: any) => {
		console.log('  ' + e.target);
	});

	Object.keys(contenders).forEach((name: string) => {
		bench.add(name + ' '.repeat(22 - name.length), () => contenders[name](INPUT))
	});

	bench.run();
}

// ---
// ONLY KEEP PASSING
// ---

runner('json', {
	'JSON.stringify': naiive,
	'lodash': lodash,
	'rfdc': rfdc(),
	'clone': clone,
	'clone/include': clone_full,
	'clone-deep': clonedeep,
	'deep-copy': deepcopy,
	'klona/full': full.klona,
	'klona': klona.klona,
	'klona/lite': lite.klona,
	'klona/json': json.klona,
});

runner('lite', {
	'lodash': lodash,
	'clone': clone,
	'clone/include': clone_full,
	'clone-deep': clonedeep,
	'klona/full': full.klona,
	'klona': klona.klona,
	'klona/lite': lite.klona,
});

runner('default', {
	'lodash': lodash, // FAIL @ Buffer, Map keys
	'clone': clone, // FAIL @ DataView
	'clone/include': clone_full, // FAIL @ DataView
	// FAIL @ "Set #2" & "Map #2" :: 'clone-deep': clonedeep,
	'klona/full': full.klona,
	'klona': klona.klona,
});

runner('full', {
	'lodash': lodash, // FAIL @ Buffer, Map keys, non-enumerable properties,
	'clone/include': clone_full, // FAIL @ DataView, non-enumerable descriptors
	'klona/full': full.klona,
});
