import jQuery from "../core.js";

import "../event.js";
import "../event/trigger.js";

jQuery.fn.extend( {

	bind: function( types: string, data: object, fn: string ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types: string, fn: string ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector: string, types: string, data: object, fn: string ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector: string, types: string, fn: string ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver: string, fnOut: number ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i: string, name: string ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data: object, fn: number ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);
