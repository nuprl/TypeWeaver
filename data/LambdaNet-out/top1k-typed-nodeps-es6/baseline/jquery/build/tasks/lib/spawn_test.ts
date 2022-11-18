"use strict";

// Run Node with provided parameters: the first one being the Grunt
// done function and latter ones being files to be tested.
// See the comment in ../node_smoke_tests.js for more information.
export default function spawnTest( done: Function, command: string ): Void {
	var spawn: Function = require( "child_process" ).spawn;

	spawn( command, {
		stdio: "inherit",
		shell: true
	} )
		.on( "close", function( code: string ) {
			done( code === 0 );
		} );
};
