'use strict';

var gulp = require('gulp'),
		jade = require('gulp-jade'),
		notify = require("gulp-notify"),
		plumber = require('gulp-plumber'),
		sass = require('gulp-sass');

gulp.task('jade', function(){
	gulp.src('./templates/pages/*.jade')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(jade({pretty: '\t'}))
		.pipe(gulp.dest('./')) // Выводим сгенерированные HTML-файлы в корневую папку
		.pipe(notify('Jade is compile!'));
});

gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('./css'))
		.pipe(notify('Sass is compile!'));
});

gulp.task('watch', function(){
	gulp.watch('./templates/**/*.jade', ['jade']);
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['jade', 'sass', 'watch']);