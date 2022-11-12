import jQuery from "../core.js";

jQuery.readyException = function( error: Object ) {
	window.setTimeout( function() {
		throw error;
	} );
};
