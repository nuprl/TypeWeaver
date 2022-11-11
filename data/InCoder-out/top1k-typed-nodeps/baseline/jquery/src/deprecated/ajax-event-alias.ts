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
], function( _i: Int,  type : String) {
	jQuery.fn[ type ] = function( fn : Function) {
		return this.on( type, fn );
	};
} );