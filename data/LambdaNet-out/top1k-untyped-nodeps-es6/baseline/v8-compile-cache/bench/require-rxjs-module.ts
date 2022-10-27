#!/usr/bin/env node
'use strict';

const WITH_CACHE: Boolean = true;

require('./_measure.js')('require-rxjs-module', WITH_CACHE, () => {
  require('rxjs');
});
