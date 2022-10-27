'use strict';

import GetIntrinsic from 'get-intrinsic';
import callBound from 'call-bind/callBound';

var $SyntaxError: Object = GetIntrinsic('%SyntaxError%');
var getGlobalSymbolDescription: Function = GetIntrinsic('%Symbol.keyFor%', true);
var thisSymbolValue: Object = callBound('%Symbol.prototype.valueOf%', true);
var symToStr: Function = callBound('Symbol.prototype.toString', true);

import getInferredName from './getInferredName';

/* eslint-disable consistent-return */
export default callBound('%Symbol.prototype.description%', true) || function getSymbolDescription(symbol: String): Array {
	if (!thisSymbolValue) {
		throw new $SyntaxError('Symbols are not supported in this environment');
	}

	// will throw if not a symbol primitive or wrapper object
	var sym: String = thisSymbolValue(symbol);

	if (getInferredName) {
		var name: String = getInferredName(sym);
		if (name === '') {
			return;
		}
		return name.slice(1, -1); // name.slice('['.length, -']'.length);
	}

	var desc: String;
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
