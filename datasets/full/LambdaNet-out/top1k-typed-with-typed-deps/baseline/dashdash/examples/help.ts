#!/usr/bin/env node
/*
 * A small example using dashdash for option processing, with generated
 * help output. See "hello.js" for the smallest usage example.
 */

var dashdash: any[] = require('../lib/dashdash');

var options: any[] = [
    {
        names: ['verbose', 'v'],
        type: 'bool',
        help: 'More verbose output.'
    },
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Print this help and exit.'
    }
];

// We'll use this `parser` to parse and to generate help output.
var parser: object = dashdash.createParser({options: options});
try {
    var opts: object = parser.parse(process.argv);
} catch (e) {
    console.error('help: error: %s', e.message);
    process.exit(1);
}

// Use `parser.help()` for formatted options help.
if (opts.help) {
    var help: string = parser.help().trimRight();
    console.log('usage: node help.js [OPTIONS]\n'
                + 'options:\n'
                + help);
    process.exit(0);
}

// ...
