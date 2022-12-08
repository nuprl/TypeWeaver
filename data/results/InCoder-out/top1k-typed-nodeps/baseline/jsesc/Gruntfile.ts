module.exports = function(grunt: Grunt) {

	grunt.initConfig({
		'template': {
			'build': {
				'options': {
					// Generate the regular expressions dynamically using Regenerate.
					'data': require('./src/data.js')
				},
				'files': {
					'jsesc.js': ['src/jsesc.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-template');

	grunt.registerTask('default', [
		'template'
	]);

};