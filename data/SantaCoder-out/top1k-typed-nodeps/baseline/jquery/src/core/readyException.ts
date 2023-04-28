import jQuery from "../core.js";

jQuery.readyException = function( error : any) {
	window.setTimeout( function() {
		throw error;
	} );
};