'use strict';

const fs: any = require('fs');
const path: any = require('path');

const regex: RegExp = /module\.exports = punycode;/;
const output: RegExp = 'export { ucs2decode, ucs2encode, decode, encode, toASCII, toUnicode };\nexport default punycode;';

const sourceContents: any = fs.readFileSync(path.resolve(__dirname, '../punycode.js'), 'utf-8');

if (!regex.test(sourceContents)) {
	throw new Error('The underlying library has changed. Please update the prepublish script.');
}

const outputContents: string = sourceContents.replace(regex, output);

fs.writeFileSync(path.resolve(__dirname, '../punycode.es6.js'), outputContents);
