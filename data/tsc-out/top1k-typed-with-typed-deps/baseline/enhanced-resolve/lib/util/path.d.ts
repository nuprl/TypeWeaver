export type PathType = number;
/**
 * @enum {number}
 */
export const PathType: Readonly<{
    Empty: 0;
    Normal: 1;
    Relative: 2;
    AbsoluteWin: 3;
    AbsolutePosix: 4;
    Internal: 5;
}>;
/**
 * @param {string} p a path
 * @returns {PathType} type of path
 */
export function getType(p: string): PathType;
/**
 * @param {string} p a path
 * @returns {string} the normalized path
 */
export function normalize(p: string): string;
/**
 * @param {string} rootPath the root path
 * @param {string | undefined} request the request path
 * @returns {string} the joined path
 */
export function join(rootPath: string, request: string | undefined): string;
/**
 * @param {string} rootPath the root path
 * @param {string | undefined} request the request path
 * @returns {string} the joined path
 */
export function cachedJoin(rootPath: string, request: string | undefined): string;
export function checkImportsExportsFieldTarget(relativePath: any): Error;
