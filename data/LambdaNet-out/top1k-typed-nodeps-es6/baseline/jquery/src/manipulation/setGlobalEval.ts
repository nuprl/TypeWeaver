import dataPriv from "../data/var/dataPriv.js";

// Mark scripts as having already been evaluated
function setGlobalEval( elems: any[], refElements: Promise ): Void {
	var i: number = 0,
		l: number = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}

export default setGlobalEval;
