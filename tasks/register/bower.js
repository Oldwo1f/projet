module.exports = function (grunt) {
	grunt.registerTask('bower', ['bowercopy:fonts','bowercopy:bower_components']);
	grunt.registerTask('frontController', ['bowercopy:frontController']);

};