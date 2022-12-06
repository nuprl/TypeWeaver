'use strict';

var GetIntrinsic: Function = require('get-intrinsic');

var callBound: Function = require('call-bind/callBound');

var $SyntaxError: object = GetIntrinsic('%SyntaxError%');
var getGlobalSymbolDescription: Function = GetIntrinsic('%Symbol.keyFor%', true);
var thisSymbolValue: object = callBound('%Symbol.prototype.valueOf%', true);
var symToStr: Function = callBound('Symbol.prototype.toString', true);

var getInferredName: Function = require('./getInferredName');

/* eslint-disable consistent-return */
module.exports = callBound('%Symbol.prototype.description%', true) || function getSymbolDescription(symbol: string): any[] {
	if (!thisSymbolValue) {
		throw new $SyntaxError('Symbols are not supported in this environment');
	}

	// will throw if not a symbol primitive or wrapper object
	var sym: number = thisSymbolValue(symbol);

	if (getInferredName) {
		var name: string = getInferredName(sym);
		if (name === '') {
			return;
		}
		return name.slice(1, -1); // name.slice('['.length, -']'.length);
	}

	var desc: string;
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
