import jQuery from "../core.js";

import "../ajax.js";
import "../event.js";

jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i: String, type: String ) {
	jQuery.fn[ type ] = function( fn: String ) {
		return this.on( type, fn );
	};
} );
