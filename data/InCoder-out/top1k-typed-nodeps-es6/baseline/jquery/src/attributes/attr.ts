import jQuery from "../core.js";
import access from "../core/access.js";
import nodeName from "../core/nodeName.js";
import rnothtmlwhite from "../var/rnothtmlwhite.js";
import isIE from "../var/isIE.js";

import "../selector.js";

jQuery.fn.extend( {
	attr: function( name: string,  value : any) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name : string) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem: Element,  name: string,  value : any) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ];
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = elem.getAttribute( name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {},

	removeAttr: function( elem: Element,  value : string) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Support: IE <=11+
// An input loses its value after becoming a radio
if ( isIE ) {
	jQuery.attrHooks.type = {
		set: function( elem: Element,  value : string) {
			if ( value === "radio" && nodeName( elem, "input" ) ) {
				var val = elem.value;
				elem.setAttribute( "type", value );
				if ( val ) {
					elem.value = val;
				}
				return value;
			}
		}
	};
}

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i: number,  name : string) {
	jQuery.attrHooks[ name ] = {
		get: function( elem : Element) {
			var ret,
				isXML = jQuery.isXMLDoc( elem ),
				lowercaseName = name.toLowerCase();

			if ( !isXML ) {
				ret = elem.getAttribute( name ) != null ?
					lowercaseName :
					null;
			}
			return ret;
		},

		set: function( elem: Element,  value: string,  name : string) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
} );