import jQuery from "./core.js";

import "./core/init.js";
import "./manipulation.js"; // clone
import "./traversing.js"; // parent, contents

jQuery.fn.extend( {
	wrapAll: function( html: HTMLElement ) {
		var wrap: object;

		if ( this[ 0 ] ) {
			if ( typeof html === "function" ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem: HTMLElement = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html: HTMLElement ) {
		if ( typeof html === "function" ) {
			return this.each( function( i: string ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self: object = jQuery( this ),
				contents: any[] = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html: HTMLElement ) {
		var htmlIsFunction: boolean = typeof html === "function";

		return this.each( function( i: string ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector: string ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );

export default jQuery;
