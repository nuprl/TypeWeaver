"use strict";

var isValue: any = require("../value/is");

// prettier-ignore
var possibleTypes: any = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value: any) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};
