/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import getWatcherManager from './getWatcherManager';
import LinkResolver from './LinkResolver';
import { EventEmitter } from 'events';
import globToRegExp from 'glob-to-regexp';
import watchEventSource from './watchEventSource';

const EMPTY_ARRAY: any[] = [];
const EMPTY_OPTIONS: Function = {};

function addWatchersToSet(watchers: any[], set: DirectWatcher): void {
	for (const ww of watchers) {
		const w: HTMLElement = ww.watcher;
		if (!set.has(w.directoryWatcher)) {
			set.add(w.directoryWatcher);
		}
	}
}

const stringToRegexp: Function = (ignored: any[]) => {
	const source: any[] = globToRegExp(ignored, { globstar: true, extended: true })
		.source;
	const matchingStart: string = source.slice(0, source.length - 1) + "(?:$|\\/)";
	return matchingStart;
};

const ignoredToFunction: Function = (ignored: any[]) => {
	if (Array.isArray(ignored)) {
		const regexp: HTMLElement = new RegExp(ignored.map((i: string) => stringToRegexp(i)).join("|"));
		return (x: string) => regexp.test(x.replace(/\\/g, "/"));
	} else if (typeof ignored === "string") {
		const regexp: HTMLElement = new RegExp(stringToRegexp(ignored));
		return (x: string) => regexp.test(x.replace(/\\/g, "/"));
	} else if (ignored instanceof RegExp) {
		return (x: string) => ignored.test(x.replace(/\\/g, "/"));
	} else if (ignored instanceof Function) {
		return ignored;
	} else if (ignored) {
		throw new Error(`Invalid option for 'ignored': ${ignored}`);
	} else {
		return () => false;
	}
};

const normalizeOptions: Function = (options: object) => {
	return {
		followSymlinks: !!options.followSymlinks,
		ignored: ignoredToFunction(options.ignored),
		poll: options.poll
	};
};

const normalizeCache: Error = new WeakMap();
const cachedNormalizeOptions: Function = (options: Function) => {
	const cacheEntry: any[] = normalizeCache.get(options);
	if (cacheEntry !== undefined) return cacheEntry;
	const normalized: any[] = normalizeOptions(options);
	normalizeCache.set(options, normalized);
	return normalized;
};

class WatchpackFileWatcher {
	constructor(watchpack, watcher, files) {
		this.files = Array.isArray(files) ? files : [files];
		this.watcher = watcher;
		watcher.on("initial-missing", (type: number) => {
			for (const file of this.files) {
				if (!watchpack._missing.has(file))
					watchpack._onRemove(file, file, type);
			}
		});
		watcher.on("change", (mtime: string, type: number) => {
			for (const file of this.files) {
				watchpack._onChange(file, mtime, file, type);
			}
		});
		watcher.on("remove", (type: number) => {
			for (const file of this.files) {
				watchpack._onRemove(file, file, type);
			}
		});
	}

	update(files) {
		if (!Array.isArray(files)) {
			if (this.files.length !== 1) {
				this.files = [files];
			} else if (this.files[0] !== files) {
				this.files[0] = files;
			}
		} else {
			this.files = files;
		}
	}

	close() {
		this.watcher.close();
	}
}

class WatchpackDirectoryWatcher {
	constructor(watchpack, watcher, directories) {
		this.directories = Array.isArray(directories) ? directories : [directories];
		this.watcher = watcher;
		watcher.on("initial-missing", (type: number) => {
			for (const item of this.directories) {
				watchpack._onRemove(item, item, type);
			}
		});
		watcher.on("change", (file: string, mtime: string, type: number) => {
			for (const item of this.directories) {
				watchpack._onChange(item, mtime, file, type);
			}
		});
		watcher.on("remove", (type: number) => {
			for (const item of this.directories) {
				watchpack._onRemove(item, item, type);
			}
		});
	}

	update(directories) {
		if (!Array.isArray(directories)) {
			if (this.directories.length !== 1) {
				this.directories = [directories];
			} else if (this.directories[0] !== directories) {
				this.directories[0] = directories;
			}
		} else {
			this.directories = directories;
		}
	}

	close() {
		this.watcher.close();
	}
}

class Watchpack extends EventEmitter {
	constructor(options) {
		super();
		if (!options) options = EMPTY_OPTIONS;
		this.options = options;
		this.aggregateTimeout =
			typeof options.aggregateTimeout === "number"
				? options.aggregateTimeout
				: 200;
		this.watcherOptions = cachedNormalizeOptions(options);
		this.watcherManager = getWatcherManager(this.watcherOptions);
		this.fileWatchers = new Map();
		this.directoryWatchers = new Map();
		this._missing = new Set();
		this.startTime = undefined;
		this.paused = false;
		this.aggregatedChanges = new Set();
		this.aggregatedRemovals = new Set();
		this.aggregateTimer = undefined;
		this._onTimeout = this._onTimeout.bind(this);
	}

	watch(arg1, arg2, arg3) {
		let files: Function, directories: any[], missing: any[], startTime: number;
		if (!arg2) {
			({
				files = EMPTY_ARRAY,
				directories = EMPTY_ARRAY,
				missing = EMPTY_ARRAY,
				startTime
			} = arg1);
		} else {
			files = arg1;
			directories = arg2;
			missing = EMPTY_ARRAY;
			startTime = arg3;
		}
		this.paused = false;
		const fileWatchers: Map = this.fileWatchers;
		const directoryWatchers: Map = this.directoryWatchers;
		const ignored: Function = this.watcherOptions.ignored;
		const filter: Function = (path: string) => !ignored(path);
		const addToMap: Function = (map: Map, key: string, item: string) => {
			const list: any[] = map.get(key);
			if (list === undefined) {
				map.set(key, item);
			} else if (Array.isArray(list)) {
				list.push(item);
			} else {
				map.set(key, [list, item]);
			}
		};
		const fileWatchersNeeded: Map = new Map();
		const directoryWatchersNeeded: Map = new Map();
		const missingFiles: HTMLElement = new Set();
		if (this.watcherOptions.followSymlinks) {
			const resolver: LinkResolver = new LinkResolver();
			for (const file of files) {
				if (filter(file)) {
					for (const innerFile of resolver.resolve(file)) {
						if (file === innerFile || filter(innerFile)) {
							addToMap(fileWatchersNeeded, innerFile, file);
						}
					}
				}
			}
			for (const file of missing) {
				if (filter(file)) {
					for (const innerFile of resolver.resolve(file)) {
						if (file === innerFile || filter(innerFile)) {
							missingFiles.add(file);
							addToMap(fileWatchersNeeded, innerFile, file);
						}
					}
				}
			}
			for (const dir of directories) {
				if (filter(dir)) {
					let first: boolean = true;
					for (const innerItem of resolver.resolve(dir)) {
						if (filter(innerItem)) {
							addToMap(
								first ? directoryWatchersNeeded : fileWatchersNeeded,
								innerItem,
								dir
							);
						}
						first = false;
					}
				}
			}
		} else {
			for (const file of files) {
				if (filter(file)) {
					addToMap(fileWatchersNeeded, file, file);
				}
			}
			for (const file of missing) {
				if (filter(file)) {
					missingFiles.add(file);
					addToMap(fileWatchersNeeded, file, file);
				}
			}
			for (const dir of directories) {
				if (filter(dir)) {
					addToMap(directoryWatchersNeeded, dir, dir);
				}
			}
		}
		// Close unneeded old watchers
		// and update existing watchers
		for (const [key, w] of fileWatchers) {
			const needed: string = fileWatchersNeeded.get(key);
			if (needed === undefined) {
				w.close();
				fileWatchers.delete(key);
			} else {
				w.update(needed);
				fileWatchersNeeded.delete(key);
			}
		}
		for (const [key, w] of directoryWatchers) {
			const needed: string = directoryWatchersNeeded.get(key);
			if (needed === undefined) {
				w.close();
				directoryWatchers.delete(key);
			} else {
				w.update(needed);
				directoryWatchersNeeded.delete(key);
			}
		}
		// Create new watchers and install handlers on these watchers
		watchEventSource.batch(() => {
			for (const [key, files] of fileWatchersNeeded) {
				const watcher: Watcher = this.watcherManager.watchFile(key, startTime);
				if (watcher) {
					fileWatchers.set(key, new WatchpackFileWatcher(this, watcher, files));
				}
			}
			for (const [key, directories] of directoryWatchersNeeded) {
				const watcher: Watcher = this.watcherManager.watchDirectory(key, startTime);
				if (watcher) {
					directoryWatchers.set(
						key,
						new WatchpackDirectoryWatcher(this, watcher, directories)
					);
				}
			}
		});
		this._missing = missingFiles;
		this.startTime = startTime;
	}

	close() {
		this.paused = true;
		if (this.aggregateTimer) clearTimeout(this.aggregateTimer);
		for (const w of this.fileWatchers.values()) w.close();
		for (const w of this.directoryWatchers.values()) w.close();
		this.fileWatchers.clear();
		this.directoryWatchers.clear();
	}

	pause() {
		this.paused = true;
		if (this.aggregateTimer) clearTimeout(this.aggregateTimer);
	}

	getTimes() {
		const directoryWatchers: HTMLElement = new Set();
		addWatchersToSet(this.fileWatchers.values(), directoryWatchers);
		addWatchersToSet(this.directoryWatchers.values(), directoryWatchers);
		const obj: object = Object.create(null);
		for (const w of directoryWatchers) {
			const times: object = w.getTimes();
			for (const file of Object.keys(times)) obj[file] = times[file];
		}
		return obj;
	}

	getTimeInfoEntries() {
		const map: Map = new Map();
		this.collectTimeInfoEntries(map, map);
		return map;
	}

	collectTimeInfoEntries(fileTimestamps, directoryTimestamps) {
		const allWatchers: Error = new Set();
		addWatchersToSet(this.fileWatchers.values(), allWatchers);
		addWatchersToSet(this.directoryWatchers.values(), allWatchers);
		const safeTime: object = { value: 0 };
		for (const w of allWatchers) {
			w.collectTimeInfoEntries(fileTimestamps, directoryTimestamps, safeTime);
		}
	}

	getAggregated() {
		if (this.aggregateTimer) {
			clearTimeout(this.aggregateTimer);
			this.aggregateTimer = undefined;
		}
		const changes: Function = this.aggregatedChanges;
		const removals: number = this.aggregatedRemovals;
		this.aggregatedChanges = new Set();
		this.aggregatedRemovals = new Set();
		return { changes, removals };
	}

	_onChange(item, mtime, file, type) {
		file = file || item;
		if (!this.paused) {
			this.emit("change", file, mtime, type);
			if (this.aggregateTimer) clearTimeout(this.aggregateTimer);
			this.aggregateTimer = setTimeout(this._onTimeout, this.aggregateTimeout);
		}
		this.aggregatedRemovals.delete(item);
		this.aggregatedChanges.add(item);
	}

	_onRemove(item, file, type) {
		file = file || item;
		if (!this.paused) {
			this.emit("remove", file, type);
			if (this.aggregateTimer) clearTimeout(this.aggregateTimer);
			this.aggregateTimer = setTimeout(this._onTimeout, this.aggregateTimeout);
		}
		this.aggregatedChanges.delete(item);
		this.aggregatedRemovals.add(item);
	}

	_onTimeout() {
		this.aggregateTimer = undefined;
		const changes: Function = this.aggregatedChanges;
		const removals: Function = this.aggregatedRemovals;
		this.aggregatedChanges = new Set();
		this.aggregatedRemovals = new Set();
		this.emit("aggregated", changes, removals);
	}
}

export default Watchpack;
