/*!
 * is-directory <https://github.com/jonschlinkert/is-directory>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
declare function isDirectory(filepath: string, cb: any): any;
declare namespace isDirectory {
    var sync: (filepath: string) => any;
}
export default isDirectory;
