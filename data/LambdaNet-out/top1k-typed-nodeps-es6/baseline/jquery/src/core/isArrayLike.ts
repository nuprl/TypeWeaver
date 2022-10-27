import toType from "./toType.js";
import isWindow from "../var/isWindow.js";

function isArrayLike( obj: Array ): Boolean {

	var length: Number = !!obj && obj.length,
		type: String = toType( obj );

	if ( typeof obj === "function" || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

export default isArrayLike;
