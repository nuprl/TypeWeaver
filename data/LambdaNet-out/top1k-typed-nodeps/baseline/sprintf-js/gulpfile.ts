'use strict'

var pkg: String         = require('./package.json'),
    gulp: HTMLElement        = require('gulp'),
    uglify: Function      = require('gulp-uglify'),
    rename: Function      = require('gulp-rename'),
    sourcemaps: String  = require('gulp-sourcemaps'),
    header: Function      = require('gulp-header'),
    eslint: Function      = require('gulp-eslint'),
    mocha: Function       = require('gulp-mocha'),
    benchmark: Function   = require('gulp-benchmark'),
    banner: String      = '/*! <%= pkg.name %> v<%= pkg.version %> | Copyright (c) 2007-present, <%= pkg.author %> | <%= pkg.license %> */\n'

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
