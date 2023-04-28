import jQuery from "../core.js";

import "../selector.js";
import "../effects.js";

jQuery.expr.pseudos.animated = function( elem : HTMLElement) {
	return jQuery.grep( jQuery.timers, function( fn : any) {
		return elem === fn.elem;
	} ).length;
};