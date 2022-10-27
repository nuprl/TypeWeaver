#!/usr/bin/env node
/*
 * Two custom option types that takes comma-separated values (excluding empty
 * string values, trimming whitespace):
 *
 * - `commaSepString`: takes one option and returns an array of the values
 * - `arrayOfCommaSepString`: accumulates comma-sep values from one or more
 *   uses of the option
 */

import path from 'path';

import { format } from 'util';
import dashdash from '../lib/dashdash';


function parseCommaSepStringNoEmpties(option: String, optstr: Array, arg: String): Array {
    return arg.trim().split(/\s*,\s*/g)
        .filter(function (part: Array) { return part; });
}

dashdash.addOptionType({
    name: 'commaSepString',
    takesArg: true,
    helpArg: 'STRING',
    parseArg: parseCommaSepStringNoEmpties
});

dashdash.addOptionType({
    name: 'arrayOfCommaSepString',
    takesArg: true,
    helpArg: 'STRING',
    parseArg: parseCommaSepStringNoEmpties,
    array: true,
    arrayFlatten: true
});


var options: Array = [
    { names: ['single', 's'], type: 'commaSepString' },
    { names: ['multi', 'm'], type: 'arrayOfCommaSepString' }
];

try {
    var opts: HTMLElement = dashdash.parse({options: options});
} catch (e) {
    console.error('%s: error: %s', path.basename(process.argv[1]), e.message);
    process.exit(1);
}

console.log('opts.single (-s): %j', opts.single);
console.log('opts.multi (-m): %j', opts.multi);
