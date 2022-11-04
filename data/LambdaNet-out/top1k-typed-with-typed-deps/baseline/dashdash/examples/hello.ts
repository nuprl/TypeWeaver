#!/usr/bin/env node
/*
 * The smallest example using dashdash for option processing.
 */

var dashdash: String = require('../lib/dashdash');

// Define your options.
var options: Array = [
    {
        names: ['verbose', 'v'],        // first name is opts key
        type: 'bool',
        help: 'More verbose output.'
    }
];

// Shortcut to create parser and parse `process.argv` in one step.
try {
    var opts: HTMLElement = dashdash.parse({options: options});
} catch (e) {
    console.error('hello: error: %s', e.message);
    process.exit(1);
}

if (opts.verbose) {
    console.log("# opts:", opts);
    console.log("# args:", opts._args);
}

// See "help.js" for a small example that uses generated option help output.