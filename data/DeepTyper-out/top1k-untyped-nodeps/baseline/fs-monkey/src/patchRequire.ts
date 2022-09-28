import * as path from 'path';

const isWin32: boolean = process.platform === 'win32';
const correctPath: any = isWin32 ? require('./correctPath').correctPath : (p: any) => p;

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 * because the buffer-to-string conversion in `fs.readFileSync()`
 * translates it to FEFF, the UTF-16 BOM.
 */
function stripBOM(content: any): string {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
}

/**
 * Rewrites `modules.js`, which is the factory for the `require` function.
 * You give this function your custom file system object and this function
 * will patch `module.js` to use that instead of the built-it `fs.js` file system.
 *
 * This function expects an object with three methods:
 *
 *     patchRequire({
 *         readFileSync: () => {},
 *         realpathSync: () => {},
 *         statSync: () => {},
 *     });
 *
 * The methods should behave like the ones on the native `fs` object.
 *
 * @param {Object} vol
 * @param {boolean} [unixifyPaths=false]
 * @param {Object} Module Module loader to patch.
 */
export default function patchRequire(vol, unixifyPaths = false, Module = require('module')) {

    // ensure all paths are corrected before use.
    if(isWin32 && unixifyPaths) {
        const original: any = vol;
        vol = {
            readFileSync: (path: any,options: any) => {
                return original.readFileSync(correctPath(path),options);
            },

            realpathSync: (path: any) => {
                return original.realpathSync(correctPath(path));
            },

            statSync: (path: any) => {
                return original.statSync(correctPath(path));
            }
        };
    }

    // Used to speed up module loading.  Returns the contents of the file as
    // a string or undefined when the file cannot be opened.  The speedup
    // comes from not creating Error objects on failure.
    function internalModuleReadFile(path: string): any {
        try {
            return vol.readFileSync(path, 'utf8');
        } catch(err) {

        }
    }

    // Used to speed up module loading.  Returns 0 if the path refers to
    // a file, 1 when it's a directory or < 0 on error (usually -ENOENT.)
    // The speedup comes from not creating thousands of Stat and Error objects.
    function internalModuleStat(filename: string): any {
        try {
            return vol.statSync(filename).isDirectory() ? 1 : 0;
        } catch(err) {
            return -2; // ENOENT
        }
    }

    function stat(filename: string): any {
        filename = path._makeLong(filename);
        const cache: any = stat.cache;
        if (cache !== null) {
            const result: any = cache.get(filename);
            if (result !== undefined) return result;
        }
        const result: any = internalModuleStat(filename);
        if (cache !== null) cache.set(filename, result);
        return result;
    }
    stat.cache = null;


    const preserveSymlinks: boolean = false;


    function toRealPath(requestPath: string): any {
        return vol.realpathSync(requestPath);
    }


    const packageMainCache: any = Object.create(null);
    function readPackage(requestPath: string): string {
        const entry: any = packageMainCache[requestPath];
        if (entry)
            return entry;

        const jsonPath: any = path.resolve(requestPath, 'package.json');
        const json: any = internalModuleReadFile(path._makeLong(jsonPath));

        if (json === undefined) {
            return false;
        }

        let pkg: string;
        try {
            pkg = packageMainCache[requestPath] = JSON.parse(json).main;
        } catch (e) {
            e.path = jsonPath;
            e.message = 'Error parsing ' + jsonPath + ': ' + e.message;
            throw e;
        }
        return pkg;
    }


    function tryFile(requestPath: string, isMain: boolean): string {
        const rc: any = stat(requestPath);
        if (preserveSymlinks && !isMain) {
            return rc === 0 && path.resolve(requestPath);
        }
        return rc === 0 && toRealPath(requestPath);
    }


    // given a path check a the file exists with any of the set extensions
    function tryExtensions(p: string, exts: string, isMain: boolean): boolean {
        for (var i = 0; i < exts.length; i++) {
            const filename: string = tryFile(p + exts[i], isMain);

            if (filename) {
                return filename;
            }
        }
        return false;
    }


    function tryPackage(requestPath: string, exts: string, isMain: boolean): boolean {
        let pkg: string = readPackage(requestPath);

        if (!pkg) return false;

        let filename: any = path.resolve(requestPath, pkg);
        return tryFile(filename, isMain) ||
            tryExtensions(filename, exts, isMain) ||
            tryExtensions(path.resolve(filename, 'index'), exts, isMain);
    }


    // Native extension for .js
    Module._extensions['.js'] = function(module, filename: string) {
        let content: string = vol.readFileSync(filename, 'utf8');
        module._compile(stripBOM(content), filename);
    };

    // Native extension for .json
    Module._extensions['.json'] = function(module, filename: string) {
        let content: string = vol.readFileSync(filename, 'utf8');
        try {
            module.exports = JSON.parse(stripBOM(content));
        } catch (err) {
            err.message = filename + ': ' + err.message;
            throw err;
        }
    };

    let warned: boolean = true;
    Module._findPath = function(request: any, paths: any, isMain: boolean) {
        if (path.isAbsolute(request)) {
            paths = [''];
        } else if (!paths || paths.length === 0) {
            return false;
        }

        var cacheKey: string = request + '\x00' +
            (paths.length === 1 ? paths[0] : paths.join('\x00'));
        var entry: any = Module._pathCache[cacheKey];
        if (entry)
            return entry;

        var exts: any;
        var trailingSlash: boolean = request.length > 0 &&
            request.charCodeAt(request.length - 1) === 47/*/*/;

        // For each path
        for (var i = 0; i < paths.length; i++) {
            // Don't search further if path doesn't exist
            const curPath: any = paths[i];
            if (curPath && stat(curPath) < 1) continue;
            var basePath: string = correctPath( path.resolve(curPath, request) );
            var filename: any;

            var rc: any = stat(basePath);
            if (!trailingSlash) {
                if (rc === 0) {  // File.
                    if (preserveSymlinks && !isMain) {
                        filename = path.resolve(basePath);
                    } else {
                        filename = toRealPath(basePath);
                    }
                } else if (rc === 1) {  // Directory.
                    if (exts === undefined)
                        exts = Object.keys(Module._extensions);
                    filename = tryPackage(basePath, exts, isMain);
                }

                if (!filename) {
                    // try it with each of the extensions
                    if (exts === undefined)
                        exts = Object.keys(Module._extensions);
                    filename = tryExtensions(basePath, exts, isMain);
                }
            }

            if (!filename && rc === 1) {  // Directory.
                if (exts === undefined)
                    exts = Object.keys(Module._extensions);
                filename = tryPackage(basePath, exts, isMain);
            }

            if (!filename && rc === 1) {  // Directory.
                // try it with each of the extensions at "index"
                if (exts === undefined)
                    exts = Object.keys(Module._extensions);
                filename = tryExtensions(path.resolve(basePath, 'index'), exts, isMain);
            }

            if (filename) {
                // Warn once if '.' resolved outside the module dir
                if (request === '.' && i > 0) {
                    if (!warned) {
                        warned = true;
                        process.emitWarning(
                            'warning: require(\'.\') resolved outside the package ' +
                            'directory. This functionality is deprecated and will be removed ' +
                            'soon.',
                            'DeprecationWarning', 'DEP0019');
                    }
                }

                Module._pathCache[cacheKey] = filename;
                return filename;
            }
        }
        return false;
    };
}
