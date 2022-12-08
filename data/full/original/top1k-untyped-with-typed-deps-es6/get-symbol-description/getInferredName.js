'use strict';

var getInferredName;
try {
	// eslint-disable-next-line no-new-func
	getInferredName = Function('s', 'return { [s]() {} }[s].name;');
} catch (e) {}

var inferred = function () {};
export default getInferredName && inferred.name === 'inferred' ? getInferredName : null;
