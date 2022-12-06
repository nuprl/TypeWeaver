'use strict';

var getInferredName: any;
try {
	// eslint-disable-next-line no-new-func
	getInferredName = Function('s', 'return { [s]() {} }[s].name;');
} catch (e) {}

var inferred: void = function () {};
export default getInferredName && inferred.name === 'inferred' ? getInferredName : null;
