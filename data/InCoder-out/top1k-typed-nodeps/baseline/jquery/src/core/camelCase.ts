// Matches dashed string for camelizing
var rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all: any,  letter : string) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase
function camelCase( string : string) {
	return string.replace( rdashAlpha, fcamelCase );
}

export default camelCase;