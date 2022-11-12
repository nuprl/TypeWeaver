/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import path from 'path';
import DirectoryWatcher from './DirectoryWatcher';

class WatcherManager {
	constructor(options) {
		this.options = options;
		this.directoryWatchers = new Map();
	}

	getDirectoryWatcher(directory) {
		const watcher: DirectoryWatcher = this.directoryWatchers.get(directory);
		if (watcher === undefined) {
			const newWatcher: DirectoryWatcher = new DirectoryWatcher(this, directory, this.options);
			this.directoryWatchers.set(directory, newWatcher);
			newWatcher.on("closed", () => {
				this.directoryWatchers.delete(directory);
			});
			return newWatcher;
		}
		return watcher;
	}

	watchFile(p, startTime) {
		const directory: Number = path.dirname(p);
		if (directory === p) return null;
		return this.getDirectoryWatcher(directory).watch(p, startTime);
	}

	watchDirectory(directory, startTime) {
		return this.getDirectoryWatcher(directory).watch(directory, startTime);
	}
}

const watcherManagers: Error = new WeakMap();
/**
 * @param {object} options options
 * @returns {WatcherManager} the watcher manager
 */
module.exports = (options: Function) => {
	const watcherManager: WatcherManager = watcherManagers.get(options);
	if (watcherManager !== undefined) return watcherManager;
	const newWatcherManager: String = new WatcherManager(options);
	watcherManagers.set(options, newWatcherManager);
	return newWatcherManager;
};
module.exports.WatcherManager = WatcherManager;
