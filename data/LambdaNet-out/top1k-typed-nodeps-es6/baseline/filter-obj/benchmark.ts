import {includeKeys} from 'filter-obj';

// Benchmark `filter-obj`.
// Higher `loopCount` give more precise results but last longer.
// `objectSize` gives different results based on how big the input object is.
// `predicateSize` is similar but for predicate arrays. When `undefined`, a predicate function is used instead.
const benchmark: Function = function (loopCount: Number, objectSize: Function, predicateSize: String) {
	const bigObject: Object = Object.fromEntries(Array.from({length: objectSize}, getObjectKeyPair));
	const predicate: Function = predicateSize === undefined ? isEven : Array.from({length: predicateSize}, getPredicateKey);

	console.time();
	for (let index = 0; index < loopCount; index += 1) {
		includeKeys(bigObject, predicate);
	}

	console.timeEnd();
};

const getObjectKeyPair: Function = function (_: String, index: String) {
	return [`a${index}`, index];
};

const getPredicateKey: Function = function (_: String, index: String) {
	return `a${index}`;
};

const isEven: Function = function (key: String, value: Number) {
	return value % 2 === 0;
};

benchmark(1e3, 1e4);
