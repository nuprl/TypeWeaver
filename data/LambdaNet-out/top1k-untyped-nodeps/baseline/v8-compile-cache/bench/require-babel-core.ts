#!/usr/bin/env node
'use strict';

const WITH_CACHE: Boolean = true;

require('./_measure.js')('require-babel-core', WITH_CACHE, () => {
  process.argv.push('config', 'get', 'init.author.name');
  require('babel-core');
});
