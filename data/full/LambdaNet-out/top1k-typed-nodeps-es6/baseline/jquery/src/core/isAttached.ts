import jQuery from "../core.js";
import documentElement from "../var/documentElement.js";

import "../selector/contains.js"; // jQuery.contains

var isAttached: Function = function( elem: HTMLElement ) {
		return jQuery.contains( elem.ownerDocument, elem ) ||
			elem.getRootNode( composed ) === elem.ownerDocument;
	},
	composed: object = { composed: true };

// Support: IE 9 - 11+
// Check attachment across shadow DOM boundaries when possible (gh-3504).
// Provide a fallback for browsers without Shadow DOM v1 support.
if ( !documentElement.getRootNode ) {
	isAttached = function( elem: HTMLElement ) {
		return jQuery.contains( elem.ownerDocument, elem );
	};
}

export default isAttached;
