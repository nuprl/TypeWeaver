#!/usr/bin/env node
declare const usage: () => string;
declare const dirs: any[];
declare const opts: {};
declare let print: boolean;
declare let dashdash: boolean;
declare let manual: boolean;
declare const mkdirp: {
    (path: any, opts: any): any;
    sync: (path: any, opts: any) => any;
    native(path: any, opts: any): any;
    manual(path: any, opts: any): any;
    nativeSync(path: any, opts: any): any;
    manualSync(path: any, opts: any): any;
};
declare const impl: (path: any, opts: any) => any;
