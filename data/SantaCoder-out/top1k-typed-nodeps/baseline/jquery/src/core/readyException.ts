import jQuery from "../core.js";

jQuery.readyException = function( error : Error) {
	window.setTimeout( function() {
		throw error;
	} );
};