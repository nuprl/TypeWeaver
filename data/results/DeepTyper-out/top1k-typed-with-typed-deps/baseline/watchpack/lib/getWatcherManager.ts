/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path: any = require("path");
const DirectoryWatcher: any = require("./DirectoryWatcher");

class WatcherManager {
	constructor(options) {
		this.options = options;
		this.directoryWatchers = new Map();
	}

	getDirectoryWatcher(directory) {
		const watcher: any = this.directoryWatchers.get(directory);
		if (watcher === undefined) {
			const newWatcher: any = new DirectoryWatcher(this, directory, this.options);
			this.directoryWatchers.set(directory, newWatcher);
			newWatcher.on("closed", () => {
				this.directoryWatchers.delete(directory);
			});
			return newWatcher;
		}
		return watcher;
	}

	watchFile(p, startTime) {
		const directory: any = path.dirname(p);
		if (directory === p) return null;
		return this.getDirectoryWatcher(directory).watch(p, startTime);
	}

	watchDirectory(directory, startTime) {
		return this.getDirectoryWatcher(directory).watch(directory, startTime);
	}
}

const watcherManagers: any = new WeakMap();
/**
 * @param {object} options options
 * @returns {WatcherManager} the watcher manager
 */
module.exports = (options: any) => {
	const watcherManager: any = watcherManagers.get(options);
	if (watcherManager !== undefined) return watcherManager;
	const newWatcherManager: any = new WatcherManager(options);
	watcherManagers.set(options, newWatcherManager);
	return newWatcherManager;
};
module.exports.WatcherManager = WatcherManager;
