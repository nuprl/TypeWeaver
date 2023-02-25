'use strict';

module.exports = function (value: number) {
	return typeof value === 'number' && value !== value;
};