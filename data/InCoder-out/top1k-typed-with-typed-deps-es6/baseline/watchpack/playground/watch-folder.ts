"use strict";

import path from 'path';
import Watchpack from '../';

var folder = path.join(__dirname, "folder");

function startWatcher(name: any,  files: any,  folders: any) {
	var w = new Watchpack({
		aggregateTimeout: 3000
	});

	w.on("change", function(file: File,  mtime: number) {
		console.log(name, "change", path.relative(folder, file), mtime);
	});

	w.on("aggregated", function(changes: any) {
		var times = w.getTimes();
		console.log(name, "aggregated", Array.from(changes, function(file: File) {
			return path.relative(folder, file);
		}), Object.keys(times).reduce(function(obj: any,  file: File) {
			obj[path.relative(folder, file)] = times[file];
			return obj
		}, {}));
	});

	var startTime = Date.now() - 10000;
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