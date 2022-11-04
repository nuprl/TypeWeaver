#!/usr/bin/env node
/*
 * An example using option group headings
 * <https://github.com/trentm/node-dashdash#option-group-headings>
 * To see the help output:
 *
 *      node option-groups.js --help
 */

var dashdash: Array = require('../lib/dashdash');

// Specify the options. Minimally `name` (or `names`) and `type`
// must be given for each.
var options: Array = [
    { names: [ 'not-in-group', 'g' ], type: 'string' },
    { group: 'first group' },
    { names: [ 'first-one', 'f' ], type: 'bool' },
    { names: [ 'first-two', 'F' ], type: 'string' },
    { group: 'empty group' },
    { group: 'second group' },
    { names: [ 'second-one', 's' ], type: 'bool' },
    { names: [ 'help', 'h' ], type: 'bool' },
];

var parser: Object = dashdash.createParser({options: options});
try {
    var opts: Object = parser.parse(process.argv);
} catch (e) {
    console.error('foo: error: %s', e.message);
    process.exit(1);
}

if (opts.help) {
    var help: String = parser.help({includeEnv: true}).trimRight();
    console.log(
        'usage:\n'
        + '    node option-groups.js [<options>]\n'
        + 'options:\n'
        + help);
    process.exit(0);
}

// ...