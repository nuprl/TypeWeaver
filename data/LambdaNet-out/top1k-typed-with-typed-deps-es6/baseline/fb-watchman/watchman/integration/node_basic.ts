/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'assert';

import watchman from 'fb-watchman';
var client: HTMLElement = new watchman.Client();

var t: Number = setTimeout(function () {
  assert.fail('timeout', null, 'timed out running test');
}, 10000);

client.on('error', function(error: Object) {
  assert.fail(error, null, 'unexpected error');
});

client.command(['version'], function(error: Object, resp: Object) {
  assert.equal(error, null, 'no errors');
  console.log('Talking to watchman version', resp.version);
  client.end();
  clearTimeout(t);
});

