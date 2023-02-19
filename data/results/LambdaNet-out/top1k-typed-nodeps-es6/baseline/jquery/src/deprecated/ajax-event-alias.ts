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
], function( _i: string, type: string ) {
	jQuery.fn[ type ] = function( fn: string ) {
		return this.on( type, fn );
	};
} );
