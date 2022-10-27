"use strict";

var isValue: Function = require("../value/is");

// prettier-ignore
var possibleTypes: Object = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value: String) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};
