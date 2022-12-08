"use strict";

var path = require("path");
var Watchpack = require("../");

var folder = path.join(__dirname, "folder");

function startWatcher(name: String,  files: String,  folders: String) {
	var w = new Watchpack({
		aggregateTimeout: 3000
	});

	w.on("change", function(file: FileEntry,  mtime: Date) {
		console.log(name, "change", path.relative(folder, file), mtime);
	});

	w.on("aggregated", function(changes: Change[]) {
		var times = w.getTimes();
		console.log(name, "aggregated", Array.from(changes, function(file: URI) {
			return path.relative(folder, file);
		}), Object.keys(times).reduce(function(obj: any,  file: any) {
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