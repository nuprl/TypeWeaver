import jQuery from "../core.js";

import "../event.js";
import "../event/trigger.js";

jQuery.fn.extend( {

	bind: function( types: String, data: Object, fn: String ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types: String, fn: String ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector: String, types: String, data: Object, fn: String ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector: String, types: String, fn: String ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver: String, fnOut: Number ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i: String, name: String ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data: Object, fn: Number ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);
