#!/usr/bin/env node
declare const rimraf: any;
declare const path: any;
declare const isRoot: (arg: any) => boolean;
declare const filterOutRoot: (arg: any) => boolean;
declare let help: boolean;
declare let dashdash: boolean;
declare let noglob: boolean;
declare let preserveRoot: boolean;
declare const args: string[];
declare const go: (n: any) => void;
