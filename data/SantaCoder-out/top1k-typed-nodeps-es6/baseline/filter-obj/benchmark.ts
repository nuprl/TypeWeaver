import {includeKeys} from 'filter-obj';

// Benchmark `filter-obj`.
// Higher `loopCount` give more precise results but last longer.
// `objectSize` gives different results based on how big the input object is.
// `predicateSize` is similar but for predicate arrays. When `undefined`, a predicate function is used instead.
const benchmark = function (loopCount: number, objectSize: number, predicateSize: number) {
	const bigObject = Object.fromEntries(Array.from({length: objectSize}, getObjectKeyPair));
	const predicate = predicateSize === undefined ? isEven : Array.from({length: predicateSize}, getPredicateKey);

	console.time();
	for (let index = 0; index < loopCount; index += 1) {
		includeKeys(bigObject, predicate);
	}

	console.timeEnd();
};

const getObjectKeyPair = function (_: unknown, index: number) {
	return [`a${index}`, index];
};

const getPredicateKey = function (_: any, index: number) {
	return `a${index}`;
};

const isEven = function (key: string, value: number) {
	return value % 2 === 0;
};

benchmark(1e3, 1e4);