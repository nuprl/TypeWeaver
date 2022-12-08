"use strict";

var isValue: Function             = require("../value/is")
  , resolveErrorMessage: Function = require("./resolve-error-message");

module.exports = function (value: string, defaultMessage: string, inputOptions: object) {
	if (inputOptions && !isValue(value)) {
		if ("default" in inputOptions) return inputOptions["default"];
		if (inputOptions.isOptional) return null;
	}
	var ErrorConstructor: object = (inputOptions && inputOptions.Error) || TypeError;
	var error: HTMLElement = new ErrorConstructor(resolveErrorMessage(defaultMessage, value, inputOptions));
	if (inputOptions && inputOptions.errorCode) error.code = inputOptions.errorCode;
	throw error;
};
