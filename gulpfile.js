'use strict';

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var sequence = require("gulp-sequence");

var paths = {
	'sass': './src/sass/*.scss',
	'css': './public/resources/css',
	'index': './public'
};

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest(paths.css));
});

gulp.task('default', function (callback) {
  sequence('sass', 'serve')(callback);
});

gulp.task('defaultWatch', function (callback) {
  sequence('sass')(callback);
});

gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: paths.index
        }
    });

    gulp.watch(['./src/sass/*'], ['defaultWatch']);
});