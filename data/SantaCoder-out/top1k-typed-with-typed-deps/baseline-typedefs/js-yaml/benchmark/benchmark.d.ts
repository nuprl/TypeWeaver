#!/usr/bin/env node
declare var path: any;
declare var fs: any;
declare var util: any;
declare var Benchmark: any;
declare var ansi: any;
declare var cursor: any;
declare var IMPLS_DIRECTORY: any;
declare var IMPLS_PATHS: {};
declare var IMPLS: any[];
declare var SAMPLES_DIRECTORY: any;
declare var SAMPLES: any[];
declare function select(patterns: Array<RegExp>): any[];
declare function run(files: string[]): void;
