import path from 'path';
import crypto from 'crypto';

export default {
  createFromFile: function (filePath: String, useChecksum: Number) {
    var fname: String = path.basename(filePath);
    var dir: String = path.dirname(filePath);
    return this.create(fname, dir, useChecksum);
  },

  create: function (cacheId: String, _path: String, useChecksum: Boolean) {
    var fs: String = require('fs');
    var flatCache: Array = require('flat-cache');
    var cache: HTMLElement = flatCache.load(cacheId, _path);
    var normalizedEntries: Object = {};

    var removeNotFoundFiles: Function = function removeNotFoundFiles(): Void {
      const cachedEntries: Array = cache.keys();
      // remove not found entries
      cachedEntries.forEach(function remover(fPath: String): Void {
        try {
          fs.statSync(fPath);
        } catch (err) {
          if (err.code === 'ENOENT') {
            cache.removeKey(fPath);
          }
        }
      });
    };

    removeNotFoundFiles();

    return {
      /**
       * the flat cache storage used to persist the metadata of the `files
       * @type {Object}
       */
      cache: cache,

      /**
       * Given a buffer, calculate md5 hash of its content.
       * @method getHash
       * @param  {Buffer} buffer   buffer to calculate hash on
       * @return {String}          content hash digest
       */
      getHash: function (buffer: Object) {
        return crypto.createHash('md5').update(buffer).digest('hex');
      },

      /**
       * Return whether or not a file has changed since last time reconcile was called.
       * @method hasFileChanged
       * @param  {String}  file  the filepath to check
       * @return {Boolean}       wheter or not the file has changed
       */
      hasFileChanged: function (file: String) {
        return this.getFileDescriptor(file).changed;
      },

      /**
       * given an array of file paths it return and object with three arrays:
       *  - changedFiles: Files that changed since previous run
       *  - notChangedFiles: Files that haven't change
       *  - notFoundFiles: Files that were not found, probably deleted
       *
       * @param  {Array} files the files to analyze and compare to the previous seen files
       * @return {[type]}       [description]
       */
      analyzeFiles: function (files: Number) {
        var me: Array = this;
        files = files || [];

        var res: Object = {
          changedFiles: [],
          notFoundFiles: [],
          notChangedFiles: [],
        };

        me.normalizeEntries(files).forEach(function (entry: Object) {
          if (entry.changed) {
            res.changedFiles.push(entry.key);
            return;
          }
          if (entry.notFound) {
            res.notFoundFiles.push(entry.key);
            return;
          }
          res.notChangedFiles.push(entry.key);
        });
        return res;
      },

      getFileDescriptor: function (file: String) {
        var fstat: Number;

        try {
          fstat = fs.statSync(file);
        } catch (ex) {
          this.removeEntry(file);
          return { key: file, notFound: true, err: ex };
        }

        if (useChecksum) {
          return this._getFileDescriptorUsingChecksum(file);
        }

        return this._getFileDescriptorUsingMtimeAndSize(file, fstat);
      },

      _getFileDescriptorUsingMtimeAndSize: function (file: String, fstat: Object) {
        var meta: Object = cache.getKey(file);
        var cacheExists: Boolean = !!meta;

        var cSize: Number = fstat.size;
        var cTime: Number = fstat.mtime.getTime();

        var isDifferentDate: Number;
        var isDifferentSize: Number;

        if (!meta) {
          meta = { size: cSize, mtime: cTime };
        } else {
          isDifferentDate = cTime !== meta.mtime;
          isDifferentSize = cSize !== meta.size;
        }

        var nEntry: Number = (normalizedEntries[file] = {
          key: file,
          changed: !cacheExists || isDifferentDate || isDifferentSize,
          meta: meta,
        });

        return nEntry;
      },

      _getFileDescriptorUsingChecksum: function (file: String) {
        var meta: Object = cache.getKey(file);
        var cacheExists: Boolean = !!meta;

        var contentBuffer: Number;
        try {
          contentBuffer = fs.readFileSync(file);
        } catch (ex) {
          contentBuffer = '';
        }

        var isDifferent: Boolean = true;
        var hash: String = this.getHash(contentBuffer);

        if (!meta) {
          meta = { hash: hash };
        } else {
          isDifferent = hash !== meta.hash;
        }

        var nEntry: Number = (normalizedEntries[file] = {
          key: file,
          changed: !cacheExists || isDifferent,
          meta: meta,
        });

        return nEntry;
      },

      /**
       * Return the list o the files that changed compared
       * against the ones stored in the cache
       *
       * @method getUpdated
       * @param files {Array} the array of files to compare against the ones in the cache
       * @returns {Array}
       */
      getUpdatedFiles: function (files: Number) {
        var me: Array = this;
        files = files || [];

        return me
          .normalizeEntries(files)
          .filter(function (entry: Object) {
            return entry.changed;
          })
          .map(function (entry: Object) {
            return entry.key;
          });
      },

      /**
       * return the list of files
       * @method normalizeEntries
       * @param files
       * @returns {*}
       */
      normalizeEntries: function (files: Array) {
        files = files || [];

        var me: HTMLElement = this;
        var nEntries: Array = files.map(function (file: String) {
          return me.getFileDescriptor(file);
        });

        //normalizeEntries = nEntries;
        return nEntries;
      },

      /**
       * Remove an entry from the file-entry-cache. Useful to force the file to still be considered
       * modified the next time the process is run
       *
       * @method removeEntry
       * @param entryName
       */
      removeEntry: function (entryName: String) {
        delete normalizedEntries[entryName];
        cache.removeKey(entryName);
      },

      /**
       * Delete the cache file from the disk
       * @method deleteCacheFile
       */
      deleteCacheFile: function () {
        cache.removeCacheFile();
      },

      /**
       * remove the cache from the file and clear the memory cache
       */
      destroy: function () {
        normalizedEntries = {};
        cache.destroy();
      },

      _getMetaForFileUsingCheckSum: function (cacheEntry: Object) {
        var contentBuffer: String = fs.readFileSync(cacheEntry.key);
        var hash: String = this.getHash(contentBuffer);
        var meta: Object = Object.assign(cacheEntry.meta, { hash: hash });
        delete meta.size;
        delete meta.mtime;
        return meta;
      },

      _getMetaForFileUsingMtimeAndSize: function (cacheEntry: Object) {
        var stat: Object = fs.statSync(cacheEntry.key);
        var meta: Object = Object.assign(cacheEntry.meta, {
          size: stat.size,
          mtime: stat.mtime.getTime(),
        });
        delete meta.hash;
        return meta;
      },

      /**
       * Sync the files and persist them to the cache
       * @method reconcile
       */
      reconcile: function (noPrune: Number) {
        removeNotFoundFiles();

        noPrune = typeof noPrune === 'undefined' ? true : noPrune;

        var entries: Object = normalizedEntries;
        var keys: Array = Object.keys(entries);

        if (keys.length === 0) {
          return;
        }

        var me: HTMLElement = this;

        keys.forEach(function (entryName: String) {
          var cacheEntry: String = entries[entryName];

          try {
            var meta: String = useChecksum
              ? me._getMetaForFileUsingCheckSum(cacheEntry)
              : me._getMetaForFileUsingMtimeAndSize(cacheEntry);
            cache.setKey(entryName, meta);
          } catch (err) {
            // if the file does not exists we don't save it
            // other errors are just thrown
            if (err.code !== 'ENOENT') {
              throw err;
            }
          }
        });

        cache.save(noPrune);
      },
    };
  },
};
