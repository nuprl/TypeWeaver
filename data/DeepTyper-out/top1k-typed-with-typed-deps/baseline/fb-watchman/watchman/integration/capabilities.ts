/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert: any = require('assert');
var watchman: any = require('fb-watchman');

function optional(): void {
  var client: any = new watchman.Client();
  client.capabilityCheck({optional: ['will-never-exist']},
      function (error: any, resp: any) {
        assert.equal(error, null, 'no errors');
        assert.equal(resp.capabilities['will-never-exist'], false);
        client.end();
      });
}
optional();

function required(): void {
  var client: any = new watchman.Client();
  client.capabilityCheck({required: ['will-never-exist']},
      function (error: any, resp: any) {
        assert.equal('client required capability `will-never-exist` is not' +
                     ' supported by this server', error.message);
        client.end();
      });
}
required();

function synth(): void {
  var client: any = new watchman.Client();

  resp = client._synthesizeCapabilityCheck({version: '1.0'},
      ['will-never-exist'], []);
  assert.equal(resp.capabilities['will-never-exist'], false);

  resp = client._synthesizeCapabilityCheck({version: '3.2'},
      ['relative_root'], []);
  assert.equal(resp.capabilities['relative_root'], false);

  resp = client._synthesizeCapabilityCheck({version: '3.3'},
      ['relative_root'], []);
  assert.equal(resp.capabilities['relative_root'], true);

  resp = client._synthesizeCapabilityCheck({version: '1.0'},
      [], ['will-never-exist']);
  assert.equal('client required capability `will-never-exist` is not' +
               ' supported by this server', resp.error);
}
synth();
