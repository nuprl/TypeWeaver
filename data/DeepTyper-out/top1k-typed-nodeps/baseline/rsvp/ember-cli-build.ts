'use strict';
/* jshint node:true, undef:true, unused:true */
const Rollup: any = require('broccoli-rollup');
const Babel: any = require('broccoli-babel-transpiler');
const merge: any = require('broccoli-merge-trees');
const funnel: any = require('broccoli-funnel');
const uglify: any = require('broccoli-uglify-js');
const version: any = require('git-repo-version');
const watchify: any = require('broccoli-watchify');
const concat: any = require('broccoli-concat');
const stew: any = require('broccoli-stew');

const env: any = stew.env;
const map: any = stew.map;

module.exports = function (app: any) {
  const lib: any = funnel('lib', { destDir: 'lib' });

  const testDir: string = funnel('test', { destDir: 'test' });
  const testFiles: TestFile[] = funnel('test', {
    files: ['index.html','worker.js'],
    destDir: 'test'
  });

  const mocha: any = funnel('node_modules/mocha', {
    files: ['mocha.css','mocha.js'],
    destDir: 'test'
  });

  const es5: any = new Babel(lib, {
    plugins: [
      'transform-es2015-arrow-functions',
      'transform-es2015-computed-properties',
      'transform-es2015-shorthand-properties',
      'transform-es2015-template-literals',
      'transform-es2015-parameters',
      'transform-es2015-destructuring',
      'transform-es2015-spread',
      'transform-es2015-block-scoping',
      'transform-es2015-constants',
      ['transform-es2015-classes', { loose: true }],
      'babel6-plugin-strip-class-callcheck'
    ]
  });

  // build RSVP itself
  const rsvp: any = new Rollup(es5, {
    rollup: {
      input: 'lib/rsvp.js',
      output: [
        {
          format: 'umd',
          name: 'RSVP',
          file: 'rsvp.js',
          sourcemap: 'inline'
        },
        {
          format: 'es',
          file: 'rsvp.es.js',
          sourcemap: 'inline'
        }
      ]
    }
  });

  const rsvpES6: any = new Rollup(lib, {
    rollup: {
      input: 'lib/rsvp.js',
      output: [
        {
          format: 'es',
          file: 'es6/rsvp.es.js',
          sourcemap: 'inline'
        }
      ]
    }
  });

  const testBundle: any = watchify(merge([
    funnel(rsvp, { destDir: 'test' }),
    testDir
  ]), {
    browserify: { debug: true, entries: ['./test/index.js'] }
  });

  const header: any = map(
    funnel('config', { files: ['versionTemplate.txt'], destDir: 'config' }),
    (content: string) => content.replace(/VERSION_PLACEHOLDER_STRING/, version())
  );

  function concatAs(tree: any, outputFile: string): any {
    return concat(merge([tree, header]), {
      headerFiles: ['config/versionTemplate.txt'],
      inputFiles: ['rsvp.js'],
      outputFile: outputFile
    });
  }

  function production(dist: string, header: any): boolean {
    let result: any;
    env('production', () => {
      result = uglify(concatAs(dist, 'rsvp.min.js'), {
        compress: {
          negate_iife: false,
          sequences: false
        },
        mangle: true
      });
    })
    return result;
  }

  function development(dist: string, header: string): boolean {
    return concatAs(dist, 'rsvp.js');
  }

  return merge([
    merge([
      production(rsvp, header),
      development(rsvp, header),
      concat(merge([rsvp, header]), {
        headerFiles: ['config/versionTemplate.txt'],
        inputFiles: ['rsvp.es.js'],
        outputFile: 'rsvp.es.js'
      }),
      concat(merge([rsvpES6, header]), {
        headerFiles: ['config/versionTemplate.txt'],
        inputFiles: ['es6/rsvp.es.js'],
        outputFile: 'es6/rsvp.es.js'
      })
    ].filter(Boolean)),
    // test stuff
    testFiles,
    mocha,
    funnel(testBundle, { destDir: 'test' })
  ]);
}
