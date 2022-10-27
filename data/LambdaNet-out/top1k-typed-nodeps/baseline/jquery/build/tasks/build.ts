/**
 * Special build task to handle various jQuery build requirements.
 * Compiles JS modules into one bundle, sets the custom AMD name,
 * and includes/excludes specified modules
 */

"use strict";

module.exports = function( grunt: HTMLElement ) {
	const fs: String = require( "fs" );
	const path: String = require( "path" );
	const rollup: String = require( "rollup" );
	const slimBuildFlags: String = require( "./lib/slim-build-flags" );
	const rollupFileOverrides: Function = require( "./lib/rollup-plugin-file-overrides" );
	const Insight: Array = require( "insight" );
	const pkg: String = require( "../../package.json" );
	const srcFolder: String = path.resolve( `${ __dirname }/../../src` );
	const read: Function = function( fileName: String ) {
		return grunt.file.read( `${ srcFolder }/${ fileName }` );
	};

	// Catch `// @CODE` and subsequent comment lines event if they don't start
	// in the first column.
	const wrapper: Promise = read( "wrapper.js" )
		.split( /[\x20\t]*\/\/ @CODE\n(?:[\x20\t]*\/\/[^\n]+\n)*/ );

	const inputFileName: String = "jquery.js";
	const inputRollupOptions: Object = {
		input: `${ srcFolder }/${ inputFileName }`
	};
	const outputRollupOptions: Object = {

		// The ESM format is not actually used as we strip it during
		// the build; it's just that it doesn't generate any extra
		// wrappers so there's nothing for us to remove.
		format: "esm",

		intro: wrapper[ 0 ]
			.replace( /\n*$/, "" ),
		outro: wrapper[ 1 ]
			.replace( /^\n*/, "" )
	};
	const fileOverrides: Map = new Map();

	function getOverride( filePath: String ): String {
		return fileOverrides.get( path.resolve( filePath ) );
	}

	function setOverride( filePath: String, source: String ): Void {

		// We want normalized paths in overrides as they will be matched
		// against normalized paths in the file overrides Rollup plugin.
		fileOverrides.set( path.resolve( filePath ), source );
	}

	grunt.registerMultiTask(
		"build",
		"Build jQuery ECMAScript modules, " +
			"(include/exclude modules with +/- flags), embed date/version",
	async function() {
		const done: Function = this.async();

		try {
			const flags: Object = this.flags;
			const optIn: String = flags[ "*" ];
			let name: String = grunt.option( "filename" );
			const minimum: Array = this.data.minimum;
			const removeWith: Object = this.data.removeWith;
			const excluded: String = [];
			const included: Array = [];
			let version: String = grunt.config( "pkg.version" );

			// We'll skip printing the whole big exclusions for a bare `build:*:*:slim` which
			// usually comes from `custom:slim`.
			const isPureSlim: Boolean = !!( flags.slim && flags[ "*" ] &&
				Object.keys( flags ).length === 2 );

			delete flags[ "*" ];

			if ( flags.slim ) {
				delete flags.slim;
				for ( const flag of slimBuildFlags ) {
					flags[ flag ] = true;
				}
			}


			/**
			 * Recursively calls the excluder to remove on all modules in the list
			 * @param {Array} list
			 * @param {String} [prepend] Prepend this to the module name.
			 *  Indicates we're walking a directory
			 */
			const excludeList: Function = ( list: Array, prepend: String ) => {
				if ( list ) {
					prepend = prepend ? `${ prepend }/` : "";
					list.forEach( function( module: Number ) {

						// Exclude var modules as well
						if ( module === "var" ) {
							excludeList(
								fs.readdirSync( `${ srcFolder }/${ prepend }${ module }` ),
								prepend + module
							);
							return;
						}
						if ( prepend ) {

							// Skip if this is not a js file and we're walking files in a dir
							if ( !( module = /([\w-\/]+)\.js$/.exec( module ) ) ) {
								return;
							}

							// Prepend folder name if passed
							// Remove .js extension
							module = prepend + module[ 1 ];
						}

						// Avoid infinite recursion
						if ( excluded.indexOf( module ) === -1 ) {
							excluder( "-" + module );
						}
					} );
				}
			};

			/**
			 * Adds the specified module to the excluded or included list, depending on the flag
			 * @param {String} flag A module path relative to
			 *  the src directory starting with + or - to indicate
			 *  whether it should included or excluded
			 */
			const excluder: Function = (flag: String) => {
				let additional: Object;
				const m: Promise = /^(\+|\-|)([\w\/-]+)$/.exec( flag );
				const exclude: Boolean = m[ 1 ] === "-";
				const module: String = m[ 2 ];

				if ( exclude ) {

					// Can't exclude certain modules
					if ( minimum.indexOf( module ) === -1 ) {

						// Add to excluded
						if ( excluded.indexOf( module ) === -1 ) {
							grunt.log.writeln( flag );
							excluded.push( module );

							// Exclude all files in the folder of the same name
							// These are the removable dependencies
							// It's fine if the directory is not there
							try {
								excludeList(
									fs.readdirSync( `${ srcFolder }/${ module }` ),
									module
								);
							} catch ( e ) {
								grunt.verbose.writeln( e );
							}
						}

						additional = removeWith[ module ];

						// Check removeWith list
						if ( additional ) {
							excludeList( additional.remove || additional );
							if ( additional.include ) {
								included.push( ...additional.include );
								grunt.log.writeln( "+" + additional.include );
							}
						}
					} else {
						grunt.log.error( "Module \"" + module + "\" is a minimum requirement." );
					}
				} else {
					grunt.log.writeln( flag );
					included.push( module );
				}
			};

			// Filename can be passed to the command line using
			// command line options
			// e.g. grunt build --filename=jquery-custom.js
			name = name ? `dist/${ name }` : this.data.dest;

			// append commit id to version
			if ( process.env.COMMIT ) {
				version += " " + process.env.COMMIT;
			}

			// figure out which files to exclude based on these rules in this order:
			//  dependency explicit exclude
			//  > explicit exclude
			//  > explicit include
			//  > dependency implicit exclude
			//  > implicit exclude
			// examples:
			//  *                  none (implicit exclude)
			//  *:*                all (implicit include)
			//  *:*:-css           all except css and dependents (explicit > implicit)
			//  *:*:-css:+effects  same (excludes effects because explicit include is
			//                     trumped by explicit exclude of dependency)
			//  *:+effects         none except effects and its dependencies
			//                     (explicit include trumps implicit exclude of dependency)
			for ( const flag in flags ) {
				excluder( flag );
			}

			// Remove the jQuery export from the entry file, we'll use our own
			// custom wrapper.
			setOverride( inputRollupOptions.input,
				read( inputFileName ).replace( /\n*export default jQuery;\n*/, "\n" ) );

			// Replace exports/global with a noop noConflict
			if ( excluded.includes( "exports/global" ) ) {
				const index: Number = excluded.indexOf( "exports/global" );
				setOverride( `${ srcFolder }/exports/global.js`,
					"import jQuery from \"../core.js\";\n\n" +
						"jQuery.noConflict = function() {};" );
				excluded.splice( index, 1 );
			}

			// Set a desired AMD name.
			let amdName: String = grunt.option( "amd" );
			if ( amdName != null ) {
				if ( amdName ) {
					grunt.log.writeln( "Naming jQuery with AMD name: " + amdName );
				} else {
					grunt.log.writeln( "AMD name now anonymous" );
				}

				// Remove the comma for anonymous defines
				setOverride( `${ srcFolder }/exports/amd.js`,
					read( "exports/amd.js" )
						.replace( /(\s*)"jquery"(\,\s*)/,
							amdName ? "$1\"" + amdName + "\"$2" : "" ) );
			}

			grunt.verbose.writeflags( excluded, "Excluded" );
			grunt.verbose.writeflags( included, "Included" );

			// Indicate a Slim build without listing all of the exclusions
			// to save space.
			if ( isPureSlim ) {
				version += " slim";

			// Append excluded modules to version.
			} else if ( excluded.length ) {
				version += " -" + excluded.join( ",-" );
			}

			if ( excluded.length ) {

				// Set pkg.version to version with excludes or with the "slim" marker,
				// so minified file picks it up but skip the commit hash the same way
				// it's done for the full build.
				const commitlessVersion: String = version.replace( " " + process.env.COMMIT, "" );
				grunt.config.set( "pkg.version", commitlessVersion );
				grunt.verbose.writeln( "Version changed to " + commitlessVersion );

				// Replace excluded modules with empty sources.
				for ( const module of excluded ) {
					setOverride( `${ srcFolder }/${ module }.js`, "" );
				}
			}

			// Turn off opt-in if necessary
			if ( !optIn ) {

				// Remove the default inclusions, they will be overwritten with the explicitly
				// included ones.
				setOverride( inputRollupOptions.input, "" );

			}

			// Import the explicitly included modules.
			if ( included.length ) {
				setOverride( inputRollupOptions.input,
					getOverride( inputRollupOptions.input ) + included
						.map( (module: String) => `import "./${module}.js";` )
						.join( "\n" ) );
			}

			const bundle: HTMLElement = await rollup.rollup( {
				...inputRollupOptions,
				plugins: [ rollupFileOverrides( fileOverrides ) ]
			} );

			const { output: [ { code } ] } = await bundle.generate( outputRollupOptions );

			const compiledContents: String = code

				// Embed Version
				.replace( /@VERSION/g, version )

				// Embed Date
				// yyyy-mm-ddThh:mmZ
				.replace(
					/@DATE/g,
					( new Date() ).toISOString()
						.replace( /:\d+\.\d+Z$/, "Z" )
				);

			grunt.file.write( name, compiledContents );
			grunt.log.ok( `File '${ name }' created.` );
			done();
		} catch ( err ) {
			done( err );
		}
	} );

	// Special "alias" task to make custom build creation less grawlix-y
	// Translation example
	//
	//   grunt custom:+ajax,-dimensions,-effects,-offset
	//
	// Becomes:
	//
	//   grunt build:*:*:+ajax:-dimensions:-effects:-offset
	//
	// There's also a special "slim" alias that resolves to the jQuery Slim build
	// configuration:
	//
	//   grunt custom:slim
	grunt.registerTask( "custom", function() {
		const args: Array = this.args;
		const modules: String = args.length ?
			args[ 0 ].split( "," ).join( ":" ) :
			"";
		const done: Function = this.async();
		const insight: HTMLElement = new Insight( {
			trackingCode: "UA-1076265-4",
			pkg: pkg
		} );

		function exec( trackingAllowed: Boolean ): Void {
			let tracks: Array = args.length ? args[ 0 ].split( "," ) : [];
			const defaultPath: Array = [ "build", "custom" ];

			tracks = tracks.map( function( track: String ) {
				return track.replace( /\//g, "+" );
			} );

			if ( trackingAllowed ) {

				// Track individuals
				tracks.forEach( function( module: Number ) {
					const path: String = defaultPath.concat( [ "individual" ], module );

					insight.track.apply( insight, path );
				} );

				// Track full command
				insight.track.apply( insight, defaultPath.concat( [ "full" ], tracks ) );
			}

			grunt.task.run( [ "build:*:*" + ( modules ? ":" + modules : "" ), "uglify", "dist" ] );
			done();
		}

		grunt.log.writeln( "Creating custom build...\n" );

		// Ask for permission the first time
		if ( insight.optOut === undefined ) {
			insight.askPermission( null, function( _error: Object, result: Array ) {
				exec( result );
			} );
		} else {
			exec( !insight.optOut );
		}
	} );
};
