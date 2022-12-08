#!/usr/bin/env node
declare var path: string;
declare var format: Function;
declare var dashdash: object;
declare var durationRe: RegExp;
declare function parseDuration(option: Function, optstr: string, arg: string): number;
declare var options: any[];
