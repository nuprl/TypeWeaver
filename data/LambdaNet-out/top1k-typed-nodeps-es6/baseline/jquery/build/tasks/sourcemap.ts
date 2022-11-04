"use strict";

import fs from 'fs';

export default function( grunt: HTMLElement ) {
	var config: String = grunt.config( "uglify.all.files" );
	grunt.registerTask( "remove_map_comment", function() {
		var minLoc: String = grunt.config.process( Object.keys( config )[ 0 ] );

		// Remove the source map comment; it causes way too many problems.
		// The map file is still generated for manual associations
		// https://github.com/jquery/jquery/issues/1707
		var text: String = fs.readFileSync( minLoc, "utf8" )
			.replace( /\/\/# sourceMappingURL=\S+/, "" );
		fs.writeFileSync( minLoc, text );
	} );
};