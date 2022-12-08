'use strict';

var GetIntrinsic: any = require('get-intrinsic');

var callBound: any = require('call-bind/callBound');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var getGlobalSymbolDescription: any = GetIntrinsic('%Symbol.keyFor%', true);
var thisSymbolValue: any = callBound('%Symbol.prototype.valueOf%', true);
var symToStr: any = callBound('Symbol.prototype.toString', true);

var getInferredName: any = require('./getInferredName');

/* eslint-disable consistent-return */
module.exports = callBound('%Symbol.prototype.description%', true) || function getSymbolDescription(symbol): any {
	if (!thisSymbolValue) {
		throw new $SyntaxError('Symbols are not supported in this environment');
	}

	// will throw if not a symbol primitive or wrapper object
	var sym: any = thisSymbolValue(symbol);

	if (getInferredName) {
		var name: any = getInferredName(sym);
		if (name === '') {
			return;
		}
		return name.slice(1, -1); // name.slice('['.length, -']'.length);
	}

	var desc: any;
	if (getGlobalSymbolDescription) {
		desc = getGlobalSymbolDescription(sym);
		if (typeof desc === 'string') {
			return desc;
		}
	}

	desc = symToStr(sym).slice(7, -1); // str.slice('Symbol('.length, -')'.length);
	if (desc) {
		return desc;
	}
};
