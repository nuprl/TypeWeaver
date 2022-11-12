// Matches dashed string for camelizing
var rdashAlpha: RegExp = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all: Function, letter: String ): String {
	return letter.toUpperCase();
}

// Convert dashed to camelCase
function camelCase( string: String ): String {
	return string.replace( rdashAlpha, fcamelCase );
}

export default camelCase;
