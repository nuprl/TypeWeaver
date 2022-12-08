'use strict';

export default function (value: any) {
	return typeof value === 'number' && value !== value;
};