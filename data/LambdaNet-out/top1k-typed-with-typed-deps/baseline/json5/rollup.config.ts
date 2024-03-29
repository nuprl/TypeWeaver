const resolve: Function = require('rollup-plugin-node-resolve')
const commonjs: Function = require('rollup-plugin-commonjs')
const buble: Function = require('rollup-plugin-buble')
const terser: Function = require('rollup-plugin-terser').terser
const pkg: string = require('./package.json')

module.exports = [
    // ES5 Non-minified
    {
        input: 'build/es5.js',
        output: {
            file: pkg.browser,
            format: 'umd',
            name: 'JSON5',
        },
        plugins: [
            resolve(),
            commonjs(),
            buble({transforms: {dangerousForOf: true}}),
        ],
    },
    // ES5 Minified
    {
        input: 'build/es5.js',
        output: {
            file: pkg.browser.replace(/\.js$/, '.min.js'),
            format: 'umd',
            name: 'JSON5',
        },
        plugins: [
            resolve(),
            commonjs(),
            buble({transforms: {dangerousForOf: true}}),
            terser(),
        ],
    },
    // ES6 Modules Non-minified
    {
        input: 'lib/index.js',
        output: {
            file: pkg.browser.replace(/\.js$/, '.mjs'),
            format: 'esm',
        },
        plugins: [
            resolve(),
            commonjs(),
        ],
    },
    // ES6 Modules Minified
    {
        input: 'lib/index.js',
        output: {
            file: pkg.browser.replace(/\.js$/, '.min.mjs'),
            format: 'esm',
        },
        plugins: [
            resolve(),
            commonjs(),
            terser(),
        ],
    },
]
