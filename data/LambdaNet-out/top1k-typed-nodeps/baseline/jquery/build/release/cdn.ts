"use strict";

var
	fs: String = require( "fs" ),
	shell: String = require( "shelljs" ),
	path: String = require( "path" ),

	cdnFolder: String = "dist/cdn",

	releaseFiles: Object = {
		"jquery-VER.js": "dist/jquery.js",
		"jquery-VER.min.js": "dist/jquery.min.js",
		"jquery-VER.min.map": "dist/jquery.min.map",
		"jquery-VER.slim.js": "dist/jquery.slim.js",
		"jquery-VER.slim.min.js": "dist/jquery.slim.min.js",
		"jquery-VER.slim.min.map": "dist/jquery.slim.min.map"
	},

	googleFilesCDN: Array = [
		"jquery.js", "jquery.min.js", "jquery.min.map",
		"jquery.slim.js", "jquery.slim.min.js", "jquery.slim.min.map"
	],

	msFilesCDN: Array = [
		"jquery-VER.js", "jquery-VER.min.js", "jquery-VER.min.map",
		"jquery-VER.slim.js", "jquery-VER.slim.min.js", "jquery-VER.slim.min.map"
	];

/**
 * Generates copies for the CDNs
 */
function makeReleaseCopies( Release: Object ): Void {
	shell.mkdir( "-p", cdnFolder );

	Object.keys( releaseFiles ).forEach( function( key: String ) {
		var text: String,
			builtFile: String = releaseFiles[ key ],
			unpathedFile: String = key.replace( /VER/g, Release.newVersion ),
			releaseFile: String = cdnFolder + "/" + unpathedFile;

		if ( /\.map$/.test( releaseFile ) ) {

			// Map files need to reference the new uncompressed name;
			// assume that all files reside in the same directory.
			// "file":"jquery.min.js" ... "sources":["jquery.js"]
			text = fs.readFileSync( builtFile, "utf8" )
				.replace( /"file":"([^"]+)"/,
					"\"file\":\"" + unpathedFile.replace( /\.min\.map/, ".min.js\"" ) )
				.replace( /"sources":\["([^"]+)"\]/,
					"\"sources\":[\"" + unpathedFile.replace( /\.min\.map/, ".js" ) + "\"]" );
			fs.writeFileSync( releaseFile, text );
		} else if ( builtFile !== releaseFile ) {
			shell.cp( "-f", builtFile, releaseFile );
		}
	} );
}

function makeArchives( Release: HTMLElement, callback: Function ): Void {

	Release.chdir( Release.dir.repo );

	function makeArchive( cdn: String, files: Array, callback: Function ): Void {
		if ( Release.preRelease ) {
			console.log( "Skipping archive creation for " + cdn + "; this is a beta release." );
			callback();
			return;
		}

		console.log( "Creating production archive for " + cdn );

		var sum: String,
			archiver: Object = require( "archiver" )( "zip" ),
			md5file: String = cdnFolder + "/" + cdn + "-md5.txt",
			output: String = fs.createWriteStream(
				cdnFolder + "/" + cdn + "-jquery-" + Release.newVersion + ".zip"
			),
			rver: RegExp = /VER/;

		output.on( "close", callback );

		output.on( "error", function( err: Function ) {
			throw err;
		} );

		archiver.pipe( output );

		files = files.map( function( item: String ) {
			return "dist" + ( rver.test( item ) ? "/cdn" : "" ) + "/" +
				item.replace( rver, Release.newVersion );
		} );

		sum = Release.exec( "md5 -r " + files.join( " " ), "Error retrieving md5sum" );
		fs.writeFileSync( md5file, sum );
		files.push( md5file );

		files.forEach( function( file: String ) {
			archiver.append( fs.createReadStream( file ),
				{ name: path.basename( file ) } );
		} );

		archiver.finalize();
	}

	function buildGoogleCDN( callback: String ): Void {
		makeArchive( "googlecdn", googleFilesCDN, callback );
	}

	function buildMicrosoftCDN( callback: String ): Void {
		makeArchive( "mscdn", msFilesCDN, callback );
	}

	buildGoogleCDN( function() {
		buildMicrosoftCDN( callback );
	} );
}

module.exports = {
	makeReleaseCopies: makeReleaseCopies,
	makeArchives: makeArchives
};
