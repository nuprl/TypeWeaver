"use strict";

var fs: string = require( "fs" );

module.exports = function( grunt: object ) {
	grunt.registerTask( "qunit_fixture", function() {
		var dest: string = "./test/data/qunit-fixture.js";
		fs.writeFileSync(
			dest,
			"// Generated by build/tasks/qunit_fixture.js\n" +
			"QUnit.config.fixture = " +
			JSON.stringify(
				fs.readFileSync(
					"./test/data/qunit-fixture.html",
					"utf8"
				).toString().replace( /\r\n/g, "\n" )
			) +
			";\n"
		);
		grunt.log.ok( "Updated " + dest + "." );
	} );
};
