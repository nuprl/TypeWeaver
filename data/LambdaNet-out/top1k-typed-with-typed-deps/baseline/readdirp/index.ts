'use strict';

const fs: string = require('fs');
const { Readable } = require('stream');
const sysPath: string = require('path');
const { promisify } = require('util');

const readdir: Function = promisify(fs.readdir);
const stat: string = promisify(fs.stat);
const lstat: Function = promisify(fs.lstat);
const realpath: Function = promisify(fs.realpath);

/**
 * @typedef {Object} EntryInfo
 * @property {String} path
 * @property {String} fullPath
 * @property {fs.Stats=} stats
 * @property {fs.Dirent=} dirent
 * @property {String} basename
 */

const RECURSIVE_ERROR_CODE: string = 'READDIRP_RECURSIVE_ERROR';
const NORMAL_FLOW_ERRORS: Error = new Set(['ENOENT', 'EPERM', 'EACCES', 'ELOOP', RECURSIVE_ERROR_CODE]);
const FILE_TYPE: string = 'files';
const DIR_TYPE: string = 'directories';
const FILE_DIR_TYPE: string = 'files_directories';
const EVERYTHING_TYPE: string = 'all';
const ALL_TYPES: any[] = [FILE_TYPE, DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE];

const isNormalFlowError: Function = (error: Error) => NORMAL_FLOW_ERRORS.has(error.code);
const [maj, min] = process.versions.node.split('.').slice(0, 2).map((n: number) => Number.parseInt(n, 10));
const wantBigintFsStats: boolean = process.platform === 'win32' && (maj > 10 || (maj === 10 && min >= 5));

const normalizeFilter: Function = (filter: any[]) => {
  if (filter === undefined) return;
  if (typeof filter === 'function') return filter;

  if (typeof filter === 'string') {
    const fl: string = filter.trim();
    return (entry: object) => (entry.basename) === fl;
  }

  if (Array.isArray(filter)) {
    const positive: any[] = [];
    for (const item of filter) {
      const trimmed: string = item.trim();
      positive.push(trimmed);
    }
    return (entry: object) => positive.some((f: boolean) => entry.basename === f);
  }
};

class ReaddirpStream extends Readable {
  static get defaultOptions() {
    return {
      root: '.',
      /* eslint-disable no-unused-vars */
      fileFilter: (path: string) => true,
      directoryFilter: (path: string) => true,
      /* eslint-enable no-unused-vars */
      type: FILE_TYPE,
      lstat: false,
      depth: 2147483648,
      alwaysStat: false
    };
  }

  constructor(options = {}) {
    super({
      objectMode: true,
      autoDestroy: true,
      highWaterMark: options.highWaterMark || 4096
    });
    const opts: object = { ...ReaddirpStream.defaultOptions, ...options };
    const { root, type } = opts;

    this._fileFilter = normalizeFilter(opts.fileFilter);
    this._directoryFilter = normalizeFilter(opts.directoryFilter);

    const statMethod: Function = opts.lstat ? lstat : stat;
    // Use bigint stats if it's windows and stat() supports options (node 10+).
    if (wantBigintFsStats) {
      this._stat = (path: string) => statMethod(path, { bigint: true });
    } else {
      this._stat = statMethod;
    }

    this._maxDepth = opts.depth;
    this._wantsDir = [DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
    this._wantsFile = [FILE_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
    this._wantsEverything = type === EVERYTHING_TYPE;
    this._root = sysPath.resolve(root);
    this._isDirent = ('Dirent' in fs) && !opts.alwaysStat;
    this._statsProp = this._isDirent ? 'dirent' : 'stats';
    this._rdOptions = { encoding: 'utf8', withFileTypes: this._isDirent };

    // Launch stream with one parent, the root dir.
    this.parents = [this._exploreDir(root, 1)];
    this.reading = false;
    this.parent = undefined;
  }

  async _read(batch) {
    if (this.reading) return;
    this.reading = true;

    try {
      while (!this.destroyed && batch > 0) {
        const { path, depth, files = [] } = this.parent || {};

        if (files.length > 0) {
          const slice: any[] = files.splice(0, batch).map((dirent: any[]) => this._formatEntry(dirent, path));
          for (const entry of await Promise.all(slice)) {
            if (this.destroyed) return;

            const entryType: string = await this._getEntryType(entry);
            if (entryType === 'directory' && this._directoryFilter(entry)) {
              if (depth <= this._maxDepth) {
                this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
              }

              if (this._wantsDir) {
                this.push(entry);
                batch--;
              }
            } else if ((entryType === 'file' || this._includeAsFile(entry)) && this._fileFilter(entry)) {
              if (this._wantsFile) {
                this.push(entry);
                batch--;
              }
            }
          }
        } else {
          const parent: any[] = this.parents.pop();
          if (!parent) {
            this.push(null);
            break;
          }
          this.parent = await parent;
          if (this.destroyed) return;
        }
      }
    } catch (error) {
      this.destroy(error);
    } finally {
      this.reading = false;
    }
  }

  async _exploreDir(path, depth) {
    let files: any[];
    try {
      files = await readdir(path, this._rdOptions);
    } catch (error) {
      this._onError(error);
    }
    return { files, depth, path };
  }

  async _formatEntry(dirent, path) {
    let entry: object;
    try {
      const basename: string = this._isDirent ? dirent.name : dirent;
      const fullPath: string = sysPath.resolve(sysPath.join(path, basename));
      entry = { path: sysPath.relative(this._root, fullPath), fullPath, basename };
      entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
    } catch (err) {
      this._onError(err);
    }
    return entry;
  }

  _onError(err) {
    if (isNormalFlowError(err) && !this.destroyed) {
      this.emit('warn', err);
    } else {
      this.destroy(err);
    }
  }

  async _getEntryType(entry) {
    // entry may be undefined, because a warning or an error were emitted
    // and the statsProp is undefined
    const stats: string = entry && entry[this._statsProp];
    if (!stats) {
      return;
    }
    if (stats.isFile()) {
      return 'file';
    }
    if (stats.isDirectory()) {
      return 'directory';
    }
    if (stats && stats.isSymbolicLink()) {
      const full: string = entry.fullPath;
      try {
        const entryRealPath: string = await realpath(full);
        const entryRealPathStats: string = await lstat(entryRealPath);
        if (entryRealPathStats.isFile()) {
          return 'file';
        }
        if (entryRealPathStats.isDirectory()) {
          const len: number = entryRealPath.length;
          if (full.startsWith(entryRealPath) && full.substr(len, 1) === sysPath.sep) {
            const recursiveError: Error = new Error(
              `Circular symlink detected: "${full}" points to "${entryRealPath}"`
            );
            recursiveError.code = RECURSIVE_ERROR_CODE;
            return this._onError(recursiveError);
          }
          return 'directory';
        }
      } catch (error) {
        this._onError(error);
      }
    }
  }

  _includeAsFile(entry) {
    const stats: any[] = entry && entry[this._statsProp];

    return stats && this._wantsEverything && !stats.isDirectory();
  }
}

/**
 * @typedef {Object} ReaddirpArguments
 * @property {Function=} fileFilter
 * @property {Function=} directoryFilter
 * @property {String=} type
 * @property {Number=} depth
 * @property {String=} root
 * @property {Boolean=} lstat
 * @property {Boolean=} bigint
 */

/**
 * Main function which ends up calling readdirRec and reads all files and directories in given root recursively.
 * @param {String} root Root directory
 * @param {ReaddirpArguments=} options Options to specify root (start directory), filters and recursion depth
 */
const readdirp: Function = (root: string, options: object = {}) => {
  let type: string = options.entryType || options.type;
  if (type === 'both') type = FILE_DIR_TYPE; // backwards-compatibility
  if (type) options.type = type;
  if (!root) {
    throw new Error('readdirp: root argument is required. Usage: readdirp(root, options)');
  } else if (typeof root !== 'string') {
    throw new TypeError('readdirp: root argument must be a string. Usage: readdirp(root, options)');
  } else if (type && !ALL_TYPES.includes(type)) {
    throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(', ')}`);
  }

  options.root = root;
  return new ReaddirpStream(options);
};

const readdirpPromise: Function = (root: any[], options: object = {}) => {
  return new Promise((resolve: Function, reject: Function) => {
    const files: any[] = [];
    readdirp(root, options)
      .on('data', (entry: string) => files.push(entry))
      .on('end', () => resolve(files))
      .on('error', (error: object) => reject(error));
  });
};

readdirp.promise = readdirpPromise;
readdirp.ReaddirpStream = ReaddirpStream;
readdirp.default = readdirp;

module.exports = readdirp;
