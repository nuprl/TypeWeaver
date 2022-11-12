// A method for quickly swapping in/out CSS properties to get correct calculations.
export default function( elem: Object, options: Object, callback: Function ) {
	var ret: Function, name: String,
		old: Object = {};

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
