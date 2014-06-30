

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
                'bootstrap.js': 'bootstrap/dist/js/bootstrap.min.js',
                'bootstrap.css': 'bootstrap/dist/css/bootstrap.min.css',
                'angular.js': 'angular/angular.js',
                'angular-file-upload.js': 'ng-file-upload/angular-file-upload.js',
                'angular-file-upload-shim.js': 'ng-file-upload-shim/angular-file-upload-shim.js',
            },
        },
        fonts: {
            options: {
                destPrefix: 'assets/'
            },
            files: {
                'fonts': 'bootstrap/dist/fonts/*',
               
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
