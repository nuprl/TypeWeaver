#!/usr/bin/env node
declare const rimraf: Function;
declare const path: string;
declare const isRoot: Function;
declare const filterOutRoot: Function;
declare let help: boolean;
declare let dashdash: boolean;
declare let noglob: boolean;
declare let preserveRoot: boolean;
declare const args: any[];
declare const go: Function;
