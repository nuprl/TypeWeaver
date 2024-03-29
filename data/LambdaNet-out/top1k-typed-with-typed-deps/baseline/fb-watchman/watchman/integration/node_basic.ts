/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert: string = require('assert');
var watchman: any[] = require('fb-watchman');
var client: HTMLElement = new watchman.Client();

var t: number = setTimeout(function () {
  assert.fail('timeout', null, 'timed out running test');
}, 10000);

client.on('error', function(error: object) {
  assert.fail(error, null, 'unexpected error');
});

client.command(['version'], function(error: object, resp: object) {
  assert.equal(error, null, 'no errors');
  console.log('Talking to watchman version', resp.version);
  client.end();
  clearTimeout(t);
});

