'use strict';

const Module: any = require('module');
const crypto: any = require('crypto');
const fs: any = require('fs');
const path: any = require('path');
const vm: any = require('vm');
const os: any = require('os');

const hasOwnProperty: any = Object.prototype.hasOwnProperty;

//------------------------------------------------------------------------------
// FileSystemBlobStore
//------------------------------------------------------------------------------

class FileSystemBlobStore {
  constructor(directory, prefix) {
    const name: string = prefix ? slashEscape(prefix + '.') : '';
    this._blobFilename = path.join(directory, name + 'BLOB');
    this._mapFilename = path.join(directory, name + 'MAP');
    this._lockFilename = path.join(directory, name + 'LOCK');
    this._directory = directory;
    this._load();
  }

  has(key, invalidationKey) {
    if (hasOwnProperty.call(this._memoryBlobs, key)) {
      return this._invalidationKeys[key] === invalidationKey;
    } else if (hasOwnProperty.call(this._storedMap, key)) {
      return this._storedMap[key][0] === invalidationKey;
    }
    return false;
  }

  get(key, invalidationKey) {
    if (hasOwnProperty.call(this._memoryBlobs, key)) {
      if (this._invalidationKeys[key] === invalidationKey) {
        return this._memoryBlobs[key];
      }
    } else if (hasOwnProperty.call(this._storedMap, key)) {
      const mapping: any = this._storedMap[key];
      if (mapping[0] === invalidationKey) {
        return this._storedBlob.slice(mapping[1], mapping[2]);
      }
    }
  }

  set(key, invalidationKey, buffer) {
    this._invalidationKeys[key] = invalidationKey;
    this._memoryBlobs[key] = buffer;
    this._dirty = true;
  }

  delete(key) {
    if (hasOwnProperty.call(this._memoryBlobs, key)) {
      this._dirty = true;
      delete this._memoryBlobs[key];
    }
    if (hasOwnProperty.call(this._invalidationKeys, key)) {
      this._dirty = true;
      delete this._invalidationKeys[key];
    }
    if (hasOwnProperty.call(this._storedMap, key)) {
      this._dirty = true;
      delete this._storedMap[key];
    }
  }

  isDirty() {
    return this._dirty;
  }

  save() {
    const dump: any = this._getDump();
    const blobToStore: any = Buffer.concat(dump[0]);
    const mapToStore: string = JSON.stringify(dump[1]);

    try {
      mkdirpSync(this._directory);
      fs.writeFileSync(this._lockFilename, 'LOCK', {flag: 'wx'});
    } catch (error) {
      // Swallow the exception if we fail to acquire the lock.
      return false;
    }

    try {
      fs.writeFileSync(this._blobFilename, blobToStore);
      fs.writeFileSync(this._mapFilename, mapToStore);
    } finally {
      fs.unlinkSync(this._lockFilename);
    }

    return true;
  }

  _load() {
    try {
      this._storedBlob = fs.readFileSync(this._blobFilename);
      this._storedMap = JSON.parse(fs.readFileSync(this._mapFilename));
    } catch (e) {
      this._storedBlob = Buffer.alloc(0);
      this._storedMap = {};
    }
    this._dirty = false;
    this._memoryBlobs = {};
    this._invalidationKeys = {};
  }

  _getDump() {
    const buffers: any[] = [];
    const newMap: {} = {};
    let offset: number = 0;

    function push(key: any, invalidationKey: any, buffer: any): number {
      buffers.push(buffer);
      newMap[key] = [invalidationKey, offset, offset + buffer.length];
      offset += buffer.length;
    }

    for (const key of Object.keys(this._memoryBlobs)) {
      const buffer: any = this._memoryBlobs[key];
      const invalidationKey: any = this._invalidationKeys[key];
      push(key, invalidationKey, buffer);
    }

    for (const key of Object.keys(this._storedMap)) {
      if (hasOwnProperty.call(newMap, key)) continue;
      const mapping: any = this._storedMap[key];
      const buffer: any = this._storedBlob.slice(mapping[1], mapping[2]);
      push(key, mapping[0], buffer);
    }

    return [buffers, newMap];
  }
}

//------------------------------------------------------------------------------
// NativeCompileCache
//------------------------------------------------------------------------------

class NativeCompileCache {
  constructor() {
    this._cacheStore = null;
    this._previousModuleCompile = null;
  }

  setCacheStore(cacheStore) {
    this._cacheStore = cacheStore;
  }

  install() {
    const self: this = this;
    const hasRequireResolvePaths: any = typeof require.resolve.paths === 'function';
    this._previousModuleCompile = Module.prototype._compile;
    Module.prototype._compile = function(content: any, filename: string) {
      const mod: any = this;

      function require(id: any) {
        return mod.require(id);
      }

      // https://github.com/nodejs/node/blob/v10.15.3/lib/internal/modules/cjs/helpers.js#L28
      function resolve(request: any, options: any): any {
        return Module._resolveFilename(request, mod, false, options);
      }
      require.resolve = resolve;

      // https://github.com/nodejs/node/blob/v10.15.3/lib/internal/modules/cjs/helpers.js#L37
      // resolve.resolve.paths was added in v8.9.0
      if (hasRequireResolvePaths) {
        resolve.paths = function paths(request: any): any {
          return Module._resolveLookupPaths(request, mod, true);
        };
      }

      require.main = process.mainModule;

      // Enable support to add extra extension types
      require.extensions = Module._extensions;
      require.cache = Module._cache;

      const dirname: any = path.dirname(filename);

      const compiledWrapper: any = self._moduleCompile(filename, content);

      // We skip the debugger setup because by the time we run, node has already
      // done that itself.

      // `Buffer` is included for Electron.
      // See https://github.com/zertosh/v8-compile-cache/pull/10#issuecomment-518042543
      const args: any = [mod.exports, require, mod, filename, dirname, process, global, Buffer];
      return compiledWrapper.apply(mod.exports, args);
    };
  }

  uninstall() {
    Module.prototype._compile = this._previousModuleCompile;
  }

  _moduleCompile(filename, content) {
    // https://github.com/nodejs/node/blob/v7.5.0/lib/module.js#L511

    // Remove shebang
    var contLen: number = content.length;
    if (contLen >= 2) {
      if (content.charCodeAt(0) === 35/*#*/ &&
          content.charCodeAt(1) === 33/*!*/) {
        if (contLen === 2) {
          // Exact match
          content = '';
        } else {
          // Find end of shebang line and slice it off
          var i: number = 2;
          for (; i < contLen; ++i) {
            var code: any = content.charCodeAt(i);
            if (code === 10/*\n*/ || code === 13/*\r*/) break;
          }
          if (i === contLen) {
            content = '';
          } else {
            // Note that this actually includes the newline character(s) in the
            // new output. This duplicates the behavior of the regular
            // expression that was previously used to replace the shebang line
            content = content.slice(i);
          }
        }
      }
    }

    // create wrapper function
    var wrapper: any = Module.wrap(content);

    var invalidationKey: any = crypto
      .createHash('sha1')
      .update(content, 'utf8')
      .digest('hex');

    var buffer: any = this._cacheStore.get(filename, invalidationKey);

    var script: any = new vm.Script(wrapper, {
      filename: filename,
      lineOffset: 0,
      displayErrors: true,
      cachedData: buffer,
      produceCachedData: true,
    });

    if (script.cachedDataProduced) {
      this._cacheStore.set(filename, invalidationKey, script.cachedData);
    } else if (script.cachedDataRejected) {
      this._cacheStore.delete(filename);
    }

    var compiledWrapper: any = script.runInThisContext({
      filename: filename,
      lineOffset: 0,
      columnOffset: 0,
      displayErrors: true,
    });

    return compiledWrapper;
  }
}

//------------------------------------------------------------------------------
// utilities
//
// https://github.com/substack/node-mkdirp/blob/f2003bb/index.js#L55-L98
// https://github.com/zertosh/slash-escape/blob/e7ebb99/slash-escape.js
//------------------------------------------------------------------------------

function mkdirpSync(p_: any): any {
  _mkdirpSync(path.resolve(p_), 0o777);
}

function _mkdirpSync(p: string, mode: string): void {
  try {
    fs.mkdirSync(p, mode);
  } catch (err0) {
    if (err0.code === 'ENOENT') {
      _mkdirpSync(path.dirname(p));
      _mkdirpSync(p);
    } else {
      try {
        const stat: any = fs.statSync(p);
        if (!stat.isDirectory()) { throw err0; }
      } catch (err1) {
        throw err0;
      }
    }
  }
}

function slashEscape(str: string): any {
  const ESCAPE_LOOKUP: any = {
    '\\': 'zB',
    ':': 'zC',
    '/': 'zS',
    '\x00': 'z0',
    'z': 'zZ',
  };
  const ESCAPE_REGEX: RegExp = /[\\:/\x00z]/g; // eslint-disable-line no-control-regex
  return str.replace(ESCAPE_REGEX, (match: any) => ESCAPE_LOOKUP[match]);
}

function supportsCachedData(): boolean {
  const script: any = new vm.Script('""', {produceCachedData: true});
  // chakracore, as of v1.7.1.0, returns `false`.
  return script.cachedDataProduced === true;
}

function getCacheDir(): any {
  const v8_compile_cache_cache_dir: any = process.env.V8_COMPILE_CACHE_CACHE_DIR;
  if (v8_compile_cache_cache_dir) {
    return v8_compile_cache_cache_dir;
  }

  // Avoid cache ownership issues on POSIX systems.
  const dirname: any = typeof process.getuid === 'function'
    ? 'v8-compile-cache-' + process.getuid()
    : 'v8-compile-cache';
  const version: any = typeof process.versions.v8 === 'string'
    ? process.versions.v8
    : typeof process.versions.chakracore === 'string'
      ? 'chakracore-' + process.versions.chakracore
      : 'node-' + process.version;
  const cacheDir: any = path.join(os.tmpdir(), dirname, version);
  return cacheDir;
}

function getMainName(): any {
  // `require.main.filename` is undefined or null when:
  //    * node -e 'require("v8-compile-cache")'
  //    * node -r 'v8-compile-cache'
  //    * Or, requiring from the REPL.
  const mainName: any = require.main && typeof require.main.filename === 'string'
    ? require.main.filename
    : process.cwd();
  return mainName;
}

//------------------------------------------------------------------------------
// main
//------------------------------------------------------------------------------

if (!process.env.DISABLE_V8_COMPILE_CACHE && supportsCachedData()) {
  const cacheDir: any = getCacheDir();
  const prefix: any = getMainName();
  const blobStore: any = new FileSystemBlobStore(cacheDir, prefix);

  const nativeCompileCache: any = new NativeCompileCache();
  nativeCompileCache.setCacheStore(blobStore);
  nativeCompileCache.install();

  process.once('exit', () => {
    if (blobStore.isDirty()) {
      blobStore.save();
    }
    nativeCompileCache.uninstall();
  });
}

module.exports.__TEST__ = {
  FileSystemBlobStore,
  NativeCompileCache,
  mkdirpSync,
  slashEscape,
  supportsCachedData,
  getCacheDir,
  getMainName,
};
