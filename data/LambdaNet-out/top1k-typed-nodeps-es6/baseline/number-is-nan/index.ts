'use strict';

export default function (value: string) {
	return typeof value === 'number' && value !== value;
};
