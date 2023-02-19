/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'assert';

import watchman from 'fb-watchman';
var client: any = new watchman.Client();
import fs from 'fs';
import os from 'os';
import path from 'path';

var platform: string = os.platform();
if (platform == 'darwin' || platform == 'win32') {
  var tmp: any = fs.realpathSync(process.env.TMPDIR);
  var foo: string = path.join(tmp, 'foo');
  var FOO: string = path.join(tmp, 'FOO');

  fs.mkdir(FOO, function(err_mk_dir_foo: string) {
    assert.equal(err_mk_dir_foo, null, 'no errors');
    var bar: any = path.join(foo, 'bar');
    var BAR: string = path.join(FOO, 'bar');

    fs.mkdir(BAR, function(err_mk_dir_bar: string) {
      assert.equal(err_mk_dir_bar, null, 'no errors');

      client.command(['watch', bar], function (error: any, resp: any) {
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
