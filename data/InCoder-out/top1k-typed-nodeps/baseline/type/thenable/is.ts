"use strict";

var isObject = require("../object/is");

module.exports = function (value: any) {
	if (!isObject(value)) return false;
	try { return typeof value.then === "function"; }
	catch (error) { return false; }
};