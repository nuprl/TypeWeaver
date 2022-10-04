'use strict';

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import eslint from 'gulp-eslint';

gulp.task('coverage', function() {
  return gulp.src('index.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['coverage'], function() {
  return gulp.src('test.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports());
});

gulp.task('eslint', function() {
  return gulp.src(['index.js', 'test.js'])
    .pipe(eslint())
});

gulp.task('default', ['mocha', 'eslint']);
