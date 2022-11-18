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
function SyncAsyncFileSystemDecorator(fs: Resolver): Void {
	this.fs = fs;

	this.lstat = undefined;
	this.lstatSync = undefined;
	const lstatSync: Function = fs.lstatSync;
	if (lstatSync) {
		this.lstat = (arg: string, options: object, callback: number) => {
			let result: any[];
			try {
				result = lstatSync.call(fs, arg);
			} catch (e) {
				return (callback || options)(e);
			}
			(callback || options)(null, result);
		};
		this.lstatSync = (arg: string, options: object) => lstatSync.call(fs, arg, options);
	}

	this.stat = (arg: string, options: object, callback: boolean) => {
		let result: number;
		try {
			result = callback ? fs.statSync(arg, options) : fs.statSync(arg);
		} catch (e) {
			return (callback || options)(e);
		}
		(callback || options)(null, result);
	};
	this.statSync = (arg: string, options: object) => fs.statSync(arg, options);

	this.readdir = (arg: string, options: object, callback: number) => {
		let result: number;
		try {
			result = fs.readdirSync(arg);
		} catch (e) {
			return (callback || options)(e);
		}
		(callback || options)(null, result);
	};
	this.readdirSync = (arg: string, options: object) => fs.readdirSync(arg, options);

	this.readFile = (arg: string, options: object, callback: number) => {
		let result: number;
		try {
			result = fs.readFileSync(arg);
		} catch (e) {
			return (callback || options)(e);
		}
		(callback || options)(null, result);
	};
	this.readFileSync = (arg: string, options: string) => fs.readFileSync(arg, options);

	this.readlink = (arg: string, options: object, callback: number) => {
		let result: number;
		try {
			result = fs.readlinkSync(arg);
		} catch (e) {
			return (callback || options)(e);
		}
		(callback || options)(null, result);
	};
	this.readlinkSync = (arg: string, options: object) => fs.readlinkSync(arg, options);

	this.readJson = undefined;
	this.readJsonSync = undefined;
	const readJsonSync: Function = fs.readJsonSync;
	if (readJsonSync) {
		this.readJson = (arg: string, options: object, callback: number) => {
			let result: string;
			try {
				result = readJsonSync.call(fs, arg);
			} catch (e) {
				return (callback || options)(e);
			}
			(callback || options)(null, result);
		};

		this.readJsonSync = (arg: string, options: object) => readJsonSync.call(fs, arg, options);
	}
}
module.exports = SyncAsyncFileSystemDecorator;
