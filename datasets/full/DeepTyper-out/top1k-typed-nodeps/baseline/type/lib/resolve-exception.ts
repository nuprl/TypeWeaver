"use strict";

var isValue: any             = require("../value/is")
  , resolveErrorMessage = require("./resolve-error-message");

module.exports = function (value: any, defaultMessage: string, inputOptions: any) {
	if (inputOptions && !isValue(value)) {
		if ("default" in inputOptions) return inputOptions["default"];
		if (inputOptions.isOptional) return null;
	}
	var ErrorConstructor: any = (inputOptions && inputOptions.Error) || TypeError;
	var error: any = new ErrorConstructor(resolveErrorMessage(defaultMessage, value, inputOptions));
	if (inputOptions && inputOptions.errorCode) error.code = inputOptions.errorCode;
	throw error;
};
