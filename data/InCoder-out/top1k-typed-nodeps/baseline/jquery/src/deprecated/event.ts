import jQuery from "../core.js";

import "../event.js";
import "../event/trigger.js";

jQuery.fn.extend( {

	bind: function( types: Array,  data: Object,  fn : Function) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types: Array,  fn : Function) {
		return this.off( types, null, fn );
	},

	delegate: function( selector: Selector,  types: String,  data: Object,  fn : Function) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector: Selector,  types: String,  fn : Function) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver: fnOver,  fnOut : fnOut) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i: number,  name : string) {

		// Handle event binding
		jQuery.fn[ name ] = function( data: ny,  fn : n) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);