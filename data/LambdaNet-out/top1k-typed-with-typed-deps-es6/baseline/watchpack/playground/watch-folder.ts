"use strict";

import path from 'path';
import Watchpack from '../';

var folder: String = path.join(__dirname, "folder");

function startWatcher(name: String, files: String, folders: String): Void {
	var w: Watchpack = new Watchpack({
		aggregateTimeout: 3000
	});

	w.on("change", function(file: String, mtime: Number) {
		console.log(name, "change", path.relative(folder, file), mtime);
	});

	w.on("aggregated", function(changes: Array) {
		var times: Object = w.getTimes();
		console.log(name, "aggregated", Array.from(changes, function(file: String) {
			return path.relative(folder, file);
		}), Object.keys(times).reduce(function(obj: Object, file: String) {
			obj[path.relative(folder, file)] = times[file];
			return obj
		}, {}));
	});

	var startTime: Number = Date.now() - 10000;
	console.log(name, startTime);
	w.watch(files, folders, startTime);
}

startWatcher("folder", [], [folder]);
startWatcher("sub+files", [
	path.join(folder, "a.txt"),
	path.join(folder, "b.txt"),
	path.join(folder, "c.txt"),
	path.join(folder, "d.txt"),
], [
	path.join(folder, "subfolder")
]);
