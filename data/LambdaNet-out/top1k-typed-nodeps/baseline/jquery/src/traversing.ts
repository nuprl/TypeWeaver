import jQuery from "./core.js";
import getProto from "./var/getProto.js";
import indexOf from "./var/indexOf.js";
import dir from "./traversing/var/dir.js";
import siblings from "./traversing/var/siblings.js";
import rneedsContext from "./traversing/var/rneedsContext.js";
import nodeName from "./core/nodeName.js";

import "./core/init.js";
import "./traversing/findFilter.js";
import "./selector.js";

var rparentsprev: RegExp = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique: object = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target: any[] ) {
		var targets: any[] = jQuery( target, this ),
			l: number = targets.length;

		return this.filter( function() {
			var i: number = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors: string, context: string ) {
		var cur: object,
			i: number = 0,
			l: number = this.length,
			matched: any[] = [],
			targets: any[] = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to jQuery#find
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem: object ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector: string, context: Function ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector: string ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur: object, dir: string ): object {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem: object ) {
		var parent: object = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem: string ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem: string, _i: string, until: string ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem: string ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem: string ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem: string ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem: string ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem: string, _i: string, until: string ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem: string, _i: string, until: string ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem: object ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem: object ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem: object ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11+
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name: string, fn: number ) {
	jQuery.fn[ name ] = function( until: number, selector: string ) {
		var matched: any[] = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );

export default jQuery;
