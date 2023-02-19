"use strict";

import isValue from '../value/is';
import resolveErrorMessage from './resolve-error-message';

export default function (value: string, defaultMessage: string, inputOptions: object) {
	if (inputOptions && !isValue(value)) {
		if ("default" in inputOptions) return inputOptions["default"];
		if (inputOptions.isOptional) return null;
	}
	var ErrorConstructor: object = (inputOptions && inputOptions.Error) || TypeError;
	var error: HTMLElement = new ErrorConstructor(resolveErrorMessage(defaultMessage, value, inputOptions));
	if (inputOptions && inputOptions.errorCode) error.code = inputOptions.errorCode;
	throw error;
};
