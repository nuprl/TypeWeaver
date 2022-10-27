// This file should be ES5 compatible
/* eslint prefer-spread:0, no-var:0, prefer-reflect:0, no-magic-numbers:0 */
"use strict";

export default function() {
	// Import Events
	var events: any = require("events");

	// Export Domain
	var domain: {} = {};
	domain.createDomain = domain.create = function() {
		var d: any = new events.EventEmitter();

		function emitError(e: any): void {
			d.emit("error", e);
		}

		d.add = function(emitter: any) {
			emitter.on("error", emitError);
		};
		d.remove = function(emitter: any) {
			emitter.removeListener("error", emitError);
		};
		d.bind = function(fn: any) {
			return function() {
				var args: any = Array.prototype.slice.call(arguments);
				try {
					fn.apply(null, args);
				} catch (err) {
					emitError(err);
				}
			};
		};
		d.intercept = function(fn: any) {
			return function(err: any) {
				if (err) {
					emitError(err);
				} else {
					var args: any = Array.prototype.slice.call(arguments, 1);
					try {
						fn.apply(null, args);
					} catch (err) {
						emitError(err);
					}
				}
			};
		};
		d.run = function(fn: any) {
			try {
				fn();
			} catch (err) {
				emitError(err);
			}
			return this;
		};
		d.dispose = function() {
			this.removeAllListeners();
			return this;
		};
		d.enter = d.exit = function() {
			return this;
		};
		return d;
	};
	return domain;
}.call(this);
