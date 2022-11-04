'use strict';

function posix(path: String): Boolean {
	return path.charAt(0) === '/';
}

function win32(path: String): Boolean {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe: RegExp = /^([a-zA-Z]:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?([\\/])?([\s\S]*?)$/;
	var result: Promise = splitDeviceRe.exec(path);
	var device: String = result[1] || '';
	var isUnc: Boolean = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;