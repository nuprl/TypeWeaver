import jQuery from "../core.js";

import "../selector.js";
import "../effects.js";

jQuery.expr.pseudos.animated = function( elem: Number ) {
	return jQuery.grep( jQuery.timers, function( fn: Object ) {
		return elem === fn.elem;
	} ).length;
};
