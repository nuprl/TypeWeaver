import jQuery from "../core.js";

import "../queue.js";
import "../effects.js"; // Delay is optional because of this dependency

// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time: string, type: string ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next: object, hooks: object ) {
		var timeout: number = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};
