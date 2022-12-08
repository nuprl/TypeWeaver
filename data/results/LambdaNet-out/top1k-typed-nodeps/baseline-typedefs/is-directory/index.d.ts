/*!
 * is-directory <https://github.com/jonschlinkert/is-directory>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
declare var fs: string;
declare function isDirectory(filepath: string, cb: Function): void;
declare namespace isDirectory {
    var sync: (filepath: string) => boolean;
}
