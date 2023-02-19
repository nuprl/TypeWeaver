declare var getBody: any;
declare var https: any;
declare var path: any;
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
