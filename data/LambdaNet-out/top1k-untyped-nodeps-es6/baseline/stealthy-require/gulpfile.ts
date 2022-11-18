'use strict';

import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import chalk from 'chalk';
import rimraf from 'rimraf';
import eslint from 'gulp-eslint';
import mkdirp from 'mkdirp';


var paths: object = {
    libJsFiles: './lib/**/*.js',
    specFiles: './test/spec/**/*.js',
    fixtureFiles: './test/fixtures/**/*.js',
    gulpfile: './gulpfile.js',
    eslintrc: './.eslintrc.json'
};


function lint(): any[] {

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

function cleanCoverage(done: string): Void {
    rimraf('./coverage', done);
}

function cleanResults(done: Function): Void {
    rimraf('./test/results', function (err: string) {
        if (err) {
            return done(err);
        }
        mkdirp('./test/results', done);
    });
}

function instrument(): any[] {
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

function test(): string {
    return gulp.series(cleanCoverage, cleanResults, instrument, runTest);
}

function testNoCov(): any[] {

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

export default {
    dev: gulp.series(lint, test(), watch),
    test: gulp.series(lint, cleanResults, testNoCov, test()),
    testNoCov: testNoCov
};
