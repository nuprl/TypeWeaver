'use strict';

module.exports = function (value: any) {
	return typeof value === 'number' && value !== value;
};
