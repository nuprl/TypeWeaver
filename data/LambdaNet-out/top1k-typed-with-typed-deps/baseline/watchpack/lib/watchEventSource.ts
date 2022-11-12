/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const fs: String = require("fs");
const path: String = require("path");
const { EventEmitter } = require("events");
const reducePlan: Function = require("./reducePlan");

const IS_OSX: Boolean = require("os").platform() === "darwin";
const IS_WIN: Boolean = require("os").platform() === "win32";
const SUPPORTS_RECURSIVE_WATCHING: Number = IS_OSX || IS_WIN;

const watcherLimit: Number =
	+process.env.WATCHPACK_WATCHER_LIMIT || (IS_OSX ? 2000 : 10000);

const recursiveWatcherLogging: RecursiveWatcher = !!process.env
	.WATCHPACK_RECURSIVE_WATCHER_LOGGING;

let isBatch: Boolean = false;
let watcherCount: Number = 0;

/** @type {Map<Watcher, string>} */
const pendingWatchers: Map = new Map();

/** @type {Map<string, RecursiveWatcher>} */
const recursiveWatchers: Map = new Map();

/** @type {Map<string, DirectWatcher>} */
const directWatchers: Map = new Map();

/** @type {Map<Watcher, RecursiveWatcher | DirectWatcher>} */
const underlyingWatcher: Map = new Map();

class DirectWatcher {
	constructor(filePath) {
		this.filePath = filePath;
		this.watchers = new Set();
		this.watcher = undefined;
		try {
			const watcher: Watcher = fs.watch(filePath);
			this.watcher = watcher;
			watcher.on("change", (type: String, filename: String) => {
				for (const w of this.watchers) {
					w.emit("change", type, filename);
				}
			});
			watcher.on("error", (error: Object) => {
				for (const w of this.watchers) {
					w.emit("error", error);
				}
			});
		} catch (err) {
			process.nextTick(() => {
				for (const w of this.watchers) {
					w.emit("error", err);
				}
			});
		}
		watcherCount++;
	}

	add(watcher) {
		underlyingWatcher.set(watcher, this);
		this.watchers.add(watcher);
	}

	remove(watcher) {
		this.watchers.delete(watcher);
		if (this.watchers.size === 0) {
			directWatchers.delete(this.filePath);
			watcherCount--;
			if (this.watcher) this.watcher.close();
		}
	}

	getWatchers() {
		return this.watchers;
	}
}

class RecursiveWatcher {
	constructor(rootPath) {
		this.rootPath = rootPath;
		/** @type {Map<Watcher, string>} */
		this.mapWatcherToPath = new Map();
		/** @type {Map<string, Set<Watcher>>} */
		this.mapPathToWatchers = new Map();
		this.watcher = undefined;
		try {
			const watcher: Watcher = fs.watch(rootPath, {
				recursive: true
			});
			this.watcher = watcher;
			watcher.on("change", (type: String, filename: Number) => {
				if (!filename) {
					if (recursiveWatcherLogging) {
						process.stderr.write(
							`[watchpack] dispatch ${type} event in recursive watcher (${
								this.rootPath
							}) to all watchers\n`
						);
					}
					for (const w of this.mapWatcherToPath.keys()) {
						w.emit("change", type);
					}
				} else {
					const dir: String = path.dirname(filename);
					const watchers: Array = this.mapPathToWatchers.get(dir);
					if (recursiveWatcherLogging) {
						process.stderr.write(
							`[watchpack] dispatch ${type} event in recursive watcher (${
								this.rootPath
							}) for '${filename}' to ${
								watchers ? watchers.size : 0
							} watchers\n`
						);
					}
					if (watchers === undefined) return;
					for (const w of watchers) {
						w.emit("change", type, path.basename(filename));
					}
				}
			});
			watcher.on("error", (error: Object) => {
				for (const w of this.mapWatcherToPath.keys()) {
					w.emit("error", error);
				}
			});
		} catch (err) {
			process.nextTick(() => {
				for (const w of this.mapWatcherToPath.keys()) {
					w.emit("error", err);
				}
			});
		}
		watcherCount++;
		if (recursiveWatcherLogging) {
			process.stderr.write(
				`[watchpack] created recursive watcher at ${rootPath}\n`
			);
		}
	}

	add(filePath, watcher) {
		underlyingWatcher.set(watcher, this);
		const subpath: String = filePath.slice(this.rootPath.length + 1) || ".";
		this.mapWatcherToPath.set(watcher, subpath);
		const set: RecursiveWatcher = this.mapPathToWatchers.get(subpath);
		if (set === undefined) {
			const newSet: Error = new Set();
			newSet.add(watcher);
			this.mapPathToWatchers.set(subpath, newSet);
		} else {
			set.add(watcher);
		}
	}

	remove(watcher) {
		const subpath: String = this.mapWatcherToPath.get(watcher);
		if (!subpath) return;
		this.mapWatcherToPath.delete(watcher);
		const set: Map = this.mapPathToWatchers.get(subpath);
		set.delete(watcher);
		if (set.size === 0) {
			this.mapPathToWatchers.delete(subpath);
		}
		if (this.mapWatcherToPath.size === 0) {
			recursiveWatchers.delete(this.rootPath);
			watcherCount--;
			if (this.watcher) this.watcher.close();
			if (recursiveWatcherLogging) {
				process.stderr.write(
					`[watchpack] closed recursive watcher at ${this.rootPath}\n`
				);
			}
		}
	}

	getWatchers() {
		return this.mapWatcherToPath;
	}
}

class Watcher extends EventEmitter {
	close() {
		if (pendingWatchers.has(this)) {
			pendingWatchers.delete(this);
			return;
		}
		const watcher: RecursiveWatcher = underlyingWatcher.get(this);
		watcher.remove(this);
		underlyingWatcher.delete(this);
	}
}

const createDirectWatcher: Function = (filePath: String) => {
	const existing: String = directWatchers.get(filePath);
	if (existing !== undefined) return existing;
	const w: WatcherManager = new DirectWatcher(filePath);
	directWatchers.set(filePath, w);
	return w;
};

const createRecursiveWatcher: Function = (rootPath: String) => {
	const existing: String = recursiveWatchers.get(rootPath);
	if (existing !== undefined) return existing;
	const w: WatcherManager = new RecursiveWatcher(rootPath);
	recursiveWatchers.set(rootPath, w);
	return w;
};

const execute: Function = () => {
	/** @type {Map<string, Watcher[] | Watcher>} */
	const map: Map = new Map();
	const addWatcher: Function = (watcher: Watcher, filePath: String) => {
		const entry: Array = map.get(filePath);
		if (entry === undefined) {
			map.set(filePath, watcher);
		} else if (Array.isArray(entry)) {
			entry.push(watcher);
		} else {
			map.set(filePath, [entry, watcher]);
		}
	};
	for (const [watcher, filePath] of pendingWatchers) {
		addWatcher(watcher, filePath);
	}
	pendingWatchers.clear();

	// Fast case when we are not reaching the limit
	if (!SUPPORTS_RECURSIVE_WATCHING || watcherLimit - watcherCount >= map.size) {
		// Create watchers for all entries in the map
		for (const [filePath, entry] of map) {
			const w: DirectWatcher = createDirectWatcher(filePath);
			if (Array.isArray(entry)) {
				for (const item of entry) w.add(item);
			} else {
				w.add(entry);
			}
		}
		return;
	}

	// Reconsider existing watchers to improving watch plan
	for (const watcher of recursiveWatchers.values()) {
		for (const [w, subpath] of watcher.getWatchers()) {
			addWatcher(w, path.join(watcher.rootPath, subpath));
		}
	}
	for (const watcher of directWatchers.values()) {
		for (const w of watcher.getWatchers()) {
			addWatcher(w, watcher.filePath);
		}
	}

	// Merge map entries to keep watcher limit
	// Create a 10% buffer to be able to enter fast case more often
	const plan: Array = reducePlan(map, watcherLimit * 0.9);

	// Update watchers for all entries in the map
	for (const [filePath, entry] of plan) {
		if (entry.size === 1) {
			for (const [watcher, filePath] of entry) {
				const w: DirectWatcher = createDirectWatcher(filePath);
				const old: RecursiveWatcher = underlyingWatcher.get(watcher);
				if (old === w) continue;
				w.add(watcher);
				if (old !== undefined) old.remove(watcher);
			}
		} else {
			const filePaths: Error = new Set(entry.values());
			if (filePaths.size > 1) {
				const w: RecursiveWatcher = createRecursiveWatcher(filePath);
				for (const [watcher, watcherPath] of entry) {
					const old: RecursiveWatcher = underlyingWatcher.get(watcher);
					if (old === w) continue;
					w.add(watcherPath, watcher);
					if (old !== undefined) old.remove(watcher);
				}
			} else {
				for (const filePath of filePaths) {
					const w: DirectWatcher = createDirectWatcher(filePath);
					for (const watcher of entry.keys()) {
						const old: RecursiveWatcher = underlyingWatcher.get(watcher);
						if (old === w) continue;
						w.add(watcher);
						if (old !== undefined) old.remove(watcher);
					}
				}
			}
		}
	}
};

exports.watch = (filePath: String) => {
	const watcher: DirectoryWatcher = new Watcher();
	// Find an existing watcher
	const directWatcher: DirectWatcher = directWatchers.get(filePath);
	if (directWatcher !== undefined) {
		directWatcher.add(watcher);
		return watcher;
	}
	let current: Number = filePath;
	for (;;) {
		const recursiveWatcher: RecursiveWatcher = recursiveWatchers.get(current);
		if (recursiveWatcher !== undefined) {
			recursiveWatcher.add(filePath, watcher);
			return watcher;
		}
		const parent: String = path.dirname(current);
		if (parent === current) break;
		current = parent;
	}
	// Queue up watcher for creation
	pendingWatchers.set(watcher, filePath);
	if (!isBatch) execute();
	return watcher;
};

exports.batch = (fn: Function) => {
	isBatch = true;
	try {
		fn();
	} finally {
		isBatch = false;
		execute();
	}
};

exports.getNumberOfWatchers = () => {
	return watcherCount;
};
