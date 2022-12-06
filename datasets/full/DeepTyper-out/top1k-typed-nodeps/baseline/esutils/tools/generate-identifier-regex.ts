// Based on https://gist.github.com/mathiasbynens/6334847 by @mathias
'use strict';

const regenerate: any = require('regenerate');

// Which Unicode version should be used?
const version: string = '9.0.0';

// Set up a shorthand function to import Unicode data.
const get = function(what: any) {
    return require('unicode-' + version + '/' + what + '/code-points');
};

// Get the Unicode categories needed to construct the ES5 regex.
const Lu: any = get('General_Category/Uppercase_Letter');
const Ll: any = get('General_Category/Lowercase_Letter');
const Lt: any = get('General_Category/Titlecase_Letter');
const Lm: any = get('General_Category/Modifier_Letter');
const Lo: any = get('General_Category/Other_Letter');
const Nl: any = get('General_Category/Letter_Number');
const Mn: any = get('General_Category/Nonspacing_Mark');
const Mc: any = get('General_Category/Spacing_Mark');
const Nd: any = get('General_Category/Decimal_Number');
const Pc: any = get('General_Category/Connector_Punctuation');

const es5regexes: any = (function() { // ES 5.1
    // http://mathiasbynens.be/notes/javascript-identifiers#valid-identifier-names
    const identifierStart: any = regenerate()
        .add(Lu, Ll, Lt, Lm, Lo, Nl)
        .removeRange(0x010000, 0x10FFFF) // remove astral symbols
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    const identifierStartCodePoints: any = identifierStart.toArray();
    const identifierPart: any = regenerate(identifierStartCodePoints)
        .add('\u200C', '\u200D', Mn, Mc, Nd, Pc)
        .removeRange(0x010000, 0x10FFFF) // remove astral symbols
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    return {
        'NonAsciiIdentifierStart': '/' + identifierStart + '/',
        'NonAsciiIdentifierPart': '/' + identifierPart + '/',
    };
}());

// Get the Unicode properties needed to construct the ES6 regex.
const ID_Start: any = get('Binary_Property/ID_Start');
const ID_Continue: any = get('Binary_Property/ID_Continue');
const Other_ID_Start: any = get('Binary_Property/Other_ID_Start');

const es6regexes: any = (function() {
    // http://ecma-international.org/ecma-262/6.0/#sec-identifier-names-static-semantics-early-errors
    // http://unicode.org/reports/tr31/#Default_Identifier_Syntax
    // https://bugs.ecmascript.org/show_bug.cgi?id=2717#c0
    const identifierStart: any = regenerate(ID_Start)
        // Note: this already includes `Other_ID_Start`. http://git.io/wRCAfQ
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    const identifierPart: any = regenerate(ID_Continue)
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
