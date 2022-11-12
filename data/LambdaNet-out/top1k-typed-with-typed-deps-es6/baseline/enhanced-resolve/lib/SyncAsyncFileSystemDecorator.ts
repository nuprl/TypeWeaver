/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** @typedef {import("./Resolver").FileSystem} FileSystem */
/** @typedef {import("./Resolver").SyncFileSystem} SyncFileSystem */

/**
 * @param {SyncFileSystem} fs file system implementation
 * @constructor
 */
function SyncAsyncFileSystemDecorator(fs: String): Void {
	this.fs = fs;

	this.lstat = undefined;
	this.lstatSync = undefined;
	const lstatSync: Function = fs.lstatSync;
	if (lstatSync) {
		this.lstat = (arg: String, options: Object, callback: Number) => {
			let result: CachedInputFileSystem;
			try {
				result = lstatSync.call(fs, arg);
			} catch (e) {
				return (callback || options)(e);
			}
			(callback || options)(null, result);
		};
		this.lstatSync = (arg: String, options: Object) => lstatSync.call(fs, arg, options);
	}

	this.stat = (arg: String, options: Object, callback: Boolean) => {
		let result: Number;
		try {
			result = callback ? fs.statSync(arg, options) : fs.statSync(arg);
		} catch (e) {
			return (callback || options)(e);
		}
		(callback || options)(null, result);
	};
	this.statSync = (arg: String, options: Object) => fs.statSync(arg, options);

	this.readdir = (arg: String, options: Object, callback: Number) => {
		let result: Number;
		try {
			result = fs.readdirSync(arg);
		} catch (e) {
			return (callback || options)(e);
		}
		(callback || options)(null, result);
	};
	this.readdirSync = (arg: String, options: Object) => fs.readdirSync(arg, options);

	this.readFile = (arg: String, options: Object, callback: Number) => {
		let result: Number;
		try {
			result = fs.readFileSync(arg);
		} catch (e) {
			return (callback || options)(e);
		}
		(callback || options)(null, result);
	};
	this.readFileSync = (arg: String, options: String) => fs.readFileSync(arg, options);

	this.readlink = (arg: String, options: Object, callback: Number) => {
		let result: Number;
		try {
			result = fs.readlinkSync(arg);
		} catch (e) {
			return (callback || options)(e);
		}
		(callback || options)(null, result);
	};
	this.readlinkSync = (arg: String, options: Object) => fs.readlinkSync(arg, options);

	this.readJson = undefined;
	this.readJsonSync = undefined;
	const readJsonSync: Function = fs.readJsonSync;
	if (readJsonSync) {
		this.readJson = (arg: String, options: Object, callback: Number) => {
			let result: Number;
			try {
				result = readJsonSync.call(fs, arg);
			} catch (e) {
				return (callback || options)(e);
			}
			(callback || options)(null, result);
		};

		this.readJsonSync = (arg: String, options: Object) => readJsonSync.call(fs, arg, options);
	}
}
export default SyncAsyncFileSystemDecorator;
