/**
 * Compiles sources from ES Modules in `src/` to AMD in `amd/`.
 */

"use strict";

export default function( grunt: HTMLElement ) {
	const path: string = require( "path" );
	const rimraf: Function = require( "rimraf" );
	const rollup: string = require( "rollup" );
	const srcFolder: string = path.resolve( __dirname, "..", "..", "src" );
	const amdFolder: string = path.resolve( srcFolder, "..", "amd" );
	const inputFileName: string = "jquery.js";

	const inputRollupOptions: object = {
		input: path.resolve( srcFolder, inputFileName ),
		preserveModules: true
	};

	const outputRollupOptions: object = {
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
