import document from "../var/document.js";

var cssPrefixes: any[] = [ "Webkit", "Moz", "ms" ],
	emptyStyle: Function = document.createElement( "div" ).style,
	vendorProps: object = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name: string ): object {

	// Check for vendor prefixed names
	var capName: string = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i: number = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped vendor prefixed property
function finalPropName( name: string ): any[] {
	var final: string = vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}

export default finalPropName;
