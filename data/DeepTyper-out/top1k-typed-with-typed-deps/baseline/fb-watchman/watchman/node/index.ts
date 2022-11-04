/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var net: any = require('net');
var EE: any = require('events').EventEmitter;
var util: any = require('util');
var childProcess: any = require('child_process');
var bser: any = require('bser');

// We'll emit the responses to these when they get sent down to us
var unilateralTags: string[] = ['subscription', 'log'];

/**
 * @param options An object with the following optional keys:
 *   * 'watchmanBinaryPath' (string) Absolute path to the watchman binary.
 *     If not provided, the Client locates the binary using the PATH specified
 *     by the node child_process's default env.
 */
function Client(options: any): void {
  var self: this = this;
  EE.call(this);

  this.watchmanBinaryPath = 'watchman';
  if (options && options.watchmanBinaryPath) {
    this.watchmanBinaryPath = options.watchmanBinaryPath.trim();
  };
  this.commands = [];
}
util.inherits(Client, EE);

module.exports.Client = Client;

// Try to send the next queued command, if any
Client.prototype.sendNextCommand = function() {
  if (this.currentCommand) {
    // There's a command pending response, don't send this new one yet
    return;
  }

  this.currentCommand = this.commands.shift();
  if (!this.currentCommand) {
    // No further commands are queued
    return;
  }

  this.socket.write(bser.dumpToBuffer(this.currentCommand.cmd));
}

Client.prototype.cancelCommands = function(why: any) {
  var error: Error = new Error(why);

  // Steal all pending commands before we start cancellation, in
  // case something decides to schedule more commands
  var cmds: any = this.commands;
  this.commands = [];

  if (this.currentCommand) {
    cmds.unshift(this.currentCommand);
    this.currentCommand = null;
  }

  // Synthesize an error condition for any commands that were queued
  cmds.forEach(function(cmd: any) {
    cmd.cb(error);
  });
}

Client.prototype.connect = function() {
  var self: this = this;

  function makeSock(sockname: any): void {
    // bunser will decode the watchman BSER protocol for us
    self.bunser = new bser.BunserBuf();
    // For each decoded line:
    self.bunser.on('value', function(obj: any) {
      // Figure out if this is a unliteral response or if it is the
      // response portion of a request-response sequence.  At the time
      // of writing, there are only two possible unilateral responses.
      var unilateral: boolean = false;
      for (var i = 0; i < unilateralTags.length; i++) {
        var tag: any = unilateralTags[i];
        if (tag in obj) {
          unilateral = tag;
        }
      }

      if (unilateral) {
        self.emit(unilateral, obj);
      } else if (self.currentCommand) {
        var cmd: any = self.currentCommand;
        self.currentCommand = null;
        if ('error' in obj) {
          var error: Error = new Error(obj.error);
          error.watchmanResponse = obj;
          cmd.cb(error);
        } else {
          cmd.cb(null, obj);
        }
      }

      // See if we can dispatch the next queued command, if any
      self.sendNextCommand();
    });
    self.bunser.on('error', function(err: any) {
      self.emit('error', err);
    });

    self.socket = net.createConnection(sockname);
    self.socket.on('connect', function() {
      self.connecting = false;
      self.emit('connect');
      self.sendNextCommand();
    });
    self.socket.on('error', function(err: any) {
      self.connecting = false;
      self.emit('error', err);
    });
    self.socket.on('data', function(buf: any) {
      if (self.bunser) {
        self.bunser.append(buf);
      }
    });
    self.socket.on('end', function() {
      self.socket = null;
      self.bunser = null;
      self.cancelCommands('The watchman connection was closed');
      self.emit('end');
    });
  }

  // triggers will export the sock path to the environment.
  // If we're invoked in such a way, we can simply pick up the
  // definition from the environment and avoid having to fork off
  // a process to figure it out
  if (process.env.WATCHMAN_SOCK) {
    makeSock(process.env.WATCHMAN_SOCK);
    return;
  }

  // We need to ask the client binary where to find it.
  // This will cause the service to start for us if it isn't
  // already running.
  var args: string[] = ['--no-pretty', 'get-sockname'];

  // We use the more elaborate spawn rather than exec because there
  // are some error cases on Windows where process spawning can hang.
  // It is desirable to pipe stderr directly to stderr live so that
  // we can discover the problem.
  var proc: any = null;
  var spawnFailed: boolean = false;

  function spawnError(error: any): void {
    if (spawnFailed) {
      // For ENOENT, proc 'close' will also trigger with a negative code,
      // let's suppress that second error.
      return;
    }
    spawnFailed = true;
    if (error.code === 'EACCES' || error.errno === 'EACCES') {
      error.message = 'The Watchman CLI is installed but cannot ' +
                      'be spawned because of a permission problem';
    } else if (error.code === 'ENOENT' || error.errno === 'ENOENT') {
      error.message = 'Watchman was not found in PATH.  See ' +
          'https://facebook.github.io/watchman/docs/install.html ' +
          'for installation instructions';
    }
    console.error('Watchman: ', error.message);
    self.emit('error', error);
  }

  try {
    proc = childProcess.spawn(this.watchmanBinaryPath, args, {
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    spawnError(error);
    return;
  }

  var stdout: any[] = [];
  var stderr: any[] = [];
  proc.stdout.on('data', function(data: any) {
    stdout.push(data);
  });
  proc.stderr.on('data', function(data: any) {
    data = data.toString('utf8');
    stderr.push(data);
    console.error(data);
  });
  proc.on('error', function(error: any) {
    spawnError(error);
  });

  proc.on('close', function (code: any, signal: any) {
    if (code !== 0) {
      spawnError(new Error(
          self.watchmanBinaryPath + ' ' + args.join(' ') +
          ' returned with exit code=' + code + ', signal=' +
          signal + ', stderr= ' + stderr.join('')));
      return;
    }
    try {
      var obj: any = JSON.parse(stdout.join(''));
      if ('error' in obj) {
        var error: Error = new Error(obj.error);
        error.watchmanResponse = obj;
        self.emit('error', error);
        return;
      }
      makeSock(obj.sockname);
    } catch (e) {
      self.emit('error', e);
    }
  });
}

Client.prototype.command = function(args: any, done: any) {
  done = done || function() {};

  // Queue up the command
  this.commands.push({cmd: args, cb: done});

  // Establish a connection if we don't already have one
  if (!this.socket) {
    if (!this.connecting) {
      this.connecting = true;
      this.connect();
      return;
    }
    return;
  }

  // If we're already connected and idle, try sending the command immediately
  this.sendNextCommand();
}

var cap_versions: any = {
    "cmd-watch-del-all": "3.1.1",
    "cmd-watch-project": "3.1",
    "relative_root": "3.3",
    "term-dirname": "3.1",
    "term-idirname": "3.1",
    "wildmatch": "3.7",
}

// Compares a vs b, returns < 0 if a < b, > 0 if b > b, 0 if a == b
function vers_compare(a: string, b: string): string {
  a = a.split('.');
  b = b.split('.');
  for (var i = 0; i < 3; i++) {
    var d: number = parseInt(a[i] || '0') - parseInt(b[i] || '0');
    if (d != 0) {
      return d;
    }
  }
  return 0; // Equal
}

function have_cap(vers: any, name: string): any {
  if (name in cap_versions) {
    return vers_compare(vers, cap_versions[name]) >= 0;
  }
  return false;
}

// This is a helper that we expose for testing purposes
Client.prototype._synthesizeCapabilityCheck = function(
    resp: any, optional: boolean, required: boolean) {
  resp.capabilities = {}
  var version: any = resp.version;
  optional.forEach(function (name: string) {
    resp.capabilities[name] = have_cap(version, name);
  });
  required.forEach(function (name: string) {
    var have: any = have_cap(version, name);
    resp.capabilities[name] = have;
    if (!have) {
      resp.error = 'client required capability `' + name +
                   '` is not supported by this server';
    }
  });
  return resp;
}

Client.prototype.capabilityCheck = function(caps: any, done: any) {
  var optional: any = caps.optional || [];
  var required: any = caps.required || [];
  var self: this = this;
  this.command(['version', {
      optional: optional,
      required: required
  }], function (error: any, resp: any) {
    if (error) {
      done(error);
      return;
    }
    if (!('capabilities' in resp)) {
      // Server doesn't support capabilities, so we need to
      // synthesize the results based on the version
      resp = self._synthesizeCapabilityCheck(resp, optional, required);
      if (resp.error) {
        error = new Error(resp.error);
        error.watchmanResponse = resp;
        done(error);
        return;
      }
    }
    done(null, resp);
  });
}

// Close the connection to the service
Client.prototype.end = function() {
  this.cancelCommands('The client was ended');
  if (this.socket) {
    this.socket.end();
    this.socket = null;
  }
  this.bunser = null;
}