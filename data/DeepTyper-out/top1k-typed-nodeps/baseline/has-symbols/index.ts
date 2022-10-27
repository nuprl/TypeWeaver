'use strict';

var origSymbol: boolean = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham: any = require('./shams');

module.exports = function hasNativeSymbols(): boolean {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};
