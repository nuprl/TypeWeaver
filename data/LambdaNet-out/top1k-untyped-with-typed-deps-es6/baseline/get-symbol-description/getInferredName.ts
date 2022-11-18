'use strict';

var getInferredName: string;
try {
	// eslint-disable-next-line no-new-func
	getInferredName = Function('s', 'return { [s]() {} }[s].name;');
} catch (e) {}

var inferred: Function = function () {};
export default getInferredName && inferred.name === 'inferred' ? getInferredName : null;
