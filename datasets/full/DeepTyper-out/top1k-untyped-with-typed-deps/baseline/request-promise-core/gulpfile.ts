'use strict';

var gulp: any = require('gulp');
var runSequence: any = require('run-sequence');
var istanbul: any = require('gulp-istanbul');
var mocha: any = require('gulp-mocha');
var chalk: any = require('chalk');
var rimraf: any = require('rimraf');
var coveralls: any = require('gulp-coveralls');
var eslint: any = require('gulp-eslint');
var _: any = require('lodash');

var chai: any = require('chai');
global.expect = chai.expect;


var paths: any = {
    libJsFiles: ['./configure/**/*.js', './lib/**/*.js', './errors.js'],
    specFiles: './test/spec/**/*.js',
    fixtureFiles: './test/fixtures/**/*.js',
    gulpfile: './gulpfile.js',
    eslintrc: './.eslintrc.json'
};


gulp.task('dev', ['watch', 'validate']);

gulp.task('watch', function () {

    gulp.watch(_.flatten([
        paths.libJsFiles,
        paths.specFiles,
        paths.fixtureFiles,
        paths.gulpfile
    ]), [
        'validate'
    ]);

    gulp.watch(_.flatten([
        paths.eslintrc
    ]), [
        'lint'
    ]);

});

gulp.task('validate', function (done: any) {
    runSequence('lint', 'test', done);
});

gulp.task('lint', function () {

    return gulp.src(_.flatten([
        paths.libJsFiles,
        paths.gulpfile,
        paths.specFiles,
        paths.fixtureFiles,
        paths.gulpfile
    ]))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

});

gulp.task('test', ['clean'], function (done: any) {

    var coverageVariable: string = '$$cov_' + new Date().getTime() + '$$';

    gulp.src(paths.libJsFiles)
        .pipe(istanbul({
            coverageVariable: coverageVariable
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {

            gulp.src(paths.specFiles)
                .pipe(mocha())
                .on('error', function (err: any) {
                    console.error(String(err));
                    console.error(chalk.bold.bgRed(' TESTS FAILED '));
                    done(new Error(' TESTS FAILED '));
                })
                .pipe(istanbul.writeReports({
                    reporters: ['lcov'],
                    coverageVariable: coverageVariable
                }))
                .on('end', done);

        });

});

gulp.task('test-without-coverage', function () {

    return gulp.src(paths.specFiles)
        .pipe(mocha())
        .on('error', function () {
            console.log(chalk.bold.bgRed(' TESTS FAILED '));
        });

});

gulp.task('clean', ['clean-coverage']);

gulp.task('clean-coverage', function (done: any) {
    rimraf('./coverage', done);
});

gulp.task('ci', function (done: any) {
    runSequence('validate', 'coveralls', 'test-without-coverage', done);
});

gulp.task('ci-no-cov', function (done: any) {
    runSequence('validate', 'test-without-coverage', done);
});

gulp.task('coveralls', function () {
    return gulp.src('coverage/**/lcov.info')
        .pipe(coveralls());
});
