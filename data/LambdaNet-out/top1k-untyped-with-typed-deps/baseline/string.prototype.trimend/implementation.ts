'use strict';

var callBound: Function = require('call-bind/callBound');
var $replace: Object = callBound('String.prototype.replace');

var mvsIsWS: Boolean = (/^\s$/).test('\u180E');
/* eslint-disable no-control-regex */
var endWhitespace: Function = mvsIsWS
	? /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/
	: /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
/* eslint-enable no-control-regex */

module.exports = function trimEnd(): Void {
	return $replace(this, endWhitespace, '');
};
