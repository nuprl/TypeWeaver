// Matches dashed string for camelizing
var rdashAlpha: RegExp = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all: Function, letter: string ): string {
	return letter.toUpperCase();
}

// Convert dashed to camelCase
function camelCase( string: string ): string {
	return string.replace( rdashAlpha, fcamelCase );
}

export default camelCase;
