'use strict';
import os from 'os';

function homedir(): boolean {
	var env: HTMLElement = process.env;
	var home: number = env.HOME;
	var user: number = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;

	if (process.platform === 'win32') {
		return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
	}

	if (process.platform === 'darwin') {
		return home || (user ? '/Users/' + user : null);
	}

	if (process.platform === 'linux') {
		return home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));
	}

	return home || null;
}

export default typeof os.homedir === 'function' ? os.homedir : homedir;
