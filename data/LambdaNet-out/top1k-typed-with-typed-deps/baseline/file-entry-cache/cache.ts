var path: string = require('path');
var crypto: string = require('crypto');

module.exports = {
  createFromFile: function (filePath: string, useChecksum: number) {
    var fname: string = path.basename(filePath);
    var dir: string = path.dirname(filePath);
    return this.create(fname, dir, useChecksum);
  },

  create: function (cacheId: string, _path: string, useChecksum: boolean) {
    var fs: string = require('fs');
    var flatCache: any[] = require('flat-cache');
    var cache: HTMLElement = flatCache.load(cacheId, _path);
    var normalizedEntries: object = {};

    var removeNotFoundFiles: Function = function removeNotFoundFiles(): void {
      const cachedEntries: any[] = cache.keys();
      // remove not found entries
      cachedEntries.forEach(function remover(fPath: string): void {
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
      getHash: function (buffer: object) {
        return crypto.createHash('md5').update(buffer).digest('hex');
      },

      /**
       * Return whether or not a file has changed since last time reconcile was called.
       * @method hasFileChanged
       * @param  {String}  file  the filepath to check
       * @return {Boolean}       wheter or not the file has changed
       */
      hasFileChanged: function (file: string) {
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
      analyzeFiles: function (files: number) {
        var me: any[] = this;
        files = files || [];

        var res: object = {
          changedFiles: [],
          notFoundFiles: [],
          notChangedFiles: [],
        };

        me.normalizeEntries(files).forEach(function (entry: object) {
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

      getFileDescriptor: function (file: string) {
        var fstat: number;

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

      _getFileDescriptorUsingMtimeAndSize: function (file: string, fstat: object) {
        var meta: object = cache.getKey(file);
        var cacheExists: boolean = !!meta;

        var cSize: number = fstat.size;
        var cTime: number = fstat.mtime.getTime();

        var isDifferentDate: number;
        var isDifferentSize: number;

        if (!meta) {
          meta = { size: cSize, mtime: cTime };
        } else {
          isDifferentDate = cTime !== meta.mtime;
          isDifferentSize = cSize !== meta.size;
        }

        var nEntry: number = (normalizedEntries[file] = {
          key: file,
          changed: !cacheExists || isDifferentDate || isDifferentSize,
          meta: meta,
        });

        return nEntry;
      },

      _getFileDescriptorUsingChecksum: function (file: string) {
        var meta: object = cache.getKey(file);
        var cacheExists: boolean = !!meta;

        var contentBuffer: number;
        try {
          contentBuffer = fs.readFileSync(file);
        } catch (ex) {
          contentBuffer = '';
        }

        var isDifferent: boolean = true;
        var hash: string = this.getHash(contentBuffer);

        if (!meta) {
          meta = { hash: hash };
        } else {
          isDifferent = hash !== meta.hash;
        }

        var nEntry: number = (normalizedEntries[file] = {
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
      getUpdatedFiles: function (files: number) {
        var me: any[] = this;
        files = files || [];

        return me
          .normalizeEntries(files)
          .filter(function (entry: object) {
            return entry.changed;
          })
          .map(function (entry: object) {
            return entry.key;
          });
      },

      /**
       * return the list of files
       * @method normalizeEntries
       * @param files
       * @returns {*}
       */
      normalizeEntries: function (files: any[]) {
        files = files || [];

        var me: HTMLElement = this;
        var nEntries: any[] = files.map(function (file: string) {
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
      removeEntry: function (entryName: string) {
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

      _getMetaForFileUsingCheckSum: function (cacheEntry: object) {
        var contentBuffer: string = fs.readFileSync(cacheEntry.key);
        var hash: string = this.getHash(contentBuffer);
        var meta: object = Object.assign(cacheEntry.meta, { hash: hash });
        delete meta.size;
        delete meta.mtime;
        return meta;
      },

      _getMetaForFileUsingMtimeAndSize: function (cacheEntry: object) {
        var stat: object = fs.statSync(cacheEntry.key);
        var meta: object = Object.assign(cacheEntry.meta, {
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
      reconcile: function (noPrune: number) {
        removeNotFoundFiles();

        noPrune = typeof noPrune === 'undefined' ? true : noPrune;

        var entries: object = normalizedEntries;
        var keys: any[] = Object.keys(entries);

        if (keys.length === 0) {
          return;
        }

        var me: HTMLElement = this;

        keys.forEach(function (entryName: string) {
          var cacheEntry: string = entries[entryName];

          try {
            var meta: string = useChecksum
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
