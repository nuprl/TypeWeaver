'use strict'

import pkg from './package.json';
import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import header from 'gulp-header';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import benchmark from 'gulp-benchmark';

var banner: string      = '/*! <%= pkg.name %> v<%= pkg.version %> | Copyright (c) 2007-present, <%= pkg.author %> | <%= pkg.license %> */\n';

gulp.task('benchmark', function () {
    return gulp
        .src('benchmark/*.js', {read: false})
        .pipe(benchmark())
})

gulp.task('lint', function() {
    return gulp
        .src('src/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
})

gulp.task('test', ['lint'], function() {
    return gulp
        .src('test/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
})

gulp.task('dist', ['test'], function() {
    return gulp.src([
        'src/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

gulp.task('default', ['dist'])
