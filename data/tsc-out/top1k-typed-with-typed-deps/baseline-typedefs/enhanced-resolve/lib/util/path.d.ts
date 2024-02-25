export type PathType = number;
export const PathType: Readonly<{
    Empty: 0;
    Normal: 1;
    Relative: 2;
    AbsoluteWin: 3;
    AbsolutePosix: 4;
    Internal: 5;
}>;
export function getType(p: string): PathType;
export function normalize(p: string): string;
export function join(rootPath: string, request: string | undefined): string;
export function cachedJoin(rootPath: string, request: string | undefined): string;
export function checkImportsExportsFieldTarget(relativePath: any): Error;
