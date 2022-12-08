/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var getBody: any;
declare var https: any;
declare var writedb: any;
declare var TYPE_LINE_REGEXP: RegExp;
declare var URL: {
    new (url: string | URL, base?: string | URL): URL;
    prototype: URL;
    createObjectURL(obj: Blob | MediaSource): string;
    revokeObjectURL(url: string): void;
};
