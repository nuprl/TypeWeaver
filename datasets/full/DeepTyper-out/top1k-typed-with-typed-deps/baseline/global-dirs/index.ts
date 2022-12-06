'use strict';
const path: any = require('path');
const os: any = require('os');
const fs: any = require('fs');
const ini: any = require('ini');

const isWindows: boolean = process.platform === 'win32';

const readRc: any = (filePath: any) => {
	try {
		return ini.parse(fs.readFileSync(filePath, 'utf8')).prefix;
	} catch {}
};

const getEnvNpmPrefix: string = () => {
	// TODO: Remove the `.reduce` call.
	// eslint-disable-next-line unicorn/no-array-reduce
	return Object.keys(process.env).reduce((prefix: string, name: string) => {
		return /^npm_config_prefix$/i.test(name) ? process.env[name] : prefix;
	}, undefined);
};

const getGlobalNpmrc: any = () => {
	if (isWindows && process.env.APPDATA) {
		// Hardcoded contents of `c:\Program Files\nodejs\node_modules\npm\npmrc`
		return path.join(process.env.APPDATA, '/npm/etc/npmrc');
	}

	// Homebrew special case: `$(brew --prefix)/lib/node_modules/npm/npmrc`
	if (process.execPath.includes('/Cellar/node')) {
		const homebrewPrefix: any = process.execPath.slice(0, process.execPath.indexOf('/Cellar/node'));
		return path.join(homebrewPrefix, '/lib/node_modules/npm/npmrc');
	}

	if (process.execPath.endsWith('/bin/node')) {
		const installDir: any = path.dirname(path.dirname(process.execPath));
		return path.join(installDir, '/etc/npmrc');
	}
};

const getDefaultNpmPrefix: any = () => {
	if (isWindows) {
		// `c:\node\node.exe` → `prefix=c:\node\`
		return path.dirname(process.execPath);
	}

	// `/usr/local/bin/node` → `prefix=/usr/local`
	return path.dirname(path.dirname(process.execPath));
};

const getNpmPrefix: any = () => {
	const envPrefix: any = getEnvNpmPrefix();
	if (envPrefix) {
		return envPrefix;
	}

	const homePrefix: any = readRc(path.join(os.homedir(), '.npmrc'));
	if (homePrefix) {
		return homePrefix;
	}

	if (process.env.PREFIX) {
		return process.env.PREFIX;
	}

	const globalPrefix: any = readRc(getGlobalNpmrc());
	if (globalPrefix) {
		return globalPrefix;
	}

	return getDefaultNpmPrefix();
};

const npmPrefix: any = path.resolve(getNpmPrefix());

const getYarnWindowsDirectory: any = () => {
	if (isWindows && process.env.LOCALAPPDATA) {
		const dir: any = path.join(process.env.LOCALAPPDATA, 'Yarn');
		if (fs.existsSync(dir)) {
			return dir;
		}
	}

	return false;
};

const getYarnPrefix: any = () => {
	if (process.env.PREFIX) {
		return process.env.PREFIX;
	}

	const windowsPrefix: any = getYarnWindowsDirectory();
	if (windowsPrefix) {
		return windowsPrefix;
	}

	const configPrefix: any = path.join(os.homedir(), '.config/yarn');
	if (fs.existsSync(configPrefix)) {
		return configPrefix;
	}

	const homePrefix: any = path.join(os.homedir(), '.yarn-config');
	if (fs.existsSync(homePrefix)) {
		return homePrefix;
	}

	// Yarn supports the npm conventions but the inverse is not true
	return npmPrefix;
};

exports.npm = {};
exports.npm.prefix = npmPrefix;
exports.npm.packages = path.join(npmPrefix, isWindows ? 'node_modules' : 'lib/node_modules');
exports.npm.binaries = isWindows ? npmPrefix : path.join(npmPrefix, 'bin');

const yarnPrefix: any = path.resolve(getYarnPrefix());
exports.yarn = {};
exports.yarn.prefix = yarnPrefix;
exports.yarn.packages = path.join(yarnPrefix, getYarnWindowsDirectory() ? 'Data/global/node_modules' : 'global/node_modules');
exports.yarn.binaries = path.join(exports.yarn.packages, '.bin');
