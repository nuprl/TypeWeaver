import arr from "./arr.js";

// Support: IE 11+
// IE doesn't have Array#flat; provide a fallback.
export default arr.flat ? function( array: Array ) {
	return arr.flat.call( array );
} : function( array: Array ) {
	return arr.concat.apply( [], array );
};
