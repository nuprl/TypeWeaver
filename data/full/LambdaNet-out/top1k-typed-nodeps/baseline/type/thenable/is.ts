"use strict";

var isObject: Function = require("../object/is");

module.exports = function (value: Promise) {
	if (!isObject(value)) return false;
	try { return typeof value.then === "function"; }
	catch (error) { return false; }
};
