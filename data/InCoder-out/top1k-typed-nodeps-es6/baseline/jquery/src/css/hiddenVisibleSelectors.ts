import jQuery from "../core.js";

import "../selector.js";

jQuery.expr.pseudos.hidden = function( elem : any) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem : elem.ownerDocument) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};