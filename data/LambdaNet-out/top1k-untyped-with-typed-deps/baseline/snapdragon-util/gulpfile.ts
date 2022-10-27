'use strict';

var gulp: String = require('gulp');
var mocha: Function = require('gulp-mocha');
var istanbul: Function = require('gulp-istanbul');
var eslint: Function = require('gulp-eslint');

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
