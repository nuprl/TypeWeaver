/*!
 * is-directory <https://github.com/jonschlinkert/is-directory>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/// <reference types="node" />
declare function isDirectory(filepath: string | Buffer, cb: Function): void;
declare namespace isDirectory {
    var sync: (filepath: string | Buffer) => boolean;
}
export default isDirectory;
