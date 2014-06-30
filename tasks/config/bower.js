

module.exports = function(grunt) {
console.log('tototo');
	grunt.config.set('bowercopy',{

 		options: {
            // Bower components folder will be removed afterwards
            clean: false
        },
        // Javascript
        bower_components: {
            options: {
                destPrefix: 'assets/bower_components/'
            },
            files: {
                'jquery.js': 'jquery/dist/jquery.min.js',
                'angular.js': 'angular/angular.js',
                'angular-file-upload.js': 'ng-file-upload/angular-file-upload.js',
                'angular-file-upload-shim.js': 'ng-file-upload-shim/angular-file-upload-shim.js',
            },
        },
        // Javascript
        frontController: {
            options: {
                destPrefix: 'api/controllers/',
                srcPrefix: 'front/'
            },
            files: {
                'front': '*Controller.js',
                
            },
        }

	});

	grunt.loadNpmTasks('grunt-bowercopy');
};
