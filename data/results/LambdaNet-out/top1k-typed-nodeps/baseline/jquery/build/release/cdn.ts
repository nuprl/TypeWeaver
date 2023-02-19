"use strict";

var
	fs: string = require( "fs" ),
	shell: string = require( "shelljs" ),
	path: string = require( "path" ),

	cdnFolder: string = "dist/cdn",

	releaseFiles: object = {
		"jquery-VER.js": "dist/jquery.js",
		"jquery-VER.min.js": "dist/jquery.min.js",
		"jquery-VER.min.map": "dist/jquery.min.map",
		"jquery-VER.slim.js": "dist/jquery.slim.js",
		"jquery-VER.slim.min.js": "dist/jquery.slim.min.js",
		"jquery-VER.slim.min.map": "dist/jquery.slim.min.map"
	},

	googleFilesCDN: any[] = [
		"jquery.js", "jquery.min.js", "jquery.min.map",
		"jquery.slim.js", "jquery.slim.min.js", "jquery.slim.min.map"
	],

	msFilesCDN: any[] = [
		"jquery-VER.js", "jquery-VER.min.js", "jquery-VER.min.map",
		"jquery-VER.slim.js", "jquery-VER.slim.min.js", "jquery-VER.slim.min.map"
	];

/**
 * Generates copies for the CDNs
 */
function makeReleaseCopies( Release: object ): void {
	shell.mkdir( "-p", cdnFolder );

	Object.keys( releaseFiles ).forEach( function( key: string ) {
		var text: string,
			builtFile: string = releaseFiles[ key ],
			unpathedFile: string = key.replace( /VER/g, Release.newVersion ),
			releaseFile: string = cdnFolder + "/" + unpathedFile;

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

function makeArchives( Release: HTMLElement, callback: Function ): void {

	Release.chdir( Release.dir.repo );

	function makeArchive( cdn: string, files: any[], callback: Function ): void {
		if ( Release.preRelease ) {
			console.log( "Skipping archive creation for " + cdn + "; this is a beta release." );
			callback();
			return;
		}

		console.log( "Creating production archive for " + cdn );

		var sum: string,
			archiver: object = require( "archiver" )( "zip" ),
			md5file: string = cdnFolder + "/" + cdn + "-md5.txt",
			output: string = fs.createWriteStream(
				cdnFolder + "/" + cdn + "-jquery-" + Release.newVersion + ".zip"
			),
			rver: RegExp = /VER/;

		output.on( "close", callback );

		output.on( "error", function( err: Function ) {
			throw err;
		} );

		archiver.pipe( output );

		files = files.map( function( item: string ) {
			return "dist" + ( rver.test( item ) ? "/cdn" : "" ) + "/" +
				item.replace( rver, Release.newVersion );
		} );

		sum = Release.exec( "md5 -r " + files.join( " " ), "Error retrieving md5sum" );
		fs.writeFileSync( md5file, sum );
		files.push( md5file );

		files.forEach( function( file: string ) {
			archiver.append( fs.createReadStream( file ),
				{ name: path.basename( file ) } );
		} );

		archiver.finalize();
	}

	function buildGoogleCDN( callback: string ): void {
		makeArchive( "googlecdn", googleFilesCDN, callback );
	}

	function buildMicrosoftCDN( callback: string ): void {
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
