'use strict';

module.exports = function (value: string) {
	return typeof value === 'number' && value !== value;
};
