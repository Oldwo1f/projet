

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
                'ckeditor/ckeditor.js':'ckeditor/ckeditor.js',
                'ckeditor/config.js':'ckeditor/config.js',
                'ckeditor/skins/moono':'ckeditor/skins/moono/',
                'ckeditor/styles.js':'ckeditor/styles.js',
                'ckeditor/contents.css':'ckeditor/contents.css',
                'ckeditor/lang/fr.js':'ckeditor/lang/fr.js',
                'angular-animate.js': 'angular-animate/angular-animate.min.js',
                'ui-bootstrap.js': 'angular-bootstrap/ui-bootstrap.min.js',
                'ui-bootstrap-tpls.js': 'angular-bootstrap/ui-bootstrap-tpls.min.js',
                'angular-route.js': 'angular-route/angular-route.js',
                'angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.min.js',
                'angular-file-upload.js': 'ng-file-upload/angular-file-upload.js',
                'angular-file-upload-shim.js': 'ng-file-upload-shim/angular-file-upload-shim.js',
                'ng-table.js': 'ng-table/ng-table.min.js',
                'angular-loading-bar.js': 'angular-loading-bar/build/loading-bar.min.js',
                'moment.js': 'moment/moment.js',
                'moment-fr.js': 'moment/locale/fr.js',
                'datetimepicker.js': 'angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
                'datetimepicker.css': 'angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
                'markdown_preview.js': 'angular-markdown-preview/markdown_preview.js',
                'marked.js': '../node_modules/marked/lib/marked.js',
                'satellizer.js': 'satellizer/satellizer.js',
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
