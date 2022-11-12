"use strict";

export default ( grunt: HTMLElement ) => {
	const fs: String = require( "fs" );
	const spawnTest: Function = require( "./lib/spawn_test.js" );
	const testsDir: String = "./test/node_smoke_tests/";
	const nodeSmokeTests: Array = [];

	// Fire up all tests defined in test/node_smoke_tests/*.js in spawned sub-processes.
	// All the files under test/node_smoke_tests/*.js are supposed to exit with 0 code
	// on success or another one on failure. Spawning in sub-processes is
	// important so that the tests & the main process don't interfere with
	// each other, e.g. so that they don't share the require cache.

	fs.readdirSync( testsDir )
		.filter( ( testFilePath: String ) =>
			fs.statSync( testsDir + testFilePath ).isFile() &&
				/\.js$/.test( testFilePath )
		)
		.forEach( ( testFilePath: String ) => {
			const taskName: String = `node_${ testFilePath.replace( /\.js$/, "" ) }`;

			grunt.registerTask( taskName, function() {
				spawnTest( this.async(), `node "test/node_smoke_tests/${ testFilePath }"` );
			} );

			nodeSmokeTests.push( taskName );
		} );

	grunt.registerTask( "node_smoke_tests", nodeSmokeTests );
};
