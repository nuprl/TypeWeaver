import document from "../var/document.js";

var preservedScriptAttributes: Object = {
	type: true,
	src: true,
	nonce: true,
	noModule: true
};

function DOMEval( code: String, node: Object, doc: String ): Void {
	doc = doc || document;

	var i: String,
		script: Object = doc.createElement( "script" );

	script.text = code;
	if ( node ) {
		for ( i in preservedScriptAttributes ) {
			if ( node[ i ] ) {
				script[ i ] = node[ i ];
			}
		}
	}
	doc.head.appendChild( script ).parentNode.removeChild( script );
}

export default DOMEval;
