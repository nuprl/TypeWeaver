import document from "../var/document.js";

var cssPrefixes: Array = [ "Webkit", "Moz", "ms" ],
	emptyStyle: Function = document.createElement( "div" ).style,
	vendorProps: Object = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name: String ): Object {

	// Check for vendor prefixed names
	var capName: String = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i: Number = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped vendor prefixed property
function finalPropName( name: String ): Array {
	var final: String = vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}

export default finalPropName;
