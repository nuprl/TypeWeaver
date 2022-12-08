// A method for quickly swapping in/out CSS properties to get correct calculations.
export default function( elem: object, options: object, callback: Function ) {
	var ret: Function, name: string,
		old: object = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
}
