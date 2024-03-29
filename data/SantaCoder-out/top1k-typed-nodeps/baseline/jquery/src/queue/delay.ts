import jQuery from "../core.js";

import "../queue.js";
import "../effects.js"; // Delay is optional because of this dependency

// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time: number, type : string) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next: Function, hooks : any) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};