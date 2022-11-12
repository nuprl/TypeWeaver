/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert: String = require('assert');
var watchman: Array = require('fb-watchman');
var client: HTMLElement = new watchman.Client();
const fs: String = require('fs');
const os: String = require('os');
const path: String = require('path');

var platform: Number = os.platform();
if (platform == 'darwin' || platform == 'win32') {
  var tmp: String = fs.realpathSync(process.env.TMPDIR);
  var foo: String = path.join(tmp, 'foo');
  var FOO: String = path.join(tmp, 'FOO');

  fs.mkdir(FOO, function(err_mk_dir_foo: String) {
    assert.equal(err_mk_dir_foo, null, 'no errors');
    var bar: String = path.join(foo, 'bar');
    var BAR: String = path.join(FOO, 'bar');

    fs.mkdir(BAR, function(err_mk_dir_bar: Boolean) {
      assert.equal(err_mk_dir_bar, null, 'no errors');

      client.command(['watch', bar], function (error: Error, resp: Function) {
        assert.equal('RootResolveError: unable to resolve root ' + bar
                      + ": \"" + bar + "\" resolved to \"" + BAR
                      + "\" but we were unable to examine \""
                      + bar + "\" using strict "
                      + "case sensitive rules.  Please check each component of the path and make "
                      + "sure that that path exactly matches the correct case of the files on your "
                      + "filesystem."
                      , error.message);
        client.end();
      });
    });
  });
}
