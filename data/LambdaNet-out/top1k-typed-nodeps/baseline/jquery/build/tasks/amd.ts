/**
 * Compiles sources from ES Modules in `src/` to AMD in `amd/`.
 */

"use strict";

module.exports = function( grunt: Object ) {
	const path: String = require( "path" );
	const rimraf: Function = require( "rimraf" );
	const rollup: String = require( "rollup" );
	const srcFolder: String = path.resolve( __dirname, "..", "..", "src" );
	const amdFolder: String = path.resolve( srcFolder, "..", "amd" );
	const inputFileName: String = "jquery.js";

	const inputRollupOptions: Object = {
		input: path.resolve( srcFolder, inputFileName ),
		preserveModules: true
	};

	const outputRollupOptions: Object = {
		format: "amd",
		dir: "amd",
		indent: false
	};

	grunt.registerTask(
		"amd",
		"Convert ES modules from `src/` to AMD modules in `amd/`",
		async function() {
			const done: Function = this.async();

			try {
				grunt.verbose.writeln( "Removing the 'amd' directory..." );
				rimraf( amdFolder, async function() {
					const bundle: HTMLElement = await rollup.rollup( inputRollupOptions );
					await bundle.write( outputRollupOptions );
					grunt.log.ok( "Sources from 'src' converted to AMD in 'amd'." );
					done();
				} );
			} catch ( err ) {
				done( err );
			}
		} );
};
