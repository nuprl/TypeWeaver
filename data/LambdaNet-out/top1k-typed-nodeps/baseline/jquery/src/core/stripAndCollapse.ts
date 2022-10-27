import rnothtmlwhite from "../var/rnothtmlwhite.js";

// Strip and collapse whitespace according to HTML spec
// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
function stripAndCollapse( value: String ): String {
	var tokens: Array = value.match( rnothtmlwhite ) || [];
	return tokens.join( " " );
}

export default stripAndCollapse;
