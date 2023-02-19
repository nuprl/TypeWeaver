'use strict';

var gulp: any = require('gulp');
var mocha: any = require('gulp-mocha');
var istanbul: any = require('gulp-istanbul');
var eslint: any = require('gulp-eslint');

gulp.task('coverage', function() {
  return gulp.src('index.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['coverage'], function() {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports());
});

gulp.task('lint', function() {
  return gulp.src(['index.js', 'test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['test', 'lint']);
