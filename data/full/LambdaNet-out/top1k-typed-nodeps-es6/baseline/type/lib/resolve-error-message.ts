"use strict";

import stringCoerce from '../string/coerce';
import toShortString from './to-short-string';

export default function (errorMessage: string, value: string, inputOptions: Element) {
	if (inputOptions && inputOptions.errorMessage) {
		errorMessage = stringCoerce(inputOptions.errorMessage);
	}

	var valueInsertIndex: number = errorMessage.indexOf("%v");
	var valueToken: number = valueInsertIndex > -1 ? toShortString(value) : null;
	if (inputOptions && inputOptions.name) {
		var nameInsertIndex: string = errorMessage.indexOf("%n");
		if (nameInsertIndex > -1) {
			if (valueInsertIndex > -1) {
				var firstToken: string, secondToken: string, firstInsertIndex: number, secondInsertIndex: number;
				if (nameInsertIndex > valueInsertIndex) {
					firstToken = valueToken;
					firstInsertIndex = valueInsertIndex;
					secondToken = inputOptions.name;
					secondInsertIndex = nameInsertIndex;
				} else {
					firstToken = inputOptions.name;
					firstInsertIndex = nameInsertIndex;
					secondToken = valueToken;
					secondInsertIndex = valueInsertIndex;
				}
				return (
					errorMessage.slice(0, firstInsertIndex) +
					firstToken +
					errorMessage.slice(firstInsertIndex + 2, secondInsertIndex) +
					secondToken +
					errorMessage.slice(secondInsertIndex + 2)
				);
			}
			return (
				errorMessage.slice(0, nameInsertIndex) +
				inputOptions.name +
				errorMessage.slice(nameInsertIndex + 2)
			);
		}
	}
	if (valueInsertIndex > -1) {
		return (
			errorMessage.slice(0, valueInsertIndex) +
			valueToken +
			errorMessage.slice(valueInsertIndex + 2)
		);
	}
	return errorMessage;
};
