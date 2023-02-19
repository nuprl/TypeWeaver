#!/usr/bin/env node
declare const fs: any;
declare const path: any;
declare const pkg: any;
declare const JSON5: any;
declare const argv: {
    convert: any;
    space: any;
    validate: any;
    outFile: any;
    version: any;
    help: any;
    defaults: any[];
};
declare function parseArgs(): {
    convert: any;
    space: any;
    validate: any;
    outFile: any;
    version: any;
    help: any;
    defaults: any[];
};
declare function version(): void;
declare function usage(): void;
