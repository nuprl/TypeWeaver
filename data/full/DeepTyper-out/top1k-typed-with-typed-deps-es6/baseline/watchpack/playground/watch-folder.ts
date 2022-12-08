"use strict";

import path from 'path';
import Watchpack from '../';

var folder: string = path.join(__dirname, "folder");

function startWatcher(name: string, files: any, folders: any[]): any {
	var w: any = new Watchpack({
		aggregateTimeout: 3000
	});

	w.on("change", function(file: string, mtime: number) {
		console.log(name, "change", path.relative(folder, file), mtime);
	});

	w.on("aggregated", function(changes: any) {
		var times: any = w.getTimes();
		console.log(name, "aggregated", Array.from(changes, function(file: string) {
			return path.relative(folder, file);
		}), Object.keys(times).reduce(function(obj: any, file: string) {
			obj[path.relative(folder, file)] = times[file];
			return obj
		}, {}));
	});

	var startTime: number = Date.now() - 10000;
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
