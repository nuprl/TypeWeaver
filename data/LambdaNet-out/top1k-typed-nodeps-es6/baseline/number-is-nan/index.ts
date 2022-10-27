'use strict';

export default function (value: String) {
	return typeof value === 'number' && value !== value;
};
