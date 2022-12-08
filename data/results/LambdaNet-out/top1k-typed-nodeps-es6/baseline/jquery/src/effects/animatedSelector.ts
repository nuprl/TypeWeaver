import jQuery from "../core.js";

import "../selector.js";
import "../effects.js";

jQuery.expr.pseudos.animated = function( elem: number ) {
	return jQuery.grep( jQuery.timers, function( fn: object ) {
		return elem === fn.elem;
	} ).length;
};
