"use strict";

module.exports = function (value: String) {
	try {
		return value.toString();
	} catch (error) {
		try { return String(value); }
		catch (error2) { return null; }
	}
};
