declare var https: any;
declare var parser: any;
declare var path: any;
declare var toArray: any;
declare var write: any;
declare var URL: {
    new (url: string | URL, base?: string | URL): URL;
    prototype: URL;
    createObjectURL(obj: Blob | MediaSource): string;
    revokeObjectURL(url: string): void;
};
declare var HEADERS: {
    'User-Agent': string;
};
declare function generateRowMapper(headers: string[]): (obj: Object, val: string, index: number) => Object;
declare function normalizeHeader(val: string): string;
