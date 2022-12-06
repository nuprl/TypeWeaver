#!/usr/bin/env node
/*
 * As of version 1.13.0, dashdash changed the meaning of 'positiveInteger'
 * to NOT accept zero. This example shows how to add a custom option type
 * that supports the old behaviour, if needed.
 */

var path: string = require('path');
var format: Function = require('util').format;

var dashdash: object = require('../lib/dashdash');


function parseIntGteZero(option: Function, optstr: string, arg: number): number {
    var num: number = Number(arg);
    if (!/^[0-9]+$/.test(arg) || isNaN(num)) {
        throw new Error(format('arg for "%s" is not an integer >=0: "%s"',
            optstr, arg));
    }
    return num;
}

dashdash.addOptionType({
    name: 'intGteZero',
    takesArg: true,
    helpArg: 'INT',
    parseArg: parseIntGteZero
});


// --- example parsing using intGteZero type

var options: any[] = [
    { names: ['num', 'n'], type: 'intGteZero' }
];

try {
    var opts: HTMLElement = dashdash.parse({options: options});
} catch (e) {
    console.error('%s: error: %s', path.basename(process.argv[1]), e.message);
    process.exit(1);
}

if (opts.num) {
    console.log('num: %d', opts.num);
}
