'use strict';

/* jshint node:true, undef:true, unused:true */
import Rollup from 'broccoli-rollup';

import Babel from 'broccoli-babel-transpiler';
import merge from 'broccoli-merge-trees';
import funnel from 'broccoli-funnel';
import uglify from 'broccoli-uglify-js';
import version from 'git-repo-version';
import watchify from 'broccoli-watchify';
import concat from 'broccoli-concat';
import stew from 'broccoli-stew';

const env: Object = stew.env;
const map: Function = stew.map;

export default function (app: String) {
  const lib: String = funnel('lib', { destDir: 'lib' });

  const testDir: Function = funnel('test', { destDir: 'test' });
  const testFiles: Function = funnel('test', {
    files: ['index.html','worker.js'],
    destDir: 'test'
  });

  const mocha: String = funnel('node_modules/mocha', {
    files: ['mocha.css','mocha.js'],
    destDir: 'test'
  });

  const es5: String = new Babel(lib, {
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
  const rsvp: String = new Rollup(es5, {
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

  const rsvpES6: Function = new Rollup(lib, {
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

  const testBundle: Function = watchify(merge([
    funnel(rsvp, { destDir: 'test' }),
    testDir
  ]), {
    browserify: { debug: true, entries: ['./test/index.js'] }
  });

  const header: String = map(
    funnel('config', { files: ['versionTemplate.txt'], destDir: 'config' }),
    (content: String) => content.replace(/VERSION_PLACEHOLDER_STRING/, version())
  );

  function concatAs(tree: String, outputFile: String): Array {
    return concat(merge([tree, header]), {
      headerFiles: ['config/versionTemplate.txt'],
      inputFiles: ['rsvp.js'],
      outputFile: outputFile
    });
  }

  function production(dist: String, header: String): Object {
    let result: Object;
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

  function development(dist: String, header: String): String {
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
};