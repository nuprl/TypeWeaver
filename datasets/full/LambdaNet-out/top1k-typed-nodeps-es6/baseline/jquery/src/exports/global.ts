import jQuery from "../core.js";

var

	// Map over jQuery in case of overwrite
	_jQuery: HTMLInputElement = window.jQuery,

	// Map over the $ in case of overwrite
	_$: HTMLElement = window.$;

jQuery.noConflict = function( deep: boolean ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, gh-557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}
