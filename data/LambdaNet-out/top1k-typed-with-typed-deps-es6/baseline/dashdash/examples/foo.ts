#!/usr/bin/env node
/*
 * An example using a sampling of dashdash's features. See "hello.js" and
 * "help.js" for smaller examples.
 */

import dashdash from '../lib/dashdash';

// Specify the options. Minimally `name` (or `names`) and `type`
// must be given for each.
var options: Array = [
    {
        name: 'version',              // `name` or `names`
        type: 'bool',
        help: 'Print tool version and exit.'
    },
    {
        names: ['help', 'h'],        // first name is opts key
        type: 'bool',
        help: 'Print this help and exit.'
    },
    {
        names: ['verbose', 'v'],
        type: 'arrayOfBool',
        env: 'FOO_VERBOSE',
        help: 'Verbose output. Use multiple times for more verbose.'
    },
    {
        names: ['b'],
        type: 'bool',
        help: 'A boolean arg',
    },
    {
        names: ['file', 'f'],
        type: 'string',
        env: 'FOO_FILE',
        help: 'File to process',
        helpArg: 'FILE'
    },
    {
        names: ['timeout', 't'],
        type: 'positiveInteger',
        env: 'FOO_TIMEOUT',
        help: 'Processing timeout in milliseconds',
        helpArg: 'MS'
    }
];

var parser: Object = dashdash.createParser({options: options});
try {
    var opts: Object = parser.parse(process.argv);
} catch (e) {
    console.error('foo: error: %s', e.message);
    process.exit(1);
}
// Or a shortcut:
//      var opts = dashdash.parse({options: options});

console.log("# opts:", opts);
console.log("# args:", opts._args);

// Use `parser.help()` for formatted options help.
if (opts.help) {
    var help: String = parser.help({includeEnv: true}).trimRight();
    console.log('usage: node foo.js [OPTIONS]\n'
                + 'options:\n'
                + help);
    process.exit(0);
}

// ...
