'use strict';

var gulp: HTMLElement = require('gulp');
var istanbul: Function = require('gulp-istanbul');
var mocha: Function = require('gulp-mocha');
var chalk: Array = require('chalk');
var rimraf: Function = require('rimraf');
var eslint: Function = require('gulp-eslint');
var mkdirp: Function = require('mkdirp');


var paths: Object = {
    libJsFiles: './lib/**/*.js',
    specFiles: './test/spec/**/*.js',
    fixtureFiles: './test/fixtures/**/*.js',
    gulpfile: './gulpfile.js',
    eslintrc: './.eslintrc.json'
};


function lint(): Array {

    return gulp.src([
        paths.libJsFiles,
        paths.gulpfile,
        paths.specFiles,
        paths.fixtureFiles,
        paths.gulpfile
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

}

function cleanCoverage(done: String): Void {
    rimraf('./coverage', done);
}

function cleanResults(done: Function): Void {
    rimraf('./test/results', function (err: String) {
        if (err) {
            return done(err);
        }
        mkdirp('./test/results', done);
    });
}

function instrument(): String {
    return gulp.src(paths.libJsFiles)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
}

function runTest(): Promise {
    return gulp.src(paths.specFiles)
        .pipe(mocha())
        .on('error', function (err: Function) {
            console.error(String(err));
            console.error(chalk.bold.bgRed(' TESTS FAILED '));
        })
        .pipe(istanbul.writeReports());
}

function test(): String {
    return gulp.series(cleanCoverage, cleanResults, instrument, runTest);
}

function testNoCov(): Array {

    return gulp.src(paths.specFiles)
        .pipe(mocha())
        .on('error', function (err: Function) {
            console.error(String(err));
            console.log(chalk.bold.bgRed(' TESTS FAILED '));
        });

}

function watch(): Void {

    gulp.watch([
        paths.libJsFiles,
        paths.specFiles,
        paths.fixtureFiles,
        paths.gulpfile
    ], gulp.series(lint, test()));

    gulp.watch([
        paths.eslintrc
    ], lint);

}

module.exports = {
    dev: gulp.series(lint, test(), watch),
    test: gulp.series(lint, cleanResults, testNoCov, test()),
    testNoCov: testNoCov
};
