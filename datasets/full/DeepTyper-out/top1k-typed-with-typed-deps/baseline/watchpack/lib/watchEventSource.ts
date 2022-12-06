/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const fs: any = require("fs");
const path: any = require("path");
const { EventEmitter } = require("events");
const reducePlan: any = require("./reducePlan");

const IS_OSX: any = require("os").platform() === "darwin";
const IS_WIN: any = require("os").platform() === "win32";
const SUPPORTS_RECURSIVE_WATCHING: any = IS_OSX || IS_WIN;

const watcherLimit: any =
	+process.env.WATCHPACK_WATCHER_LIMIT || (IS_OSX ? 2000 : 10000);

const recursiveWatcherLogging: boolean = !!process.env
	.WATCHPACK_RECURSIVE_WATCHER_LOGGING;

let isBatch: boolean = false;
let watcherCount: number = 0;

/** @type {Map<Watcher, string>} */
const pendingWatchers: any = new Map();

/** @type {Map<string, RecursiveWatcher>} */
const recursiveWatchers: any = new Map();

/** @type {Map<string, DirectWatcher>} */
const directWatchers: any = new Map();

/** @type {Map<Watcher, RecursiveWatcher | DirectWatcher>} */
const underlyingWatcher: any = new Map();

class DirectWatcher {
	constructor(filePath) {
		this.filePath = filePath;
		this.watchers = new Set();
		this.watcher = undefined;
		try {
			const watcher: any = fs.watch(filePath);
			this.watcher = watcher;
			watcher.on("change", (type, filename: string) => {
				for (const w of this.watchers) {
					w.emit("change", type, filename);
				}
			});
			watcher.on("error", (error: any) => {
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
			const watcher: any = fs.watch(rootPath, {
				recursive: true
			});
			this.watcher = watcher;
			watcher.on("change", (type, filename: string) => {
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
					const dir: any = path.dirname(filename);
					const watchers: any = this.mapPathToWatchers.get(dir);
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
			watcher.on("error", (error: any) => {
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
		const subpath: string = filePath.slice(this.rootPath.length + 1) || ".";
		this.mapWatcherToPath.set(watcher, subpath);
		const set = this.mapPathToWatchers.get(subpath);
		if (set === undefined) {
			const newSet: Set<any> = new Set();
			newSet.add(watcher);
			this.mapPathToWatchers.set(subpath, newSet);
		} else {
			set.add(watcher);
		}
	}

	remove(watcher) {
		const subpath: any = this.mapWatcherToPath.get(watcher);
		if (!subpath) return;
		this.mapWatcherToPath.delete(watcher);
		const set = this.mapPathToWatchers.get(subpath);
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
		const watcher: any = underlyingWatcher.get(this);
		watcher.remove(this);
		underlyingWatcher.delete(this);
	}
}

const createDirectWatcher: any = (filePath: string) => {
	const existing: any = directWatchers.get(filePath);
	if (existing !== undefined) return existing;
	const w: any = new DirectWatcher(filePath);
	directWatchers.set(filePath, w);
	return w;
};

const createRecursiveWatcher: any = (rootPath: string) => {
	const existing: any = recursiveWatchers.get(rootPath);
	if (existing !== undefined) return existing;
	const w: any = new RecursiveWatcher(rootPath);
	recursiveWatchers.set(rootPath, w);
	return w;
};

const execute: Promise<void> = () => {
	/** @type {Map<string, Watcher[] | Watcher>} */
	const map: any = new Map();
	const addWatcher: void = (watcher: number, filePath: string) => {
		const entry: any = map.get(filePath);
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
			const w: any = createDirectWatcher(filePath);
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
	const plan: any = reducePlan(map, watcherLimit * 0.9);

	// Update watchers for all entries in the map
	for (const [filePath, entry] of plan) {
		if (entry.size === 1) {
			for (const [watcher, filePath] of entry) {
				const w: any = createDirectWatcher(filePath);
				const old: any = underlyingWatcher.get(watcher);
				if (old === w) continue;
				w.add(watcher);
				if (old !== undefined) old.remove(watcher);
			}
		} else {
			const filePaths: Set<any> = new Set(entry.values());
			if (filePaths.size > 1) {
				const w: any = createRecursiveWatcher(filePath);
				for (const [watcher, watcherPath] of entry) {
					const old: any = underlyingWatcher.get(watcher);
					if (old === w) continue;
					w.add(watcherPath, watcher);
					if (old !== undefined) old.remove(watcher);
				}
			} else {
				for (const filePath of filePaths) {
					const w: any = createDirectWatcher(filePath);
					for (const watcher of entry.keys()) {
						const old: any = underlyingWatcher.get(watcher);
						if (old === w) continue;
						w.add(watcher);
						if (old !== undefined) old.remove(watcher);
					}
				}
			}
		}
	}
};

exports.watch = (filePath: string) => {
	const watcher: any = new Watcher();
	// Find an existing watcher
	const directWatcher: any = directWatchers.get(filePath);
	if (directWatcher !== undefined) {
		directWatcher.add(watcher);
		return watcher;
	}
	let current: string = filePath;
	for (;;) {
		const recursiveWatcher = recursiveWatchers.get(current);
		if (recursiveWatcher !== undefined) {
			recursiveWatcher.add(filePath, watcher);
			return watcher;
		}
		const parent: any = path.dirname(current);
		if (parent === current) break;
		current = parent;
	}
	// Queue up watcher for creation
	pendingWatchers.set(watcher, filePath);
	if (!isBatch) execute();
	return watcher;
};

exports.batch = (fn: any) => {
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
