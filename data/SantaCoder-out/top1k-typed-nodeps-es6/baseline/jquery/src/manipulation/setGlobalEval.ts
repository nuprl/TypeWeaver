import dataPriv from "../data/var/dataPriv.js";

// Mark scripts as having already been evaluated
function setGlobalEval( elems: Element[], refElements : Element[]) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}

export default setGlobalEval;