import dataPriv from "../data/var/dataPriv.js";

// Mark scripts as having already been evaluated
function setGlobalEval( elems: Array, refElements: Promise ): Void {
	var i: Number = 0,
		l: Number = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}

export default setGlobalEval;
