import jQuery from "../core.js";

import "../deferred.js";

// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames: RegExp = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error: object, stack: number ) {

	if ( error && rerrorNames.test( error.name ) ) {
		window.console.warn(
			"jQuery.Deferred exception: " + error.message,
			error.stack,
			stack
		);
	}
};
