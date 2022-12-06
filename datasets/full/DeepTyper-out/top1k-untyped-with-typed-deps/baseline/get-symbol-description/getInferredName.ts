'use strict';

var getInferredName: any;
try {
	// eslint-disable-next-line no-new-func
	getInferredName = Function('s', 'return { [s]() {} }[s].name;');
} catch (e) {}

var inferred: void = function () {};
module.exports = getInferredName && inferred.name === 'inferred' ? getInferredName : null;
