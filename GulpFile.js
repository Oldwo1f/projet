var path        = require('path'),
    express     = require('express'),
    tinylr      = require('tiny-lr'),
    gulp        = require('gulp'),
    gutil		= require('gulp-util'),
    livereload  = require('gulp-livereload'),
    server      = tinylr(),
    opn = require("gulp-open"),
    nodemon = require('gulp-nodemon');

gulp.task('default',['server'], function(){



	var app = express();

	app.use(express.static(path.resolve('./')));
	app.listen(3001, function() {
		gutil.log('Listening on', 3001);
	});

	server.listen(35729, function (err) {
        if (err) {
            throw err;
        }
setTimeout(function() {

  gulp.src('./front/index.html')
        .pipe(opn("",{
          //app:"google-chrome",
           app:"chromium-browser",
          url: "http://localhost:1337/"
      }));
      },1000)


       gulp.watch(["./config/**/*"], function (evt) {
           gutil.log(gutil.colors.cyan(evt.path), 'changed');
           gulp.start('config');
       });

       gulp.watch(["./api/**/*"], function (evt) {
           gutil.log(gutil.colors.cyan(evt.path), 'changed');
           gulp.start('api');
       });

       gulp.watch([
         "./front/**/*.js",
         "./front/**/*.html"
         ], function (evt) {
           gutil.log(gutil.colors.cyan(evt.path), 'changed');
           gulp.start('front');
       });

       gulp.watch(["./views/**/*.ejs"], function (evt) {
           gutil.log(gutil.colors.cyan(evt.path), 'changed');
           gulp.start('views');
       });
    });
});

gulp.task('front',[], function() {
	gulp.src('./front/**/*')
		.pipe(livereload(server));
});

gulp.task('views', function() {
  gulp.src('./views/**/*')
    .pipe(livereload(server));
});

gulp.task('api', [], function() {
	gulp.src('./api/**/*')
		.pipe(livereload(server));
})

gulp.task('config', [], function() {
	gulp.src('./config/**/*')
		.pipe(livereload(server));
})



gulp.task('server', function(){

  nodemon({ script: 'app.js', ext: 'js', ignore: ['GulpFile.js'] })
      .on('change', ['front'])
      .on('restart', function () {
        console.log('restarted!')
      })
  //var spawn = require('child_process').spawn;
  //spawn('pkill', ['/usr/bin/sails'], {stdio: 'inherit'});
  //spawn('sails', ['lift'], {stdio: 'inherit'});
});