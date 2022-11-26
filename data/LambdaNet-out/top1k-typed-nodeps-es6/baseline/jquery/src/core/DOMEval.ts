import document from "../var/document.js";

var preservedScriptAttributes: object = {
	type: true,
	src: true,
	nonce: true,
	noModule: true
};

function DOMEval( code: string, node: object, doc: string ): void {
	doc = doc || document;

	var i: string,
		script: object = doc.createElement( "script" );

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
