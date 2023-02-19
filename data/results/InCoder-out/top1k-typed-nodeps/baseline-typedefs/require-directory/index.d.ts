/// <reference types="node" />
declare var fs: any, join: any, resolve: any, dirname: any, defaultOptions: {
    extensions: string[];
    recurse: boolean;
    rename: (name: any) => any;
    visit: (obj: any) => any;
};
declare function checkFileInclusion(path: string | Buffer, filename: string | Buffer, options: any): boolean;
declare function requireDirectory(m: any, path: any, options: any): {};
