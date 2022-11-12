import jQuery from "../core.js";

import "../queue.js";
import "../effects.js"; // Delay is optional because of this dependency

// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time: String, type: String ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next: Object, hooks: Object ) {
		var timeout: Number = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};
