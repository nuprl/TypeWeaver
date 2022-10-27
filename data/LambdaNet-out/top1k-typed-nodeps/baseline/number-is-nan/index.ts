'use strict';

module.exports = function (value: String) {
	return typeof value === 'number' && value !== value;
};
