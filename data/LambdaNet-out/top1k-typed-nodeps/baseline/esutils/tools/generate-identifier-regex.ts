// Based on https://gist.github.com/mathiasbynens/6334847 by @mathias
'use strict';

const regenerate: Function = require('regenerate');

// Which Unicode version should be used?
const version: string = '9.0.0';

// Set up a shorthand function to import Unicode data.
const get: Function = function(what: string) {
    return require('unicode-' + version + '/' + what + '/code-points');
};

// Get the Unicode categories needed to construct the ES5 regex.
const Lu: string = get('General_Category/Uppercase_Letter');
const Ll: string = get('General_Category/Lowercase_Letter');
const Lt: string = get('General_Category/Titlecase_Letter');
const Lm: string = get('General_Category/Modifier_Letter');
const Lo: string = get('General_Category/Other_Letter');
const Nl: string = get('General_Category/Letter_Number');
const Mn: string = get('General_Category/Nonspacing_Mark');
const Mc: string = get('General_Category/Spacing_Mark');
const Nd: string = get('General_Category/Decimal_Number');
const Pc: string = get('General_Category/Connector_Punctuation');

const es5regexes: HTMLElement = (function() { // ES 5.1
    // http://mathiasbynens.be/notes/javascript-identifiers#valid-identifier-names
    const identifierStart: string = regenerate()
        .add(Lu, Ll, Lt, Lm, Lo, Nl)
        .removeRange(0x010000, 0x10FFFF) // remove astral symbols
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    const identifierStartCodePoints: string = identifierStart.toArray();
    const identifierPart: string = regenerate(identifierStartCodePoints)
        .add('\u200C', '\u200D', Mn, Mc, Nd, Pc)
        .removeRange(0x010000, 0x10FFFF) // remove astral symbols
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    return {
        'NonAsciiIdentifierStart': '/' + identifierStart + '/',
        'NonAsciiIdentifierPart': '/' + identifierPart + '/',
    };
}());

// Get the Unicode properties needed to construct the ES6 regex.
const ID_Start: string = get('Binary_Property/ID_Start');
const ID_Continue: string = get('Binary_Property/ID_Continue');
const Other_ID_Start: string = get('Binary_Property/Other_ID_Start');

const es6regexes: HTMLElement = (function() {
    // http://ecma-international.org/ecma-262/6.0/#sec-identifier-names-static-semantics-early-errors
    // http://unicode.org/reports/tr31/#Default_Identifier_Syntax
    // https://bugs.ecmascript.org/show_bug.cgi?id=2717#c0
    const identifierStart: string = regenerate(ID_Start)
        // Note: this already includes `Other_ID_Start`. http://git.io/wRCAfQ
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    const identifierPart: string = regenerate(ID_Continue)
        // Note: `ID_Continue` already includes `Other_ID_Continue`. http://git.io/wRCAfQ
        .add(Other_ID_Start)
        .add('\u200C', '\u200D')
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)

    return {
        'NonAsciiIdentifierStart': '/' + identifierStart + '/',
        'NonAsciiIdentifierPart': '/' + identifierPart + '/',
    };
}());

console.log(
    '// ECMAScript 5.1/Unicode v%s NonAsciiIdentifierStart:\n%s\n',
    version,
    es5regexes.NonAsciiIdentifierStart
);
console.log(
    '// ECMAScript 5.1/Unicode v%s NonAsciiIdentifierPart:\n%s\n',
    version,
    es5regexes.NonAsciiIdentifierPart
);

console.log(
    '// ECMAScript 6/Unicode v%s NonAsciiIdentifierStart:\n%s\n',
    version,
    es6regexes.NonAsciiIdentifierStart
);
console.log(
    '// ECMAScript 6/Unicode v%s NonAsciiIdentifierPart:\n%s',
    version,
    es6regexes.NonAsciiIdentifierPart
);
