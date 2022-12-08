import jQuery from "../core.js";

jQuery.readyException = function( error: object ) {
	window.setTimeout( function() {
		throw error;
	} );
};
