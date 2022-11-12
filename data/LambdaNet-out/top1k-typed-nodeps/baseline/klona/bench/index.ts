const { join } = require('path');
const { Suite } = require('benchmark');

console.log('Load times: ');

console.time('lodash/clonedeep');
const lodash: String = require('lodash/clonedeep');
console.timeEnd('lodash/clonedeep');

console.time('rfdc');
const rfdc: Function = require('rfdc');
console.timeEnd('rfdc');

console.time('clone');
const clone: Function = require('clone');
console.timeEnd('clone');

console.time('clone-deep');
const clonedeep: String = require('clone-deep');
console.timeEnd('clone-deep');

console.time('deep-copy');
const deepcopy: Number = require('deep-copy');
console.timeEnd('deep-copy');

console.time('klona/full');
const full: Array = require('klona/full');
console.timeEnd('klona/full');

console.time('klona');
const klona: Array = require('klona');
console.timeEnd('klona');

console.time('klona/lite');
const lite: Array = require('klona/lite');
console.timeEnd('klona/lite');

console.time('klona/json');
const json: String = require('klona/json');
console.timeEnd('klona/json');

const naiive: Function = (x: String) => JSON.parse(JSON.stringify(x));
const clone_full: Function = (x: String) => clone(x, { includeNonEnumerable: true });

function runner(name: String, contenders: Object): Void {
	const fixture: String = join(__dirname, 'fixtures', name + '.js');
	const validator: String = join(__dirname, 'validate', name + '.js');

	console.log('\nValidation :: %s', name);
	Object.keys(contenders).forEach((name: String) => {
		const isValid: Function = require(validator);
		const INPUT: String = require(fixture);

		try {
			isValid(INPUT, contenders[name](INPUT));
			console.log('  ✔', name);
		} catch (err) {
			console.log('  ✘', name, `(FAILED @ "${err.message}")`);
		} finally {
			delete require.cache[fixture];
		}
	});

	const INPUT: String = require(fixture);
	console.log('\nBenchmark :: %s', name);
	const bench: Array = new Suite().on('cycle', (e: HTMLElement) => {
		console.log('  ' + e.target);
	});

	Object.keys(contenders).forEach((name: String) => {
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
