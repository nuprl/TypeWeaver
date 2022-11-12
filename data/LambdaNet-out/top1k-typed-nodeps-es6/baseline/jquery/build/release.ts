"use strict";

import fs from 'fs';

export default function( Release: Object ) {

	const distFiles: Array = [
		"dist/jquery.js",
		"dist/jquery.min.js",
		"dist/jquery.min.map",
		"dist/jquery.slim.js",
		"dist/jquery.slim.min.js",
		"dist/jquery.slim.min.map"
	];
	const filesToCommit: Array = [
		...distFiles,
		"src/core.js"
	];
	const cdn: HTMLElement = require( "./release/cdn" );
	const dist: Function = require( "./release/dist" );

	const npmTags: Function = Release.npmTags;

	function setSrcVersion( filepath: String ): Void {
		var contents: String = fs.readFileSync( filepath, "utf8" );
		contents = contents.replace( /@VERSION/g, Release.newVersion );
		fs.writeFileSync( filepath, contents, "utf8" );
	}

	Release.define( {
		npmPublish: true,
		issueTracker: "github",

		/**
		 * Set the version in the src folder for distributing ES modules
		 * and in the amd folder for AMD.
		 */
		_setSrcVersion: function() {
			setSrcVersion( `${ __dirname }/../src/core.js` );
			setSrcVersion( `${ __dirname }/../amd/core.js` );
		},

		/**
		 * Generates any release artifacts that should be included in the release.
		 * The callback must be invoked with an array of files that should be
		 * committed before creating the tag.
		 * @param {Function} callback
		 */
		generateArtifacts: function( callback: Function ) {
			Release.exec( "npx grunt", "Grunt command failed" );
			Release.exec(
				"npx grunt custom:slim --filename=jquery.slim.js && " +
					"npx grunt remove_map_comment --filename=jquery.slim.js",
				"Grunt custom failed"
			);
			cdn.makeReleaseCopies( Release );
			Release._setSrcVersion();
			callback( filesToCommit );
		},

		/**
		 * Acts as insertion point for restoring Release.dir.repo
		 * It was changed to reuse npm publish code in jquery-release
		 * for publishing the distribution repo instead
		 */
		npmTags: function() {

			// origRepo is not defined if dist was skipped
			Release.dir.repo = Release.dir.origRepo || Release.dir.repo;
			return npmTags();
		},

		/**
		 * Publish to distribution repo and npm
		 * @param {Function} callback
		 */
		dist: function( callback: String ) {
			cdn.makeArchives( Release, function() {
				dist( Release, distFiles, callback );
			} );
		}
	} );
};

export const dependencies: Array = [
	"archiver@5.2.0",
	"shelljs@0.8.4",
	"inquirer@8.0.0"
];
